from pydantic import BaseModel


class BaseUser(BaseModel):
    username: str
    email: str

    class Config:
        orm_mode = True


class CreateUser(BaseUser):
    password: str
