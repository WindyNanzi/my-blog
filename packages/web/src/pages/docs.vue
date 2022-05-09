<template>
  <section class="h-100%" flex flex-col>
    <section flex relative flex-grow overflow-auto>
      <doc-side-bar sticky top-0 />
      <section flex-grow overflow-auto>
        <router-view />
      </section>
    </section>
  </section>
</template>
