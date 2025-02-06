import json
import os
from pathlib import Path

from src.utils.definitions import ROOT_DIR


def parse_file(filename) -> dict:
    """
    Parse a file and return a dictionary of the parsed data.

    :param filename: The file to be parsed.
    :return: # TODO
    """
    project_path = Path(f"src/resources/static/{filename}")
    file_path = Path(os.path.join(ROOT_DIR, project_path))

    if not file_path.exists():
        raise FileNotFoundError(f"File {filename} does not exist.")

    if file_path.suffix == ".json":
        with open(file_path, "r") as file:
            data = json.load(file)
    elif file_path.suffix == ".csv":
        pass  # TODO
    elif file_path.suffix == ".txt":
        pass  # TODO

    return data
