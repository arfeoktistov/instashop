from rest_framework.views import APIView
from rest_framework.response import Response

class API(APIView):
    def get(self, request):
        return Response(
            {
                "users": f"http://{request.get_host()}/api/users/",
                "categories": f"http://{request.get_host()}/api/categories/",
                "products": f"http://{request.get_host()}/api/products/",
            }
        )


class MainAPI(APIView):
    def get(self, request):
        return Response(
            {
                'api': f'http://{request.get_host()}/api/',
                'admin': f'http://{request.get_host()}/admin/',
            }
        )
