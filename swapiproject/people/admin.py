from django.contrib import admin
from .models import Actor


class ActorAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'homeworld')


admin.site.register(Actor, ActorAdmin)
