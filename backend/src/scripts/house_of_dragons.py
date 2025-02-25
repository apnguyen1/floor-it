from typing import List

from backend.src.models.numbers_dto import NumbersDTO
from backend.src.utils.category import Category


class HouseOfDragons(Category[NumbersDTO]):
    def __init__(self):
        super().__init__(
            source="house_of_dragons.txt",
            model=NumbersDTO,
            name="House of Dragons",
            desc="Test your HOD Knowledge",
        )

    def _format_data(self) -> dict[str, List[str]]:
        return self._raw_data.question
