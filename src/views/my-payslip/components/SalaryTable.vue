<template>
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
                <template v-for="(payslip, index) in payslips" :key="payslip.fileAttachment.id">
                    <!-- Main Row -->
                    <tr class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer"
                        @click="$emit('toggle-row', payslip.fileAttachment.id)">
                        <td class="px-4 py-3">
                            <button
                                class="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-transform duration-200">
                                <svg class="w-4 h-4 transform transition-transform duration-200"
                                    :class="{ 'rotate-90': expandedRows.has(payslip.fileAttachment.id) }"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </td>
                        <td class="px-2 py-3 text-sm text-base">
                            {{ payslips.length - index }}
                        </td>
                        <td class="px-4 py-3">
                            <span class="text-sm font-medium text-[var(--color-base-primary-500)]">
                                {{ formatPeriod(payslip.payrollDate) }}
                            </span>
                        </td>
                        <td class="px-4 py-3">
                            <span class="text-sm text-base">
                                {{ payslip.fileAttachment.file.label }}
                            </span>
                        </td>
                        <td class="px-4 py-3">
                            <span
                                class="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-[#e8f5e9] text-[#2e7d32]">
                                {{ formatCurrency(getGrossSalary(payslip, activeCurrency), activeCurrency) }}
                            </span>
                        </td>
                        <td class="px-4 py-3">
                            <span
                                class="inline-flex items-center px-3 py-1 rounded text-sm font-medium bg-[#e3f2fd] text-[#1565c0]">
                                {{ formatCurrency(getNetPay(payslip, activeCurrency), activeCurrency) }}
                            </span>
                        </td>
                        <td class="px-4 py-3">
                            <button @click.stop="$emit('toggle-menu', payslip.fileAttachment.id)"
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
</template>

<script setup lang="ts">
import type { Payslip } from '../composables/usePayslip'
import { usePayslip } from '../composables/usePayslip'

const { formatPeriod, formatCurrency, getGrossSalary, getNetPay } = usePayslip()

interface Props {
    payslips: Payslip[]
    activeCurrency: string
    expandedRows: Set<number>
}

const props = defineProps<Props>()
const emits = defineEmits<{
    'toggle-row': [id: number]
    'toggle-menu': [id: number]
}>()
</script>
