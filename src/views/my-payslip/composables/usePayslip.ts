import { ref, onMounted } from 'vue'

export interface PayslipEntry {
  key: string
  amount: number
  currency: string
}

export interface Payslip {
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

// Cache for payslips data
let payslipsCache: Payslip[] | null = null
let payslipsPromise: Promise<Payslip[]> | null = null

// Load payslips data from public folder
async function loadPayslips(): Promise<Payslip[]> {
  if (payslipsCache) {
    return payslipsCache
  }
  
  if (payslipsPromise) {
    return payslipsPromise
  }

  payslipsPromise = fetch('/helper-files/payslips.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load payslips')
      }
      return response.json()
    })
    .then((data) => {
      payslipsCache = data as Payslip[]
      return payslipsCache
    })
    .catch((error) => {
      console.error('Error loading payslips:', error)
      payslipsPromise = null
      return []
    })

  return payslipsPromise
}

export function usePayslip() {
  const payslips = ref<Payslip[]>([])

  // Load payslips data on mount
  onMounted(async () => {
    payslips.value = await loadPayslips()
  })

  // Get gross salary from payslip
  const getGrossSalary = (payslip: Payslip, currency: string) => {
    const entry = payslip.payslipEntries.find((e) => e.key === 'GROSS' && e.currency === currency)
    return entry?.amount || 0
  }

  // Get net pay from payslip
  const getNetPay = (payslip: Payslip, currency: string) => {
    const entry = payslip.payslipEntries.find((e) => e.key === 'NET PAY' && e.currency === currency)
    return entry?.amount || 0
  }

  // Get unique currencies from payslips
  const getCurrencies = (payslipsList: Payslip[]) => {
    const currencySet = new Set<string>()
    payslipsList.forEach((p) => {
      p.payslipEntries.forEach((e) => currencySet.add(e.currency))
    })
    return Array.from(currencySet).sort()
  }

  // Get payslip count by currency
  const getPayslipCountByCurrency = (payslipsList: Payslip[], currency: string) => {
    return payslipsList.filter((p) => p.payslipEntries.some((e) => e.currency === currency)).length
  }

  // Filter payslips by currency and sort by date (newest first)
  const filterPayslipsByCurrency = (payslipsList: Payslip[], currency: string) => {
    return payslipsList
      .filter((p) => p.payslipEntries.some((e) => e.currency === currency))
      .sort((a, b) => new Date(b.payrollDate).getTime() - new Date(a.payrollDate).getTime())
  }

  // Get active year from filtered payslips
  const getActiveYear = (payslipsList: Payslip[]) => {
    if (payslipsList.length === 0) return new Date().getFullYear()
    const firstPayslip = payslipsList[0]
    if (!firstPayslip) return new Date().getFullYear()
    const date = new Date(firstPayslip.payrollDate)
    return date.getFullYear()
  }

  // Salary evolution data for modal
  const getSalaryEvolutionData = (payslipsList: Payslip[], currency: string) => {
    const data = payslipsList
      .filter((p) => p.payslipEntries.some((e) => e.currency === currency))
      .sort((a, b) => new Date(a.payrollDate).getTime() - new Date(b.payrollDate).getTime())
      .map((p) => {
        const gross =
          p.payslipEntries.find((e) => e.key === 'GROSS' && e.currency === currency)?.amount || 0
        const net =
          p.payslipEntries.find((e) => e.key === 'NET PAY' && e.currency === currency)?.amount || 0
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
  const maxSalary = (payslipsList: Payslip[], currency: string) => {
    const data = getSalaryEvolutionData(payslipsList, currency)
    return Math.max(...data.map((d) => d.gross), 1)
  }

  return {
    payslips,
    getGrossSalary,
    getNetPay,
    getCurrencies,
    getPayslipCountByCurrency,
    filterPayslipsByCurrency,
    getActiveYear,
    getSalaryEvolutionData,
    maxSalary,
  }
}
