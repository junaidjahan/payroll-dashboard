<template>
  <Sidebar variant="sidebar" collapsible="icon" class="border-r border-subtle-100">
    <!-- Header with Logo and Collapse Button -->
    <SidebarHeader class="bg-base-secondary-950 border-b relative border-gray-100">
      <div class="flex items-center justify-between px-3 py-4" :class="{ 'px-0!': isCollapsed }">
        <div class="flex items-center gap-2">
          <!-- HRB Logo -->
          <div class="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
            <span class="text-base-secondary-950 font-bold text-[11px]">HRB</span>
          </div>
          <div class="leading-tight group-data-[collapsible=icon]:hidden">
            <div class="text-white text-sm font-semibold">Employee</div>
            <div class="text-white text-sm font-semibold">Self Service</div>
          </div>
        </div>
        <button
          @click="toggleSidebar"
          class="w-4 h-10 flex items-center absolute right-0 top-[30%] justify-center border border-subtle-100 border-r-0 rounded-tl-sm rounded-bl-sm px-0! hover:bg-white/10 transition-colors cursor-pointer text-white group-data-[collapsible=icon]:hidden"
          aria-label="Collapse sidebar"
        >
          <Icon name="chevron-left" class="w-4 h-4" />
        </button>
        <!-- Expand button when collapsed -->
        <button
          v-if="isCollapsed"
          @click="toggleSidebar"
          class="w-4 h-10 ml-[3px] flex items-center bg-base-secondary-950 justify-center border border-l-0 border-subtle-100 rounded-tr-sm rounded-br-sm hover:bg-base-secondary-950/90 cursor-pointer transition-colors text-white"
          aria-label="Expand sidebar"
        >
          <Icon name="chevron-right" class="w-4 h-4" />
        </button>
      </div>
    </SidebarHeader>

    <!-- Company Info Section -->
    <SidebarContent class="bg-white!">
      <div
        class="px-4 pt-5 pb-3 flex flex-col items-center border-b border-subtle-200"
        :class="{ 'px-0!': isCollapsed }"
      >
        <!-- Globe/Company Icon -->
        <div class="size-9 mb-2 text-base-secondary-200">
          <img src="@/assets/svgs/company-logo.svg" class="w-full h-full" />
        </div>
        <div class="text-center group-data-[collapsible=icon]:hidden">
          <div class="text-gray-dark font-semibold">Boring Company</div>
          <div class="text-base-secondary-950 text-sm font-medium mt-0.5">Mercans USA Ltd.</div>
        </div>
        <!-- Action Buttons -->
        <div class="flex items-center gap-3 gap-x-1 mt-4 w-[80%] justify-between">
          <button
            class="w-full cursor-pointer h-8 relative flex items-center justify-center hover:bg-base-primary-200 rounded transition-colors text-base-secondary-850"
            aria-label="Launchpad"
          >
            <Icon name="launchpad" class="w-4 h-4" />
          </button>
          <button
            v-if="!isCollapsed"
            class="w-full cursor-pointer h-8 relative flex items-center justify-center hover:bg-base-primary-200 rounded transition-colors text-base-secondary-850"
            aria-label="News"
          >
            <Icon name="news" class="w-4 h-4" />
            <div
              class="bg-badge-warning size-[7px] rounded-xs absolute top-1 outline-2 outline-white right-4"
            ></div>
          </button>
          <button
            v-if="!isCollapsed"
            class="w-full cursor-pointer h-8 relative flex items-center justify-center hover:bg-base-primary-200 rounded transition-colors text-base-secondary-850"
            aria-label="Notifications"
          >
            <Icon name="notification" class="w-4 h-4" />
            <div
              class="bg-badge-warning size-[7px] rounded-xs absolute top-1 outline-2 outline-white right-4"
            ></div>
          </button>
        </div>
      </div>

      <!-- Navigation Menu -->
      <SidebarMenu class="px-2 space-y-0.5 mt-4">
        <SidebarMenuItem v-for="link in allLinks" :key="link.path">
          <SidebarMenuButton
            v-if="link.enabled"
            :as-child="true"
            :class="
              isActive(link.path)
                ? 'bg-base-primary-200 border border-base-secondary-950 text-base-secondary-950 data-[state=open]:bg-base-primary-50 hover:bg-base-primary-200'
                : 'text-base-secondary-850 hover:bg-base-primary-200 border border-transparent'
            "
          >
            <RouterLink
              :to="`/${link.path}`"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200"
            >
              <Icon
                :name="link.icon"
                class="size-4.5 shrink-0 transition-colors text-base-secondary-950"
                :class="{ '-ml-0.5': isCollapsed }"
              />
              <span
                class="text-sm font-semibold whitespace-nowrap group-data-[collapsible=icon]:hidden"
              >
                {{ formatTitle(link.title) }}
              </span>
            </RouterLink>
          </SidebarMenuButton>
          <div
            v-else
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground cursor-not-allowed group-data-[collapsible=icon]:justify-center"
          >
            <Icon :name="link.icon" class="size-4.5 shrink-0 text-muted-foreground" />
            <span
              class="text-sm font-semibold whitespace-nowrap group-data-[collapsible=icon]:hidden"
            >
              {{ formatTitle(link.title) }}
            </span>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>

    <!-- Footer -->
    <SidebarFooter v-if="!isCollapsed" class="bg-nexum-100">
      <div
        class="px-4 py-4 text-xs text-subtle-200 text-center group-data-[collapsible=icon]:hidden"
      >
        Mercans © 2025
      </div>
    </SidebarFooter>
  </Sidebar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import Icon from '@/components/core/Icon.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar as useSidebarContext,
} from '@/components/ui/sidebar'
import menuLinks from '../../../helper-files/menuLinks.json'
import { useHelper } from '@/composables'

interface MenuLink {
  ordinal: number
  icon: string
  title: string
  path: string
  enabled: boolean
}

const route = useRoute()
const { toggleSidebar, state } = useSidebarContext()
const isCollapsed = computed(() => state.value === 'collapsed')
const { formatTitle } = useHelper()
// All links sorted by ordinal (including disabled)
const allLinks = computed(() => {
  return (menuLinks as MenuLink[]).sort((a, b) => a.ordinal - b.ordinal)
})

const isActive = (path: string) => {
  return route.path === `/${path}` || route.path.startsWith(`/${path}/`)
}
</script>
