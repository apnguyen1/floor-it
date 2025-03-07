# backend/test_category_creator.py
from backend.src.utils.category_creator import CategoryCreator


def test_bjj_category():
    """Test creating a category from BJJ text file"""
    CategoryCreator.create_from_text_file(
        source_file="bjj.txt",
        name="Brazilian Jiu-Jitsu Test",
        description="Testing BJJ category creation",
        img_name="martial_arts.png",
        fuzzy_matching_threshold=0.7,
    )

    print("BJJ category created successfully!")


if __name__ == "__main__":
    print("Testing CategoryCreator...")
    test_bjj_category()
    print(
        "Test completed! Check the frontend/public/category_data/brazilian_jiu-jitsu_test.json"
    )
