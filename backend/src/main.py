from backend.src.models.category_data_dto import QuestionType
from backend.src.scripts.lol_champions import Champions
from backend.src.utils.definitions import PUBLIC_DIR
import os
import json
from backend.src.models.category_preview_dto import (
    CategoryPreviewDTO,
    CategoryPreviewListDTO,
)


def main():
    create_category_data()
    create_category_preview_list()


def create_category_data():
    """
    Takes all the subclasses of Category and
    turns them into JSONs in public/category_data
    """
    Champions(QuestionType.TEXT).to_file()


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
