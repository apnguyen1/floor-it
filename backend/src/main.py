import importlib
import inspect
import json
import os
import pkgutil
from typing import List

from backend.src.models.category_data_dto import QuestionType
from backend.src.models.category_preview_dto import (
    CategoryPreviewDTO,
    CategoryPreviewListDTO,
)
from backend.src.utils.category import Category
from backend.src.utils.category_creator import CategoryCreator
from backend.src.utils.definitions import PUBLIC_DIR, SCRIPTS_DIR


def main():
    create_category_data()
    create_category_preview_list()


def create_category_data():
    """
    Takes all the subclasses of Category and
    turns them into JSONs in public/category_data

    Also creates categories using the CategoryCreator
    """
    # First, use the original method to process Category subclasses
    process_category_subclasses()

    # Then, create categories using CategoryCreator
    create_categories_with_creator()


def process_category_subclasses():
    """Process all subclasses of Category and turn them into JSONs"""
    # Import all the files under scripts,
    # since we need those to be imported to be recognized as subclasses
    for _, module_name, _ in pkgutil.iter_modules([SCRIPTS_DIR]):
        importlib.import_module(f"backend.src.scripts.{module_name}")

    # Dynamically instantiate subclasses
    categories: List[Category] = []

    for subclass in Category.__subclasses__():
        # Get the constructor parameters for the subclass
        init_params = inspect.signature(subclass.__init__).parameters
        # Check if 'question_type' is in the constructor parameters (excluding 'self')
        if "question_type" in init_params:
            # If it has 'question_type' in constructor, instantiate with both types
            categories.append(subclass(question_type=QuestionType.TEXT))
            categories.append(subclass(question_type=QuestionType.IMG))
        else:
            # If not, just instantiate without parameters
            categories.append(subclass())

    # Call to_file() on all instances
    for category in categories:
        category.to_file()


def create_categories_with_creator():
    """Create categories using the CategoryCreator"""
    # Create Numbers category
    CategoryCreator.create_from_text_file(
        source_file="numbers.txt",
        name="Numbers",
        description="Test your number recognition skills!",
        img_name="game_icon.png",
        fuzzy_matching_threshold=0.9,
    )

    # Create BJJ category
    CategoryCreator.create_from_text_file(
        source_file="bjj.txt",
        name="Brazilian Jiu-Jitsu",
        description="Test your knowledge of Brazilian Jiu-Jitsu!",
        img_name="martial_arts.png",
        fuzzy_matching_threshold=0.7,
    )

    # Create Brand Icons category
    CategoryCreator.create_from_json_file(
        source_file="brand-icons.json",
        name="Brand Logos",
        description="Guess the brand by their logo!",
        data_path="Questions",
        question_field="logoSrc",
        answer_field="Answers",
        question_type=QuestionType.IMG,
        fuzzy_matching_threshold=0.4,
        img_name="shopping_bag.png",
    )


def create_category_preview_list():
    """
    Scans all the category data in public/category_data
    """

    combined_data = []
    directory = PUBLIC_DIR / "category_data"
    output_path = os.path.join(PUBLIC_DIR, "category_preview_list.json")

    # Loop through all files in the directory
    for filename in os.listdir(directory):
        if filename.endswith(".json"):  # Process only JSON files
            file_path = os.path.join(directory, filename)

            with open(file_path, "r", encoding="utf-8") as file:
                try:
                    data = json.load(file)
                    category_preview = CategoryPreviewDTO(
                        name=data["name"],
                        image=data["preview_img"],
                        desc=data["preview_desc"],
                    )
                    combined_data.append(category_preview)
                except json.JSONDecodeError as e:
                    print(f"Error reading {filename}: {e}")

        # Write combined data to output JSON
        category_preview_list = CategoryPreviewListDTO(category_previews=combined_data)
        # TODO: reformat code to reduce redundancy
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(category_preview_list.model_dump_json(indent=2))


if __name__ == "__main__":
    main()
