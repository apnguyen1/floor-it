import os
from typing import Dict, List

from backend.src.models.category_data_dto import (
    CategoryDataDTO,
    QuestionType,
    TriviaQuestionDTO,
)
from backend.src.utils.definitions import PUBLIC_DIR
from backend.src.utils.generate_aliases import generate_aliases


class CategoryCreator:
    """
    A simple utility class to create categories without needing to create custom
    DTOs or category classes for each one.
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
        Create a category from a text file source.
        The text file should have one question-answer pair per line, separated by '?'.

        Args:
            source_file: The path to the text file (relative to resources/static/)
            name: The name of the category
            description: A brief description of the category
            img_name: The name of the preview image
            fuzzy_matching_threshold: Threshold for fuzzy matching (0.0-1.0)
        """
        # Parse the text file
        from backend.src.utils.parse_file import parse_file

        data = parse_file(source_file)

        # Format the data for the category
        question_data = {}
        if "question" in data:
            question_data = data["question"]

        # Create and save the category
        CategoryCreator._create_and_save_category(
            name=name,
            preview_desc=description,
            preview_img=img_name,
            question_type=QuestionType.TEXT,
            formatted_data=question_data,
            fuzzy_matching_threshold=fuzzy_matching_threshold,
        )

    @staticmethod
    def create_from_dict(
        name: str,
        description: str,
        data: Dict[str, List[str]],
        question_type: QuestionType = QuestionType.TEXT,
        img_name: str = "game_icon.png",
        fuzzy_matching_threshold: float = 0.7,
    ) -> None:
        """
        Create a category directly from a dictionary of question-answer pairs.

        Args:
            name: The name of the category
            description: A brief description of the category
            data: Dictionary mapping questions to lists of acceptable answers
            question_type: The type of questions (TEXT or IMG)
            img_name: The name of the preview image
            fuzzy_matching_threshold: Threshold for fuzzy matching (0.0-1.0)
        """
        CategoryCreator._create_and_save_category(
            name=name,
            preview_desc=description,
            preview_img=img_name,
            question_type=question_type,
            formatted_data=data,
            fuzzy_matching_threshold=fuzzy_matching_threshold,
        )

    @staticmethod
    def create_from_json_file(
        source_file: str,
        name: str,
        description: str,
        data_path: str = "",
        question_field: str = "",
        answer_field: str = "",
        question_type: QuestionType = QuestionType.TEXT,
        img_name: str = "game_icon.png",
        fuzzy_matching_threshold: float = 0.7,
    ) -> None:
        """
        Create a category from a JSON file source.

        Args:
            source_file: The path to the JSON file (relative to resources/static/)
            name: The name of the category
            description: A brief description of the category
            data_path: The JSON path to the data array (e.g., 'items' or 'questions')
            question_field: The field name for questions in each item
            answer_field: The field name for answers in each item
            question_type: The type of questions (TEXT or IMG)
            img_name: The name of the preview image
            fuzzy_matching_threshold: Threshold for fuzzy matching (0.0-1.0)
        """
        # Parse the JSON file
        from backend.src.utils.parse_file import parse_file

        data = parse_file(source_file)

        # Process the JSON data
        formatted_data = {}

        # If data_path is provided, navigate to that path
        items = data
        if data_path:
            for key in data_path.split("."):
                if key in items:
                    items = items[key]
                else:
                    items = []
                    break

        # If we have a list of items with question and answer fields
        if isinstance(items, list) and question_field and answer_field:
            for item in items:
                if question_field in item and answer_field in item:
                    question = item[question_field]
                    answer = item[answer_field]

                    if isinstance(answer, list):
                        formatted_data[question] = answer
                    else:
                        formatted_data[question] = [answer]
        else:
            # If the JSON is already in the expected format
            formatted_data = data

        # Create and save the category
        CategoryCreator._create_and_save_category(
            name=name,
            preview_desc=description,
            preview_img=img_name,
            question_type=question_type,
            formatted_data=formatted_data,
            fuzzy_matching_threshold=fuzzy_matching_threshold,
        )

    @staticmethod
    def _create_and_save_category(
        name: str,
        preview_desc: str,
        preview_img: str,
        question_type: QuestionType,
        formatted_data: Dict[str, List[str]],
        fuzzy_matching_threshold: float,
    ) -> None:
        """
        Create a CategoryDataDTO and save it to a file.

        Args:
            name: The name of the category
            preview_desc: A brief description of the category
            preview_img: The name of the preview image
            question_type: The type of questions (TEXT or IMG)
            formatted_data: Dictionary mapping questions to lists of acceptable answers
            fuzzy_matching_threshold: Threshold for fuzzy matching (0.0-1.0)
        """
        # Create the CategoryDataDTO
        category = CategoryDataDTO(
            name=name,
            preview_img=preview_img,
            preview_desc=preview_desc,
            type=question_type,
            fuzzy_matching_threshold=fuzzy_matching_threshold,
            questions=[
                TriviaQuestionDTO(question=q, answers=a, aliases=generate_aliases(a))
                for q, a in formatted_data.items()
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
