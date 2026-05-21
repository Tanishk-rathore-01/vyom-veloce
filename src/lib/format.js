export function formatINR(value) {
  const numericValue = Number(value) || 0
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numericValue)
}

export function categoryLabel(value) {
  return value === 'motorcycle' ? 'Motorcycle' : 'Car'
}

export function originLabel(value) {
  return value === 'indian' ? 'Indian' : 'International'
}

export function firstCharacter(value) {
  return value?.trim()?.charAt(0)?.toUpperCase() ?? 'V'
}
