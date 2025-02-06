from pathlib import Path


def get_all_files(directory):
    file_dict = {}
    import os

    for root, dirs, files in os.walk(directory):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, directory)
            file_dict[Path(rel_path).stem] = rel_path

    return file_dict
