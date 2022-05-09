<script setup lang='ts'>
import { isDark, linkHoverClass, toggleDark } from '~/composables'

</script>
<template>
  <nav flex justify-between items-center p-6 pt-4 pb-4>
    <div relative>
      <a href="/" absolute block h-10 w-10 z-2 top--5>
        <img v-if="isDark" src="/NERV-light.svg">
        <img v-else src="/NERV.svg">
      </a>
    </div>
    <div text-5 text-gray-500 flex gap-4>
      <a :class="linkHoverClass" href="/docs">Blog</a>

      <button class="icon-btn !outline-none" @click="toggleDark()">
        <div v-if="isDark" i-carbon-moon />
        <div v-else i-carbon-sun />
      </button>
    </div>
  </nav>
</template>
