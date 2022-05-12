<script setup lang="ts">
import { StarportCarrier } from 'vue-starport'
</script>

<template>
  <main
    font-sans
    text="center gray-700 dark:gray-200"
    h-screen
    relative
    overflow-hidden
  >
    <StarportCarrier>
      <router-view />
    </StarportCarrier>
  </main>
</template>
