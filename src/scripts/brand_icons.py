from src.models.brand_icon_dto import BrandIconsDTO
from src.utils.category import Category


class BrandIcons(Category[BrandIconsDTO]):
    def __init__(self, file: str):
        super().__init__(file, BrandIconsDTO)
