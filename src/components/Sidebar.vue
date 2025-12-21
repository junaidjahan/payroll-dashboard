<template>
  <aside
    class="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 flex flex-col z-50 transition-all duration-300"
    :class="isCollapsed ? 'w-[72px]' : 'w-[190px]'"
  >
    <!-- Header with Logo and Collapse Button -->
    <div class="flex items-center justify-between px-3 py-4 border-b border-gray-100">
      <div class="flex items-center gap-2">
        <!-- HRB Logo -->
        <div class="w-9 h-9 rounded-full bg-[#1a5276] flex items-center justify-center flex-shrink-0">
          <span class="text-white font-bold text-[11px]">HRB</span>
        </div>
        <transition name="fade">
          <div v-if="!isCollapsed" class="leading-tight">
            <div class="text-[var(--color-base-secondary-950)] text-[11px] font-semibold">Employee</div>
            <div class="text-[var(--color-base-secondary-950)] text-[11px] font-semibold">Self Service</div>
          </div>
        </transition>
      </div>
      <!-- Collapse Button -->
      <button
        v-if="!isCollapsed"
        @click="toggle"
        class="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-[var(--color-base-secondary-400)]"
        aria-label="Collapse sidebar"
      >
        <Icon name="chevron-left" class="w-4 h-4" />
      </button>
    </div>

    <!-- Company Info Section -->
    <div class="px-4 pt-5 pb-3 flex flex-col items-center">
      <!-- Globe/Company Icon -->
      <div class="w-16 h-16 mb-2 text-[var(--color-base-secondary-200)]">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
          <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <ellipse cx="32" cy="32" rx="12" ry="28" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <path d="M4 32h56" stroke="currentColor" stroke-width="1.5"/>
          <path d="M8 18h48" stroke="currentColor" stroke-width="1.5"/>
          <path d="M8 46h48" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </div>
      <transition name="fade">
        <div v-if="!isCollapsed" class="text-center">
          <div class="text-[var(--color-base-primary-500)] font-semibold text-sm">Boring Company</div>
          <div class="text-[var(--color-base-secondary-950)] text-xs mt-0.5">Mercans USA Ltd.</div>
        </div>
      </transition>
      <!-- Action Buttons -->
      <div class="flex items-center gap-3 mt-4">
        <button
          class="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-[var(--color-base-secondary-300)]"
          aria-label="Rocket"
        >
          <Icon name="launchpad" class="w-4 h-4" />
        </button>
        <button
          class="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-[var(--color-base-secondary-300)]"
          aria-label="Calendar"
        >
          <Icon name="news" class="w-4 h-4" />
        </button>
        <button
          class="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-[var(--color-base-secondary-300)]"
          aria-label="Bell"
        >
          <Icon name="notification" class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 overflow-y-auto pt-2 scrollbar-thin">
      <ul class="space-y-0.5 px-2">
        <li v-for="link in allLinks" :key="link.path">
          <RouterLink
            v-if="link.enabled"
            :to="`/${link.path}`"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden"
            :class="
              isActive(link.path)
                ? 'bg-[var(--color-base-primary-50)] text-[var(--color-base-secondary-950)]'
                : 'text-[var(--color-base-secondary-950)] hover:bg-gray-50'
            "
          >
            <!-- Active indicator bar -->
            <div
              v-if="isActive(link.path)"
              class="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[var(--color-base-primary-500)] rounded-r"
            />
            <Icon
              :name="link.icon"
              class="w-[18px] h-[18px] flex-shrink-0 transition-colors"
              :class="isActive(link.path) ? 'text-[var(--color-base-secondary-950)]' : 'text-[var(--color-base-secondary-400)] group-hover:text-[var(--color-base-secondary-600)]'"
            />
            <transition name="fade">
              <span
                v-if="!isCollapsed"
                class="text-[13px] whitespace-nowrap"
                :class="isActive(link.path) ? 'font-medium' : 'font-normal'"
                >{{ formatTitle(link.title) }}</span
              >
            </transition>
          </RouterLink>
          <div
            v-else
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[var(--color-base-secondary-400)] cursor-not-allowed"
          >
            <Icon
              :name="link.icon"
              class="w-[18px] h-[18px] flex-shrink-0 text-[var(--color-base-secondary-300)]"
            />
            <transition name="fade">
              <span
                v-if="!isCollapsed"
                class="text-[13px] font-normal whitespace-nowrap"
                >{{ formatTitle(link.title) }}</span
              >
            </transition>
          </div>
        </li>
      </ul>
    </nav>

    <!-- Expand Button (shown when collapsed) -->
    <div v-if="isCollapsed" class="p-3">
      <button
        @click="toggle"
        class="w-full flex items-center justify-center p-2 hover:bg-gray-100 rounded transition-colors text-[var(--color-base-secondary-400)]"
        aria-label="Expand sidebar"
      >
        <Icon name="chevron-right" class="w-4 h-4" />
      </button>
    </div>

    <!-- Copyright -->
    <div class="px-4 py-4 text-[11px] text-gray-400 text-center">
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

