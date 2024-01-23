from ckeditor_uploader.fields import RichTextUploadingField
from django.conf import settings
from django.db import models
from django_ckeditor_5.fields import CKEditor5Field


User = settings.AUTH_USER_MODEL


class Category(models.Model):
    name = models.CharField(max_length=200)

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.TextField()
    content = CKEditor5Field('Content', config_name='extends')
    photo = models.ImageField(upload_to='post/photos/')
    likes = models.ManyToManyField(User, related_name="post_likes", blank=True)
    categories = models.ManyToManyField(Category, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='post/files/', blank=True)
    is_active = models.BooleanField(
        verbose_name="Видемость поста",
        default=True,
    )

    class Meta:
        ordering = ("-created",)
        verbose_name = 'Пост'
        verbose_name_plural = 'Посты'

    def __str__(self):
        return self.title


class Post2(models.Model):
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    subtitle = models.TextField()
    content = RichTextUploadingField()
    photo = models.ImageField(upload_to='post/photos/')
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    author = models.ForeignKey(
        User,
        related_name="post_comments",
        null=True,
        on_delete=models.SET_NULL,
    )
    content = models.TextField("Comment body")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created",)
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'

    def __str__(self):
        return f"{self.content[:20]} by {self.author.username}"
