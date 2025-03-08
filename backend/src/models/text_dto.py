from typing import Dict, List

from backend.src.models.model import Model


class TextDTO(Model):
    """
    Data Transfer Object for text-based categories.

    Attributes:
        question (Dict[str, List[str]]): A dictionary mapping questions to their answers.
            Each question has a list of acceptable answers.
    """

    question: Dict[str, List[str]]
