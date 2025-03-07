import os

from backend.src.models.category_data_dto import (
    CategoryDataDTO,
    QuestionType,
    TriviaQuestionDTO,
)
from backend.src.utils.definitions import PUBLIC_DIR
from backend.src.utils.generate_aliases import generate_aliases
from backend.src.utils.parse_file import parse_file


class CategoryCreator:
    """
    A utility class for creating simple text-based categories.
    """

    @staticmethod
    def create_from_text_file(
        source_file: str,
        name: str,
        description: str,
        img_name: str = "game_icon.png",
        fuzzy_matching_threshold: float = 0.7,
    ) -> None:
        """
        Create a text-based category from a text file.

        Args:
            source_file: The path to the text file (relative to resources/static/)
            name: The name of the category
            description: A brief description of the category
            img_name: The name of the preview image
            fuzzy_matching_threshold: Threshold for fuzzy matching (0.0-1.0)
        """
        # Parse the text file
        data = parse_file(source_file)

        # Format the data for the category
        question_data = {}
        if "question" in data:
            question_data = data["question"]

        # Create and save the category
        category = CategoryDataDTO(
            name=name,
            preview_img=img_name,
            preview_desc=description,
            type=QuestionType.TEXT,
            fuzzy_matching_threshold=fuzzy_matching_threshold,
            questions=[
                TriviaQuestionDTO(question=q, answers=a, aliases=generate_aliases(a))
                for q, a in question_data.items()
            ],
        )

        # Save the category to a file
        category_path = name.lower().replace(" ", "_")
        if not category_path.endswith(".json"):
            category_path += ".json"

        output_dir = PUBLIC_DIR / "category_data"
        os.makedirs(output_dir, exist_ok=True)

        output_path = output_dir / category_path

        with open(output_path, "w", encoding="utf-8") as f:
            f.write(category.model_dump_json(indent=2))

        print(f"Category '{name}' created and saved to {output_path}")
