from typing import List

from backend.src.models.category_data_dto import (
    CategoryDataDTO,
    QuestionType,
    TriviaQuestionDTO,
)


def to_category_data(
    category_name: str,
    preview_img: str,
    preview_desc: str,
    question_type: QuestionType,
    json_data: dict[str, List[str]],
) -> CategoryDataDTO:
    """
    Maps JSON data formatted: {<question>: [<answer>], <question>: [<answer>]}
    into a CategoryDataDTO.

    :param category_name: the category name
    :param question_type: the QuestionType of the category
    :param json_data: the processed category data
    :return: CategoryDataDTO of the category
    """
    if not isinstance(json_data, dict):
        raise ValueError("json_data should be a dict")

    for q, a in json_data.items():
        if not isinstance(a, list):
            raise ValueError("answers should be a list of strings")

    return CategoryDataDTO(
        name=category_name,
        preview_img=preview_img,
        preview_desc=preview_desc,
        type=question_type,
        questions=[
            TriviaQuestionDTO(question=q, answers=a) for q, a in json_data.items()
        ],
    )
