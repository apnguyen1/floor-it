from pydantic import BaseModel, Extra


class BaseDTO(BaseModel):
    class Config:
        extra = Extra.ignore
