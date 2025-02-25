from typing import List

from backend.src.models.numbers_dto import NumbersDTO
from backend.src.utils.category import Category


class Synonyms(Category[NumbersDTO]):
    def __init__(self):
        super().__init__(
            source="synonyms.txt",
            model=NumbersDTO,
            name="Synonyms",
            desc="Two words that mean the same thing",
        )

    def _format_data(self) -> dict[str, List[str]]:
        return self._raw_data.question
