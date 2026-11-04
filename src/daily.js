const DAY = 86400000

// Whole days since 1 Jan 1970 for the phone's local calendar date.
// You two share a time zone, so you both see the same pick on the same day.
function dayNumber(d) {
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / DAY)
}

// One item per day, in order. `offset` keeps two lists from changing in step.
export function dailyPick(list, date = new Date(), offset = 0) {
  if (list.length === 0) return null
  return list[(dayNumber(date) + offset) % list.length]
}