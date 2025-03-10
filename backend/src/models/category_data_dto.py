from enum import Enum
from typing import List

from backend.src.models.model import Model


class QuestionType(Enum):
    """
    Possible question types for trivia questions in a CategoryDataDTO
    Currently IMG for image urls and TEXT for plain text
    """

    IMG = "img"
    TEXT = "text"


class TriviaQuestionDTO(Model):
    """
    Represents a single trivia question
    question (str): Either an image url or text representing the question
    answers (List[str]): A list of acceptable answers
    aliases (List[str]): Optional parameter, list of phonetically similar answers
    algorithmically generated that should also be accepted, used because
    speech-to-text APIs will often misinterpret

    Example JSON output:
    {
        question: "https://static.wikia.nocookie.net/leagueoflegends/images/
            3/33/Ahri_OriginalSkin.jpg/revision/latest?cb=20240906174647"
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
    aliases: List[str] = []


class CategoryDataDTO(Model):
    """
    Represents a specific category with the category name, type, and a list of trivia
    questions
    Designed to be serialized into a JSON and served via CDN, through the endpoint /{
    CategoryDataDTO.name}
    name (str): The name of the trivia category
    preview_img (str): A url to the image associated with the category preview,
      used for the CategoryPreviewDTO
    preview_desc (str): A brief description of the category the user can
      see when hovering, used for the CategoryPreviewDTO
    type (QuestionType): QuestionType.IMG (serializes to "img") if the questions are
    image urls,
        QuestionType.TEXT (serializes to "text") if the questions are straight text
    fuzzy_matching_threshold (float): Fuzzy matching threshold to use,
      ranges from 0 (will match anything) to 1 (needs an exact match)
    questions (List[TriviaQuestion]): The list of trivia questions,
        all of which use either image urls or text, specified above

    Example JSON output:
    {
        name: "LoL Champions"
        preview_img: "Lol_Champions_preview.png"
        preview_desc: "Guess the name of a League of Legends champion from the
                provided picture!"
        type: "img"
        questions: [
            {
                question: "https://static.wikia.nocookie.net/leagueoflegends/images/
                    3/33/Ahri_OriginalSkin.jpg/revision/latest?cb=20240906174647"
                answers: ["ahri", "the weird fox lady from league with way too many
                skins"]
                aliases: ["ari", "aw ree"]
            }
        ]
    }
    """

    name: str
    preview_img: str
    preview_desc: str
    type: QuestionType
    fuzzy_matching_threshold: float
    questions: List[TriviaQuestionDTO] = []
