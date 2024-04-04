# from django.db.models.signals import post_save
# from django.dispatch import receiver
#
# from apps.users.models import(
#     User, SellerUser
# )
#
# from apps.users.config import(
#     SELLER,
# )
#
# @receiver(post_save, sender=User)
# def create_connected_models(sender, instance, created, **kwargs):
#     if created:
#         if instance.role == SELLER:
#             SellerUser.objects.create(user=instance)
#
