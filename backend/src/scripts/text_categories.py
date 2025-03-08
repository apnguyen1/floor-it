from typing import List, Dict

from backend.src.models.category_data_dto import QuestionType
from backend.src.models.model import Model
from backend.src.utils.category import Category
from backend.src.utils.parse_file import parse_file  # Add this import


class BJJ(Category):
    """Brazilian Jiu-Jitsu category"""

    def __init__(self):
        # Store the parsed data before initialization
        self.__bjj_data = parse_file("bjj.txt")

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
        """Format the text file data using the stored data"""
        if isinstance(self.__bjj_data, dict) and "question" in self.__bjj_data:
            return self.__bjj_data["question"]
        return {}


class Numbers(Category):
    """Numbers category"""

    def __init__(self):
        # Store the parsed data before initialization
        self.__numbers_data = parse_file("numbers.txt")

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
        """Format the text file data using the stored data"""
        if isinstance(self.__numbers_data, dict) and "question" in self.__numbers_data:
            return self.__numbers_data["question"]
        return {}
