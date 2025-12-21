<template>
  <div class="min-h-screen bg-[var(--color-base-bg)]">
    <!-- Page Header -->
    <div class="px-8 py-5 bg-white border-b border-gray-100">
      <h1 class="text-xl font-semibold text-[var(--color-base-secondary-950)]">My payslips</h1>
    </div>

    <!-- Currency Tabs Header -->
    <div class="bg-[var(--color-base-secondary-950)] px-8">
      <div class="flex">
        <button v-for="currency in currencies" :key="currency" @click="activeCurrency = currency"
          class="px-6 py-3 text-sm font-medium transition-colors relative" :class="activeCurrency === currency
              ? 'bg-[var(--color-base-primary-500)] text-white'
              : 'text-white/70 hover:text-white'
            ">
          {{ currency }}({{ getPayslipCountByCurrency(currency) }})
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <div class="p-8">
      <div class="bg-white rounded-lg shadow-sm">
        <!-- Breadcrumb and Salary Evolution Button -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div class="flex items-center gap-2 text-sm">
            <span class="text-[var(--color-base-secondary-950)] font-medium">Payslips</span>
            <span class="text-gray-400">›</span>
            <span class="text-[var(--color-base-secondary-950)] font-semibold">{{ activeYear }}</span>
          </div>

          <!-- Salary Evolution Button -->
          <div class="relative group">
            <button @click="showSalaryEvolutionModal = true"
              class="w-10 h-10 flex items-center justify-center bg-[var(--color-base-secondary-950)] text-white rounded-lg hover:bg-[var(--color-base-secondary-900)] transition-all duration-200 group-hover:scale-105">
              <svg class="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 3v18h18" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M18 9l-5 5-4-4-3 3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <!-- Tooltip -->
            <div
              class="absolute right-0 top-full mt-2 px-3 py-1.5 bg-[var(--color-base-secondary-950)] text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
              Salary Evolution
              <div class="absolute -top-1 right-4 w-2 h-2 bg-[var(--color-base-secondary-950)] rotate-45"></div>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-100">
                <th class="w-12 px-4 py-3"></th>
                <th class="w-12 px-2 py-3 text-left text-xs font-medium text-gray-500">#</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 min-w-[120px]">Period</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500">Payslips</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 min-w-[130px]">Gross salary</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 min-w-[130px]">Net pay</th>
                <th class="w-12 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(payslip, index) in filteredPayslips" :key="payslip.fileAttachment.id">
                <!-- Main Row -->
                <tr class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer"
                  @click="toggleRow(payslip.fileAttachment.id)">
                  <td class="px-4 py-3">
                    <button
                      class="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-transform duration-200">
                      <svg class="w-4 h-4 transform transition-transform duration-200"
                        :class="{ 'rotate-90': expandedRows.has(payslip.fileAttachment.id) }" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </button>
                  </td>
                  <td class="px-2 py-3 text-sm text-[var(--color-base-secondary-950)]">
                    {{ filteredPayslips.length - index }}
                  </td>
                  <td class="px-4 py-3">
                    <span class="text-sm font-medium text-[var(--color-base-primary-500)]">
                      {{ formatPeriod(payslip.payrollDate) }}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <span class="text-sm text-[var(--color-base-secondary-950)]">
                      {{ payslip.fileAttachment.file.label }}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <span
                      class="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-[#e8f5e9] text-[#2e7d32]">
                      {{ formatCurrency(getGrossSalary(payslip), activeCurrency) }}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <span
                      class="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-[#e3f2fd] text-[#1565c0]">
                      {{ formatCurrency(getNetPay(payslip), activeCurrency) }}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <button @click.stop="toggleMenu(payslip.fileAttachment.id)"
                      class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="6" r="1.5" />
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="12" cy="18" r="1.5" />
                      </svg>
                    </button>
                  </td>
                </tr>

                <!-- Expanded PDF Row -->
                <tr v-if="expandedRows.has(payslip.fileAttachment.id)">
                  <td colspan="7" class="px-4 py-4 bg-gray-50">
                    <div class="border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <iframe :src="`/helper-files/payslipsFiles/${payslip.fileAttachment.accessToken}.pdf`"
                        class="w-full h-[500px]" :title="payslip.fileAttachment.file.label" />
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredPayslips.length === 0" class="px-6 py-12 text-center">
          <p class="text-gray-500">No payslips found for {{ activeCurrency }}</p>
        </div>
      </div>
    </div>

    <!-- Salary Evolution Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showSalaryEvolutionModal" class="fixed inset-0 z-50 flex items-center justify-center">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="showSalaryEvolutionModal = false" />

          <!-- Modal Content -->
          <div
            class="relative w-full h-full max-w-[95vw] max-h-[95vh] m-4 bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <!-- Modal Header -->
            <div
              class="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[var(--color-base-secondary-950)]">
              <h2 class="text-lg font-semibold text-white">Salary Evolution</h2>
              <button @click="showSalaryEvolutionModal = false"
                class="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>

            <!-- Modal Body -->
            <div class="p-6 overflow-auto h-[calc(100%-60px)]">
              <!-- Currency Selector -->
              <div class="flex gap-2 mb-6">
                <button v-for="currency in currencies" :key="currency" @click="modalCurrency = currency"
                  class="px-4 py-2 text-sm font-medium rounded-lg transition-colors" :class="modalCurrency === currency
                      ? 'bg-[var(--color-base-primary-500)] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    ">
                  {{ currency }}
                </button>
              </div>

              <!-- Chart -->
              <div class="bg-gray-50 rounded-xl p-8 min-h-[400px]">
                <div class="flex flex-col h-full">
                  <h3 class="text-lg font-medium text-[var(--color-base-secondary-950)] mb-6">
                    {{ modalCurrency }} Salary Trend
                  </h3>

                  <!-- Simple Bar Chart -->
                  <div class="flex-1 flex items-end gap-4 px-4">
                    <div v-for="(data, index) in getSalaryEvolutionData(modalCurrency)" :key="index"
                      class="flex-1 flex flex-col items-center gap-2">
                      <div class="w-full flex flex-col items-center gap-1">
                        <span class="text-xs text-gray-500">{{ formatCurrency(data.gross, modalCurrency) }}</span>
                        <div class="w-full bg-[#4caf50] rounded-t transition-all duration-500"
                          :style="{ height: `${(data.gross / maxSalary(modalCurrency)) * 250}px` }" />
                      </div>
                      <div class="w-full flex flex-col items-center gap-1">
                        <div class="w-full bg-[#2196f3] rounded-t transition-all duration-500"
                          :style="{ height: `${(data.net / maxSalary(modalCurrency)) * 250}px` }" />
                        <span class="text-xs text-gray-500">{{ formatCurrency(data.net, modalCurrency) }}</span>
                      </div>
                      <span class="text-xs font-medium text-gray-600 mt-2">{{ data.period }}</span>
                    </div>
                  </div>

                  <!-- Legend -->
                  <div class="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-200">
                    <div class="flex items-center gap-2">
                      <div class="w-4 h-4 bg-[#4caf50] rounded" />
                      <span class="text-sm text-gray-600">Gross Salary</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="w-4 h-4 bg-[#2196f3] rounded" />
                      <span class="text-sm text-gray-600">Net Pay</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import payslipsData from '../../helper-files/payslips.json'

interface PayslipEntry {
  key: string
  amount: number
  currency: string
}

interface Payslip {
  fileAttachment: {
    id: number
    file: {
      mimeType: string
      size: number
      label: string
      description: string | null
      createTime: string
    }
    accessToken: string
  }
  payrollDate: string
  payslipEntries: PayslipEntry[]
}

const payslips = payslipsData as Payslip[]

// State
const activeCurrency = ref('USD')
const modalCurrency = ref('USD')
const expandedRows = ref<Set<number>>(new Set())
const showSalaryEvolutionModal = ref(false)
const openMenuId = ref<number | null>(null)

// Get unique currencies from payslips
const currencies = computed(() => {
  const currencySet = new Set<string>()
  payslips.forEach(p => {
    p.payslipEntries.forEach(e => currencySet.add(e.currency))
  })
  return Array.from(currencySet).sort()
})

// Get payslip count by currency
const getPayslipCountByCurrency = (currency: string) => {
  return payslips.filter(p =>
    p.payslipEntries.some(e => e.currency === currency)
  ).length
}

// Filter payslips by active currency and sort by date (newest first)
const filteredPayslips = computed(() => {
  return payslips
    .filter(p => p.payslipEntries.some(e => e.currency === activeCurrency.value))
    .sort((a, b) => new Date(b.payrollDate).getTime() - new Date(a.payrollDate).getTime())
})

// Get active year from filtered payslips
const activeYear = computed(() => {
  const firstPayslip = filteredPayslips.value[0]
  if (!firstPayslip) return new Date().getFullYear()
  const date = new Date(firstPayslip.payrollDate)
  return date.getFullYear()
})

// Format period (e.g., "April 2025")
const formatPeriod = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

// Format currency
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount) + ' ' + currency
}

// Get gross salary from payslip
const getGrossSalary = (payslip: Payslip) => {
  const entry = payslip.payslipEntries.find(
    e => e.key === 'GROSS' && e.currency === activeCurrency.value
  )
  return entry?.amount || 0
}

// Get net pay from payslip
const getNetPay = (payslip: Payslip) => {
  const entry = payslip.payslipEntries.find(
    e => e.key === 'NET PAY' && e.currency === activeCurrency.value
  )
  return entry?.amount || 0
}

// Toggle row expansion
const toggleRow = (id: number) => {
  if (expandedRows.value.has(id)) {
    expandedRows.value.delete(id)
  } else {
    expandedRows.value.add(id)
  }
}

// Toggle menu
const toggleMenu = (id: number) => {
  openMenuId.value = openMenuId.value === id ? null : id
}

// Salary evolution data for modal
const getSalaryEvolutionData = (currency: string) => {
  const data = payslips
    .filter(p => p.payslipEntries.some(e => e.currency === currency))
    .sort((a, b) => new Date(a.payrollDate).getTime() - new Date(b.payrollDate).getTime())
    .map(p => {
      const gross = p.payslipEntries.find(e => e.key === 'GROSS' && e.currency === currency)?.amount || 0
      const net = p.payslipEntries.find(e => e.key === 'NET PAY' && e.currency === currency)?.amount || 0
      const date = new Date(p.payrollDate)
      return {
        period: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        gross,
        net,
      }
    })
  return data
}

// Max salary for chart scaling
const maxSalary = (currency: string) => {
  const data = getSalaryEvolutionData(currency)
  return Math.max(...data.map(d => d.gross), 1)
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}

@keyframes zoom-in-95 {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-in {
  animation: zoom-in-95 0.3s ease-out;
}
</style>

