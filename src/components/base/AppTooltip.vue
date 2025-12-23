<script setup lang="ts">
import type { TooltipContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface AppTooltipProps {
  content?: string
  side?: TooltipContentProps['side']
  align?: TooltipContentProps['align']
  contentClass?: HTMLAttributes['class']
  delayDuration?: number
  disabled?: boolean
}

const props = withDefaults(defineProps<AppTooltipProps>(), {
  side: 'top',
  align: 'center',
  delayDuration: 200,
  disabled: false,
})

const slots = defineSlots<{
  default?: () => unknown
  content?: () => unknown
}>()
</script>

<template>
  <Tooltip :disabled="disabled" :delay-duration="delayDuration">
    <TooltipTrigger as-child>
      <slot />
    </TooltipTrigger>
    <TooltipContent
      :side="side"
      :align="align"
      :class="cn('max-w-xs bg-base-secondary-950 py-2.5 text-white', contentClass)"
    >
      <slot v-if="slots.content" name="content" />
      <template v-else-if="content">
        {{ content }}
      </template>
    </TooltipContent>
  </Tooltip>
</template>
