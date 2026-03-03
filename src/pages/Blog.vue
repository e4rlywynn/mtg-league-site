<template>
  <div class="relative min-h-screen overflow-hidden bg-[#9fbf74]">
    <MainNavbar active="blog" />

    <div class="px-4 py-6 sm:px-8 sm:py-10">
      <main class="relative mx-auto w-full max-w-5xl rounded-md border-4 border-[#2f5d50] bg-[#f7f3e8] p-4 shadow-[8px_8px_0px_#2f5d50] sm:p-8 sm:shadow-[10px_10px_0px_#2f5d50]">
        <div class="mb-4 flex items-start justify-between gap-4 sm:mb-6">
          <div>
            <p class="text-xs font-bold uppercase tracking-widest text-[#2f5d50] sm:text-sm">Блог лиги</p>
            <h1 class="text-xl font-black uppercase text-[#1f3d2b] sm:text-2xl">Новости</h1>
          </div>
        </div>

        <section class="rounded-md border-2 border-[#2f5d50] bg-[#fffdf7] p-3 text-left shadow-[8px_8px_0px_#2f5d50] sm:p-6">
          <!-- <p class="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#2f5d50] sm:text-xs">Featured Post</p> -->
          <h2 class="mb-1 text-xl font-black uppercase leading-tight text-[#1f3d2b] sm:text-3xl">{{ post.title }}</h2>
          <p class="mb-4 text-[10px] font-bold uppercase tracking-wide text-[#2f5d50] sm:mb-5 sm:text-[11px]">{{ post.meta }}</p>

          <article
            v-for="block in announcementBlocks"
            :key="block.id"
            class="mb-3 last:mb-0 sm:mb-4"
          >
            <h2 class="mb-1 text-base font-extrabold uppercase text-[#1f3d2b] sm:mb-2 sm:text-lg">{{ block.title }}</h2>
            <p class="text-xs leading-relaxed text-[#1f3d2b] sm:text-sm">{{ block.body }}</p>
          </article>
        </section>
      </main>

      <main class="relative mx-auto mt-6 w-full max-w-5xl rounded-md border-4 border-[#2f5d50] bg-[#f7f3e8] p-4 text-left shadow-[8px_8px_0px_#2f5d50] sm:mt-8 sm:p-8 sm:shadow-[10px_10px_0px_#2f5d50]">
        <!-- <p class="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#2f5d50] sm:mb-3 sm:text-xs">Cпонсоры и друзья 3-его сезона</p> -->
        <h2 class="mb-3 text-xl font-black uppercase text-[#1f3d2b] sm:mb-4 sm:text-2xl">Наши спонсоры и друзья</h2>

        <div class="space-y-5 sm:space-y-6">
          <component
            v-for="banner in banners"
            :key="banner.id"
            :is="banner.external ? 'a' : RouterLink"
            :href="banner.external ? banner.href : undefined"
            :to="banner.external ? undefined : banner.href"
            :target="banner.external ? '_blank' : undefined"
            :rel="banner.external ? 'noopener noreferrer' : undefined"
            class="group block overflow-hidden rounded-md border-2 border-[#2f5d50] shadow-[6px_6px_0px_#2f5d50] transition hover:-translate-y-1"
          >
            <img :src="banner.image" :alt="banner.alt" class="block h-auto max-w-none w-[calc(100%+3px)]" />
            <div class="border-t-2 border-[#2f5d50] bg-[#fffdf7] px-2 py-1.5 sm:px-3 sm:py-2">
              <h3 class="text-sm font-black uppercase leading-tight text-[#1f3d2b] sm:text-base">{{ banner.title }}</h3>
              <p class="mt-0.5 text-xs leading-tight text-[#1f3d2b] sm:text-sm">{{ banner.description }}</p>
              <p class="mt-1 text-xs font-bold uppercase leading-tight text-[#2f5d50] group-hover:underline sm:text-sm">{{ banner.cta }}</p>
            </div>
          </component>
        </div>

        <a
          :href="magicHelper.bannerHref"
          target="_blank"
          rel="noopener noreferrer"
          class="group mt-4 block overflow-hidden rounded-md border-2 border-[#2f5d50] shadow-[6px_6px_0px_#2f5d50] transition hover:-translate-y-1 sm:mt-5"
        >
          <img :src="magicHelper.image" :alt="magicHelper.alt" class="block h-auto max-w-none w-[calc(100%+3px)]" />
          <div class="border-t-2 border-[#2f5d50] bg-[#fffdf7] px-2 py-1.5 sm:px-3 sm:py-2">
            <h3 class="text-sm font-black uppercase leading-tight text-[#1f3d2b] sm:text-base">{{ magicHelper.title }}</h3>
            <p class="mt-0.5 text-xs leading-tight text-[#1f3d2b] sm:text-sm">{{ magicHelper.description }}</p>
            <p class="mt-1 text-xs font-bold uppercase leading-tight text-[#2f5d50] group-hover:underline sm:text-sm">{{ magicHelper.cta }}</p>
          </div>
        </a>

        <div class="mt-3 grid grid-cols-2 gap-3">
          <a
            :href="magicHelper.appStoreHref"
            target="_blank"
            rel="noopener noreferrer"
            class="group rounded-md border-2 border-[#2f5d50] bg-[#3f6f5c] px-3 py-2 text-left text-[#fffdf7] shadow-[4px_4px_0px_#214236] transition hover:-translate-y-0.5 hover:bg-[#355f4f]"
          >
            <span class="block text-[10px] uppercase leading-tight opacity-80 sm:text-[11px]">iOS</span>
            <span class="block text-[11px] font-bold uppercase leading-tight sm:text-xs">Скачать из App Store</span>
          </a>
          <a
            :href="magicHelper.googlePlayHref"
            target="_blank"
            rel="noopener noreferrer"
            class="group rounded-md border-2 border-[#2f5d50] bg-[#f4e285] px-3 py-2 text-left text-[#1f3d2b] shadow-[4px_4px_0px_#214236] transition hover:-translate-y-0.5 hover:bg-[#ead66c]"
          >
            <span class="block text-[10px] uppercase leading-tight opacity-80 sm:text-[11px]">Android</span>
            <span class="block text-[11px] font-bold uppercase leading-tight sm:text-xs">Скачать из Google Play</span>
          </a>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import MainNavbar from '../components/MainNavbar.vue'

const post = {
  title: 'анонс третьего сезона!',
  meta: '01.03.2026',
}

const announcementBlocks = [
  {
    id: 1,
    title: 'Season Opening',
    body: 'Registration for the next league cycle opens this week. Pairings will be generated every Friday night, and standings will be refreshed after each submitted match result.',
  },
  {
    id: 2,
    title: 'Deck Rules',
    body: 'Modern legal decks only. Sideboard swaps are allowed between rounds, but your core list must stay consistent across each tournament stage so match reporting remains clean.',
  },
  {
    id: 3,
    title: 'Prize Pool',
    body: 'Top players earn league points, promo support, and final-stage seeding benefits. Keep your match records updated to avoid point penalties during season closeout.',
  },
    {
    id: 4,
    title: 'ЧЕТВЕРТЫЙ БЛОК!',
    body: 'Top players earn league points, promo support, and final-stage seeding benefits. Keep your match records updated to avoid point penalties during season closeout.',
  },
]

const banners = [
  {
    id: 1,
    title: 'MTG:STORE',
    description: 'Онлайн-магазин карт Magic: The Gathering',
    image: '/mtg_store.png',
    alt: 'MTG STORE banner',
    href: 'https://vk.com/mtg.store',
    cta: 'Перейти в магазин',
    external: true,
  },
  {
    id: 2,
    title: 'Заказ карт из Америки и Европы',
    description: 'Коллективные заказы карт у крупных зарубежных онлайн-ритейлеров',
    image: '/cards_eldrazi_low.png',
    alt: 'Zakaz banner',
    href: 'https://t.me/mtgcardsmoscow',
    cta: 'Перейти в канал',
    external: true,
  },
]

const magicHelper = {
  image: '/magic_helper_banner.png',
  alt: 'Magic Helper banner',
  title: 'Magic Helper',
  description: 'Удобное приложение для игроков в ККИ, созданное с учетом их реальных потребностей за игровым столом и вне его',
  cta: 'Перейти в канал',
  bannerHref: 'https://t.me/MagicHelperApp',
  appStoreHref: 'https://apps.apple.com/ru/app/magichelper/id6744556785',
  googlePlayHref: 'https://play.google.com/store/apps/details?id=com.mtgHelper.mtg_helper',
}
</script>
