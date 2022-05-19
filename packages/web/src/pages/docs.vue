<template>
  <section class="h-100%" flex flex-col>
    <t-nav />
    <section flex relative flex-grow overflow-y-auto pl-6>
      <doc-side-bar sticky top-0 />
      <section flex-grow of-auto>
        <router-view />
      </section>
    </section>
  </section>
</template>
