const DAY = 86400000
const SYNODIC = 29.530588853 // days from one new moon to the next
const NEW_MOON_REF = Date.UTC(2000, 0, 6, 18, 14) // a known new moon

// Where the moon is in its cycle: 0 = new, 0.5 = full, back to 1 = new
export function moonToday(now = new Date()) {
  const cycle = (((now.getTime() - NEW_MOON_REF) / DAY / SYNODIC) % 1 + 1) % 1
  const k = Math.cos(2 * Math.PI * cycle) // 1 new ... -1 full
  const lit = Math.round(((1 - k) / 2) * 100)

  let name = 'New moon'
  if (cycle > 0.03) name = 'Waxing crescent'
  if (cycle > 0.22) name = 'First quarter'
  if (cycle > 0.28) name = 'Waxing gibbous'
  if (cycle > 0.47) name = 'Full moon'
  if (cycle > 0.53) name = 'Waning gibbous'
  if (cycle > 0.72) name = 'Last quarter'
  if (cycle > 0.78) name = 'Waning crescent'
  if (cycle > 0.97) name = 'New moon'

  const daysToFull = Math.round((((0.5 - cycle + 1) % 1) * SYNODIC))
  return { cycle, k, lit, name, daysToFull }
}