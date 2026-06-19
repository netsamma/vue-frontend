<script setup>
import Layout from './Layout.vue'
</script>

<template>
  <Layout>
    <template #header>
      <h1>Here might be a home page title</h1>
    </template>

    <template #default>
      <p>A paragraph for the home main content.</p>
      <p>And another one.</p>
    </template>

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </Layout>
</template>