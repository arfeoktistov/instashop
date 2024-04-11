from drf_yasg.utils import swagger_auto_schema
from rest_framework.viewsets import (
    ModelViewSet,
    ReadOnlyModelViewSet,
    GenericViewSet,
)
from drf_yasg import openapi
from rest_framework.request import Request
from rest_framework.response import Response
from typing import Any
from rest_framework.decorators import action
from django.shortcuts import render
from .serializers import ApplicationSerializer, FooterInfoSerializer
from .models import Application, FooterInfo


class ApplicationsViewSet(ModelViewSet):
    serializer_class = ApplicationSerializer
    queryset = Application.objects.all()

    @swagger_auto_schema(
        tags=['Информация по заявкам'],
        operation_summary="Получить список заявок",
        operation_description="Возвращает список всех заявок",
        responses={
            200: openapi.Response(
                description="Списко заявок успешно получен",
                schema=ApplicationSerializer(many=False),
            ),
            404: "Заявки не найдены"
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class FooterInfoViewSet(ModelViewSet):
    serializer_class = FooterInfoSerializer
    queryset = FooterInfo.objects.all()

    @swagger_auto_schema(
        tags=['Информация в футере'],
        operation_summary="Получить данные футера",
        operation_description="Возвращает все поля футера",
        responses={
            200: openapi.Response(
                description="Данные успешно получены",
                schema=ApplicationSerializer(many=False),
            ),
            404: "Данные не найдены"
        }
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)