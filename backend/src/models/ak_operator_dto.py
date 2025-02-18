from typing import Dict, List

from backend.src.models.model import Model

class ChampionDTO(Model):
    version: str
    data: Dict[str, ChampionDataDTO]

class CharacterDataDTO(BaseModel):
    name: str
    itemUsage: str
    itemDesc: str

class WrapperDTO(Model):
    value: Dict[str, ]
    
class AK_OperatorDataDTO(Model):
    data: Dict[str, str]

class AK_OperatorDTO(Model):
    __root__: List[WrapperDTO]