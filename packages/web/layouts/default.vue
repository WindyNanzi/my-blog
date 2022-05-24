<template>
  <main
    font-sans
    text="center gray-700 dark:gray-200"
    h-screen
    relative
    overflow-hidden
    flex
    flex-col
  >
    <t-nav />
    <div flex flex-grow justify-center items-center>
      <slot />
    </div>
  </main>
</template>
