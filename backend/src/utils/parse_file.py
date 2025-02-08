import json
from pathlib import Path

from backend.src.utils.definitions import RESOURCE_DIR


def parse_file(filename) -> dict:
    """
    Parse a file and return a dictionary of the parsed data.

    :param filename: The file to be parsed.
    :return: # TODO
    """
    static_resources = RESOURCE_DIR / "static"
    file_path = Path(static_resources / filename)

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
