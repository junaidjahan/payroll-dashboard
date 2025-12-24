<template>
  <div class="min-h-screen p-4 md:p-8">
    <!-- Page Header -->
    <div class="px-4 md:px-6 mb-5 border-b border-gray-100">
      <h1 class="text-2xl font-semibold">My payslips</h1>
    </div>

    <!-- Currency Tabs Header -->
    <div class="bg-base-secondary-950 px-8 h-16 rounded-t-2xl">
      <div class="flex">
        <button
          v-for="currency in currencies"
          :key="currency"
          @click="activeCurrency = currency"
          class="cursor-pointer px-6 py-3 text-sm font-medium transition-colors relative h-16"
          :class="
            activeCurrency === currency
              ? 'bg-base-primary-500 text-white'
              : 'text-white hover:bg-base-secondary-850/50'
          "
        >
          {{ currency }}({{ getPayslipCountByCurrencyComputed(currency) }})
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <div>
      <div class="bg-white rounded-lg shadow-sm rounded-t-none min-h-[calc(100vh-20rem)] p-6">
        <!-- Breadcrumb and Salary Evolution Button -->
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <span class="text-xl">Payslips</span>
            <span class="text-gray-400">›</span>
            <span class="text-xl font-semibold">{{ activeYear }}</span>
          </div>

          <!-- Salary Evolution Button -->
          <BaseTooltip content="Salary Evolution" side="left">
            <button
              @click="showSalaryEvolutionModal = true"
              class="w-10 h-10 flex items-center justify-center bg-base text-white cursor-pointer bg-base-secondary-850 rounded-2xl transition-all duration-200 group"
            >
              <Icon
                name="chart"
                class="size-6 transition-transform duration-100 group-hover:scale-110"
              />
            </button>
          </BaseTooltip>
        </div>

        <!-- Table -->
        <SalaryTable
          :payslips="filteredPayslips"
          :active-currency="activeCurrency"
          :expanded-rows="expandedRows"
          @toggle-row="toggleRow"
          @toggle-menu="toggleMenu"
        />

        <!-- Empty State -->
        <div
          v-if="filteredPayslips.length === 0"
          class="flex items-center justify-center min-h-[400px]"
        >
          <EmptyContent />
        </div>
      </div>
    </div>

    <!-- Salary Evolution Drawer -->
    <SalaryDrawer v-model:open="showSalaryEvolutionModal" :currency="activeCurrency" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SalaryTable from './components/SalaryTable.vue'
import SalaryDrawer from './components/SalaryDrawer.vue'
import { usePayslip } from './composables/usePayslip'
import Icon from '@/components/core/Icon.vue'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { BaseTooltip } from '@/components/base'
import { EmptyContent } from '@/components/shared'

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
const currencies = computed(() => getCurrencies(payslips.value))

// Get payslip count by currency
const getPayslipCountByCurrencyComputed = (currency: string) => {
  return getPayslipCountByCurrency(payslips.value, currency)
}

// Filter payslips by active currency and sort by date (newest first)
const filteredPayslips = computed(() => {
  return filterPayslipsByCurrency(payslips.value, activeCurrency.value)
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
