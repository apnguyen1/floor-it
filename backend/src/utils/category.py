from abc import ABC, abstractmethod
from typing import Generic, Type, TypeVar, List

from pydantic import BaseModel

from backend.src.models.category_data_dto import CategoryDataDTO
from backend.src.utils.fetch import fetch_url
from backend.src.utils.parse_file import parse_file

# ensures type T is derived from BaseModel
T = TypeVar("T", bound=BaseModel)


class Category(ABC, Generic[T]):
    """
    An abstract base class for representing a trivia category.

    This class serves as the foundation for all other categories, ensuring that
    data is consistently loaded and formatted into a structured model. The `data`
    field should always be a dictionary where:

    - Keys represent questions (str).
    - Values are lists of possible answers (List[str]).

    Subclasses should define their own data parsing logic if necessary, but all
    category data must conform to the given model type (`BaseModel` subclass).

    Attributes:
        source (str): the data to be fetched or processed
        preview_img: the preview image of the category
        desc: the description of the category
        _raw_data (T): json data unprocessed.
        _formatted_data (dict[str, List[str]]): a mapping of questions to their list
        of answers

    Methods:
        to_category() -> CategoryDataDTO: converts formatted_data to CategoryDataDTO.
        to_file() -> str: converts formatted_data to a JSON file ready to be fetched

    Example:
        class Champions(Category[ChampionDTO]):
            def __init__(self, question_type: QuestionType):
                super().__init__(
                    source="https://api.example.com/champions",
                    model=ChampionDTO,
                    preview_img="champions.png",
                    desc="Test your League champion knowledge!"
                )
                self.question_type = question_type
    """

    def __init__(self, source: str, model: Type[T], img: str = None, desc: str = None):
        if not issubclass(model, BaseModel):
            raise TypeError(f"{model.__name__} must be of type BaseModel")

        self.source: str = source
        self.preview_img: str = img
        self.desc: str = desc
        self._raw_data: T = self._load_data(model)
        self._formatted_data: dict[str, List[str]] = self._format_data()

    def _load_data(self, model: Type[T]) -> T:
        """
        Maps API raw_data or file raw_data to the specified DTO

        :model: the DTO to format the data into
        :return: An instance of the specified DTO
        """
        try:
            raw_data = (
                fetch_url(self.source)
                if self.source.startswith("http")
                else parse_file(self.source)
            )
            return model.model_validate(raw_data)
        except Exception as e:
            raise ValueError(f"Failed to load data from {self.source}: {e}")

    @property
    def formatted_data(self) -> dict[str, List[str]]:
        """
        Provides read-only access to formatted data
        :return: a copy of the formatted data
        """
        return self._formatted_data

    @abstractmethod
    def _format_data(self) -> dict[str, List[str]]:
        """
        Formats the raw json data to a dictionary of the categories questions to
        their list of acceptable answers

        :return: A dictionary of the categories questions to their list of answers
        """
        pass

    # TODO - arman
    def to_category(self) -> CategoryDataDTO:
        """
        Converts the category data to a standardized DTO format.

        :return: CategoryDataDTO
        """
        pass

    # TODO - aidan
    def to_file(self, path: str) -> None:
        """
        Exports the formatted data to a JSON file in the public directory of the
        frontend.

        :param path: TODO
        :return: TODO
        """
        pass
