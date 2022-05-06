<template>
  <section flex relative class="h-100%">
    <doc-nav sticky top-0 />
    <section flex-grow overflow-auto class="h-100%">
      <router-view />
    </section>
  </section>
</template>
