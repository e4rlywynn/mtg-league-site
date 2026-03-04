<template>
  <div class="min-h-screen bg-[#A8C686] flex flex-col items-center justify-center px-6">

    <!-- Logo -->
    <div class="mb-8 text-center">
    <img 
        src="/logo.png" 
        alt="Zhabka League Logo" 
        class="w-40 mx-auto mb-6 drop-shadow-lg"
        />
      <div class="text-6xl font-extrabold text-[#2f5d50] tracking-tight">
        Zhabka League
      </div>
      <div class="mt-3 text-lg text-[#1F3D2B] opacity-80">
        DIY competitive magic events
      </div>
    </div>

    <!-- Description -->
    <div class="max-w-xl text-center mb-12">
      <h2 class="text-2xl font-semibold text-[#1F3D2B] mb-4">
        Соревновательные лиги по игре в Magic: The Gathering
      </h2>
      <p class="text-[#1F3D2B] opacity-90">
        Следите за новостями, результатами турниров и таблицей лидеров 
      </p>
    </div>

    <!-- Buttons -->
    <div class="w-full max-w-md flex flex-col sm:flex-row gap-6 justify-center">

      <router-link
        to="/blog"
        class="flex items-center justify-center
              relative overflow-visible
              w-full sm:w-1/2
              px-10 py-4
              rounded-xl
              text-lg font-semibold
              bg-[#2f5d50] text-white
              shadow-lg
              hover:shadow-xl hover:-translate-y-1
              transition-all duration-200"
      >
        Блог
        <span
          class="absolute -right-4 -top-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff4fa3] px-1 text-center text-[9px] font-black uppercase leading-[1.05] text-white shadow-[2px_2px_0px_#7a1148]"
        >
        Анонс нового сезона!
        </span>
      </router-link>

      <router-link
        to="/seasons"
        class="flex items-center justify-center
              w-full sm:w-1/2
              px-10 py-4
              rounded-xl
              text-lg font-semibold
              bg-[#2f5d50] text-white
              shadow-lg
              hover:shadow-xl hover:-translate-y-1
              transition-all duration-200"
      >
        Сезоны
      </router-link>

      <!-- <router-link
        to="/seasons2"
        class="flex items-center justify-center
              w-full sm:w-1/2
              px-10 py-4
              rounded-xl
              text-lg font-semibold
              bg-[#2f5d50] text-white
              shadow-lg
              hover:shadow-xl hover:-translate-y-1
              transition-all duration-200"
      >
        seasons 2
      </router-link> -->

      <!-- <router-link
        to="/about"
        class="flex items-center justify-center
              w-full sm:w-1/2
              px-10 py-4
              rounded-xl
              text-lg font-semibold
              bg-[#2f5d50] text-white
              shadow-lg
              hover:shadow-xl hover:-translate-y-1
              transition-all duration-200"
      >
        About
      </router-link> -->

    </div>
 </div>
</template>

<script setup>
</script>
