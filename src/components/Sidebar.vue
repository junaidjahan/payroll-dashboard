<template>
  <aside
    class="fixed left-0 top-0 h-screen bg-white border-r border-gray-100 flex flex-col z-50 transition-all duration-300"
    :class="isCollapsed ? 'w-[72px]' : 'w-[190px]'">
    <!-- Company Info Section -->
    <div class="px-4 pt-6 pb-4 flex flex-col items-center">
      <!-- Globe/Company Icon -->
      <div class="w-14 h-14 mb-3 text-[var(--color-base-secondary-200)]">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
          <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="1.5" fill="none" />
          <ellipse cx="32" cy="32" rx="12" ry="28" stroke="currentColor" stroke-width="1.5" fill="none" />
          <path d="M4 32h56" stroke="currentColor" stroke-width="1.5" />
          <path d="M8 18h48" stroke="currentColor" stroke-width="1.5" />
          <path d="M8 46h48" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </div>
      <transition name="fade">
        <div v-if="!isCollapsed" class="text-center">
          <div class="text-[var(--color-base-primary-500)] font-semibold text-sm">Boring Company</div>
          <div class="text-[var(--color-base-secondary-950)] text-xs mt-0.5">Mercans USA Ltd.</div>
        </div>
      </transition>
      <!-- Action Buttons -->
      <div class="flex items-center gap-4 mt-4">
        <button
          class="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-[var(--color-base-secondary-300)]"
          aria-label="Launchpad">
          <Icon name="launchpad" class="w-4 h-4" />
        </button>
        <button
          class="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-[var(--color-base-secondary-300)]"
          aria-label="News">
          <Icon name="news" class="w-4 h-4" />
        </button>
        <button
          class="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-[var(--color-base-secondary-300)]"
          aria-label="Notifications">
          <Icon name="notification" class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 overflow-y-auto py-2 scrollbar-thin">
      <ul class="space-y-0.5 px-3">
        <li v-for="link in allLinks" :key="link.path">
          <RouterLink v-if="link.enabled" :to="`/${link.path}`"
            class="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative" :class="isActive(link.path)
                ? 'bg-[var(--color-base-primary-100)] text-[var(--color-base-secondary-950)] border-l-[3px] border-[var(--color-base-primary-500)]'
                : 'text-[var(--color-base-secondary-950)] hover:bg-gray-50'
              ">
            <Icon :name="link.icon" class="w-[18px] h-[18px] flex-shrink-0 transition-colors"
              :class="isActive(link.path) ? 'text-[var(--color-base-secondary-950)]' : 'text-[var(--color-base-secondary-400)] group-hover:text-[var(--color-base-secondary-950)]'" />
            <transition name="fade">
              <span v-if="!isCollapsed" class="text-[13px] font-normal whitespace-nowrap">{{ formatTitle(link.title)
                }}</span>
            </transition>
          </RouterLink>
          <div v-else
            class="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--color-base-secondary-400)] cursor-not-allowed">
            <Icon :name="link.icon" class="w-[18px] h-[18px] flex-shrink-0 text-[var(--color-base-secondary-300)]" />
            <transition name="fade">
              <span v-if="!isCollapsed" class="text-[13px] font-normal whitespace-nowrap">{{ formatTitle(link.title)
                }}</span>
            </transition>
          </div>
        </li>
      </ul>
    </nav>

    <!-- Expand Button (shown when collapsed) -->
    <div v-if="isCollapsed" class="p-3">
      <button @click="toggle"
        class="w-full flex items-center justify-center p-2 hover:bg-gray-100 rounded transition-colors text-[var(--color-base-secondary-400)]"
        aria-label="Expand sidebar">
        <Icon name="chevron-right" class="w-4 h-4" />
      </button>
    </div>

    <!-- Copyright -->
    <div class="px-4 py-4 text-[11px] text-[var(--color-base-secondary-300)] text-center">
      <span v-if="!isCollapsed">Mercans © 2025</span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import Icon from './Icon.vue'
import { useSidebar } from '@/composables/useSidebar'
import menuLinks from '../../helper-files/menuLinks.json'

interface MenuLink {
  ordinal: number
  icon: string
  title: string
  path: string
  enabled: boolean
}

const route = useRoute()
const { isCollapsed, toggle } = useSidebar()

// All links sorted by ordinal (including disabled)
const allLinks = computed(() => {
  return (menuLinks as MenuLink[]).sort((a, b) => a.ordinal - b.ordinal)
})

const isActive = (path: string) => {
  return route.path === `/${path}` || route.path.startsWith(`/${path}/`)
}

const formatTitle = (title: string) => {
  return title
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
