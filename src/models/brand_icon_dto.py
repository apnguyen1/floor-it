from typing import List

from pydantic import Field

from src.models.model import Model


class BrandDTO(Model):
    name: str = Field(alias="Name")
    partial: str = Field(alias="logoSrc")
    full: str = Field(alias="logoAnswerSrc")
    answers: List[str] = Field(alias="Answers")


class BrandIconsDTO(Model):
    questions: List[BrandDTO] = Field(alias="Questions")
