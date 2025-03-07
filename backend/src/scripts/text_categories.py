# backend/src/scripts/text_categories.py
from typing import List, Dict, Type

from pydantic import BaseModel

from backend.src.scripts.generate_categories import generate_categories
from backend.src.utils.category import Category


class DummyDTO(BaseModel):
    """A dummy DTO that requires no fields"""

    pass


class TextCategories(Category):
    """A special Category subclass that generates text categories."""

    def __init__(self):
        # Generate text categories using the shared function
        generate_categories()

        # Initialize with a dummy model and minimal values
        super().__init__(
            source="dummy",
            model=DummyDTO,
            name="Text Categories",
            desc="Collection of text categories",
        )

    # Override the _load_data method to return an empty DummyDTO
    def _load_data(self, model: Type[DummyDTO]) -> DummyDTO:
        """Override to return an empty DTO"""
        return DummyDTO()

    def _format_data(self) -> Dict[str, List[str]]:
        """Return an empty dictionary"""
        return {}
