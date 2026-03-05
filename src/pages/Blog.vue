<template>
  <div class="relative min-h-screen overflow-hidden bg-[#A8C686]">
    <MainNavbar active="blog" />

    <div class="px-4 py-6 sm:px-8 sm:py-10">
      <main class="relative mx-auto w-full max-w-5xl rounded-md border-4 border-[#2f5d50] bg-[#fffdf7] p-4 shadow-[8px_8px_0px_#2f5d50] sm:p-8 sm:shadow-[10px_10px_0px_#2f5d50]">
        <div class="mb-4 flex items-start justify-between gap-4 sm:mb-6">
          <div>
            <p class="text-xs font-bold uppercase tracking-widest text-[#2f5d50] sm:text-sm">Блог лиги</p>
            <h1 class="text-xl font-black uppercase text-[#1f3d2b] sm:text-2xl">Новости</h1>
          </div>
        </div>

        <section class="rounded-md border-2 border-[#2f5d50] bg-[#fffdf7] p-3 text-left shadow-[8px_8px_0px_#2f5d50] sm:p-6">
          <!-- <p class="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#2f5d50] sm:text-xs">Featured Post</p> -->
          <h2 class="mb-1 text-xl font-black uppercase leading-tight text-[#1f3d2b] sm:text-3xl">{{ post.title }}</h2>

          <article
            v-for="block in announcementBlocks"
            :key="block.id"
            class="mb-3 last:mb-0 sm:mb-4"
          >
            <h2 class="mb-1 text-base font-extrabold uppercase text-[#1f3d2b] sm:mb-2 sm:text-lg">{{ block.title }}</h2>
            <template v-if="block.id === 4">
              <p
                v-if="parsePrizeBlock(block.body).intro"
                class="text-xs leading-relaxed text-[#1f3d2b] sm:text-sm"
                v-html="formatPrizeText(parsePrizeBlock(block.body).intro)"
              >
              </p>
              <div class="mt-2 space-y-1.5">
                <p
                  v-for="(item, idx) in parsePrizeBlock(block.body).items"
                  :key="idx"
                  class="text-xs leading-relaxed text-[#1f3d2b] sm:text-sm"
                  v-html="`- ${formatPrizeText(item)}`"
                >
                </p>
              </div>
            </template>
            <p v-else-if="block.id === 3" class="text-xs leading-relaxed text-[#1f3d2b] sm:text-sm" v-html="formatPrizeText(block.body)"></p>
            <p v-else class="text-xs leading-relaxed text-[#1f3d2b] sm:text-sm">{{ block.body }}</p>
          </article>

          <p class="mt-5 border-t-2 border-[#2f5d50] pt-2 text-right text-[10px] font-bold uppercase tracking-wide text-[#2f5d50] sm:mt-6 sm:text-[11px]">
            {{ post.meta }}
          </p>
        </section>
      </main>

      <main class="relative mx-auto mt-6 w-full max-w-5xl rounded-md border-4 border-[#2f5d50] bg-[#fffdf7] p-4 text-left shadow-[8px_8px_0px_#2f5d50] sm:mt-8 sm:p-8 sm:shadow-[10px_10px_0px_#2f5d50]">
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
  meta: 'Давыдов Олег, Орехов Даниил, Харин Илья, Арепин Артём | 05.03.2026',
}

function parsePrizeBlock(body) {
  const parts = body
    .split(/(?=\d+\.\s)/g)
    .map((part) => part.trim())
    .filter(Boolean)

  let intro = ''
  if (parts.length && !/^\d+\.\s/.test(parts[0])) {
    intro = parts.shift().replace(/\s*-\s*$/, '').trim()
  }

  const items = parts.map((part) => part.replace(/^\d+\.\s*/, '').trim())
  return { intro, items }
}

function formatPrizeText(text) {
  const withStoreLink = text.replace(
    /MTG:STORE/g,
    '<a href="https://vk.com/mtg.store" target="_blank" rel="noopener noreferrer" class="font-bold underline hover:no-underline">MTG:STORE</a>',
  )

  const guideCardUrl =
    'https://cards.scryfall.io/large/front/6/a/6a0789b8-529d-4766-8667-65abfb4ed3bb.jpg?1771262750'

  return withStoreLink.replace(
    /Guide of Souls Store Championship Promo/g,
    (match) =>
      `<span class="guide-card-wrap relative inline-block align-baseline">
        <button type="button" class="guide-card-trigger cursor-help underline decoration-dotted" onclick="this.parentElement.classList.toggle('is-open'); return false;">${match}</button>
        <span class="guide-card-popover absolute left-1/2 top-full z-20 mt-2 w-52 -translate-x-1/2 rounded-md border-2 border-[#2f5d50] bg-[#fffdf7] p-1 shadow-[4px_4px_0px_#2f5d50]">
          <button type="button" class="guide-card-close" onclick="this.closest('.guide-card-wrap').classList.remove('is-open'); return false;" aria-label="Close preview">×</button>
          <img src="${guideCardUrl}" alt="Guide of Souls Store Championship Promo" class="block w-full rounded-sm" />
        </span>
      </span>`,
  )
}

const announcementBlocks = [
  {
    id: 1,
    // title: 'ПЕРВЫЙ БЛОК!',
    body: 'Приветствуем всех последователей культа модерна и жаб! Вы ждали, просили и верили, а значит жабья лига возвращается с новым сезоном! ',
  },
  {
    id: 2,
    title: 'ЧТО, где и когда?',
    body: 'Лига cнова пройдет в формате Modern на базе нашего родного клуба Единорог на Новослободской в рамках пятничного дейлика в 19:30, и продлится 12 недель - начиная с 20.03.2026. В итоговый зачет лиги пойдут 10 ваших лучших результатов за 12 турниров, каждая победа принесет 3 очка, каждая ничья 1 очко, а поражение 0. Топ 8 игроков по набранным очкам пройдут в финал лиги, в котором сыграют на выбывание.'
  },
  {
    id: 3,
    title: 'Цена вопроса?',
    body: 'Стоимость участия в лиге - 1500, из них 500 отправятся прямиком в призовой фонд, а 1000 каждый участник получит в виде индивидуального промокода на покупку карт на эту сумму в магазине MTG:STORE.',
  },
    {
    id: 4,
    title: 'а что по призам?',
    body: 'В этот раз призовой фонд вкусный, как никогда: -  1. Все призовые и взносы в лигу будут распределены между участниками Топ 8 в пропорции: 1 место - 30%, 2 место - 20%, 3-4 места - 10%, 5-8 места - 7,5%. 2. Все участники Топ 8 поучаствуют в раздрафте пула стейплов, предоставленных MTG:STORE - удастся ли Вам забрать Quantum Riddler, Ocelot Pride или же комплект фечлендов покажет только время! (полный список карт для раздрафта будет опубликован позднее). 3. Победитель турнира получит памятный кубок, который будет напоминать ему о победах в славных битвах. 4. Победитель турнира также получит бесплатное участие в модерн-части турнира "СЕМЬ!" в Смоленске 27 июля. 5. Участники, занявшие 9-16 место, получат по копии Guide of Souls Store Championship Promo. 6. На <em>каждом</em> турнире будут разыграны дополнительные подарки - бустеры, карты, и, конечно, не забудем про мини-челленджи для всех участников, которые также принесут вам небольшие приятные призы.',
  },
    {
    id: 5,
    title: 'Я хочу помочь развитию локальной соревновательной магии',
    body: 'Мы будем рады каждому, кто хочет как-либо помочь проекту, и с радостью примем спонсорскую помощь финансами или стейплами в призовой фонд лиги и благодарны любой информационной поддержке. В знак нашей признательности каждый спонсор, поддержавший проект от 5000 в любом эквиваленте, получит уникальный памятный сувенир, который будет напоминать о его вкладе в реанимацию модерна и развитие турнирной магии в нашей стране. (Дизайн представим немного позднее).'
  },
    {
    id: 6,
    title: 'у меня остались вопросы',
    body: 'Любые вопросы и пожелания можете смело адресовать в мессенджерах или на сайте TopDeck.ru, написав @OlegJabba',
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
  {
    id: 3,
    title: 'Турнир "СЕМЬ!"',
    description: 'Большой турнир по модерну (и не только!) в Смоленске',
    image: '/seven_picture.jpg',
    alt: 'Season 3 banner',
    href: 'https://t.me/+j9KnQB-Ns5FjZTZi',
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

<style>
.guide-card-popover {
  display: none;
}

.guide-card-close {
  position: absolute;
  right: 4px;
  top: 2px;
  border: 1px solid #2f5d50;
  background: #fffdf7;
  color: #1f3d2b;
  font-size: 12px;
  line-height: 1;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  cursor: pointer;
}

.guide-card-trigger {
  background: transparent;
  border: 0;
  padding: 0;
  color: inherit;
  font: inherit;
}

.guide-card-wrap.is-open .guide-card-popover {
  display: block;
}

@media (hover: hover) and (pointer: fine) {
  .guide-card-wrap:hover .guide-card-popover,
  .guide-card-wrap:focus-within .guide-card-popover {
    display: block;
  }
}
</style>
