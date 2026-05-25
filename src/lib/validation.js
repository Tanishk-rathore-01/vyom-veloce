export function requiredMessage(label) {
  return `${label} is required.`
}

export function isEmail(value) {
  return /^\S+@\S+\.\S+$/.test(value.trim())
}

export function isPhone(value) {
  return value.replace(/\D/g, '').length >= 8
}

export function positiveNumber(value) {
  return Number(value) > 0
}
