from graphene_django import DjangoObjectType
import graphene
import graphql_jwt
from django.db.models import Q

from users.models import User
from people.models import Actor

from users.schema import UserType, Mutation
from people.schema import PeopleType



class Mutation(Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

class Query(graphene.ObjectType):
    logged_in_user = graphene.Field(UserType)
    users = graphene.List(UserType)
    actors = graphene.List(PeopleType,search=graphene.String(),first=graphene.Int(),skip=graphene.Int())
    users_by_id = graphene.Field(UserType, id=graphene.Int())
    actors_by_id = graphene.Field(PeopleType, id=graphene.Int())

    def resolve_logged_in_user(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')
        return user

    def resolve_users(self, info):
        return User.objects.all()

    def resolve_actors(self, info, search=None, first=None, skip=None, **kwargs):
        qs = Actor.objects.all()
        if search:
            filter = (
                Q(name__icontains=search)
            )
            qs =  qs.filter(filter)
        if skip:
            qs = qs[skip:]
        if first:
            qs = qs[:first]
        return qs

    def resolve_actors_by_id(self, info, id):
        try:
            return Actor.objects.get(id=id)
        except Actor.DoesNotExis:
            return None


schema = graphene.Schema(query=Query, mutation=Mutation)
