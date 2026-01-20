from django.urls import reverse
from rest_framework.test import APITestCase


class ApiSmokeTests(APITestCase):
    def test_api_root_exists(self):
        url = reverse("api-root")
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
