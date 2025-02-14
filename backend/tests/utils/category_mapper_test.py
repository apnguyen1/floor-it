# TODO: Remove and put tests in category_test since category_mapper is unused

import pytest

from backend.src.models.category_data_dto import QuestionType, TriviaQuestionDTO
from backend.src.utils.category_mapper import to_category_data


def test_to_category_data_success():
    """
    Tests that the model serializes and deserializes formatted JSON correctly
    """
    category_name = "Science"
    preview_img = "Science_preview.png"
    preview_desc = "Science preview description"
    question_type = QuestionType.TEXT
    json_data = {
        "q1": ["a1"],
        "q2": ["a2"],
    }

    expected_json = {
        "name": "Science",
        "preview_img": "Science_preview.png",
        "preview_desc": "Science preview description",
        "type": question_type,
        "questions": [
            {"question": "q1", "answers": ["a1"], "aliases": []},
            {"question": "q2", "answers": ["a2"], "aliases": []},
        ],
    }

    model = to_category_data(
        category_name, preview_img, preview_desc, question_type, json_data
    )
    actual_json = model.model_dump()

    assert actual_json == expected_json


@pytest.mark.parametrize(
    "invalid_json",
    [
        ["Not a dict"],  # Case 1: json_data is a list instead of dict
        "string instead of dict",  # Case 2: json_data is a string
        42,  # Case 3: json_data is an integer
        {42: ["Valid answer"]},  # Case 4: Key is not a string
        {"question": "Not a list"},  # Case 5: Answers are not a list
        {"question": ["Valid", 123]},  # Case 6: Answers list contains a non-string
    ],
)
def test_to_category_data_invalid_input(invalid_json):
    """Ensure to_category_data raises ValueError for improperly formatted input."""
    category_name = "Invalid Category"
    preview_img = "invalid_category.png"
    preview_desc = "invalid category description"
    question_type = QuestionType.TEXT

    with pytest.raises(ValueError):
        to_category_data(
            category_name, preview_img, preview_desc, question_type, invalid_json
        )


@pytest.mark.parametrize(
    "valid_json, expected_questions",
    [
        (  # Case 1: Single question-answer pair
            {"q1": ["a1"]},
            [{"question": "q1", "answers": ["a1"], "aliases": []}],
        ),
        (  # Case 2: Multiple questions with single answers
            {"q1": ["a1"], "q2": ["a2"]},
            [
                {"question": "q1", "answers": ["a1"], "aliases": []},
                {"question": "q2", "answers": ["a2"], "aliases": []},
            ],
        ),
        (  # Case 3: Multiple questions with multiple answers
            {"q1": ["a1", "a2"], "q2": ["a3", "a4"]},
            [
                {"question": "q1", "answers": ["a1", "a2"], "aliases": []},
                {"question": "q2", "answers": ["a3", "a4"], "aliases": []},
            ],
        ),
        ({}, []),  # Case 4: Empty dictionary (no questions)
    ],
)
def test_to_category_data_valid_inputs(valid_json, expected_questions):
    """Ensure to_category_data correctly processes valid input formats."""
    category_name = "General Knowledge"
    preview_img = "General_knowledge_preview.png"
    preview_desc = "General knowledge preview description"
    question_type = QuestionType.TEXT

    model = to_category_data(
        category_name, preview_img, preview_desc, question_type, valid_json
    )

    assert model.name == category_name
    assert model.preview_img == preview_img
    assert model.preview_desc == preview_desc
    assert model.type == question_type
    assert model.questions == [TriviaQuestionDTO(**q) for q in expected_questions]
