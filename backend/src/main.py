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
from backend.src.utils.definitions import PUBLIC_DIR, SCRIPTS_DIR


def main():
    create_category_data()
    create_category_preview_list()


def create_category_data():
    """
    Takes all the subclasses of Category and
    turns them into JSONs in public/category_data
    """

    # Import all the files under scripts,
    # since we need those to be imported to be recognized as subclasses
    for _, module_name, _ in pkgutil.iter_modules([SCRIPTS_DIR]):
        importlib.import_module(f"backend.src.scripts.{module_name}")

    # Dynamically instantiate subclasses
    categories: List[Category] = []

    # Get all subclasses of Category (both direct and indirect)
    all_subclasses = get_all_subclasses(Category)

    for subclass in all_subclasses:
        try:
            # Skip abstract base classes like TextCategory
            if subclass.__name__ == "TextCategory":
                continue

            # Get the constructor parameters for the subclass
            init_params = inspect.signature(subclass.__init__).parameters

            # Check if 'question_type' is a required parameter (doesn't have a
            # default value)
            if (
                "question_type" in init_params
                and init_params["question_type"].default == inspect.Parameter.empty
            ):
                # Required question_type parameter - instantiate with both types
                categories.append(subclass(question_type=QuestionType.TEXT))
                categories.append(subclass(question_type=QuestionType.IMG))
            else:
                # Either no question_type parameter or it has a default value
                categories.append(subclass())
        except Exception as e:
            print(f"Error instantiating {subclass.__name__}: {e}")

    # Call to_file() on all instances
    for category in categories:
        try:
            category.to_file()
        except Exception as e:
            print(f"Error generating file for {category.name}: {e}")


def get_all_subclasses(cls):
    """
    Get all subclasses of a class, including subclasses of subclasses.

    Args:
        cls: The base class

    Returns:
        A list of all subclasses
    """
    all_subclasses = []

    for subclass in cls.__subclasses__():
        all_subclasses.append(subclass)
        all_subclasses.extend(get_all_subclasses(subclass))

    return all_subclasses


def create_category_preview_list():
    """
    Scans all the category data in public/category_data
    """
    combined_data = []
    directory = PUBLIC_DIR / "category_data"
    output_path = os.path.join(PUBLIC_DIR, "category_preview_list.json")

    # Ensure the directory exists
    os.makedirs(directory, exist_ok=True)

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
                except KeyError as e:
                    print(f"Missing required key in {filename}: {e}")

    # Write combined data to output JSON if any exist
    if combined_data:
        category_preview_list = CategoryPreviewListDTO(category_previews=combined_data)
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(category_preview_list.model_dump_json(indent=2))
        print(f"Generated preview list with {len(combined_data)} categories")
    else:
        print("Warning: No category data found to generate preview list")


if __name__ == "__main__":
    main()
