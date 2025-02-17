from typing import List
from backend.src.models.numbers_dto import NumbersDTO
from backend.src.models.category_data_dto import QuestionType
from backend.src.utils.category import Category


class Numbers(Category[NumbersDTO]):
    def __init__(self):
        super().__init__(
            source="numbers.txt",
            model=NumbersDTO,
            question_type=QuestionType.TEXT,
            name="Numbers",
            img_name="numbers-preview.png",
            desc="Test your Number Skillz",
        )

    def numbers_to_text(self) -> dict:
        return {q.question: q.answers for q in self._raw_data.questions}

    def _format_data(self) -> dict[str, List[str]]:
        return self.numbers_to_text()
