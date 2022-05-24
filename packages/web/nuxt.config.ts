import { defineNuxtConfig } from 'nuxt'
// import Components from 'unplugin-vue-components/vite'
// import { ArcoResolver } from 'unplugin-vue-components/resolvers'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  experimental: {
    reactivityTransform: true,
    // viteNode: true,
  },
  unocss: {
    preflight: true,
  },
  colorMode: {
    classSuffix: '',
  },
  vite: {
    plugins: [
      // Components({
      //   // allow auto load markdown components under `./src/components/`
      //   extensions: ['vue', 'md'],
      //   // allow auto import and register components used in markdown
      //   include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      //   resolvers: [ArcoResolver()],
      //   dts: true,
      // }),
    ],
  },
})
