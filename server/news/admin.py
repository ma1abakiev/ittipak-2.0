from django.contrib import admin

from .models import Post, Category, Post2, Comment


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'updated', 'created', 'is_active')
    list_display_links = ('id', 'title')
    list_filter = ('is_active',)
    search_fields = ('title', 'subtitle')
    list_editable = ('is_active',)


@admin.register(Post2)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'updated', 'created')
    list_display_links = ('id', 'title')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'post', 'created')
    list_display_links = ('id', 'author')
