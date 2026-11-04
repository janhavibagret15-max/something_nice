// Soft sounds and haptics. Sounds only play inside a tap, which iPhones require.
// iPhones can't vibrate from a web app, so he gets the sound and you get both.
let ctx

function audio() {
  try {
    if (!ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext
      ctx = new Ctx()
    }
    if (ctx.state === 'suspended') ctx.resume()
    return ctx
  } catch {
    return null
  }
}

function note(freq, start, dur, vol) {
  const c = audio()
  if (!c) return
  const osc = c.createOscillator()
  const gain = c.createGain()
  const t = c.currentTime + start
  osc.type = 'sine'
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0, t)
  gain.gain.linearRampToValueAtTime(vol, t + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0008, t + dur)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start(t)
  osc.stop(t + dur + 0.05)
}

// a tiny tick for buttons
export function tap() {
  navigator.vibrate?.(8)
  note(880, 0, 0.08, 0.05)
}

// a gentle "not quite"
export function oops() {
  navigator.vibrate?.(60)
  note(220, 0, 0.2, 0.06)
}

// the happy four notes
export function chime() {
  ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) => note(f, i * 0.12, 0.9, 0.12))
}