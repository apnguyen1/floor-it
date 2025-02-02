import json
import os


def save_json_to_file(
    data: dict, filename: str, output_dir: str = "resources/outputs"
) -> str:
    """
    Saves a dictionary as a JSON file in the specified output directory.

    :param data: The dictionary data to save.
    :param filename: The name of the output JSON file.
    :param output_dir: The directory where the file will be saved (default: 'resources').
    :return: The full path of the saved file.
    """
    os.makedirs(output_dir, exist_ok=True)

    file_path = os.path.join(output_dir, filename)

    # Write the data to the JSON file
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return file_path
