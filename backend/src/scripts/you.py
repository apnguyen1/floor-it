from typing import List

from backend.src.models.numbers_dto import NumbersDTO
from backend.src.utils.category import Category


class You(Category[NumbersDTO]):
    def __init__(self):
        super().__init__(
            source="you.txt",
            model=NumbersDTO,
            name="You S1",
            desc="Test your You Season 1 Knowledge!",
        )

    def _format_data(self) -> dict[str, List[str]]:
        return self._raw_data.question
