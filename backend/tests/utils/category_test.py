from typing import List
from unittest.mock import patch

import pytest
from pydantic import BaseModel

from backend.src.utils.category import Category
from backend.src.models.category_data_dto import QuestionType


class DummyDTO(BaseModel):
    value: str


class DummyCategory(Category[DummyDTO]):
    def _format_data(self) -> dict[str, List[str]]:
        return {"test_question": [self._raw_data.value]}


@pytest.fixture
def basic_category():
    with patch.object(Category, "_load_data") as mock_load:
        mock_load.return_value = DummyDTO(value="test")
        category = DummyCategory(
            source="https://example.com",
            model=DummyDTO,
            question_type=QuestionType.TEXT,
            name="Test Category",
            img_name="test.png",
            desc="Test Description",
        )
        return category


def test_category_initialization(basic_category):
    assert isinstance(basic_category, DummyCategory)
    assert basic_category.name == "Test Category"
    assert basic_category.description == "Test Description"
    assert basic_category.preview_img == "test.png"
    assert basic_category._raw_data.value == "test"
    assert basic_category.question_type == QuestionType.TEXT


def test_category_property_setters(basic_category):
    basic_category.name = "New Name"
    assert basic_category.name == "New Name"

    basic_category.description = "New Description"
    assert basic_category.description == "New Description"

    basic_category.preview_img = "new.png"
    assert basic_category.preview_img == "new.png"

    basic_category.question_type = QuestionType.IMG
    assert basic_category.question_type == QuestionType.IMG


def test_category_formatted_data(basic_category):
    formatted = basic_category.formatted_data
    assert isinstance(formatted, dict)
    assert formatted == {"test_question": ["test"]}

    formatted["new_key"] = ["new_value"]
    assert "new_key" not in basic_category.formatted_data


@patch.object(Category, "_load_data")
def test_category_load_url_data(mock_load):
    mock_load.return_value = DummyDTO(value="test")
    category = DummyCategory(
        source="https://example.com",
        model=DummyDTO,
        question_type=QuestionType.TEXT,
        name="Test",
    )
    assert category._raw_data.value == "test"
    mock_load.assert_called_once()


def test_category_invalid_model():
    with pytest.raises(TypeError, match="dict must be of type BaseModel"):
        DummyCategory(
            source="https://example.com",
            model=dict,
            question_type=QuestionType.TEXT,
            name="Test",
        )


def test_category_load_data_error():
    with patch("backend.src.utils.fetch.fetch_url") as mock_fetch:
        mock_fetch.side_effect = Exception("API Error")
        with pytest.raises(
            ValueError, match="Failed to load data from https://example.com"
        ):
            DummyCategory(
                source="https://example.com",
                model=DummyDTO,
                question_type=QuestionType.TEXT,
                name="Test",
            )


# TODO
""" def test_to_category(basic_category):
    with pytest.raises(NotImplementedError):
        basic_category.to_category()
        raise NotImplementedError


def test_to_file(basic_category):
    with pytest.raises(NotImplementedError):
        basic_category.to_file("test/path")
        raise NotImplementedError """
