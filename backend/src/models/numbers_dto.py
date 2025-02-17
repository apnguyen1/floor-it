from typing import List
from pydantic import Field
from backend.src.models.model import Model


class NumberDTO(Model):
    question: str = Field(alias="Question")
    answers: List[str] = Field(alias="Answers")


class NumbersDTO(Model):
    questions: List[NumberDTO] = Field(alias="Questions")
