from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from api.models import Person, Team, Project

class PersonInline(admin.StackedInline):
    model = Person
    can_delete = False
    verbose_name = 'person'

class UserAdmin(BaseUserAdmin):
    inlines = (PersonInline, )


admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Team)
admin.site.register(Project)

