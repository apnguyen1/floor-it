from backend.src.utils.definitions import PreviewImageType
from backend.src.utils.text_category import TextCategory


class BJJ(TextCategory):
    """
    Brazilian Jiu-Jitsu category with questions about techniques,
                                                    terminology, and history.
    """

    def __init__(self):
        super().__init__(
            source="bjj.txt",
            name="Brazilian Jiu-Jitsu",
            desc="Test your knowledge of Brazilian Jiu-Jitsu!",
            img_name=PreviewImageType.SPORTS,
            fuzzy_matching_threshold=0.7,
        )


class Numbers(TextCategory):
    """
    Numbers category with simple number recognition questions.
    """

    def __init__(self):
        super().__init__(
            source="numbers.txt",
            name="Numbers",
            desc="Test your number skills!",
            img_name=PreviewImageType.GAMES,
            fuzzy_matching_threshold=0.9,
        )


class Antonyms(TextCategory):
    """
    Antonyms category with simple antonyms questions.
    """

    def __init__(self):
        super().__init__(
            source="antonyms.txt",
            name="Antonyms",
            desc="Find the antonym of the words",
        )
