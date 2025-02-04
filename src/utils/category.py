from abc import ABC
from typing import Generic, Type, TypeVar

from pydantic import BaseModel

from src.utils.fetch import fetch_url
from src.utils.parse_file import parse_file

# ensures type T is derived from BaseModel
T = TypeVar("T", bound=BaseModel)


class Category(ABC, Generic[T]):
    def __init__(self, source: str, model: Type[T]):
        if not issubclass(model, BaseModel):
            raise TypeError(f"{model.__name__} must be of type BaseModel")

        self.source: str = source
        self.model: Type[T] = model
        self.data: T = self._load_data()

    def _load_data(self) -> T:
        """
        Maps API data or file data to the specified DTO

        :return: An instance of the specified DTO
        """
        if self.source.startswith("http"):
            raw_data = fetch_url(self.source)
        else:
            raw_data = parse_file(self.source)

        return self.model.model_validate(raw_data)
