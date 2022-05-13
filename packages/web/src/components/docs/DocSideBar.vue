<script setup lang="ts">
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
import routes from '~pages'

const DOC_DIR = '/docs/'
const ALGORITHM = 'algorithm/'
const CLOUD = 'cloud/'
const ESSAY = 'essay/'
const SOURCE_READ = 'source-read/'

const router = useRouter()

const docDirNameMap: Record<string, { label: string; icon: string }> = {
  [ALGORITHM]: { label: '算法', icon: '<i block i-carbon-function/>' },
  [CLOUD]: { label: '云', icon: '<i block i-carbon-cloud/>' },
  [ESSAY]: { label: '随笔', icon: '<i block i-carbon-account/>' },
  [SOURCE_READ]: { label: '源码共读', icon: '<i block i-carbon-code/>' },
}

const docRoutes = $computed(() => {
  const pathRoutesMap: Record<string, (RouteRecordRaw & { docName?: RouteRecordName })[]> = Object
    .keys(docDirNameMap)
    .reduce((record, key) => {
      return {
        ...record,
        [key]: [],
      }
    }, {})

  const docParentRoute = routes.find(({ path }) => path.includes('docs'))

  docParentRoute?.children?.forEach((route: RouteRecordRaw) => {
    const { path } = route
    if (path.includes('/')) {
      const docDirPath = path.slice(0, path.lastIndexOf('/') + 1)
      const docName = path.slice(path.lastIndexOf('/') + 1)
      const docPath = `${DOC_DIR}${path}`
      pathRoutesMap[docDirPath].push({ ...route, path: docPath, docName: docName! })
    }
  })

  return Object.keys(pathRoutesMap).map((key) => {
    return {
      name: docDirNameMap[key].label,
      icon: docDirNameMap[key].icon,
      children: pathRoutesMap[key],
      path: key,
      redirect: DOC_DIR,
    }
  })
})

function onMenuClick(name: string) {
  router.push({ name })
}

const collapsed = $ref(false)

</script>

<template>
  <nav>
    <a-menu
      box-border
      mode="pop"
      show-collapse-button
      accordion
      :collapsed="collapsed"
      class="h-100%"
      @collapse="collapsed = !collapsed"
      @menu-item-click="onMenuClick"
    >
      <a-sub-menu
        v-for="(submenu, index) in docRoutes"
        :key="`${index}`"
        :class="collapsed ? '' : 'w-64'"
        text-left
      >
        <template #icon>
          <div v-html="submenu.icon" />
        </template>
        <template #title>
          {{ submenu.name }}
        </template>

        <a-menu-item
          v-for="item in submenu.children"
          :key="item.name?.toString()"
          text-left
        >
          {{ item.docName }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </nav>
</template>
