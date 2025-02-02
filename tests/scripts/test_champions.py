from unittest.mock import patch
import json

import pytest
from src.scripts.champions import ChampionsDTO, ChampionImageDTO, get_champions_data


@pytest.fixture
def sample_champion_json():
    return {
        "version": "15.2.1",
        "data": {
            "Aatrox": {
                "id": "Aatrox",
                "title": "the Darkin Blade",
                "image": {"full": "Aatrox.png", "sprite": "champion0.png"},
            }
        },
    }


def test_champions_dto_parsing(sample_champion_json):
    champions_dto = ChampionsDTO.from_dict(sample_champion_json)

    assert champions_dto.version == "15.2.1"
    assert "Aatrox" in champions_dto.data
    assert champions_dto.data["Aatrox"].name == "Aatrox"
    assert champions_dto.data["Aatrox"].title == "the Darkin Blade"


def test_champion_image_dto():
    image_data = {"full": "Aatrox.png", "sprite": "champion0.png"}
    image_dto = ChampionImageDTO(**image_data)

    assert image_dto.full == "Aatrox.png"
    assert image_dto.sprite == "champion0.png"


def test_missing_fields():
    incomplete_data = {"version": "15.2.1", "data": {"Aatrox": {"id": "Aatrox"}}}

    champions_dto = ChampionsDTO.from_dict(incomplete_data)

    assert champions_dto.version == "15.2.1"
    assert champions_dto.data["Aatrox"].name == "Aatrox"
    assert champions_dto.data["Aatrox"].title == ""
    assert champions_dto.data["Aatrox"].image.full == ""
    assert champions_dto.data["Aatrox"].image.sprite == ""


@patch("requests.get")
def test_get_champions_data_success(mock_get):
    mock_response = {
        "version": "15.2.1",
        "data": {
            "Aatrox": {
                "id": "Aatrox",
                "title": "the Darkin Blade",
                "image": {"full": "Aatrox.png", "sprite": "champion0.png"},
            }
        },
    }

    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = mock_response

    result_json = get_champions_data()

    assert result_json["version"] == "15.2.1"
    assert "Aatrox" in result_json["data"]
    assert result_json["data"]["Aatrox"]["name"] == "Aatrox"
    assert result_json["data"]["Aatrox"]["title"] == "the Darkin Blade"
    assert result_json["data"]["Aatrox"]["image"]["full"] == "Aatrox.png"
    assert result_json["data"]["Aatrox"]["image"]["sprite"] == "champion0.png"


@patch("requests.get", side_effect=Exception("Network error"))
def test_get_champions_data_failure(mock_get):
    with pytest.raises(Exception, match="Network error"):
        get_champions_data()
