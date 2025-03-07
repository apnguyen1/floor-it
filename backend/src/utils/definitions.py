from enum import Enum
from pathlib import Path

ROOT_DIR = Path(__file__).parent.parent.parent.parent

RESOURCE_DIR = ROOT_DIR / "backend/src/resources"

SCRIPTS_DIR = ROOT_DIR / "backend/src/scripts"

PUBLIC_DIR = ROOT_DIR / "frontend/public"


class PreviewImageType(str, Enum):
    DEFAULT = "default-preview.png"
    GAMES = "games_icon.png"
    NUMBERS = "numbers.png"
    SHOPPING = "shopping_bag.png"
