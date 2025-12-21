<script setup lang="ts">
import { computed } from 'vue'
import Sidebar from './components/Sidebar.vue'
import { useSidebar } from '@/composables/useSidebar'

const { isCollapsed } = useSidebar()

const mainMargin = computed(() => {
  return isCollapsed.value ? 'ml-[72px]' : 'ml-[190px]'
})
</script>

<template>
  <div class="flex min-h-screen bg-[var(--color-base-bg)]">
    <Sidebar />
    <main
      class="flex-1 transition-all duration-300"
      :class="mainMargin"
    >
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
