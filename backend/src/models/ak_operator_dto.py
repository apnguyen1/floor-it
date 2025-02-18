from typing import List
from pydantic import Field

from backend.src.models.model import Model

class AK_OperatorDataDTO:
    name: str = Field(alias="value.data.name")
    item_usage: str = Field(alias="value.data.itemUsage")
    item_description: str = Field(alias="value.data.itemDesc")

class AK_OperatorDTO(Model):
    operators: List[AK_OperatorDataDTO]