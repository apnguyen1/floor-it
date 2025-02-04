from src.scripts.champions import fetch_champions_data
from src.utils.outputter import save_json_to_file


def output_champion_data():
    champions = fetch_champions_data()



    save_json_to_file(champions.model_dump(), "champions.json")


if __name__ == "__main__":
    print("Fetching and outputting data.")
    output_champion_data()
