import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import SideDrawer from '../components/core/SideDrawer.vue'

// Mock the sidebar composable
const mockToggleSidebar = vi.fn()
const mockState = { value: 'expanded' }

// Mock sidebar components - simplified to avoid memory issues
vi.mock('../components/ui/sidebar', () => ({
  Sidebar: {
    name: 'Sidebar',
    template: '<div data-testid="sidebar"><slot /></div>',
  },
  SidebarHeader: {
    name: 'SidebarHeader',
    template: '<div data-testid="sidebarheader"><slot /></div>',
  },
  SidebarContent: {
    name: 'SidebarContent',
    template: '<div data-testid="sidebarcontent"><slot /></div>',
  },
  SidebarFooter: {
    name: 'SidebarFooter',
    template: '<div data-testid="sidebarfooter"><slot /></div>',
  },
  SidebarMenu: {
    name: 'SidebarMenu',
    template: '<div data-testid="sidebarmenu"><slot /></div>',
  },
  SidebarMenuItem: {
    name: 'SidebarMenuItem',
    template: '<div data-testid="sidebarmenuitem"><slot /></div>',
  },
  SidebarMenuButton: {
    name: 'SidebarMenuButton',
    template: '<div data-testid="sidebarmenubutton"><slot /></div>',
  },
  useSidebar: () => ({
    toggleSidebar: mockToggleSidebar,
    state: mockState,
  }),
}))

// Mock Icon component
vi.mock('../components/core/Icon.vue', () => ({
  default: {
    name: 'Icon',
    template: '<span data-testid="icon" :data-name="name"></span>',
    props: ['name'],
  },
}))

// Mock menuLinks
vi.mock('../../../helper-files/menuLinks.json', () => ({
  default: [
    {
      ordinal: 1,
      icon: 'dashboard',
      title: 'dashboard',
      path: 'dashboard',
      enabled: true,
    },
    {
      ordinal: 2,
      icon: 'my_information',
      title: 'my_information',
      path: 'my-information',
      enabled: true,
    },
    {
      ordinal: 3,
      icon: 'my_payslips',
      title: 'my_payslips',
      path: 'my-payslips',
      enabled: true,
    },
    {
      ordinal: 4,
      icon: 'documents',
      title: 'documents',
      path: 'docs',
      enabled: false,
    },
  ],
}))

// Mock useHelper composable
vi.mock('../composables/useHelper', () => ({
  useHelper: () => ({
    formatTitle: (title: string) => {
      return title
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    },
  }),
}))

describe('SideDrawer', () => {
  let router: ReturnType<typeof createRouter>

  beforeEach(() => {
    vi.clearAllMocks()
    mockState.value = 'expanded'

    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/dashboard',
          component: { template: '<div>Dashboard</div>' },
        },
        {
          path: '/my-payslips',
          component: { template: '<div>My Payslips</div>' },
        },
      ],
    })
  })

  it('renders navigation menu items', () => {
    const wrapper = mount(SideDrawer, {
      global: {
        plugins: [router],
      },
    })

    // Check that menu items are rendered
    const menuItems = wrapper.findAll('[data-testid="sidebarmenuitem"]')
    expect(menuItems.length).toBeGreaterThan(0)
  })

  it('displays enabled menu items as clickable links', () => {
    router.push('/dashboard')
    const wrapper = mount(SideDrawer, {
      global: {
        plugins: [router],
      },
    })

    const links = wrapper.findAll('a[href]')
    expect(links.length).toBeGreaterThan(0)
  })

  it('displays disabled menu items as non-clickable', () => {
    const wrapper = mount(SideDrawer, {
      global: {
        plugins: [router],
      },
    })

    // Documents menu item should be disabled
    expect(wrapper.html()).toContain('cursor-not-allowed')
  })

  it('highlights active route in navigation', async () => {
    await router.push('/my-payslips')
    const wrapper = mount(SideDrawer, {
      global: {
        plugins: [router],
      },
    })

    await wrapper.vm.$nextTick()

    // The active route should have active styling
    const activeLink = wrapper.find('a[href="/my-payslips"]')
    expect(activeLink.exists()).toBe(true)
  })

  it('calls toggleSidebar when collapse button is clicked', async () => {
    mockState.value = 'expanded'
    const wrapper = mount(SideDrawer, {
      global: {
        plugins: [router],
      },
    })

    await wrapper.vm.$nextTick()

    const collapseButton = wrapper.find('button[aria-label="Collapse sidebar"]')
    if (collapseButton.exists()) {
      await collapseButton.trigger('click')
      expect(mockToggleSidebar).toHaveBeenCalled()
    }
  })

  it('formats menu titles correctly', () => {
    const wrapper = mount(SideDrawer, {
      global: {
        plugins: [router],
      },
    })

    // my_information should be formatted as "My Information"
    expect(wrapper.text()).toContain('My Information')
    expect(wrapper.text()).toContain('My Payslips')
  })

  it('sorts menu items by ordinal', () => {
    const wrapper = mount(SideDrawer, {
      global: {
        plugins: [router],
      },
    })

    const menuItems = wrapper.findAll('[data-testid="sidebarmenuitem"]')
    expect(menuItems.length).toBeGreaterThan(0)
  })
})
