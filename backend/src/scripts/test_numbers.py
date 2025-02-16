# To test the Numbers category, you can run the following code:

import sys
import os

# Add the project root directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))

from numbers import Numbers  # Adjusted import path based on your project structure

def test_numbers_category():
    try:
        numbers_category = Numbers()
        formatted_data = numbers_category.formatted_data
        print("Formatted Data:", formatted_data)

        # Optionally, export the data to a file
        numbers_category.to_file()
        print("Numbers category data successfully exported.")
    except Exception as e:
        print("An error occurred:", e)

if __name__ == "__main__":
    test_numbers_category()
