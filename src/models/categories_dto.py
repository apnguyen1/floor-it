from typing import List, Literal
from src.models.model import Model

class CategoryDTO(Model):
    name: str
    image: str
    desc: str

class CategoriesDTO(Model):
    allCategories: List[CategoryDTO] = []

class TriviaQuestion(Model):
    question: str
    answers: List[str]
    aliases: List[str]

class CategoryDataDTO(Model):
    name: str
    type: Literal["img", "text"]
    data: TriviaQuestion