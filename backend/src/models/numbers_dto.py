from typing import List, Dict
from pydantic import BaseModel

class NumbersDTO(BaseModel):
    question: Dict[str, List[str]]