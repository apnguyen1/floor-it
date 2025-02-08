from abc import ABC
from typing import Generic, Type, TypeVar

from pydantic import BaseModel

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
        model (T): the DTO to format the data into
        raw_data (T): a mapping of questions to their list of answers

    Methods:
        to_map() -> dict[str, List[str]]: converts data to a map of
            questions to their list of answers.


    """

    def __init__(self, source: str, model: Type[T]):
        if not issubclass(model, BaseModel):
            raise TypeError(f"{model.__name__} must be of type BaseModel")

        self.source: str = source
        self.model: Type[T] = model
        self.raw_data: T = self._load_data()

    def _load_data(self) -> T:
        """
        Maps API raw_data or file raw_data to the specified DTO

        :return: An instance of the specified DTO
        """
        if self.source.startswith("http"):
            raw_data = fetch_url(self.source)
        else:
            raw_data = parse_file(self.source)

        return self.model.model_validate(raw_data)
