from typing import Dict

from pydantic import Field

from model import Model


class ChampionImageDTO(Model):
    image: str = Field(alias="full")
    thumbnail: str = Field(alias="thumbnail")


class ChampionDataDTO(Model):
    name: str
    title: str


class ChampionDto(Model):
    version: str
    data: Dict[str, ChampionDataDTO]
