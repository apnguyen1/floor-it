from typing import List
from src.models.model import Model


class CategoryPreviewDTO(Model):
    """
    Represents a single category preview in a list of category previews to be serialized to JSON
    name (str): The name of the category preview
    image (str): A url to the image associated with the category preview
    desc (str): A brief description of the category the user can see when hovering over the image

    Example JSON output:
    {
        "name": "AKOperators"
        "image": "https://upload.wikimedia.org/wikipedia/en/a/aa/Arknights_icon.png"
        "desc": "Guess the name of an arknights operator from the provided picture!"
    }
    """

    name: str
    image: str
    desc: str


class CategoryPreviewListDTO(Model):
    """
    Represents the list of all categories available to play
    Designed to be serialized into a JSON and served via CDN, through the endpoint /categories
    allCategories (List[CategoryPreviewDTO]): A list containing all available categories

    Example JSON output:
    {
        "category_previews": [
            {
                "name": "AKOperators"
                "image": "https://upload.wikimedia.org/wikipedia/en/a/aa/Arknights_icon.png"
                "desc": "Guess the name of an arknights operator from the provided picture!"
            },
            {
                "name": "LoL Champions"
                "image": "https://static.wikia.nocookie.net/leagueoflegends/images/0/07/
                    League_of_Legends_icon.png/revision/latest/scale-to-width-down/64?cb=20191018194326"
                "desc": "Guess the name of a League of Legends champion from the provided picture!"
            }
        ]
    }
    """

    category_previews: List[CategoryPreviewDTO] = []
