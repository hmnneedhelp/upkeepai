import pytest
from starlette.testclient import TestClient
from src.main import app


@pytest.fixture(scope='module')
def get_client():
    client = TestClient(app)
    yield client
