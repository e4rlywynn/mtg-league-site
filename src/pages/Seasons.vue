<template>
  <div class="min-h-screen bg-[#A8C686]">

    <!-- Navbar -->
    <header class="w-full bg-[#F4E285] text-[#2F5D50] flex items-center gap-1 shadow-md px-4" style="min-height: 70px;">
      <!-- Logo -->
      <img
        src="/logo_padded.png"
        alt="Logo"
        class="h-12 cursor-pointer object-contain"
        @click="$router.push('/')"
      />

      <!-- Home button
      <button
        class="px-6 py-3 font-semibold flex items-center justify-center hover:bg-[#E0D06A] transition rounded-xl h-full"
        @click="$router.push('/')"
      >
        Home
      </button> -->

      <!-- Seasons button (active and clickable) -->
      <button
        class="px-6 py-3 font-semibold flex items-center justify-center bg-[#2F5D50] text-white shadow-inner transition rounded-xl h-full"
        @click="$router.push('/seasons')"
      >
        Сезоны
      </button>
    </header>

    <div class="p-4 md:p-3 space-y-4">

      <!-- Season Selector -->
      <div class="bg-[#BDD6A7]/40 flex
       shadow-[0_4px_6px_rgba(25,51,44,0.4)]
       hover:shadow-[0_8px_12px_rgba(25,51,44,0.5)] overflow-hidden">
        <button
          v-for="season in seasons"
          :key="season"
          @click="loadSeason(season)"
          :class="[
            'px-6 py-4 flex-1 font-semibold transition text-center',
            selectedSeason === season
              ? 'bg-[#2F5D50] text-white shadow'
              : 'bg-[#6B8E6E] text-white hover:bg-[#5a7a5c]'
          ]"
        >
          Сезон {{ season }}
        </button>
      </div>

      <!-- Tabs -->
      <div class="bg-[#BDD6A7]/40 flex 
       shadow-[0_4px_6px_rgba(25,51,44,0.4)]
       hover:shadow-[0_8px_12px_rgba(25,51,44,0.5)] overflow-hidden">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'px-6 py-4 flex-1 font-semibold text-center transition',
            activeTab === tab
              ? 'bg-[#2F5D50] text-white shadow'
              : 'bg-[#6B8E6E] text-white hover:bg-[#5a7a5c]'
          ]"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Tournaments -->
      <div v-if="activeTab === 'Турниры'" class="space-y-4">

        <div
          v-for="(tournament, index) in seasonData.tournaments"
          :key="index"
          class="bg-white shadow-[0_4px_6px_rgba(25,51,44,0.4)] hover:shadow-[0_8px_12px_rgba(25,51,44,0.5)] overflow-hidden"
        >
          <!-- Header -->
          <div
            @click="toggleTournament(index)"
            class="cursor-pointer p-4 flex justify-between items-center bg-[#2F5D50] text-white"
          >
            <div>
              <div class="font-semibold">{{ tournament.name }}</div>
              <div class="text-sm opacity-80">{{ tournament.date }} · {{ tournament.location }}</div>
            </div>
            <div>{{ openTournament.includes(index) ? '-' : '+' }}</div>
          </div>

          <!-- Responsive table / cards -->
          <div v-if="openTournament.includes(index)" class="p-4">
            <!-- Desktop Table -->
            <div class="hidden md:block overflow-x-auto">
              <table class="min-w-[600px] w-full border-collapse">
                <thead>
                  <tr class="bg-gray-200 text-left">
                    <th class="p-2">Place</th>
                    <th class="p-2">Player</th>
                    <th class="p-2">Deck</th>
                    <th class="p-2">Points</th>
                    <th class="p-2 text-center bg-[#F4E285] text-yellow-800">League Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="player in tournament.standings" :key="player.player" class="odd:bg-gray-100">
                    <td class="p-2">{{ player.place }}</td>
                    <td class="p-2">{{ player.player }}</td>
                    <td class="p-2">
                      <div class="flex flex-wrap items-center gap-1">
                        <span>{{ player.deck }}</span>
                        <span class="flex flex-wrap gap-1">
                          <img
                            v-for="color in player.colors"
                            :key="color"
                            :src="`https://svgs.scryfall.io/card-symbols/${color}.svg`"
                            class="w-5 h-5"
                            alt="color"
                          />
                        </span>
                      </div>
                    </td>
                    <td class="p-2">{{ player.points }}</td>
                    <td class="p-2 text-center whitespace-nowrap">
                      {{ player.league_points > 0 ? player.league_points : '-' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Mobile Card Stack -->
            <div class="md:hidden space-y-2">
              <div
                v-for="player in tournament.standings"
                :key="player.player"
                class="bg-gray-100 p-2 rounded-lg flex flex-col gap-1"
              >
                <div class="flex justify-between font-semibold">
                  <span>{{ player.player }}</span>
                  <span>Place: {{ player.place }}</span>
                </div>
                <div class="flex flex-wrap items-center gap-1">
                  <span>{{ player.deck }}</span>
                  <span class="flex flex-wrap gap-1">
                    <img
                      v-for="color in player.colors"
                      :key="color"
                      :src="`https://svgs.scryfall.io/card-symbols/${color}.svg`"
                      class="w-5 h-5"
                      alt="color"
                    />
                  </span>
                </div>
                <div class="flex justify-between">
                  <span>Points: {{ player.points }}</span>
                  <span>League Points: {{ player.league_points > 0 ? player.league_points : '-' }}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Leaderboard -->
      <div v-if="activeTab === 'Таблица лидеров'" class="overflow-x-auto">
        <table class="w-full bg-white shadow-md min-w-[400px]">
          <thead>
            <tr class="bg-[#2F5D50] text-white">
              <th class="p-3 text-left">Player</th>
              <th class="p-3">Points</th>
              <th class="p-3">Tournaments</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in seasonData.leaderboard" :key="player.player" class="odd:bg-gray-100">
              <td class="p-3">{{ player.player }}</td>
              <td class="p-3 text-center">{{ player.points }}</td>
              <td class="p-3 text-center">{{ player.tournaments }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Info Panel -->
      <transition name="slide">
        <div
          v-if="activeTab === 'Info'"
          class="fixed top-0 right-0 w-1/2 h-full bg-white shadow-xl p-6"
        >
          <h2 class="text-2xl font-semibold mb-4 text-[#2F5D50]">Season Info</h2>
          <p>{{ seasonData.info }}</p>
        </div>
      </transition>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const seasons = ref([1, 2])
const selectedSeason = ref(null)
const seasonData = ref({})
const activeTab = ref('Турниры')
const tabs = ['Турниры', 'Таблица лидеров', 'Info']
const openTournament = ref([])

async function loadSeason(number) {
  selectedSeason.value = number
  const res = await fetch(`/data/seasons/season_${number}.json`)
  seasonData.value = await res.json()
  openTournament.value = []
}

function toggleTournament(index) {
  if (openTournament.value.includes(index)) {
    openTournament.value = openTournament.value.filter(i => i !== index)
  } else {
    openTournament.value.push(index)
  }
}

onMounted(() => {
  loadSeason(seasons.value[seasons.value.length - 1])
})
</script>

<style>
.slide-enter-from {
  transform: translateX(100%);
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-enter-active {
  transition: transform 0.3s ease;
}
</style>
