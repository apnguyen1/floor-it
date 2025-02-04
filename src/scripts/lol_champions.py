from typing import Dict, Type

from src.utils.category import Category
from src.models.champion_dto import ChampionDTO, ChampionDataDTO


class Champions(Category):
    def __init__(self, source: str, model: Type[ChampionDTO]):
        super().__init__(source, model)

    def title_to_name(self):
        """
        Returns a mapping of champion titles to their names.
        Replaces any apostrophes (') in the name with spaces
        :return: Dict[str, str]
        """
        champion_data: Dict[str, ChampionDataDTO] = self.data.data
        return {c.title: c.name.replace("'", " ") for c in champion_data.values()}


if __name__ == "__main__":
    url = "https://ddragon.leagueoflegends.com/cdn/15.2.1/data/en_US/champion.json"
    c = Champions(url, ChampionDTO)

    print(c.data.data)
