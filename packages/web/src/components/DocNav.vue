<script setup lang="ts">
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
import routes from '~pages'

const DOC_DIR = '/docs/'
const ALGORITHM = 'algorithm/'
const CLOUD = 'cloud/'
const ESSAY = 'essay/'
const SOURCE_READ = 'source-read/'

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

  const docParentRoute = routes.find(({ name }) => name === 'docs')

  docParentRoute?.children?.forEach((route: RouteRecordRaw) => {
    const { path } = route
    const docDirPath = path.slice(0, path.lastIndexOf('/') + 1)
    const docName = path.slice(path.lastIndexOf('/') + 1)
    const docPath = `${DOC_DIR}${path}`
    pathRoutesMap[docDirPath].push({ ...route, name: docName, path: docPath })
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
      min-w-xs
      box-border
      h-screen
      :default-open-keys="['0']"
      show-collapse-button
      breakpoint="xl"
      @menu-item-click="onMenuClick"
    >
      <a-sub-menu
        v-for="(submenu, index) in docRoutes"
        :key="`${index}`"
        text-left
      >
        <template #title>
          {{ submenu.name }}
        </template>

        <a-menu-item
          v-for="item in submenu.children"
          :key="item.path"
          text-left
        >
          {{ item.name }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </nav>
</template>
