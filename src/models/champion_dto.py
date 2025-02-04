from typing import Dict

from src.models.model import Model


class ChampionImageDTO(Model):
    full: str


class ChampionDataDTO(Model):
    name: str
    title: str
    image: ChampionImageDTO


class ChampionDTO(Model):
    version: str
    data: Dict[str, ChampionDataDTO]
