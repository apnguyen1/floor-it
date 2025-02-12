from backend.src.models.category_data_dto import QuestionType
from backend.src.scripts.lol_champions import Champions


def main():
    print("main is running")
    Champions(QuestionType.TEXT).to_file()


if __name__ == "__main__":
    main()
