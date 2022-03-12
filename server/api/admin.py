from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError

from api.models import User, Team, Project, Milestone, Task
from files.models import File, Rev


class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirm password', widget=forms.PasswordInput)
    

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')


    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")

        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2


    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()


    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password')
    

class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm


    list_display = ('email', 'first_name', 'last_name',)
    list_filter = ('is_admin',)
    fieldsets = (
        (None, {
            'fields': ('first_name', 'last_name', 'email', 'is_staff', 'is_admin', 'is_superuser'),
        }),
    )
    add_fieldsets = (
        (None, {
            'fields': ('first_name', 'last_name', 'email', 'password1', 'password2', 'is_staff', 'is_admin', 'is_superuser'),
        }),
    )
    search_fields = ('first_name', 'last_name', 'email', 'is_staff', 'is_admin', 'is_superuser')
    ordering = ('is_staff', 'is_admin', 'is_superuser')


admin.site.unregister(Group)
admin.site.register(User, UserAdmin)
admin.site.register(Team)
admin.site.register(Project)
admin.site.register(Milestone)
admin.site.register(Task)
admin.site.register(File)
admin.site.register(Rev)