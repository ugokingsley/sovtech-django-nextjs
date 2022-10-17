from celery.utils.log import get_task_logger
from swapiproject.celery import app
from .models import Actor

import requests
import json


logger = get_task_logger(__name__)

@app.task
def consume(link):
    response = requests.get(link)
    #swapi_results = json.loads(response.content)
    swapi_results = response.json()
    for actor in swapi_results['results']:
        Actor.objects.create(name=actor['name'],height=actor['height'], mass=actor['mass'],gender=actor['gender'],homeworld=actor['homeworld'])
    if 'next' in swapi_results and swapi_results['next'] is not None:
        next_page = consume(swapi_results['next'])
        for page in next_page:
            yield page      

inititiate = consume('https://swapi.dev/api/people')
for result in inititiate:
    print("Successfull")


