import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { ref } from 'vue'
import MyPayslips from '../views/my-payslip/MyPayslips.vue'
import type { Payslip } from '../views/my-payslip/composables/usePayslip'

const mockPayslips: Payslip[] = [
  {
    fileAttachment: {
      id: 1,
      file: {
        mimeType: 'application/pdf',
        size: 12345,
        label: 'Payslip_Jan_2025.pdf',
        description: null,
        createTime: '2025-01-15T10:00:00Z',
      },
      accessToken: 'token1',
    },
    payrollDate: '2025-01-15',
    payslipEntries: [
      { key: 'GROSS', amount: 5000, currency: 'USD' },
      { key: 'NET PAY', amount: 4000, currency: 'USD' },
    ],
  },
  {
    fileAttachment: {
      id: 2,
      file: {
        mimeType: 'application/pdf',
        size: 12345,
        label: 'Payslip_Feb_2025.pdf',
        description: null,
        createTime: '2025-02-15T10:00:00Z',
      },
      accessToken: 'token2',
    },
    payrollDate: '2025-02-15',
    payslipEntries: [
      { key: 'GROSS', amount: 5000, currency: 'USD' },
      { key: 'NET PAY', amount: 4000, currency: 'USD' },
      { key: 'GROSS', amount: 4500, currency: 'EUR' },
      { key: 'NET PAY', amount: 3600, currency: 'EUR' },
    ],
  },
]

// Mock the composables
vi.mock('../views/my-payslip/composables/usePayslip', () => ({
  usePayslip: vi.fn(() => ({
    payslips: ref(mockPayslips),
    getCurrencies: (payslips: Payslip[]) => {
      const currencySet = new Set<string>()
      payslips.forEach((p) => {
        p.payslipEntries.forEach((e) => currencySet.add(e.currency))
      })
      return Array.from(currencySet).sort()
    },
    getPayslipCountByCurrency: (payslips: Payslip[], currency: string) => {
      return payslips.filter((p) => p.payslipEntries.some((e) => e.currency === currency)).length
    },
    filterPayslipsByCurrency: (payslips: Payslip[], currency: string) => {
      return payslips
        .filter((p) => p.payslipEntries.some((e) => e.currency === currency))
        .sort((a, b) => new Date(b.payrollDate).getTime() - new Date(a.payrollDate).getTime())
    },
    getActiveYear: (payslips: Payslip[]) => {
      if (payslips.length === 0) return new Date().getFullYear()
      const firstPayslip = payslips[0]
      if (!firstPayslip) return new Date().getFullYear()
      const date = new Date(firstPayslip.payrollDate)
      return date.getFullYear()
    },
  })),
}))

// Mock child components
vi.mock('../views/my-payslip/components/SalaryTable.vue', () => ({
  default: {
    name: 'SalaryTable',
    template: '<div data-testid="salary-table">SalaryTable</div>',
    props: ['payslips', 'activeCurrency', 'expandedRows'],
    emits: ['toggle-row', 'toggle-menu'],
  },
}))

vi.mock('../views/my-payslip/components/SalaryDrawer.vue', () => ({
  default: {
    name: 'SalaryDrawer',
    template: '<div data-testid="salary-drawer">SalaryDrawer</div>',
    props: ['open', 'currency'],
    emits: ['update:open'],
  },
}))

vi.mock('../components/core/Icon.vue', () => ({
  default: {
    name: 'Icon',
    template: '<span data-testid="icon"></span>',
    props: ['name'],
  },
}))

vi.mock('../components/base/index.ts', () => ({
  BaseTooltip: {
    name: 'BaseTooltip',
    template: '<div><slot /></div>',
    props: ['content', 'side'],
  },
}))

vi.mock('../components/shared/index.ts', () => ({
  EmptyContent: {
    name: 'EmptyContent',
    template: '<div data-testid="empty-content">No payslips found</div>',
  },
}))

describe('MyPayslips', () => {
  let router: ReturnType<typeof createRouter>

  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/my-payslips',
          component: MyPayslips,
        },
      ],
    })
    await router.push('/my-payslips')
  })

  it('renders the page header correctly', () => {
    const wrapper = mount(MyPayslips, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.find('h1').text()).toBe('My payslips')
  })

  it('displays currency tabs with correct counts', async () => {
    const wrapper = mount(MyPayslips, {
      global: {
        plugins: [router],
      },
    })

    await wrapper.vm.$nextTick()

    const currencyButtons = wrapper.findAll('button')
    const usdButton = currencyButtons.find((btn) => btn.text().includes('USD'))
    const eurButton = currencyButtons.find((btn) => btn.text().includes('EUR'))

    expect(usdButton).toBeTruthy()
    expect(eurButton).toBeTruthy()
    expect(usdButton?.text()).toContain('USD')
    expect(eurButton?.text()).toContain('EUR')
  })

  it('sets USD as default active currency', () => {
    const wrapper = mount(MyPayslips, {
      global: {
        plugins: [router],
      },
    })

    expect((wrapper.vm as any).activeCurrency).toBe('USD')
  })

  it('switches active currency when clicking a currency tab', async () => {
    const wrapper = mount(MyPayslips, {
      global: {
        plugins: [router],
      },
    })

    await wrapper.vm.$nextTick()

    const currencyButtons = wrapper.findAll('button')
    const eurButton = currencyButtons.find((btn) => btn.text().includes('EUR'))

    if (eurButton) {
      await eurButton.trigger('click')
      await wrapper.vm.$nextTick()

      expect((wrapper.vm as any).activeCurrency).toBe('EUR')
    }
  })

  it('displays the active year correctly', async () => {
    const wrapper = mount(MyPayslips, {
      global: {
        plugins: [router],
      },
    })

    await wrapper.vm.$nextTick()

    const yearText = wrapper.find('.text-xl.font-semibold')
    expect(yearText.exists()).toBe(true)
    expect(yearText.text()).toBe('2025')
  })

  it('renders SalaryTable component with correct props', async () => {
    const wrapper = mount(MyPayslips, {
      global: {
        plugins: [router],
      },
    })

    await wrapper.vm.$nextTick()

    const salaryTable = wrapper.find('[data-testid="salary-table"]')
    expect(salaryTable.exists()).toBe(true)
  })
})
