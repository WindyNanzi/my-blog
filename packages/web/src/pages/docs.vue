<template>
  <section class="h-100%" flex flex-col>
    <t-nav />
    <section flex relative flex-grow overflow-auto p-6 pt-0 pb-0>
      <doc-side-bar sticky top-0 />
      <section flex-grow>
        <router-view />
      </section>
    </section>
  </section>
</template>
