<script setup lang='ts'>
import { useRouter } from 'vue-router'
import DarkToggle from './DarkToggle.vue'
const router = useRouter()
const color = useColorMode()

const isDark = $computed(() => color.value === 'dark')

function go(path: string) {
  router.push(path)
}
</script>

<template>
  <nav flex justify-between items-center p-6 pt-4 pb-4>
    <div relative>
      <a absolute block h-10 w-10 z-2 top--5 cursor-pointer href="/" @click.prevent="go('/')">
        <img v-if="isDark" src="/NERV-light.svg">
        <img v-else src="/NERV.svg">
      </a>
    </div>
    <div text-5 text-gray-500 flex gap-4>
      <a class="icon-btn" href="/docs" @click.prevent="go('/docs')">Blog</a>

      <DarkToggle icon-btn />
    </div>
  </nav>
</template>
