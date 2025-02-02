from src.scripts.champions import get_champions_data
from src.utils.outputter import save_json_to_file


def output_champion_data():
    champions = get_champions_data()

    save_json_to_file(champions, "champions.json")


if __name__ == "__main__":
    output_champion_data()
