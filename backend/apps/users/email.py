from django.core.mail import EmailMessage
from django.conf import settings

from celery import shared_task

@shared_task
def send_verification_code(email, code):
        mail = EmailMessage(
            'Cloud Code',
            f'Код верификации: {code}',
            settings.EMAIL_HOST_USER,
            [email]
        )
        mail.send()
