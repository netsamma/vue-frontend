import {defineStore} from 'pinia';
import {ref, computed} from 'vue';

export interface Product {
    id: number
    nome: string
    prezzo: number
    descrizione: string
}

export interface CartItem extends Product{
    quantity: number
}

export const useCartStore = defineStore('cart', () => {

  const items = ref<CartItem[]>([]);

  const totalItems = computed<number>(() => {
    return items.value.reduce((acc, item) => acc + item.quantity, 0);
  });

  const totalPrice = computed<number>(() => 
    items.value.reduce((acc, item) => acc + (item.prezzo * item.quantity), 0)
  )

  const addToCart = (product: Product) => {
    const existingItem = items.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    console.log(items.value);
  }

  return {
    items,
    totalItems,
    addToCart,
    totalPrice
  };
});