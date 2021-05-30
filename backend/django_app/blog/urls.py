from rest_framework import routers
from .api import PostViewSet, ProjectViewSet, ImageViewSet, TagViewSet
# from .views import index

router = routers.DefaultRouter()
router.register('posts', PostViewSet, 'posts')
router.register('projects', ProjectViewSet, 'projects')
router.register('tags', TagViewSet, 'tags')
router.register('images', ImageViewSet, 'images')

urlpatterns = router.urls