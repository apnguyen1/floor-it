from typing import List

from pydantic import Field

from backend.src.models.model import Model


# Example:
# {
#     "Questions": [
#         {
#             "Name": "Champion",
#             "logoSrc": "https://raw.githubusercontent.com/fuzzysb/Logo-Quiz-Logos/master/Logos/Champion.png",
#             "logoAnswerSrc": "https://raw.githubusercontent.com/fuzzysb/Logo-Quiz-Logos/master/Answers/Champion.png",
#             "Answers": ["Champion", "Champyon", "Champion Sport", "Champion Clothing"]
#         },
#         {
#             "Name": "Sony",
#             "logoSrc": "https://raw.githubusercontent.com/fuzzysb/Logo-Quiz-Logos/master/Logos/Sony.png",
#             "logoAnswerSrc": "https://raw.githubusercontent.com/fuzzysb/Logo-Quiz-Logos/master/Answers/Sony.png",
#             "Answers": [
#                 "Sony",
#                 "Sony Entertainment",
#                 "Sony Ericsson",
#                 "Sow Knee",
#                 "Sue Nee"
#             ]
#         }
#     ]
# }


class BrandDTO(Model):
    """
    Represents a single brand quiz question, containing information about
    the brand's name, logo images, and possible answers.

    Attributes:
        name (str): The name of the brand. Extracted from the JSON key "Name".
        partial (str): The URL of the brand's logo image. Extracted from the JSON key "logoSrc".
        full (str): The URL of the answer image (brand logo with name). Extracted from the JSON key "logoAnswerSrc".
        answers (List[str]): A list of possible answers for the brand. Extracted from the JSON key "Answers".
    """

    name: str = Field(alias="Name")
    partial: str = Field(alias="logoSrc")
    full: str = Field(alias="logoAnswerSrc")
    answers: List[str] = Field(alias="Answers")


class BrandIconsDTO(Model):
    """
    Represents a collection of brand quiz questions.

    Attributes:
        questions (List[BrandDTO]): A list of `BrandDTO` objects, each containing
        details about a brand quiz question. Extracted from the JSON key "Questions".
    """

    questions: List[BrandDTO] = Field(alias="Questions")
