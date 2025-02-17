from typing import List
from backend.src.models.numbers_dto import NumbersDTO
from backend.src.utils.category import Category


class Numbers(Category[NumbersDTO]):
    def __init__(self):
        super().__init__(
            source="numbers.txt",
            model=NumbersDTO,
            name="Numbers",
            desc="Test your Number Skillz",
        )

    def numbers_to_text(self) -> dict:
        return self._raw_data.root  # Use .root for RootModel

    def _format_data(self) -> dict[str, List[str]]:
        return self.numbers_to_text()
