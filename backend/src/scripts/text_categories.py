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
            img_name=PreviewImageType.NUMBERS,
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
            desc="Guess the antonyms of the word!",
            img_name=PreviewImageType.WORDS,
            fuzzy_matching_threshold=0.9,
        )


class FoodDrink(TextCategory):
    """
    Food and Drink category with questions about food and drinks.
    """

    def __init__(self):
        super().__init__(
            source="food_drink.txt",
            name="Food and Drinks",
            desc="Calling all Foodies!",
            img_name=PreviewImageType.FOOD,
        )


class MoviesAndTvShows(TextCategory):
    """
    Movies and tv shows category with popular movies and tv shows questions.
    """

    def __init__(self):
        super().__init__(
            source="moviesTVshows.txt",
            name="Movies and TV Shows",
            desc="Are you a Movies and/or TV show expert?",
            img_name=PreviewImageType.ENTERTAINMENT,
            fuzzy_matching_threshold=0.7,
        )


class Multiplication(TextCategory):
    """
    Test your multiplication skills.
    """

    def __init__(self):
        super().__init__(
            source="multiplication.txt",
            name="Multiplication",
            desc="Test your multiplication skills!",
            img_name=PreviewImageType.NUMBERS,
            fuzzy_matching_threshold=0.9,
        )


class CSE403Midterm(TextCategory):
    """
    Practice Exam for CSE 403 finals questions.
    """

    def __init__(self):
        super().__init__(
            source="cse403_finals.txt",
            name="CSE 403 2025 finals",
            desc="Practice for the CSE 403 finals",
            img_name=PreviewImageType.EDUCATION,
            fuzzy_matching_threshold=0.5,
        )


class CarBrands(TextCategory):
    """
    Match the car model to make.
    """

    def __init__(self):
        super().__init__(
            source="car_model_to_brand.txt",
            name="Car Models",
            desc="Match the car models to their make!",
            img_name=PreviewImageType.CAR,
            fuzzy_matching_threshold=0.5,
        )
