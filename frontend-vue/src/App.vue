<script setup>
import Navbar from './components/Navbar.vue';
</script>

<template class="main">
    <Navbar></Navbar>
    <RouterView />
</template>

<style scoped>
    main{
        padding: 3.8rem;
    }
</style>
