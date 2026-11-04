import { ALBUM, PINNED } from './content'

const DAY = 86400000

// Whole days since 1 Jan 1970, for today's calendar date on this phone
function dayNumber(d) {
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / DAY)
}

// Small seeded random generator: the same seed always gives the same sequence,
// so every phone produces the same shuffle.
function mulberry32(seed) {
  return function () {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function photoOfTheDay(date = new Date()) {
  // 1. A pinned photo for this exact date wins
  const key = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
  if (PINNED[key]) return PINNED[key]

  // 2. Otherwise walk through the album in a shuffled order
  const n = ALBUM.length
  if (n === 0) return null

  const day = dayNumber(date)
  const cycle = Math.floor(day / n) // one full pass through the album

  // Fisher-Yates shuffle, seeded by the cycle number
  const order = ALBUM.map((_, i) => i)
  const rand = mulberry32(cycle + 1)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }

  return ALBUM[order[day % n]]
}