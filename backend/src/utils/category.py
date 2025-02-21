import json
import os
from abc import ABC, abstractmethod
from typing import Generic, Type, TypeVar, List

from pydantic import BaseModel

from backend.src.models.category_data_dto import (
    CategoryDataDTO,
    QuestionType,
    TriviaQuestionDTO,
)
from backend.src.utils.definitions import PUBLIC_DIR
from backend.src.utils.fetch import fetch_url
from backend.src.utils.generate_aliases import generate_aliases
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

    Protected:
        _raw_data (T): the unprocessed data in model format
        _formatted_data (dict[str, List[str]]): The processed Q&A pairs

    Private:
        __source (str): the data __source name or URL. Data sources are fetched from
                        backend/src/resources/static.
        __name (str): the category name
        __description (str): the category description
        __preview_img (str): the category preview image. These images will be stored
                             in frontend/public/previews

    Example:
        class Champions(Category[ChampionDTO]):
            def __init__(self, question_type: QuestionType):
                self.question_type = question_type
                super().__init__(
                    __source="https://api.example.com/champions",
                    model=ChampionDTO,
                    __preview_img="champions.png",
                    __desc="Test your League champion knowledge!"
                )
    """

    def __init__(
        self,
        source: str,
        model: Type[T],
        question_type: QuestionType = QuestionType.TEXT,
        name: str = "Category",
        img_name: str = "default-preview.png",
        desc: str = "Test your Trivia!",
    ):
        if not issubclass(model, BaseModel):
            raise TypeError(f"{model.__name__} must be of type BaseModel")

        # Private
        self.__source: str = source
        self.__name = name
        self.__preview_img: str = img_name
        self.__desc: str = desc
        self.__question_type: QuestionType = question_type

        # Protected
        self._raw_data: T = self._load_data(model)
        self._formatted_data: dict[str, List[str]] = self._format_data()

    @property
    def name(self) -> str:
        """Category name"""
        return self.__name

    @name.setter
    def name(self, name: str) -> None:
        """Set category name"""
        self.__name = name

    @property
    def description(self) -> str:
        """Category description"""
        return self.__desc

    @description.setter
    def description(self, desc: str) -> None:
        """Set category description"""
        self.__desc = desc

    @property
    def preview_img(self) -> str:
        return self.__preview_img

    @preview_img.setter
    def preview_img(self, img_name: str) -> None:
        self.__preview_img = img_name

    @property
    def question_type(self) -> str:
        return self.__question_type

    @question_type.setter
    def question_type(self, question_type: QuestionType) -> None:
        self.__question_type = question_type

    @property
    def formatted_data(self) -> dict[str, List[str]]:
        """
        Provides read-only access to formatted data
        :return: a copy of the formatted data
        """
        return self._formatted_data.copy()

    def _load_data(self, model: Type[T]) -> T:
        """
        Maps API raw_data or file raw_data to the specified DTO

        :model: the DTO to format the data into
        :return: An instance of the specified DTO
        """
        try:
            raw_data = (
                fetch_url(self.__source)
                if self.__source.startswith("http")
                else parse_file(self.__source)
            )
            return model.model_validate(raw_data)
        except Exception as e:
            raise ValueError(f"Failed to load data from {self.__source}: {e}")

    @abstractmethod
    def _format_data(self) -> dict[str, List[str]]:
        """
        Formats the raw json data to a dictionary of the categories questions to
        their list of acceptable answers

        :return: A dictionary of the categories questions to their list of answers
        """
        pass

    def to_category(self) -> CategoryDataDTO:
        """
        Converts the category data formatted to a standardized DTO format.

        :return: CategoryDataDTO
        """

        if not isinstance(self._formatted_data, dict):
            raise ValueError("formatted_data should be a dict")

        for q, a in self._formatted_data.items():
            if not isinstance(a, list):
                raise ValueError("answers should be a list of strings")

        return CategoryDataDTO(
            name=self.__name,
            preview_img=self.__preview_img,
            preview_desc=self.__desc,
            type=self.question_type,
            questions=[
                TriviaQuestionDTO(question=q, answers=a, aliases=generate_aliases(a))
                for q, a in self._formatted_data.items()
            ],
        )

    def to_file(self, path: str = None) -> None:
        """
        Exports the formatted data to a JSON file in the public directory of the
        frontend.

        :param path: The path to create the JSON file in
          (PUBLIC_DIR / "category_data" / <path>)
        If path is not given, will default to the category name
        """
        if path is None:
            path = self.__name
        # Make sure path is all lowercase no spaces
        path = path.lower().replace(" ", "_")
        # Make sure path ends with .json
        if not path.endswith(".json"):
            path += ".json"

        path = PUBLIC_DIR / "category_data" / path

        # Ensure the directory exists
        os.makedirs(os.path.dirname(path), exist_ok=True)

        # Get the formatted data
        data = self.to_category()

        # Write to JSON file
        with open(path, "w", encoding="utf-8") as f:
            raw_dump = data.model_dump_json()
            f.write(json.dumps(raw_dump, indent=2, ensure_ascii=False, sort_keys=True))
