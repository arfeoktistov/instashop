from django.contrib import admin

from apps.users.models import(
    User,
    SellerUser,
)

from django.contrib.auth.models import Group

admin.site.register(User)
admin.site.register(SellerUser)

admin.site.unregister(Group)

