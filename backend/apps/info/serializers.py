from rest_framework import serializers
from typing import Any, List, Optional
from .models import Application, FooterInfo


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model: Any = Application
        fields: List[str] = (
            'id', 'name', 'phone_number',
            'instagram_link', 'application_text',
        )


class FooterInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model: Any = FooterInfo
        fields: List[str] = (
            'id', 'phone_number', 'instagram_link',
        )
