<script setup lang="ts">
import { Starport } from 'vue-starport'
</script>

<template>
  <div flex flex-col w-screen h-screen>
    <t-nav />
    <div flex flex-grow justify-center items-center>
      <starport port="ttk-logo" h-96 w-96 relative top--32>
        <vitesse />
      </starport>
    </div>
    <plum />
  </div>
</template>
