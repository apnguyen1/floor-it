from typing import List, Literal, Optional
from src.models.model import Model

class CategoryDTO(Model):
    """
    Represents a single category in a list of categories to be serialized to JSON
    name (str): The name of the category
    image (str): A url to the image associated with the category
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

class CategoriesDTO(Model):
    """
    Represents the list of all categories available to play
    Designed to be serialized into a JSON and served via CDN, through the endpoint /categories
    allCategories (List[CategoryDTO]): A list containing all available categories

    Example JSON output:
    {
        "allCategories": [
            {
                "name": "AKOperators"
                "image": "https://upload.wikimedia.org/wikipedia/en/a/aa/Arknights_icon.png"
                "desc": "Guess the name of an arknights operator from the provided picture!"
            },
            {
                "name": "LoL Champions"
                "image": "https://static.wikia.nocookie.net/leagueoflegends/images/0/07/League_of_Legends_icon.png/revision/latest/scale-to-width-down/64?cb=20191018194326"
                "desc": "Guess the name of a League of Legends champion from the provided picture!"
            }
        ]
    }
    """
    allCategories: List[CategoryDTO] = []

class TriviaQuestion(Model):
    """
    Represents a single trivia question
    question (str): Either an image url or text representing the question
    answers (List[str]): A list of acceptable answers
    aliases (List[str]): Optional parameter, list of phonetically similar answers algorithmically generated
        that should also be accepted, used because speech-to-text APIs will often misinterpret 

    Example JSON output:
    {
        question: "https://static.wikia.nocookie.net/leagueoflegends/images/3/33/Ahri_OriginalSkin.jpg/revision/latest?cb=20240906174647"
        answers: ["ahri", "the weird fox lady from league with way too many skins"]
        aliases: ["ari", "aw ree"]
    }

    Another example output (no aliases included):
    {
        question: "What does "Jiu-Jitsu" mean in Japanese?"
        answers: ["Gentle"]
    }
    """
    question: str
    answers: List[str] = []
    aliases: Optional[List[str]] = None

class CategoryDataDTO(Model):
    """
    Represents a specific category with the category name, type, and a list of trivia questions
    Designed to be serialized into a JSON and served via CDN, through the endpoint /{CategoryDataDto.name}
    name (str): The name of the trivia category
    type (Literal["img", "text"]): "img" if the questions are image urls, "text" if the questions are straight text
    questions (List[TriviaQuestion]): The list of trivia questions, all of which use either image urls or text, specified above

    Example JSON output:
    {
        name: "LoL Champions"
        type: "img"
        questions: [
            {
                question: "https://static.wikia.nocookie.net/leagueoflegends/images/3/33/Ahri_OriginalSkin.jpg/revision/latest?cb=20240906174647"
                answers: ["ahri", "the weird fox lady from league with way too many skins"]
                aliases: ["ari", "aw ree"]
            } 
        ]
    }
    """
    name: str
    type: Literal["img", "text"]
    questions: List[TriviaQuestion]