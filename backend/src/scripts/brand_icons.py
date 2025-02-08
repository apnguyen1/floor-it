from typing import List

from backend.src.models.brand_icon_dto import BrandIconsDTO
from backend.src.utils.category import Category


class BrandIcons(Category[BrandIconsDTO]):
    def __init__(self, file: str):
        super().__init__(file, BrandIconsDTO)

    def brand_logo_to_name(self) -> dict:
        return {q.partial: q.answers for q in self._raw_data.questions}

    def _format_data(self) -> dict[str, List[str]]:
        return self.brand_logo_to_name()


if __name__ == "__main__":
    bi = BrandIcons(
        "brand-icons.json",
    )

    print(bi._formatted_data)
