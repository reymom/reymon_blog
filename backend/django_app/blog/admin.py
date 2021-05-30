from django.contrib import admin
from .models import Tag, Image, Post, Project

class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent_id')

admin.site.register(Tag, TagAdmin)

admin.site.register(Post)

admin.site.register(Project)

admin.site.register(Image)
