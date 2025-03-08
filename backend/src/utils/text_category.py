from typing import Dict, List

from backend.src.models.category_data_dto import QuestionType
from backend.src.models.text_dto import TextDTO
from backend.src.utils.category import Category
from backend.src.utils.definitions import PreviewImageType


class TextCategory(Category[TextDTO]):
    """
    Base class for text-based categories.

    Simplifies the creation of categories from text files by handling the common
    formatting logic.

    Args:
        source (str): The source file name in the static resources directory
        name (str): The display name of the category
        desc (str): A short description of the category
        img_name (str): The preview image to use for the category
        question_type (QuestionType): The type of questions (defaults to TEXT)
        fuzzy_matching_threshold (float): Threshold for fuzzy matching (0.0 to 1.0)
    """

    def __init__(
        self,
        source: str,
        name: str,
        desc: str,
        img_name: str = PreviewImageType.DEFAULT,
        question_type: QuestionType = QuestionType.TEXT,
        fuzzy_matching_threshold: float = 0.6,
    ):
        super().__init__(
            source=source,
            model=TextDTO,
            name=name,
            question_type=question_type,
            fuzzy_matching_threshold=fuzzy_matching_threshold,
            img_name=img_name,
            desc=desc,
        )

    def _format_data(self) -> Dict[str, List[str]]:
        """Format the text file data using the stored data"""
        return self._raw_data.question
