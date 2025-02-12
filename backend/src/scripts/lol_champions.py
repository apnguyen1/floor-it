from typing import Dict, List

from backend.src.models.category_data_dto import QuestionType
from backend.src.models.champion_dto import ChampionDTO
from backend.src.utils.category import Category


class Champions(Category[ChampionDTO]):
    def __init__(self, qt: QuestionType):
        url = "https://ddragon.leagueoflegends.com/cdn/15.2.1/data/en_US/champion.json"
        self.qt = qt
        super().__init__(source=url, model=ChampionDTO, question_type=qt)

    def __title_to_name(self) -> Dict[str, List[str]]:
        """
        Returns a mapping of champion titles to their names.
        Replaces any apostrophes (') in the name with spaces
        :return: a dict of their titles to their names
        """
        self.name = "LoL Champion Titles"
        self.description = "Guess the LoL champion's name by their title!"
        return {
            champion.title: [champion.name.replace("'", " ")]
            for champion in self._raw_data.data.values()
        }

    def __image_to_name(self) -> Dict[str, List[str]]:
        """
        Returns a mapping of champion images to their names.
        Replaces any apostrophes (') in the name with spaces'
        :return: a dict of their images to their names
        """
        self.name = "LoL Champion Covers"
        self.description = "Guess the LoL champion's name by their image!"
        return {
            champion.image.full: [champion.name.replace("'", " ")]
            for champion in self._raw_data.data.values()
        }

    def _format_data(self) -> dict[str, List[str]]:
        return (
            self.__title_to_name()
            if self.qt == QuestionType.TEXT
            else (self.__image_to_name())
        )
