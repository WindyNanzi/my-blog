<script setup lang="ts">
import { Starport } from 'vue-starport'
import Vitesse from '../components/Vitesse.vue'
import Plum from '../components/Plum.vue'
</script>

<template>
  <div class="w-100% h-100% flex justify-center items-center">
    <Starport port="ttk-logo" h-96 w-96 relative top--32>
      <Vitesse />
    </Starport>
    <Plum />
  </div>
</template>
