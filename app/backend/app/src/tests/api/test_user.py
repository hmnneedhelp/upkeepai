import json

# from src.crud import users
from src.schema.user import BaseUser
from src.api.endpoints import users


def test_can_create_user(get_client, monkeypatch):
    test_request = {"username": "test", "email": "test_email", "password": "test_pass"}
    test_response = {"username": "test", "email": "test_email"}

    async def mock_post(user, session):
        return BaseUser(**test_response)

    monkeypatch.setattr(users, "create_user", mock_post)

    response = get_client.post("users", content=json.dumps(test_request))

    assert response.status_code == 200
    assert response.json() == test_response
