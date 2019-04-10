from django.db import models

class Fin(models.Model):
    csym = models.CharField(max_length=3)
    esym = models.CharField(max_length=3)
    camt = models.CharField(max_length=100)
    erte = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)