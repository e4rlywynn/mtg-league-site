<template>
<header class="w-full bg-[#F4E285] text-[#2F5D50] flex items-stretch shadow-md" style="min-height: 67px;">
  <!-- Logo on the left -->
  <img
    src="/logo_padded.png"
    alt="Logo"
    class="h-12 ml-0 cursor-pointer object-contain self-center"
    @click="$router.push('/')"
  />

  <!-- Home button -->
  <button
    class="px-9 font-semibold flex items-center justify-center hover:bg-[#E0D06A] transition"
    @click="$router.push('/')"
  >
    Home
  </button>

  <!-- Seasons button (active and clickable) -->
  <button
    class="px-9 font-semibold flex items-center justify-center bg-[#2F5D50] text-white shadow-inner transition"
    @click="$router.push('/seasons')"
  >
    Seasons
  </button>
</header>





<div class="min-h-screen bg-[#A8C686] p-4 md:p-3 space-y-3">

  <!-- Page Header
  <div class="w-full bg-[#BDD6A7]/40 p-4 shadow-sm">
    <h1 class="text-4xl font-bold text-[#2F5D50]">
      Cезоны
    </h1>
  </div> -->

  <!-- Season Selector -->
  <div class="bg-[#BDD6A7]/40 flex shadow-sm overflow-hidden">
    <button
      v-for="season in seasons"
      :key="season"
      @click="loadSeason(season)"
      :class="[
        'px-6 py-2 flex-1 font-semibold transition',
        selectedSeason === season
          ? 'bg-[#2F5D50] text-white shadow'
          : 'bg-[#6B8E6E] text-white hover:bg-[#5a7a5c]'
      ]"
    >
      Сезон {{ season }}
    </button>
  </div>

<!-- Tabs -->
<div class="bg-[#BDD6A7]/40 flex shadow-sm overflow-hidden">
  <button
    v-for="tab in tabs"
    :key="tab"
    @click="activeTab = tab"
    :class="[
      'px-6 py-2 flex-1 font-semibold text-center transition',
      activeTab === tab
        ? 'bg-[#2F5D50] text-white shadow'
        : 'bg-[#6B8E6E] text-white hover:bg-[#5a7a5c]'
    ]"
  >
    {{ tab }}
  </button>
</div>


  <!-- Tournament / Leaderboard / Info sections come below -->


    <!-- Tournaments -->
    <div v-if="activeTab === 'Турниры'">
    <div
        v-for="(tournament, index) in seasonData.tournaments"
        :key="index"
        class="max-w-full mb-4 bg-white 
       shadow-[0_4px_6px_rgba(25,51,44,0.4)]
       hover:shadow-[0_8px_12px_rgba(25,51,44,0.5)]
       transition-shadow duration-200"
        >
        <div
        @click="toggleTournament(index)"
        class="cursor-pointer p-4 flex justify-between items-center bg-[#2F5D50] text-white"
        >
          <div>
            <div class="font-semibold">{{ tournament.name }}</div>
            <div class="text-sm opacity-80">
              {{ tournament.date }} · {{ tournament.location }}
            </div>
          </div>
          <div>{{ openTournament === index ? '-' : '+' }}</div>
        </div>

        <div
            v-if="openTournament.includes(index)"
            class="p-4 border-t-2 border-[#2F5D50]"
            >
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-200 text-left">
                <th class="p-2">Place</th>
                <th class="p-2">Player</th>
                <th class="p-2">Deck</th>
                <th class="p-2">Points</th>
                <th class="p-2 text-center bg-[#F4E285] text-yellow-800 rounded-t">League Points</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="player in tournament.standings"
                :key="player.player"
                class="odd:bg-gray-100"
              >
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
                <td class="class=p-2 text-center">
                {{ player.league_points > 0 ? player.league_points : '' }}
                 </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>

    <!-- Leaderboard -->
    <div v-if="activeTab === 'Таблица лидеров'">
      <table class="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr class="bg-[#2F5D50] text-white">
            <th class="p-3 text-left">Player</th>
            <th class="p-3">Points</th>
            <th class="p-3">Tournaments</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="player in seasonData.leaderboard"
            :key="player.player"
            class="odd:bg-gray-100"
          >
            <td class="p-3">{{ player.player }}</td>
            <td class="p-3 text-center">{{ player.points }}</td>
            <td class="p-3 text-center">{{ player.tournaments }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Info -->
    <transition name="slide">
      <div
        v-if="activeTab === 'Info'"
        class="fixed top-0 right-0 w-1/2 h-full bg-white shadow-xl p-6"
      >
        <h2 class="text-2xl font-semibold mb-4 text-[#2F5D50]">
          Season Info
        </h2>
        <p>{{ seasonData.info }}</p>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { HomeIcon } from '@heroicons/vue/24/solid'

const seasons = ref([1, 2]) // for now manual
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
    // close if already open
    openTournament.value = openTournament.value.filter(i => i !== index)
  } else {
    // open new
    openTournament.value.push(index)
  }
}


onMounted(() => {
  loadSeason(seasons.value[seasons.value.length - 1]) // latest
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
