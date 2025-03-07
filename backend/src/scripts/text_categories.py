from typing import List, Dict

from backend.src.models.category_data_dto import QuestionType
from backend.src.models.model import Model
from backend.src.utils.category import Category


class Numbers(Category):
    """Numbers category"""

    def __init__(self):
        super().__init__(
            source="numbers.txt",
            model=Model,
            name="Numbers",
            desc="Test your number recognition skills!",
            img_name="game_icon.png",
            fuzzy_matching_threshold=0.9,
            question_type=QuestionType.TEXT,
        )

    def _format_data(self) -> Dict[str, List[str]]:
        """Format the text file data into questions and answers"""
        if hasattr(self._raw_data, "question"):
            return self._raw_data.question
        return {}


class BJJ(Category):
    """Brazilian Jiu-Jitsu category"""

    def __init__(self):
        super().__init__(
            source="bjj.txt",
            model=Model,
            name="Brazilian Jiu-Jitsu",
            desc="Test your knowledge of Brazilian Jiu-Jitsu!",
            img_name="martial_arts.png",
            fuzzy_matching_threshold=0.7,
            question_type=QuestionType.TEXT,
        )

    def _format_data(self) -> Dict[str, List[str]]:
        """Format the text file data into questions and answers"""
        if hasattr(self._raw_data, "question"):
            return self._raw_data.question
        return {}
