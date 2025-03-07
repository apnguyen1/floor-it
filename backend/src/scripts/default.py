from abc import ABC
from typing import List

from backend.src.models.default_dto import DefaultDTO
from backend.src.utils.category import Category
from backend.src.utils.definitions import PreviewImageType


class Default(ABC, Category[DefaultDTO]):
    def __init__(
        self,
        source,
        name,
        description="Test your Trivia!",
        preview_img=PreviewImageType.DEFAULT,
        fuzzy_threshold=0.9,
    ):
        super().__init__(
            source=source,
            model=DefaultDTO,
            name=name,
            desc=description,
            fuzzy_matching_threshold=fuzzy_threshold,
            img_name=preview_img,
        )

    def _format_data(self) -> dict[str, List[str]]:
        return self._raw_data.question
