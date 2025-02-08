from typing import List
from unittest.mock import patch

import pytest
from pydantic import BaseModel

from backend.src.utils.category import Category


class DummyDTO(BaseModel):
    value: str


class DummyCategory(Category[DummyDTO]):
    def to_dto(self):
        return self._raw_data

    def _format_data(self) -> dict[str, List[str]]:
        return {}


@patch.object(Category, "_load_data")
def test_category_load_url_data(mock_load):
    mock_load.return_value = DummyDTO(value="1")

    category = DummyCategory("https://example.com", DummyDTO)

    assert isinstance(category, DummyCategory)
    assert category._raw_data.value == "1"
    mock_load.assert_called_once()


def test_category_invalid_model():
    with pytest.raises(TypeError):
        DummyCategory("https://example.com", dict)
