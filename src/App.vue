<script setup>
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';
import Home from './page/Home.vue';
</script>

<template>
    <Navbar></Navbar>
    <main>
        <RouterView />
    </main>
    <!-- <Home></Home> -->
</template>

<style scoped>
    main{
        padding: 0.8rem;
    }
</style>
