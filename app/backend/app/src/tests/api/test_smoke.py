import pytest
from fastapi.testclient import TestClient
from src.main import app


def test_smoke():
    client = TestClient(app)
    response = client.get("ping")
    assert response.status_code == 200
    assert response.json() == {"ping": "pong"}
