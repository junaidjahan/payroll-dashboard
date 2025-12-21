<template>
  <span
    v-if="iconSvg"
    class="inline-flex items-center justify-center"
    :class="className"
    v-html="iconSvg"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Props {
  name: string
  className?: string
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  size: 16,
})

const iconSvg = ref<string>('')

const loadIcon = async () => {
  try {
    const iconPath = `/helper-files/icons/${props.name}.svg`
    const response = await fetch(iconPath)
    if (response.ok) {
      let svgText = await response.text()
      // Replace all fill attributes with currentColor for styling
      svgText = svgText.replace(/fill="[^"]*"/g, 'fill="currentColor"')
      // Also handle fill in style attributes
      svgText = svgText.replace(/fill:[^;"]*/g, 'fill:currentColor')
      iconSvg.value = svgText
    } else {
      console.error(`Icon ${props.name} not found at ${iconPath}`)
    }
  } catch (error) {
    console.error(`Error loading icon ${props.name}:`, error)
  }
}

onMounted(() => {
  loadIcon()
})

watch(() => props.name, () => {
  loadIcon()
})
</script>

