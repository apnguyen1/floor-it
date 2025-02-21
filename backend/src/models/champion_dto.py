from typing import Dict

from backend.src.models.model import Model


class ChampionImageDTO(Model):
    """
    Represents the image metadata for a champion.

    Attributes:
        full (str): The filename of the champion's full image.
    """

    full: str


class ChampionDataDTO(Model):
    """
    Represents detailed information about a champion.

    Attributes:
        name (str): The champion's name.
        title (str): The champion's title.
        image (ChampionImageDTO): The image associated with the champion.
    """

    name: str
    title: str
    image: ChampionImageDTO


class ChampionDTO(Model):
    """
    Represents the overall champion data structure.

    Attributes:
        version (str): The version of the game data.
        data (Dict[str, ChampionDataDTO]): A dictionary mapping champion IDs to their corresponding data.
    """

    version: str
    data: Dict[str, ChampionDataDTO]
