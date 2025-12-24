<template>
  <component :is="iconComponent" v-if="iconComponent" :class="className" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { iconRegistry } from '@/components/icons'

interface Props {
  name: string
  className?: string
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  size: 16,
})

const iconComponent = computed(() => {
  const component = iconRegistry[props.name]
  if (!component) {
    console.warn(`Icon "${props.name}" not found in icon registry`)
  }
  return component || null
})
</script>
