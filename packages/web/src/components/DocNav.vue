<script setup lang="ts">
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
import routes from '~pages'

const DOC_DIR = '/docs/'
const ALGORITHM = '/docs/algorithm/'
const CLOUD = '/docs/cloud/'
const ESSAY = '/docs/essay/'
const SOURCE_READ = '/docs/source-read/'

const router = useRouter()

const docDirNameMap: Record<string, RouteRecordName> = {
  [ALGORITHM]: '算法',
  [CLOUD]: '云',
  [ESSAY]: '随笔',
  [SOURCE_READ]: '源码共读',
}

const docRoutes = $computed(() => {
  const pathRoutesMap: Record<string, RouteRecordRaw[]> = Object
    .keys(docDirNameMap)
    .reduce((record, key) => {
      return {
        ...record,
        [key]: [],
      }
    }, {})

  routes
    .filter(({ path }) => path.startsWith(DOC_DIR))
    .forEach((route: RouteRecordRaw) => {
      const { path } = route
      const docDirPath = path.slice(0, path.lastIndexOf('/') + 1)
      const docName = path.slice(path.lastIndexOf('/') + 1)
      pathRoutesMap[docDirPath].push({ ...route, name: docName })
    })

  return Object.keys(pathRoutesMap).map((key): RouteRecordRaw => {
    return {
      name: docDirNameMap[key],
      children: pathRoutesMap[key],
      path: key,
      redirect: DOC_DIR,
    }
  })
})

function onMenuClick(path: string) {
  router.push({ path })
}

</script>

<template>
  <nav>
    <a-menu
      :style="{ width: '200px', height: '100vh' }"
      :default-open-keys="['0']"
      show-collapse-button
      breakpoint="xl"
      @menu-item-click="onMenuClick"
    >
      <a-sub-menu
        v-for="(submenu, index) in docRoutes"
        :key="`${index}`"
      >
        <template #title>
          {{ submenu.name }}
        </template>

        <a-menu-item
          v-for="item in submenu.children"
          :key="item.path"
        >
          {{ item.name }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </nav>
</template>
