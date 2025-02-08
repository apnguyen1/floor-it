from unittest.mock import patch

import pytest

from src.models.brand_icon_dto import BrandDTO, BrandIconsDTO
from src.scripts.brand_icons import BrandIcons


@pytest.fixture
def mock_brand_icons_data():
    return BrandIconsDTO(
        questions=[
            BrandDTO(
                name="Champion",
                partial="https://raw.githubusercontent.com/fuzzysb/Logo-Quiz-Logos/master/Logos/Champion.png",
                full="https://raw.githubusercontent.com/fuzzysb/Logo-Quiz-Logos/master/Answers/Champion.png",
                answers=["Champion", "Champyon", "Champion Sport", "Champion Clothing"],
            ),
            BrandDTO(
                name="Sony",
                partial="https://raw.githubusercontent.com/fuzzysb/Logo-Quiz-Logos/master/Logos/Sony.png",
                full="https://raw.githubusercontent.com/fuzzysb/Logo-Quiz-Logos/master/Answers/Sony.png",
                answers=[
                    "Sony",
                    "Sony Entertainment",
                    "Sony Ericsson",
                    "Sow Knee",
                    "Sue Nee",
                ],
            ),
        ]
    )


@patch.object(BrandIcons, attribute="_load_data")
def test_brand_json(mock_load, mock_brand_icons_data):
    mock_load.return_value = mock_brand_icons_data

    brand_icons = BrandIcons("mock_file.json")
    result = brand_icons.brand_logo_to_name()

    expected_output = {
        "https://raw.githubusercontent.com/fuzzysb/Logo-Quiz-Logos/master/Logos/Champion.png": [
            "Champion",
            "Champyon",
            "Champion Sport",
            "Champion Clothing",
        ],
        "https://raw.githubusercontent.com/fuzzysb/Logo-Quiz-Logos/master/Logos/Sony.png": [
            "Sony",
            "Sony Entertainment",
            "Sony Ericsson",
            "Sow Knee",
            "Sue Nee",
        ],
    }

    assert result == expected_output


@patch.object(BrandIcons, attribute="_load_data")
def test_brand_logo_to_name_empty(mock_load):
    mock_load.return_value = BrandIconsDTO(questions=[])

    brand_icons = BrandIcons("mock_file.json")
    result = brand_icons.brand_logo_to_name()

    assert result == {}


@patch.object(BrandIcons, attribute="_load_data")
def test_brand_logo_to_name_invalid_data(mock_load):
    mock_load.return_value = {"invalid": "json"}

    with pytest.raises(AttributeError):
        brand_icons = BrandIcons("mock_file.json")
        brand_icons.brand_logo_to_name()
