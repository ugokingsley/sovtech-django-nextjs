import json
import pytest
from graphene_django.utils.testing import graphql_query

# Create a fixture using the graphql_query helper and `client` fixture from `pytest-django
@pytest.fixture
def client_query(client):
    def func(*args, **kwargs):
        return graphql_query(*args, **kwargs, client=client)

    return func

# Test you query using the client_query fixture
def test_resolve_actors(client_query):
    response = client_query(
        '''
        query {
            actors{
			   id
			   name
			   height
			   mass
			   homeworld
			}
        }''',
        #op_name=None
    )

    content = json.loads(response.content)
    assert 'errors' not in content