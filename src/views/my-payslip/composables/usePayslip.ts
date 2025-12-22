import payslipsData from '../../../../helper-files/payslips.json'

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

export function usePayslip() {
  // Load payslips data
  const payslips = payslipsData as Payslip[]

  // Format period (e.g., "April 2025")
  const formatPeriod = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    return (
      new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount) +
      ' ' +
      currency
    )
  }

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
  const getCurrencies = (payslips: Payslip[]) => {
    const currencySet = new Set<string>()
    payslips.forEach((p) => {
      p.payslipEntries.forEach((e) => currencySet.add(e.currency))
    })
    return Array.from(currencySet).sort()
  }

  // Get payslip count by currency
  const getPayslipCountByCurrency = (payslips: Payslip[], currency: string) => {
    return payslips.filter((p) => p.payslipEntries.some((e) => e.currency === currency)).length
  }

  // Filter payslips by currency and sort by date (newest first)
  const filterPayslipsByCurrency = (payslips: Payslip[], currency: string) => {
    return payslips
      .filter((p) => p.payslipEntries.some((e) => e.currency === currency))
      .sort((a, b) => new Date(b.payrollDate).getTime() - new Date(a.payrollDate).getTime())
  }

  // Get active year from filtered payslips
  const getActiveYear = (payslips: Payslip[]) => {
    if (payslips.length === 0) return new Date().getFullYear()
    const firstPayslip = payslips[0]
    if (!firstPayslip) return new Date().getFullYear()
    const date = new Date(firstPayslip.payrollDate)
    return date.getFullYear()
  }

  // Salary evolution data for modal
  const getSalaryEvolutionData = (payslips: Payslip[], currency: string) => {
    const data = payslips
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
  const maxSalary = (payslips: Payslip[], currency: string) => {
    const data = getSalaryEvolutionData(payslips, currency)
    return Math.max(...data.map((d) => d.gross), 1)
  }

  return {
    payslips,
    formatPeriod,
    formatCurrency,
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
