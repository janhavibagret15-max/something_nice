import { useState, useEffect } from 'react'
import { UNLOCK_AT, UNWRAP_MESSAGE, LOCK_QUESTION } from '../content'
import { supabase } from '../supabase'
import { chime, oops, tap } from '../feedback'
import Login from './Login'

// Open the app with ?preview on the end of the address to skip the lock
// and see the unwrap every time (for testing). Normal opens never use it.
const PREVIEW = new URLSearchParams(window.location.search).has('preview')
const OPENED_KEY = 'us-opened'
const PASSED_KEY = 'us-passed'

const readFlag = (key) => {
  try {
    return localStorage.getItem(key) === '1'
  } catch {
    return false
  }
}

const writeFlag = (key) => {
  if (PREVIEW) return
  try {
    localStorage.setItem(key, '1')
  } catch {
    // fine: it just shows again next time
  }
}

const clean = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim()

const COLORS = ['#ff7a8a', '#ffc46b', '#7fe0c3', '#f4effc', '#c9a7ff']

function makeConfetti() {
  return Array.from({ length: 42 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.8,
    dur: 2.6 + Math.random() * 2,
    size: 7 + Math.random() * 7,
    color: COLORS[i % COLORS.length],
    spin: (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 540),
  }))
}

function GiftBox({ open }) {
  return (
    <svg
      className={`gift ${open ? 'open' : ''}`}
      viewBox="0 0 200 200"
      role="img"
      aria-label={open ? 'An open gift box' : 'A wrapped gift box'}
    >
      <circle className="gift-glow" cx="100" cy="92" r="70" fill="#ffc46b" />
      <rect x="40" y="94" width="120" height="86" rx="10" fill="#ff7a8a" />
      <rect x="92" y="94" width="16" height="86" fill="#ffc46b" />
      <g className="lid">
        <rect x="30" y="66" width="140" height="30" rx="10" fill="#ff5f78" />
        <rect x="92" y="66" width="16" height="30" fill="#ffc46b" />
        <ellipse cx="82" cy="58" rx="20" ry="11" fill="#ffc46b" transform="rotate(-18 82 58)" />
        <ellipse cx="118" cy="58" rx="20" ry="11" fill="#ffc46b" transform="rotate(18 118 58)" />
        <circle cx="100" cy="62" r="7" fill="#ffdc9b" />
      </g>
    </svg>
  )
}

function Locked({ now }) {
  const ms = Math.max(0, UNLOCK_AT.getTime() - now.getTime())
  const days = Math.floor(ms / 86400000)
  const cells = [
    [days, days === 1 ? 'day' : 'days'],
    [Math.floor(ms / 3600000) % 24, 'hrs'],
    [Math.floor(ms / 60000) % 60, 'min'],
    [Math.floor(ms / 1000) % 60, 'sec'],
  ]
  return (
    <div className="gate">
      <GiftBox open={false} />
      <h1 className="gate-title">Not yet</h1>
      <p className="hand gate-sub">something is waiting for you</p>
      <div className="countdown" role="timer" aria-label="Time until the gift opens">
        {cells.map(([n, label]) => (
          <div className="cd-cell" key={label}>
            <span className="cd-num">{String(n).padStart(2, '0')}</span>
            <span className="cd-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Unwrap({ onDone }) {
  const [open, setOpen] = useState(false)
  const [confetti, setConfetti] = useState([])

  const unwrap = () => {
    if (open) return
    setOpen(true)
    setConfetti(makeConfetti())
    chime()
    navigator.vibrate?.([40, 80, 40])
  }

  return (
    <div className="gate">
      {confetti.length > 0 && (
        <div className="confetti" aria-hidden="true">
          {confetti.map((c) => (
            <span
              key={c.id}
              className="piece"
              style={{
                left: `${c.left}%`,
                width: c.size,
                height: c.size * 0.5,
                background: c.color,
                animationDelay: `${c.delay}s`,
                animationDuration: `${c.dur}s`,
                '--spin': `${c.spin}deg`,
              }}
            />
          ))}
        </div>
      )}

      <button
        className="gift-btn"
        onClick={unwrap}
        disabled={open}
        aria-label={open ? 'Gift opened' : 'Open your gift'}
      >
        <GiftBox open={open} />
      </button>

      {!open ? (
        <p className="hand gate-sub">tap to open</p>
      ) : (
        <div className="msg-card">
          <p className="msg-text">{UNWRAP_MESSAGE}</p>
          <button className="btn-primary" onClick={onDone}>
            Come in
          </button>
        </div>
      )}
    </div>
  )
}

function Question({ onPass }) {
  const [answer, setAnswer] = useState('')
  const [wrong, setWrong] = useState(0)

  const submit = (e) => {
    e.preventDefault()
    if (LOCK_QUESTION.answers.some((a) => clean(a) === clean(answer))) {
      chime()
      onPass()
    } else {
      oops()
      setWrong(wrong + 1)
    }
  }

  const reply = LOCK_QUESTION.wrongReplies[(wrong - 1) % LOCK_QUESTION.wrongReplies.length]

  return (
    <div className="gate">
      <p className="hand gate-sub">one thing before you open it</p>
      <h1 className="gate-question">{LOCK_QUESTION.question}</h1>
      <form className="gate-form" onSubmit={submit}>
        <input
          className="field"
          type="text"
          placeholder="Your answer"
          autoComplete="off"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        {wrong > 0 && <p className="gate-reply hand">{reply}</p>}
        {wrong >= 3 && <p className="gate-hint">Hint: {LOCK_QUESTION.hint}</p>}
        <button className="btn-primary" type="submit" onClick={tap}>
          Unlock
        </button>
      </form>
    </div>
  )
}

export default function Gate({ children }) {
  const [now, setNow] = useState(() => new Date())
  // undefined = still checking, null = signed out
  const [session, setSession] = useState(undefined)
  const [passed, setPassed] = useState(() => !PREVIEW && readFlag(PASSED_KEY))
  const [opened, setOpened] = useState(() => !PREVIEW && readFlag(OPENED_KEY))

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  // 1. real login (skipped until Supabase keys are added)
  if (supabase) {
    if (session === undefined) return <div className="gate" />
    if (!session) return <Login />
  }

  // 2. sealed until the anniversary
  if (!PREVIEW && now < UNLOCK_AT) return <Locked now={now} />

  // 3. the question only he would know
  if (!passed) {
    return (
      <Question
        onPass={() => {
          writeFlag(PASSED_KEY)
          setPassed(true)
        }}
      />
    )
  }

  // 4. the gift box
  if (!opened) {
    return (
      <Unwrap
        onDone={() => {
          writeFlag(OPENED_KEY)
          setOpened(true)
        }}
      />
    )
  }

  return children
}