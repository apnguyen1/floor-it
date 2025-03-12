import random
from typing import Dict, List, Optional

from backend.src.models.category_data_dto import QuestionType
from backend.src.models.model import Model
from backend.src.utils.category import Category
from backend.src.utils.definitions import PreviewImageType
from backend.src.utils.download_kaggle_dataset import fetch_kaggle_dataset


class TaylorSongDTO(Model):
    """
    Simplified Data Transfer Object for Taylor Swift song information.
    Only includes song title, with optional artist and album.

    Attributes:
        track_name (str): The name of the track
        artist_name (Optional[str]): The name of the artist(s)
        album_name (Optional[str]): The name of the album (optional)
    """

    track_name: str
    artist_name: Optional[str] = "Taylor Swift"
    album_name: Optional[str] = None


class TaylorSongsDTO(Model):
    """
    Data Transfer Object for Taylor Swift songs dataset.

    Attributes:
        tracks (List[TaylorSongDTO]): A list of track information
    """

    tracks: List[TaylorSongDTO] = []


class TaylorSongs(Category[TaylorSongsDTO]):
    def __init__(self):
        super().__init__(
            source="taylor_songs.json",
            model=TaylorSongsDTO,
            question_type=QuestionType.TEXT,
            name="Taylor Swift Songs",
            img_name=PreviewImageType.ENTERTAINMENT,
            desc="Are you a Swiftie? Complete these Taylor Swift song titles!",
        )

    def _load_data(self, model):
        """
        Override the default _load_data method to use kaggle_fetcher
        """
        # Fetch Taylor Swift dataset using the kaggle_fetcher
        df = fetch_kaggle_dataset(
            "joebeachcapital/taylor-swift-all-songs-and-albums", 100, 1
        )

        if df is None:
            # Return empty model if fetch fails
            return TaylorSongsDTO()

        tracks = []
        track_col = "track_name"

        if track_col not in df.columns:
            print(
                f"Warning: Required columns not found. Available columns: "
                f"{df.columns.tolist()}"
            )
            return TaylorSongsDTO()

        # Process each row in the dataframe
        for _, row in df.iterrows():
            if track_col in row and isinstance(row[track_col], str):
                # Extract the track name
                track_data = {"track_name": row[track_col]}

                # Add album if available
                if "album_name" in row:
                    track_data["album_name"] = row["album_name"]

                # Create the DTO
                track = TaylorSongDTO.model_validate(track_data)
                tracks.append(track)

        # Return DTO with tracks
        return TaylorSongsDTO(tracks=tracks)

    def _format_data(self) -> Dict[str, List[str]]:
        """
        Format the tracks data into questions and answers:
        - Remove parenthetical content
        - For songs with >2 words, blank out one word to create the question
        """
        category_data = {}

        for track in self._raw_data.tracks:
            # Skip if track doesn't have a name
            if not track.track_name or not isinstance(track.track_name, str):
                continue

            # Clean track name (remove parenthetical content)
            clean_track_name = clean_song_name(track.track_name)

            # Skip if track name is too short after cleaning
            if not clean_track_name or len(clean_track_name) < 3:
                continue

            # Split into words
            words = clean_track_name.split()

            # If we have multiple words, try to create a fill-in-the-blank question
            if len(words) > 2:
                # Create a question with a randomly blanked out word (if word length > 2)
                blanked_title, blanked_word = create_blanked_title(words)

                if blanked_title and blanked_word:
                    question = f'"{blanked_title}"'
                    category_data[question] = [blanked_word, clean_track_name]

        return category_data


def clean_song_name(track_name: str) -> str:
    """
    Cleans a song name by removing any text after parentheses.
    """
    # Find the position of the first parenthesis
    paren_pos = track_name.find("(")

    # If there's a parenthesis, truncate the string
    if paren_pos > 0:
        cleaned = track_name[:paren_pos].strip()
    else:
        cleaned = track_name.strip()

    return cleaned


def create_blanked_title(words: List[str]) -> tuple:
    """
    Creates a version of the title with one word blanked out.

    Args:
        words: List of words in the title

    Returns:
        tuple of (blanked_title, blanked_word)
    """
    # Find eligible words (length > 2)
    eligible_indices = [i for i, word in enumerate(words) if len(word) > 2]

    # If no eligible words, return empty
    if not eligible_indices:
        return None, None

    # Choose a random eligible word to blank out
    blank_index = random.choice(eligible_indices)
    blanked_word = words[blank_index]

    # Create a copy of the words list and replace the chosen word with blanks
    blanked_words = words.copy()
    blanked_words[blank_index] = "________"

    # Join the words back together
    blanked_title = " ".join(blanked_words)

    return blanked_title, blanked_word
