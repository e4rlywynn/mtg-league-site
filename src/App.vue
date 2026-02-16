<template>
  <div class="min-h-screen p-8 bg-gray-50">
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-red-600 mb-4">MTG League</h1>
      <nav class="flex space-x-4">
        <!-- <router-link class="text-blue-600 hover:underline" to="/">Home</router-link> -->
        <router-link class="text-blue-600 hover:underline" to="/tournaments">Tournaments</router-link>
        <!-- <router-link class="text-blue-600 hover:underline" to="/leaderboard">Leaderboard</router-link> -->
        <!-- <router-link class="text-blue-600 hover:underline" to="/about">About</router-link> -->
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup></script>



<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->
