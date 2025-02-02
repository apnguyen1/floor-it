from dataclasses import dataclass, asdict
from typing import Dict

import requests


@dataclass
class ChampionImageDTO:
    full: str
    sprite: str


@dataclass
class ChampionsDataDTO:
    name: str  # Renaming 'id' to 'name'
    title: str
    image: ChampionImageDTO

    @staticmethod
    def from_dict(d: dict) -> "ChampionsDataDTO":
        return ChampionsDataDTO(
            name=d.get("id", ""),  # Safely get 'id'
            title=d.get("title", ""),  # Safely get 'title'
            image=ChampionImageDTO(
                full=d.get("image", {}).get("full", ""),
                sprite=d.get("image", {}).get("sprite", ""),
            ),
        )


@dataclass
class ChampionsDTO:
    version: str
    data: Dict[str, ChampionsDataDTO]

    @staticmethod
    def from_dict(d: dict) -> "ChampionsDTO":
        return ChampionsDTO(
            version=d.get("version", ""),
            data={
                champ_id: ChampionsDataDTO.from_dict(champ_info)
                for champ_id, champ_info in d.get("data", {}).items()
            },
        )


def get_champions_data(version: str = "15.2.1") -> dict:
    """
    Fetches the list of LoL champions.

    :param version: The patch notes version.
    :return: a json of LoL champions data.
    """
    url = f"https://ddragon.leagueoflegends.com/cdn/{version}/data/en_US/champion.json"
    try:
        response = requests.get(url)
    except Exception as e:
        raise e

    data = response.json()
    champions = ChampionsDTO.from_dict(data)

    return asdict(champions)
