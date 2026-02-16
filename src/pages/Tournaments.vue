<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-blue-600">
      Tailwind Works
    </h1>
  </div>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Tournament Standings</h1>

    <div v-for="(tournament, key) in tournaments" :key="key" class="mb-8">
      <h2 class="text-xl font-semibold mb-2">{{ tournament.name }} — {{ tournament.date }}</h2>

      <table class="min-w-full border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2 text-left">Player</th>
            <th class="border px-4 py-2">Points</th>
            <th class="border px-4 py-2">Wins</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in tournament.standings" :key="player.player" class="hover:bg-gray-50">
            <td class="border px-4 py-2">{{ player.player }}</td>
            <td class="border px-4 py-2 text-center">{{ player.points }}</td>
            <td class="border px-4 py-2 text-center">{{ player.wins }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const tournaments = ref({})

onMounted(async () => {
  try {
    const response = await fetch('/data/tournaments.json')
    console.log('Fetch response:', response)  // debug line
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
    const data = await response.json()
    console.log('JSON data:', data)          // debug line
    tournaments.value = data.tournaments     // check JSON structure
  } catch (err) {
    console.error('Error loading JSON:', err)
  }
})
</script>


<style scoped>
table {
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
}
</style>
