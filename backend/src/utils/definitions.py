from enum import Enum
from pathlib import Path

# Path to root directory
ROOT_DIR = Path(__file__).parent.parent.parent.parent

# Path to backend's resources to mainly fetch manual categories
RESOURCE_DIR = ROOT_DIR / "backend/src/resources"

# Path to the category processors
SCRIPTS_DIR = ROOT_DIR / "backend/src/scripts"

# Path to frontends public folder that's deployed to the content delivery network.
PUBLIC_DIR = ROOT_DIR / "frontend/public"


class PreviewImageType(str, Enum):
    """
    Class to hold all the possible preview image types.
    """

    DEFAULT = "default-preview.png"
    GAMES = "game_icon.png"
    NUMBERS = "numbers.png"
    SHOPPING = "shopping_bag.png"
    SPORTS = "sports.png"
