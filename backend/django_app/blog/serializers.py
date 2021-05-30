from rest_framework import serializers
from .models import Tag, Image, Post, Project


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    featured_image = ImageSerializer(read_only=True)
    image_sequence = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    image = ImageSerializer(read_only=True)

    class Meta:
        model = Project
        fields = '__all__'
