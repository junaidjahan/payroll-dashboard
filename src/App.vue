<script setup lang="ts">
import { SideDrawer, MobileHeader } from './components/core'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <SideDrawer />
    <SidebarInset>
      <MobileHeader />
      <main class="flex-1 overflow-auto bg-nexum-100">
        <RouterView />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped></style>
