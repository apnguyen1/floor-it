from typing import List

from backend.src.models.numbers_dto import NumbersDTO
from backend.src.utils.category import Category


class Disney(Category[NumbersDTO]):
    def __init__(self):
        super().__init__(
            source="disney.txt",
            model=NumbersDTO,
            name="Disney",
            desc="Test your Disney Trivia!",
        )

    def _format_data(self) -> dict[str, List[str]]:
        return self._raw_data.question
