export * from './time'
export * from './const'
export * from './trackUtils'
export * from './enum'
export function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4())
}

export function range(val:number, [min, max]:[number, number]) {
  return Math.min(max, Math.max(min, val))
}