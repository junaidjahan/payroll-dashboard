<template>
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="border-b border-nexum-50 pb-5!">
          <th class="w-8 px-4 py-4"></th>
          <th class="w-12 px-2 pl-4 py-4 text-left text-xs font-semibold text-base-secondary-850">
            #
          </th>
          <th
            class="px-4 py-4 text-left text-xs font-semibold text-base-secondary-850 min-w-[120px]"
          >
            Period
          </th>
          <th class="px-4 py-4 text-left text-xs font-semibold text-base-secondary-850">
            Payslips
          </th>
          <th
            class="px-4 py-4 text-left text-xs font-semibold text-base-secondary-850 min-w-[130px]"
          >
            Gross salary
          </th>
          <th
            class="px-4 py-4 text-left text-xs font-semibold text-base-secondary-850 min-w-[130px]"
          >
            Net pay
          </th>
          <th class="w-12 px-4 py-4"></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(payslip, index) in payslips" :key="payslip.fileAttachment.id">
          <!-- Main Row -->
          <tr
            class="group hover:bg-nexum-100 transition-colors cursor-pointer"
            @click="$emit('toggle-row', payslip.fileAttachment.id)"
          >
            <BaseTooltip content="Expand" side="top">
              <td
                class="cursor-pointer px-1 py-3 border-l max-w-8! border-t border-b bg-nexum-100 border-nexum-50 border-l-nexum-100 group-hover:bg-base-secondary-950 group-hover:border-base-secondary-950 transition-colors"
              >
                <button
                  class="w-6 h-6 flex items-center justify-center text-subtle-200 group-hover:text-white group-hover:translate-y-2 transition-transform duration-200"
                >
                  <svg
                    class="w-4 h-4 cursor-pointer transform transition-transform duration-200"
                    :class="{ 'rotate-180': expandedRows.has(payslip.fileAttachment.id) }"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </td>
            </BaseTooltip>
            <td
              class="px-2 py-3 pl-4 text-sm border-t border-b border-nexum-50 group-hover:border-base-secondary-950 transition-colors"
            >
              {{ payslips.length - index }}
            </td>
            <td
              class="px-4 py-3 border-t border-b border-nexum-50 group-hover:border-base-secondary-950 transition-colors"
            >
              <span class="text-sm font-medium text-base-primary-500">
                {{ formatPeriod(payslip.payrollDate) }}
              </span>
            </td>
            <td
              class="px-4 py-3 border-t border-b border-nexum-50 group-hover:border-base-secondary-950 transition-colors"
            >
              <span class="text-sm">
                {{ payslip.fileAttachment.file.label }}
              </span>
            </td>
            <td
              class="px-4 py-3 border-t border-b border-nexum-50 group-hover:border-base-secondary-950 transition-colors"
            >
              <span
                class="inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium bg-gray-light text-base-secondary-950"
              >
                {{ formatCurrency(getGrossSalary(payslip, activeCurrency), activeCurrency) }}
              </span>
            </td>
            <td
              class="px-4 py-3 border-t border-b border-nexum-50 group-hover:border-base-secondary-950 transition-colors"
            >
              <span
                class="inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium bg-success-100 text-success-200"
              >
                {{ formatCurrency(getNetPay(payslip, activeCurrency), activeCurrency) }}
              </span>
            </td>
            <td
              class="px-4 py-3 border-r border-t border-b border-nexum-50 border-r-transparent group-hover:border-base-secondary-950 transition-colors"
            >
              <DropdownMenu>
                <DropdownMenuTrigger @click.stop as-child>
                  <div>
                    <BaseTooltip content="More" side="left">
                      <button
                        class="w-8 h-8 flex hover:bg-subtle-100/15 rounded-lg items-center justify-center cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Icon name="vertical-dots" class="text-base-secondary-950" />
                      </button>
                    </BaseTooltip>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="shadow-xl/5 w-56 border-gray-100">
                  <DropdownMenuItem
                    class="cursor-pointer text-base-secondary-950 hover:bg-base-primary-100! p-2.5 px-4"
                  >
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    class="cursor-pointer text-base-secondary-950 hover:bg-base-primary-100! p-2.5 px-4"
                  >
                    Print
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>

          <!-- Expanded PDF Row -->
          <tr v-if="expandedRows.has(payslip.fileAttachment.id)">
            <td colspan="7" class="px-4 py-4 bg-gray-50">
              <div class="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <iframe
                  :src="`/helper-files/payslipsFiles/${payslip.fileAttachment.accessToken}.pdf`"
                  class="w-full h-[500px]"
                  :title="payslip.fileAttachment.file.label"
                />
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { BaseTooltip } from '@/components/base'
import type { Payslip } from '../composables/usePayslip'
import { usePayslip } from '../composables/usePayslip'
import Icon from '@/components/core/Icon.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useHelper } from '@/composables'

const { getGrossSalary, getNetPay } = usePayslip()
const { formatCurrency, formatPeriod } = useHelper()

interface Props {
  payslips: Payslip[]
  activeCurrency: string
  expandedRows: Set<number>
}

const props = defineProps<Props>()
const emits = defineEmits<{
  'toggle-row': [id: number]
}>()

const handleDownload = (payslip: Payslip) => {
  const url = `/helper-files/payslipsFiles/${payslip.fileAttachment.accessToken}.pdf`
  const link = document.createElement('a')
  link.href = url
  link.download = payslip.fileAttachment.file.label
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const handlePrint = (payslip: Payslip) => {
  const url = `/helper-files/payslipsFiles/${payslip.fileAttachment.accessToken}.pdf`
  const printWindow = window.open(url, '_blank')
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print()
    }
  }
}
</script>

<style></style>
