from typing import Dict

from pydantic import Field
from .base_dto import BaseDTO


class ChampionImageDTO(BaseDTO):
    image: str = Field(alias='full')
    thumbnail: str = Field(alias='sprite')


class ChampionDataDTO(BaseDTO):
    name: str
    title: str
    image: ChampionImageDTO


class ChampionDto(BaseDTO):
    version: str
    data: Dict[str, ChampionDataDTO]
