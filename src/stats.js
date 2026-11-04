import { Calendar, HeartPulse, Moon, Hourglass, Cpu } from 'lucide-react'
import { TOGETHER_SINCE, FIRST_MET } from './content'

const DAY = 86400000
const DAYS_PER_MOON = 29.53

const elapsed = (from, now) => now.getTime() - from.getTime()

export const STATS = [
  {
    Icon: Calendar,
    label: 'days since we first met',
    value: (now) => Math.floor(elapsed(FIRST_MET, now) / DAY).toLocaleString(),
  },
  {
    Icon: HeartPulse,
    label: 'heartbeats together at 70 bpm',
    value: (now) => (((elapsed(TOGETHER_SINCE, now) / 60000) * 70) / 1e6).toFixed(1) + 'M',
  },
  {
    Icon: Moon,
    label: 'full moons shared',
    value: (now) => Math.floor(elapsed(TOGETHER_SINCE, now) / DAY / DAYS_PER_MOON),
  },
  {
    Icon: Hourglass,
    label: 'hours together',
    value: (now) => Math.floor(elapsed(TOGETHER_SINCE, now) / 3600000).toLocaleString(),
  },
  {
    Icon: Cpu,
    label: 'uptime, zero outages',
    value: () => '100%',
  },
]

// Two stats per day, rotating through the list
export function statsForToday(now = new Date()) {
  const day = Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / DAY
  )
  const n = STATS.length
  return [STATS[(day * 2) % n], STATS[(day * 2 + 1) % n]]
}