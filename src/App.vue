<script setup lang="ts">
import Sidebar from './components/core/SideDrawer.vue'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <Sidebar />
    <SidebarInset>
      <!-- Mobile trigger button -->
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:hidden">
        <SidebarTrigger class="-ml-1" />
      </header>
      <main class="flex-1 overflow-auto bg-[var(--color-base-bg)]">
        <RouterView />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped></style>
