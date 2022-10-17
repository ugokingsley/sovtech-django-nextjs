from graphene_django import DjangoObjectType
import graphene

from .models import Actor


class PeopleType(DjangoObjectType):
    class Meta:
        model = Actor
        #fields = ("id", "name", "height", "mass", "gender", "homeworld")
