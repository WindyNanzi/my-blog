<script setup lang="ts">
import { Starport } from 'vue-starport'
</script>

<template>
  <div flex flex-col w-screen h-screen>
    <t-nav />
    <starport port="ttk-logo" flex flex-grow justify-center items-center>
      <i
        text-96
        relative
        top--32
        block
        i-carbon-campsite
      />
    </starport>
    <plum />
  </div>
</template>
