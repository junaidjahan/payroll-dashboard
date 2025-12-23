export const useHelper = () => {
  const formatTitle = (title: string) => {
    return title
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
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

  // Format period (e.g., "April 2025")
  const formatPeriod = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  return {
    formatTitle,
    formatCurrency,
    formatPeriod,
  }
}
