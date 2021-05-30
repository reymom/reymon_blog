from django.db import models
from django.utils import timezone


class Tag(models.Model):
    name = models.CharField(max_length=50)
    parent_id = models.ForeignKey(
        'self',
        verbose_name='Parent Tag',
        blank=True,
        null=True,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class Image(models.Model):
    image = models.ImageField(
        upload_to = 'blog',
        default='blog/static/images/no-img.jpg'
    )
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class Post(models.Model):
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    featured_image = models.ForeignKey(
        Image,
        related_name='featured_image',
        blank=True,
        null=True,
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=200)
    introduction = models.TextField(null=True)
    text = models.TextField(null=True)
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)
    tags = models.ManyToManyField(
        Tag,
        blank=True,
    )
    image_sequence = models.ManyToManyField(
        Image,
        related_name='image_sequence',
        blank=True,
    )

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title


class Project(models.Model):
    image = models.ForeignKey(
        Image,
        related_name='project_image',
        blank=True,
        null=True,
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=200)
    summary = models.TextField(null=True)
    active = models.BooleanField(default=False)
    link = models.CharField(max_length=100)

    def __str__(self):
        return self.name
