from typing import List, Dict

from pydantic import BaseModel


class DefaultDTO(BaseModel):
    question: Dict[str, List[str]]
