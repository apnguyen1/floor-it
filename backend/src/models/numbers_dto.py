from typing import List
from pydantic import RootModel
from backend.src.models.model import Model


class NumberDTO(Model):
    question: str
    answers: List[str]


class NumbersDTO(RootModel[dict[str, List[str]]]):
    pass
