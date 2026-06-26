from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from decimal import Decimal

# Create your models here.
class Autore(models.Model):
    nome = models.CharField(max_length=200)
    nazione = models.CharField(max_length=200)
    
    def __str__(self):
        return self.nome
    
    class Meta:
        verbose_name_plural = 'Autori'


class Libro(models.Model):
    titolo = models.CharField(max_length=400)
    autore = models.ForeignKey(Autore, on_delete=models.CASCADE)
    anno = models.IntegerField()
    genere = models.CharField(max_length=100)

    def __str__(self):
        return self.titolo

    class Meta:
        verbose_name_plural = 'Libri'


class Scarpe(models.Model):
    # Campi base
    nome = models.CharField(max_length=200)
    prezzo = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(0.01)]
    )
    valuta = models.CharField(max_length=10, default="EUR")
    descrizione = models.TextField()
    categoria = models.CharField(max_length=100)
    materiale = models.CharField(max_length=200)
    disponibilita = models.BooleanField(default=True)

    # Taglie come campo JSON (Django 3.1+) o CharField con split
    # Opzione 1: Usando JSONField (consigliato per Django 3.1+)
    taglie_disponibili = models.JSONField(
        default=list, help_text="Lista di taglie disponibili, es: [36, 37, 38, 39, 40]"
    )
    immagine_url = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        help_text="URL dell'immagine del prodotto (es: https://picsum.photos/seed/oxford/400/400)",
    )

    # Campi aggiuntivi opzionali
    sconto = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=Decimal(0.00),
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )

    def __str__(self):
        return f"{self.nome}"

    @property
    def prezzo_scontato(self):
        """Calcola il prezzo con lo sconto applicato"""
        if self.sconto > 0:
            return self.prezzo * (1 - self.sconto / 100)
        return self.prezzo







from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import Libro, Autore, Scarpe


class AutoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autore
        fields = '__all__'


# For writing (POST, PUT, PATCH requests) - uses ID
class LibroWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        fields = "__all__"


# For reading (GET requests) - shows full author
class LibroReadSerializer(serializers.ModelSerializer):
    autore = AutoreSerializer(read_only=True)

    class Meta:
        model = Libro
        fields = ["id", "titolo", "anno", "genere", "autore"]


class ScarpeSerializer(serializers.ModelSerializer):
    prezzo_scontato = serializers.ReadOnlyField()  # o SerializerMethodField() definendo però il metodo
    sconto = serializers.FloatField()
    prezzo = serializers.FloatField()
    
    class Meta:
        model = Scarpe
        fields = "__all__"









from django.contrib import admin
from .models import Autore, Libro, Scarpe

# Register your models here.
@admin.register(Autore)
class AutoreAdmin(admin.ModelAdmin):
    list_display = ['nome', 'nazione']
    list_filter = ['nazione']
    list_editable =['nazione']


@admin.register(Libro)
class LibroAdmin(admin.ModelAdmin):
    list_display = ["titolo", "anno", "autore", "genere"]
    list_filter = ["genere"]


@admin.register(Scarpe)
class ScarpeAdmin(admin.ModelAdmin):
    list_display = ["nome", "prezzo", "descrizione", "categoria", "materiale", 'disponibilita', 'taglie_disponibili', 'immagine_url', 'sconto',]
    list_filter = ["categoria"]
    search_fields = ['categoria', 'nome']
    list_editable = ['sconto']


