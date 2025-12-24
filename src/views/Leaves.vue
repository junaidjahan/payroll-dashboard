<template>
  <div class="min-h-screen p-4 md:p-8 flex flex-col">
    <!-- Page Header -->
    <div class="px-4 md:px-6 mb-5 border-b border-gray-100">
      <h1 class="text-2xl font-semibold">Leaves</h1>
    </div>

    <!-- Empty State -->
    <div class="flex-1 flex items-center justify-center">
      <EmptyContent />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EmptyContent } from '@/components/shared'
</script>
