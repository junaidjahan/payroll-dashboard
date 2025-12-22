<template>
  <div class="min-h-screen p-8">
    <!-- Page Header -->
    <div class="px-6 mb-5  border-b border-gray-100">
      <h1 class="text-2xl font-semibold ">My payslips</h1>
    </div>

    <!-- Currency Tabs Header -->
    <div class="bg-base-secondary-950 px-8 h-16 rounded-t-2xl">
      <div class="flex">
        <button v-for="currency in currencies" :key="currency" @click="activeCurrency = currency"
          class="px-6 py-3 text-sm font-medium transition-colors relative h-16" :class="activeCurrency === currency
            ? 'bg-base-primary-500 text-white'
            : 'text-white/70 hover:text-white'
            ">
          {{ currency }}({{ getPayslipCountByCurrencyComputed(currency) }})
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <div>
      <div class="bg-white rounded-lg shadow-sm rounded-t-none">
        <!-- Breadcrumb and Salary Evolution Button -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div class="flex items-center gap-2 text-sm">
            <span class="text-base font-medium">Payslips</span>
            <span class="text-gray-400">›</span>
            <span class="text-base font-semibold">{{ activeYear }}</span>
          </div>

          <!-- Salary Evolution Button -->
          <Tooltip>
            <TooltipTrigger as-child>
              <button @click="showSalaryEvolutionModal = true"
                class="w-10 h-10 flex items-center justify-center bg-base text-white bg-base-secondary-850 rounded-2xl hover:bg-base-secondary-950 transition-all duration-200 hover:scale-105">
                <Icon name="chart" class="size-6 transition-transform duration-300 hover:rotate-12" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="end" class="bg-base text-white">
              Salary Evolution
            </TooltipContent>
          </Tooltip>
        </div>

        <!-- Table -->
        <SalaryTable :payslips="filteredPayslips" :active-currency="activeCurrency" :expanded-rows="expandedRows"
          @toggle-row="toggleRow" @toggle-menu="toggleMenu" />

        <!-- Empty State -->
        <div v-if="filteredPayslips.length === 0" class="px-6 py-12 text-center">
          <p class="text-gray-500">No payslips found for {{ activeCurrency }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SalaryTable from './components/SalaryTable.vue'
import { usePayslip } from './composables/usePayslip'
import Icon from '@/components/core/Icon.vue'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const {
  payslips,
  getCurrencies,
  getPayslipCountByCurrency,
  filterPayslipsByCurrency,
  getActiveYear,
} = usePayslip()

// State
const activeCurrency = ref('USD')
const expandedRows = ref<Set<number>>(new Set())
const showSalaryEvolutionModal = ref(false)
const openMenuId = ref<number | null>(null)

// Get unique currencies from payslips
const currencies = computed(() => getCurrencies(payslips))

// Get payslip count by currency
const getPayslipCountByCurrencyComputed = (currency: string) => {
  return getPayslipCountByCurrency(payslips, currency)
}

// Filter payslips by active currency and sort by date (newest first)
const filteredPayslips = computed(() => {
  return filterPayslipsByCurrency(payslips, activeCurrency.value)
})

// Get active year from filtered payslips
const activeYear = computed(() => {
  return getActiveYear(filteredPayslips.value)
})

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
</script>
