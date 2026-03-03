<template>
  <header class="w-full h-[70px] bg-[#F4E285] text-[#2F5D50] flex items-stretch shadow-md px-4">
    <div class="flex h-full items-center">
      <img
        src="/logo_padded.png"
        alt="Logo"
        class="h-12 cursor-pointer object-contain"
        @click="router.push('/')"
      />
    </div>

    <nav class="ml-3 flex h-full items-stretch">
      <button
        :class="buttonClass('blog')"
        @click="router.push('/blog')"
      >
        Blog
      </button>

      <button
        :class="buttonClass('seasons')"
        @click="router.push('/seasons')"
      >
        Сезоны
      </button>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  active: {
    type: String,
    default: '',
  },
})

const router = useRouter()

function buttonClass(tab) {
  if (props.active === tab) {
    return 'min-w-[140px] self-stretch px-6 py-0 font-semibold leading-none flex items-center justify-center bg-[#2F5D50] text-white transition-colors duration-200 ease-out'
  }

  return 'min-w-[140px] self-stretch px-6 py-0 font-semibold leading-none flex items-center justify-center hover:bg-[#E0D06A] transition-colors duration-200 ease-out'
}
</script>
