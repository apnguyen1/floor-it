from typing import Dict

from backend.src.models.model import Model


# Example JSON of lol champions

# "type": "champion",
# "format": "standAloneComplex",
# "version": "15.2.1",
# "data": {
# "Aatrox": {
#   "version": "15.2.1",
#   "id": "Aatrox",
#   "key": "266",
#   "name": "Aatrox",
#   "title": "the Darkin Blade",
#   "blurb": "Once honored defenders of Shurima against the Void...
#   "info": {
#     "attack": 8,
#     "defense": 4,
#     "magic": 3,
#     "difficulty": 4
#   },
#   "image": {
#     "full": "Aatrox.png",
#     "sprite": "champion0.png",
#     "group": "champion",
#     "x": 0,
#     "y": 0,
#     "w": 48,
#     "h": 48
#   },
#   "tags": [
#     "Fighter"
#   ],
#   "partype": "Blood Well",
#   "stats": {
#     "hp": 650,
#     "hpperlevel": 114,
#     "mp": 0,
#     "mpperlevel": 0,
#     "movespeed": 345,
#     "armor": 38,
#     "armorperlevel": 4.8,
#     "spellblock": 32,
#     "spellblockperlevel": 2.05,
#     "attackrange": 175,
#     "hpregen": 3,
#     "hpregenperlevel": 0.5,
#     "mpregen": 0,
#     "mpregenperlevel": 0,
#     "crit": 0,
#     "critperlevel": 0,
#     "attackdamage": 60,
#     "attackdamageperlevel": 5,
#     "attackspeedperlevel": 2.5,
#     "attackspeed": 0.651
#   }
#  },
# }


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
