from django.contrib import admin

from apps.users.models import(
    User,
    SellerUser,
)

from django.contrib.auth.models import Group

# admin.site.register(User)
admin.site.register(SellerUser)

admin.site.unregister(Group)
from django.contrib.auth.admin import UserAdmin
class UserAdminModel(UserAdmin):
    list_display = (
        'id','email',
        'first_name',
        'last_name',
        'is_active',
        'is_staff',
        'is_superuser'
    )
    fieldsets = (
        (
            'Данные аккаунта', {
                'fields': (
                    'email',
                    'password',
                )
            }
        ),
        (
            'Персональная информация', {
                'fields': (
                    'first_name',
                    'last_name',
                    'phone_number',
                    'role',
                    'is_active',
                    'is_staff',
                    'is_superuser'
                )
            }
        )
    )
    add_fieldsets = (
        (
            None, {
                'classes': (
                    'wide',
                ),
                'fields': (
                    'email',
                    'first_name',
                    'last_name',
                    'password1',
                    'password2'
                ),
            }
        ),
    )
    ordering = ('is_staff',)


admin.site.register(User, UserAdminModel)