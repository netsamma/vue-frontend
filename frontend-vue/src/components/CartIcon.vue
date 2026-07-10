<template>
    <div class="container">
        <span id="cart">🛒</span>
        <span id="badge">{{ cartStore.totalItems }}</span>
    </div>
</template>

<script setup>

import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore();



</script>

<style scoped>
    .container{
        position: relative;
    }
    #badge{
        position: absolute;
        top: -8px;
        font-size: 0.9rem;
        color: bisque;
        right: -2px;
    }

    
    #cart{
        font-size: 1.3rem;
    }

</style>