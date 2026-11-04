// Tiny wrapper so a blocked or full localStorage never crashes the app.
// What gets saved here lives on one phone only (not shared between you two).
export function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : fallback
    } catch {
      return fallback
    }
  }
  
  export function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // fine: it just won't be remembered
    }
  }