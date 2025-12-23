<template>
  <div
    class="flex flex-col items-center justify-center text-center min-h-full"
    :class="containerClass"
  >
    <img src="@/assets/svgs/empty-design.svg" :alt="alt" :class="imageClass" />
    <p v-if="message" class="text-gray-500 text-base mt-4">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface EmptyContentProps {
  alt?: string
  message?: string
  containerClass?: HTMLAttributes['class']
  imageClass?: HTMLAttributes['class']
}

withDefaults(defineProps<EmptyContentProps>(), {
  alt: 'Empty state',
  message: '',
  containerClass: '',
  imageClass: 'mb-6',
})
</script>
