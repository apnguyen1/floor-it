import pytest


@pytest.fixture
def sample_lol_champion_json():
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
