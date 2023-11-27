from django.contrib import admin

from .models import Post, Category, Post2


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'updated', 'created')
    list_display_links = ('id', 'title')


@admin.register(Post2)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'updated', 'created')
    list_display_links = ('id', 'title')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')
