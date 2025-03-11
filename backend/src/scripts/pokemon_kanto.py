from typing import List

from backend.src.models.brand_icon_dto import BrandIconsDTO
from backend.src.models.category_data_dto import QuestionType
from backend.src.utils.category import Category
from backend.src.utils.definitions import PreviewImageType


class PokemonKanto(Category[BrandIconsDTO]):
    def __init__(self, file: str = "pokemon_kanto.json"):
        super().__init__(
            source=file,
            model=BrandIconsDTO,
            question_type=QuestionType.IMG,
            name="Original 151 Pokémon",
            img_name=PreviewImageType.GAMES,
            desc="Who's that Pokémon!?",
            fuzzy_matching_threshold=0.4,
        )

    def brand_logo_to_name(self) -> dict:
        return {q.partial: q.answers for q in self._raw_data.questions}

    def _format_data(self) -> dict[str, List[str]]:
        return self.brand_logo_to_name()
