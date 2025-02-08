from unittest.mock import patch

from backend.src.models.champion_dto import ChampionDTO
from backend.src.scripts.lol_champions import Champions
from backend.src.utils.category import Category

# Sample API Response
MOCK_CHAMPION_DATA = {
    "version": "15.2.1",
    "raw_data": {
        "Aatrox": {
            "title": "the Darkin Blade",
            "name": "Aatrox",
            "image": {"full": "aatrox.png"},
        },
        "Kai'Sa": {
            "title": "Daughter of the Void",
            "name": "Kai'Sa",
            "image": {"full": "kaisa.png"},
        },
    },
}


@patch.object(Category, attribute="_load_data")
def test_champions_fetch(mock_fetch):
    mock_fetch.return_value = ChampionDTO(
        version=MOCK_CHAMPION_DATA["version"], data=MOCK_CHAMPION_DATA["raw_data"]
    )

    champions = Champions("https://www.example.com")

    assert champions.raw_data.version == "15.2.1"
    assert "Aatrox" in champions.raw_data.data
    assert champions.raw_data.data["Aatrox"].title == "the Darkin Blade"
    assert champions.raw_data.data["Aatrox"].name == "Aatrox"

    mock_fetch.assert_called_once()


@patch.object(Category, attribute="_load_data")
def test_title_to_name(mock_fetch):
    mock_fetch.return_value = ChampionDTO(
        version=MOCK_CHAMPION_DATA["version"], data=MOCK_CHAMPION_DATA["raw_data"]
    )
    champions = Champions("https://www.example.com")
    title_name_map = champions.title_to_name()

    expected_output = {"the Darkin Blade": "Aatrox", "Daughter of the Void": "Kai Sa"}

    assert title_name_map == expected_output


@patch.object(Category, attribute="_load_data")
def test_image_to_name(mock_fetch):
    mock_fetch.return_value = ChampionDTO(
        version=MOCK_CHAMPION_DATA["version"], data=MOCK_CHAMPION_DATA["raw_data"]
    )

    champions = Champions("https://www.example.com")
    image_name_map = champions.image_to_name()

    expected_output = {
        "aatrox.png": "Aatrox",
        "kaisa.png": "Kai Sa",
    }

    assert image_name_map == expected_output
