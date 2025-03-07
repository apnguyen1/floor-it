from typing import List

from backend.src.models.numbers_dto import NumbersDTO
from backend.src.utils.category import Category
from backend.src.utils.definitions import PreviewImageType


class Numbers(Category[NumbersDTO]):
    def __init__(self):
        super().__init__(
            source="numbers.txt",
            model=NumbersDTO,
            name="Numbers",
            desc="Test your Number Skillz",
            fuzzy_matching_threshold=0.9,
            img_name=PreviewImageType.NUMBERS,
        )

    def _format_data(self) -> dict[str, List[str]]:
        return self._raw_data.question
