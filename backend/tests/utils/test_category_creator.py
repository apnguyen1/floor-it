import json

from backend.src.utils.category_creator import CategoryCreator


def test_category_creator_basic():
    """
    Basic test that verifies CategoryCreator works by creating an actual file.
    """
    # Test data
    test_data = {"Test Question Unique?": ["Test Answer Unique"]}

    # Create a category with a unique name to avoid conflicts
    unique_name = "Test_Unique_123"
    CategoryCreator.create_from_dict(
        name=unique_name, description="Test unique category", data=test_data
    )

    # Check that file was created in the actual output directory
    from backend.src.utils.definitions import PUBLIC_DIR

    output_path = PUBLIC_DIR / "category_data" / f"{unique_name.lower()}.json"

    # Verify file exists and has correct content
    assert output_path.exists(), f"File not created at {output_path}"

    # Check file contents
    with open(output_path, "r") as f:
        data = json.load(f)

    assert data["name"] == unique_name
    assert data["preview_desc"] == "Test unique category"
    assert len(data["questions"]) == 1
    assert data["questions"][0]["question"] == "Test Question Unique?"
    assert data["questions"][0]["answers"] == ["Test Answer Unique"]

    # Clean up - delete the test file
    # os.remove(output_path)
