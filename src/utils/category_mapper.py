from src.models.category_data_dto import (
    CategoryDataDTO,
    QuestionType,
    TriviaQuestionDTO,
)


def to_category_data(
    category_name: str, question_type: QuestionType, json_data: dict
) -> CategoryDataDTO:
    """
    This maps JSON data {<question>: <answer>, <question>: <answer>} into a CategoryDataDTO.

    :param category_name: the category name
    :param question_type: the QuestionType of the category
    :param json_data: the processed category data
    :return: CategoryDataDTO of the category
    """

    trivia_questions = []
    for q, a in json_data.items():
        tq = TriviaQuestionDTO(question=q, answers=a)

        trivia_questions.append(tq)

    return CategoryDataDTO(
        name=category_name, type=question_type, questions=trivia_questions
    )
