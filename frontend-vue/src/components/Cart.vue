<template>
  <div class="cart-container">
    <h2>Il tuo Carrello</h2>

    <!-- Carrello Vuoto -->
    <div v-if="cart.items.length === 0" class="empty-cart">
      Il carrello è vuoto.
    </div>

    <!-- Lista Prodotti -->
    <div v-else>
      <ul class="cart-list">
        <li v-for="item in cart.items" :key="item.id" class="cart-item">
          <div class="item-info">
            <span class="item-name">{{ item.nome }}</span>
            <!-- <span class="item-price">€{{ item.prezzo.toFixed(2) }} ciascuno</span> -->
          </div>

          <!-- Controlli Quantità e Rimozione -->
          <div class="item-actions">
            <button @click="decreaseQuantity(item)">-</button>
            <span class="item-qty">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)">+</button>
            
            <button @click="removeItem(item.id)" class="remove-btn">Rimuovi</button>
          </div>
        </li>
      </ul>

      <!-- Riepilogo -->
      <div class="cart-summary">
        <p>Totale articoli: <strong>{{ cart.totalItems }}</strong></p>
        <p>Prezzo totale: <strong>€{{ cart.totalPrice.toFixed(2) }}</strong></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore, type CartItem } from '@/stores/cartStore' 

// Inizializza lo store del carrello
const cart = useCartStore()

console.log(cart.items)

// 1. Funzione per aumentare la quantità (riutilizza la tua azione addToCart)
const increaseQuantity = (item: CartItem) => {
  cart.addToCart(item)
}

// 2. Funzione per diminuire la quantità o rimuovere se arriva a zero
const decreaseQuantity = (item: CartItem) => {
  if (item.quantity > 1) {
    item.quantity--
  } else {
    removeItem(item.id)
  }
}

// 3. Funzione per rimuovere completamente il prodotto dal carrello
const removeItem = (id: number) => {
  cart.items = cart.items.filter(item => item.id !== id)
}

</script>

<style scoped>
.cart-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 500px;
}
.cart-list {
  list-style: none;
  padding: 0;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.item-actions button {
  margin: 0 5px;
  padding: 2px 8px;
  cursor: pointer;
}
.remove-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
}
.cart-summary {
  margin-top: 20px;
  border-top: 2px solid #ccc;
  padding-top: 10px;
}
</style>