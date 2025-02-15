from abc import ABC, abstractmethod
from typing import Generic, Type, TypeVar, List

from pydantic import BaseModel

from backend.src.models.category_data_dto import CategoryDataDTO
from backend.src.utils.definitions import PUBLIC_DIR
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
        name: str = "Category",
        img_name: str = "default-preview.png",
        desc: str = "Test your Trivia!",
    ):
        if not issubclass(model, BaseModel):
            raise TypeError(f"{model.__name__} must be of type BaseModel")

        # Private
        self.__source: str = source
        self.__name = name
        self.__preview_img: str = PUBLIC_DIR / "previews" / img_name
        self.__desc: str = desc

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
        self.__preview_img = PUBLIC_DIR / "previews" / img_name

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

    # TODO - arman
    def to_category(self) -> CategoryDataDTO:
        """
        Converts the category data to a standardized DTO format.

        :return: CategoryDataDTO
        """
        name=self.__name,
        description=self.__desc,
        preview_img=str(self.__preview_img),
        data={q: a for q, a in self._formatted_data.items()}

    # TODO - aidan
    def to_file(self, path: str) -> None:
        """
        Exports the formatted data to a JSON file in the public directory of the
        frontend.

        :param path: TODO
        :return: TODO
        """
        pass
