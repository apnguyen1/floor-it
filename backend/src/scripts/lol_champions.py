from typing import Dict

from backend.src.utils.category import Category
from backend.src.models.champion_dto import ChampionDTO, ChampionDataDTO


class Champions(Category[ChampionDTO]):
    def __init__(self, source: str):
        super().__init__(source, ChampionDTO)

    def title_to_name(self) -> Dict[str, str]:
        """
        Returns a mapping of champion titles to their names.
        Replaces any apostrophes (') in the name with spaces
        :return: Dict[str, str]
        """
        champion_data: Dict[str, ChampionDataDTO] = self.raw_data.data
        return {
            champion.title: champion.name.replace("'", " ")
            for champion in champion_data.values()
        }

    def image_to_name(self) -> Dict[str, str]:
        champion_data: Dict[str, ChampionDataDTO] = self.raw_data.data

        return {
            champion.image.full: champion.name.replace("'", " ")
            for champion in champion_data.values()
        }
