import pytest
from unittest.mock import patch
from pydantic import BaseModel
from backend.src.utils.category import Category


class DummyDTO(BaseModel):
    value: str


class DummyCategory(Category[DummyDTO]):
    def to_dto(self):
        return self.raw_data


@patch.object(Category, "_load_data")
def test_category_load_url_data(mock_load):
    mock_load.return_value = DummyDTO(value="1")

    category = DummyCategory("https://example.com", DummyDTO)

    assert isinstance(category, DummyCategory)
    assert category.raw_data.value == "1"
    mock_load.assert_called_once()


def test_category_invalid_model():
    with pytest.raises(TypeError):
        DummyCategory("https://example.com", dict)
