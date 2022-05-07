<template>
  <section class="h-100%" flex flex-col>
    <section flex relative flex-grow overflow-auto>
      <doc-nav sticky top-0 />
      <section flex-grow overflow-auto class="h-100%">
        <router-view />
      </section>
    </section>
  </section>
</template>
