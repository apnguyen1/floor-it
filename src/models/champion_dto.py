from typing import Dict

from pydantic import Field

from src.models.model import Model


class ChampionImageDTO(Model):
    full: str
    thumbnail: str = Field(alias="sprite")


class ChampionDataDTO(Model):
    name: str
    title: str
    image: ChampionImageDTO


class ChampionDTO(Model):
    version: str
    data: Dict[str, ChampionDataDTO]
