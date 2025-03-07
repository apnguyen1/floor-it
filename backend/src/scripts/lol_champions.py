from typing import Dict, List

from backend.src.models.category_data_dto import QuestionType
from backend.src.models.champion_dto import ChampionDTO
from backend.src.utils.category import Category
from backend.src.utils.definitions import PreviewImageType


class Champions(Category[ChampionDTO]):
    def __init__(self, question_type: QuestionType):
        url = "https://ddragon.leagueoflegends.com/cdn/15.2.1/data/en_US/champion.json"
        super().__init__(
            source=url,
            model=ChampionDTO,
            question_type=question_type,
            fuzzy_matching_threshold=0.4,
            img_name=PreviewImageType.GAMES,
        )

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

        base_img_url = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"
        image_to_name = {}
        for c in self._raw_data.data.values():
            image_name = c.image.full[0:-4]

            image_to_name[base_img_url + image_name + "_0.jpg"] = [
                c.name.replace("'", " ")
            ]
            image_to_name[base_img_url + image_name + "_1.jpg"] = [
                c.name.replace("'", " ")
            ]

        return image_to_name

    def _format_data(self) -> dict[str, List[str]]:
        return (
            self.__title_to_name()
            if self.question_type == QuestionType.TEXT
            else (self.__image_to_name())
        )
