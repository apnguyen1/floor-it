from pydantic import BaseModel, ConfigDict


class Model(BaseModel):
    """
    This class serves as a base class for all derived models to ignore all redundant
    JSON properties
    """

    model_config = ConfigDict(extra="ignore", populate_by_name=True)
