from pathlib import Path


def parse_file(filename):
    """
    Parse a file and return a dictionary of the parsed data.

    :param filename: The file to be parsed.
    :return: # TODO
    """
    file_path = Path(
        f"src/resources/static/{filename}"
    )  # TODO: remove the string literal and replace with constant
    if not file_path.exists():
        err_msg = f"File path: {file_path} does not exist"
        raise FileNotFoundError(err_msg)
    with open(file_path, "r") as file:
        print(file)
        pass  # TODO
