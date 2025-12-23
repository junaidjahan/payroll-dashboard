<template>
  <Drawer direction="bottom" :open="open" @update:open="$emit('update:open', $event)">
    <DrawerContent class="min-h-[94vh]! rounded-t-4xl! focus:outline-none sm:max-w-[94%] mx-auto">
      <!-- Header -->
      <div
        class="flex items-center justify-between px-14 py-8 border-b border-b-base-secondary-950"
      >
        <div class="flex items-center gap-4">
          <!-- Company Name -->
          <span class="text-base-secondary-950 text-sm">Mercans USA Ltd.</span>

          <!-- Vertical Separator -->
          <div class="w-px h-12 bg-base-secondary-950"></div>

          <!-- Title Section -->
          <div class="flex flex-col">
            <h2 class="text-2xl font-semibold text-base-secondary-950">
              Gross/Net Salary Evolution
            </h2>
            <span class="text-xs text-base-secondary-950">TF2019 - Ted Ferguson</span>
          </div>
        </div>

        <!-- Close Button -->
        <DrawerClose as-child>
          <button
            class="size-12 flex items-center justify-center bg-base-secondary-850 text-white rounded-2xl group cursor-pointer transition-all duration-200 hover:bg-base-secondary-850"
          >
            <Icon
              name="close"
              class="size-9 group-hover:rotate-180 transition-transform duration-400"
            />
          </button>
        </DrawerClose>
      </div>

      <!-- Content -->
      <div class="p-6 h-full">
        <div
          class="border border-dashed border-gray-200 rounded-2xl h-full min-h-[70vh] p-6 flex items-center justify-center"
        >
          <!-- Empty State -->
          <EmptyContent alt="No designs" :containerClass="''" imageClass="mb-4" />
        </div>
      </div>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">
import { Drawer, DrawerClose, DrawerContent } from '@/components/ui/drawer'
import Icon from '@/components/core/Icon.vue'
import { EmptyContent } from '@/components/shared'

defineProps<{
  open: boolean
  currency?: string
}>()

defineEmits<{
  'update:open': [value: boolean]
}>()
</script>
