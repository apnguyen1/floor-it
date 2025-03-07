# backend/src/scripts/generate_categories.py
from backend.src.utils.category_creator import CategoryCreator


def generate_categories():
    """Generate text-based categories using CategoryCreator"""
    print("Generating text-based categories...")

    # Create Numbers category
    CategoryCreator.create_from_text_file(
        source_file="numbers.txt",
        name="Numbers",
        description="Test your number recognition skills!",
        img_name="game_icon.png",
        fuzzy_matching_threshold=0.9,
    )

    # Create BJJ category
    CategoryCreator.create_from_text_file(
        source_file="bjj.txt",
        name="Brazilian Jiu-Jitsu",
        description="Test your knowledge of Brazilian Jiu-Jitsu!",
        img_name="martial_arts.png",
        fuzzy_matching_threshold=0.7,
    )

    print("Text-based categories generated successfully!")


if __name__ == "__main__":
    generate_categories()
