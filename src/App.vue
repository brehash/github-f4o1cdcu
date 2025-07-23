<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <HeaderBar />
    <main class="container mx-auto px-4 py-6 max-w-7xl">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import HeaderBar from './components/HeaderBar.vue'
</script>
