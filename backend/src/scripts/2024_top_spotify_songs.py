from typing import Dict, List
from typing import Optional

from backend.src.models.category_data_dto import QuestionType
from backend.src.models.model import Model
from backend.src.utils.category import Category
from backend.src.utils.definitions import PreviewImageType
from backend.src.utils.download_kaggle_dataset import fetch_kaggle_dataset


class SpotifyTrackDTO(Model):
    """
    Simplified Data Transfer Object for Spotify track information.
    Only includes song title, artist, and album.

    Attributes:
        track_name (str): The name of the track
        artist_name (str): The name of the artist(s)
        album_name (Optional[str]): The name of the album (optional)
    """

    track_name: str
    artist_name: str
    album_name: Optional[str] = None


class SpotifyDTO(Model):
    """
    Data Transfer Object for Spotify dataset.

    Attributes:
        tracks (List[SpotifyTrackDTO]): A list of track information
    """

    tracks: List[SpotifyTrackDTO] = []


class SpotifyHits(Category[SpotifyDTO]):
    def __init__(self):
        super().__init__(
            source="spotify_hits.json",
            model=SpotifyDTO,
            question_type=QuestionType.TEXT,
            name="Top Spotify Hits",
            img_name=PreviewImageType.ENTERTAINMENT,
            desc="Test your knowledge of the most streamed songs on Spotify!",
            fuzzy_matching_threshold=0.4,
        )

    def _load_data(self, model):
        """
        Override the default _load_data method to use kaggle_fetcher
        """
        # Fetch Spotify dataset using the kaggle_fetcher
        df = fetch_kaggle_dataset(
            "nelgiriyewithana/most-streamed-spotify-songs-2024", 100
        )

        if df is None:
            # Return empty model if fetch fails
            return SpotifyDTO()

        tracks = []
        track_col = "Track"
        artist_col = "Artist"
        album_col = "Album Name"

        if track_col not in df.columns or artist_col not in df.columns:
            print(
                f"Warning: Required columns not found. Available columns: "
                f"{df.columns.tolist()}"
            )
            return SpotifyDTO()

        for _, row in df.iterrows():
            # Extract only the columns we need
            track_data = {"track_name": row[track_col], "artist_name": row[artist_col]}

            # Add album if available
            if album_col in df.columns:
                track_data["album_name"] = row[album_col]

            # Create SpotifyTrackDTO
            track = SpotifyTrackDTO.model_validate(track_data)
            tracks.append(track)

        # Return SpotifyDTO with tracks
        return SpotifyDTO(tracks=tracks)

    def _format_data(self) -> Dict[str, List[str]]:
        """
        Format the tracks data into questions and answers with improved formatting
        that excludes features and non-UTF-8 characters
        """
        category_data = {}

        for track in self._raw_data.tracks:
            if _exclude_songs(track):
                continue

            question = f'Who is the artist of the song "{track.track_name}"?'
            category_data[question] = [track.artist_name]

            clean_track_name = _remove_features(track.track_name)
            song_words = clean_track_name.split()
            if len(song_words) > 1:
                hint = song_words[0]
                hint_question = (
                    f"Which famous hit is performed by {track.artist_name} "
                    f"- {hint} ___?"
                )
                category_data[hint_question] = [clean_track_name]
            else:
                reverse_question = (
                    f"Which famous hit is performed by {track.artist_name}?"
                )
                category_data[reverse_question] = [clean_track_name]

                album_question = (
                    f'Which album contains the song "{clean_track_name}" '
                    f"by {track.artist_name}?"
                )
                category_data[album_question] = [_remove_features(track.album_name)]

        return category_data


def _remove_features(track_name):
    """
    Extract the base part of the song title, stopping at any feature or separator.
    Returns the clean base name of the song.
    """
    # Find the first occurrence of common separators
    separators = [" (feat.", " (ft", " (with", " feat.", " ft.", " -", " –", " —"]

    result = track_name
    min_pos = len(track_name)

    # Find the earliest separator
    for sep in separators:
        pos = track_name.lower().find(sep)
        if 0 < pos < min_pos:
            min_pos = pos
            result = track_name[:pos]

    result = result.strip()

    return result


def _exclude_songs(track: SpotifyTrackDTO) -> bool:
    """
    Checks if the track should be excluded based on blacklisted terms.
    Returns True if the track should be skipped.
    """
    skip_terms = ["cupid", "carnival"]

    track_name_lower = track.track_name.lower() if track.track_name else ""
    artist_name_lower = track.artist_name.lower() if track.artist_name else ""
    album_name_lower = track.album_name.lower() if track.album_name else ""

    for term in skip_terms:
        if (
            term in track_name_lower
            or term in artist_name_lower
            or (track.album_name and term in album_name_lower)
        ):
            return True

    for field in [track.track_name, track.artist_name, track.album_name]:
        if field and any(ord(c) > 127 for c in field):
            return True

    return False
