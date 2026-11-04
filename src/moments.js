import { EVENTS, TOGETHER_SINCE } from './content'

const DAY = 86400000

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())

// 'YYYY-MM-DD' to a Date at local midnight
function parseDate(s) {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

// 1 -> 1st, 2 -> 2nd, 13 -> 13th
function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

// The next day this event happens, counting today. null if a one-time date has passed.
function nextDate(ev, today) {
  if (ev.date) {
    const d = parseDate(ev.date)
    return d >= today ? d : null
  }
  if (ev.monthly) {
    let d = new Date(today.getFullYear(), today.getMonth(), ev.day)
    if (d < today) d = new Date(today.getFullYear(), today.getMonth() + 1, ev.day)
    return d
  }
  let d = new Date(today.getFullYear(), ev.month - 1, ev.day)
  if (d < today) d = new Date(today.getFullYear() + 1, ev.month - 1, ev.day)
  return d
}

// The message shown on the day itself
function celebration(ev, today) {
  if (ev.kind === 'anniversary') {
    const years = today.getFullYear() - TOGETHER_SINCE.getFullYear()
    return `Happy ${ordinal(years)} anniversary`
  }
  if (ev.kind === 'monthsary') {
    const months =
      (today.getFullYear() - TOGETHER_SINCE.getFullYear()) * 12 +
      (today.getMonth() - TOGETHER_SINCE.getMonth())
    return `${months} ${months === 1 ? 'month' : 'months'} together today`
  }
  return ev.todayText || `Today: ${ev.label}`
}

// What the home screen should show today:
//   { type: 'today', text }                          a celebration
//   { type: 'upcoming', days, label, progress }      a countdown
//   null                                             nothing
export function momentForToday(now = new Date()) {
  const today = startOfDay(now)

  const items = EVENTS.map((ev) => {
    const when = nextDate(ev, today)
    return when && { ev, when, days: Math.round((when - today) / DAY) }
  }).filter(Boolean)

  // 1. Something to celebrate today
  const todayItem = items.find((it) => it.days === 0)
  if (todayItem) return { type: 'today', kind: todayItem.ev.kind, text: celebration(todayItem.ev, today) }

  // 2. Otherwise the nearest event that is close enough to show
  const upcoming = items
    .filter((it) => it.days <= (it.ev.showWithin ?? Infinity))
    .sort((a, b) => a.days - b.days)[0]
  if (!upcoming) return null

  let progress = null
  if (upcoming.ev.since) {
    const from = parseDate(upcoming.ev.since)
    progress = Math.min(1, Math.max(0, (today - from) / (upcoming.when - from)))
  }

  return {
    type: 'upcoming',
    kind: upcoming.ev.kind,
    days: upcoming.days,
    label: upcoming.ev.label,
    progress,
  }
}