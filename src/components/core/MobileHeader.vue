<script setup lang="ts">
import { SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
  <!-- Mobile trigger button -->
  <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4 md:hidden justify-between">
    <div class="flex items-center gap-2">
      <img src="@/assets/svgs/company-logo.svg" class="w-8 h-8" />
      <div class="text-center">
        <div class="text-base-secondary-950 text-sm font-medium">Boring Company</div>
        <div class="text-subtle-200 text-xs font-medium mt-0.5">Mercans USA Ltd.</div>
      </div>
    </div>
    <SidebarTrigger class="-ml-1" icon="menu" />
  </header>
</template>
