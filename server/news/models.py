from ckeditor_uploader.fields import RichTextUploadingField
from django.db import models
from django_ckeditor_5.fields import CKEditor5Field


class Post(models.Model):
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    subtitle = models.TextField()
    content = CKEditor5Field('Content', config_name='extends')
    photo = models.ImageField(upload_to='post/photos/')
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

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


class Category(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
