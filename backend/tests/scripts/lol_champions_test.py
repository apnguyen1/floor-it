from unittest.mock import patch

import pytest

from backend.src.models.category_data_dto import QuestionType
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

    champions = Champions(QuestionType.TEXT)

    assert champions._raw_data.version == "15.2.1"
    assert "Aatrox" in champions._raw_data.data
    assert champions._raw_data.data["Aatrox"].title == "the Darkin Blade"
    assert champions._raw_data.data["Aatrox"].name == "Aatrox"

    mock_fetch.assert_called_once()


@pytest.mark.parametrize(
    "question_type,expected_output",
    [
        (
            QuestionType.TEXT,
            {
                "the Darkin Blade": ["Aatrox"],
                "Daughter of the Void": ["Kai Sa"],
            },
        ),
        (
            QuestionType.IMG,
            {
                "aatrox.png": ["Aatrox"],
                "kaisa.png": ["Kai Sa"],
            },
        ),
    ],
)
@patch.object(Category, attribute="_load_data")
def test_champion_formatting(mock_fetch, question_type, expected_output):
    mock_fetch.return_value = ChampionDTO(
        version=MOCK_CHAMPION_DATA["version"], data=MOCK_CHAMPION_DATA["raw_data"]
    )

    champions = Champions(question_type)
    assert champions.formatted_data == expected_output
