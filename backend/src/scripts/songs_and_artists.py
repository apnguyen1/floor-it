from typing import List

from backend.src.models.numbers_dto import NumbersDTO
from backend.src.utils.category import Category


class SongsAndArtists(Category[NumbersDTO]):
    def __init__(self):
        super().__init__(
            source="songs_and_artists.txt",
            model=NumbersDTO,
            name="Songs and Artists",
            desc="Guess the song and their artist!",
        )

    def _format_data(self) -> dict[str, List[str]]:
        return self._raw_data.question
