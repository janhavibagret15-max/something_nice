import { useState } from 'react'
import { Sparkles, MessageCircleHeart, Heart } from 'lucide-react'
import { TOGETHER_SINCE, QUESTIONS, REASONS } from '../content'
import { photoOfTheDay } from '../album'
import { momentForToday } from '../moments'
import { dailyPick } from '../daily'
import { moonToday } from '../moon'

const DAY = 86400000

// [x, y, radius] of the little background stars
const STARS = [
  [40, 40, 1.5],
  [300, 30, 1],
  [332, 110, 1.5],
  [70, 285, 1],
  [290, 295, 1.5],
  [150, 16, 1],
]

// Heartbeat line under the photo
const ECG =
  'M115 212 H135 l4 -8 l4 8 H152 l4 4 l5 -26 l5 32 l4 -10 H185 q7 -10 14 0 H235'

// Each orbit is an ellipse path. The dots travel along them.
const ORBIT_A = 'M15 165 a160 62 0 1 0 320 0 a160 62 0 1 0 -320 0'
const ORBIT_B = 'M43 165 a132 50 0 1 1 264 0 a132 50 0 1 1 -264 0'

// The moon, drawn from today's phase. India is in the northern hemisphere,
// so the lit side grows from the right and shrinks away on the left.
function MoonDisc({ cycle, k }) {
  const r = 28
  const rx = Math.abs(k) * r
  const waxing = cycle < 0.5
  const sweep = waxing ? (k > 0 ? 0 : 1) : k > 0 ? 1 : 0
  const edge = waxing ? 1 : 0
  const d = `M40 ${40 - r} A${r} ${r} 0 0 ${edge} 40 ${40 + r} A${rx} ${r} 0 0 ${sweep} 40 ${40 - r} Z`
  return (
    <svg viewBox="0 0 80 80" width="72" height="72" aria-hidden="true">
      <circle cx="40" cy="40" r={r} fill="#15102f" stroke="#f4effc" strokeOpacity="0.18" />
      <path d={d} fill="#ffe9b8" />
    </svg>
  )
}

function Dot({ path, dur, begin, color, animate, start }) {
  return (
    <g transform={animate ? undefined : `translate(${start[0]} ${start[1]})`}>
      <circle r="14" fill={color} fillOpacity="0.25" />
      <circle r="7" fill={color} />
      {animate && (
        <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={path} />
      )}
    </g>
  )
}

// The ways the small label in the orb can show how long you've been together
function togetherLabels(now) {
  const days = Math.floor((now.getTime() - TOGETHER_SINCE.getTime()) / DAY)
  const weeks = Math.floor(days / 7)

  let years = now.getFullYear() - TOGETHER_SINCE.getFullYear()
  let months = now.getMonth() - TOGETHER_SINCE.getMonth()
  if (now.getDate() < TOGETHER_SINCE.getDate()) months -= 1
  if (months < 0) {
    years -= 1
    months += 12
  }
  const span = years > 0 ? `${years} yr ${months} mo` : `${months} mo`

  return [`day ${days}`, `${weeks} weeks`, span]
}

export default function Home() {
  const now = new Date()

  const [unit, setUnit] = useState(0)
  const [reasonOpen, setReasonOpen] = useState(false)
  const [pulse, setPulse] = useState(false)
  const [moonSaid, setMoonSaid] = useState(false)
  const labels = togetherLabels(now)
  const nextUnit = () => setUnit((unit + 1) % labels.length)

  const hour = now.getHours()
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const photo = photoOfTheDay()
  const moment = momentForToday(now)
  const moon = moonToday(now)
  const isFull = moon.cycle > 0.47 && moon.cycle < 0.53
  const question = dailyPick(QUESTIONS, now)
  const reason = dailyPick(REASONS, now, 3)

  // Becomes real in the realtime phase. Set to true to preview the glowing pulse.
  const partnerOnline = false

  const sayMoon = () => {
    if (!moonSaid) navigator.vibrate?.([30, 60, 30])
    setMoonSaid(!moonSaid)
  }

  const sendPulse = () => {
    navigator.vibrate?.([40, 80, 40])
    setPulse(true)
    setTimeout(() => setPulse(false), 2600)
  }

  // Respect phones that have "reduce motion" turned on
  const animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="screen">
      <header className="home-top">
        <div>
          <p className="greeting">{greeting}</p>
          <h1>Us</h1>
        </div>
        {partnerOnline && (
          <div className="chip">
            <span className="chip-dot" />
            Here with you
          </div>
        )}
      </header>

      <svg
        className={`orb ${partnerOnline || pulse ? 'online' : ''}`}
        viewBox="0 0 350 330"
        role="img"
        aria-label="A photo of the two of you inside a glowing orb"
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="#ff7a8a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ff7a8a" stopOpacity="0" />
          </radialGradient>
          <clipPath id="photoClip">
            <circle cx="175" cy="128" r="50" />
          </clipPath>
        </defs>

        <g fill="#f4effc" fillOpacity="0.5">
          {STARS.map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
          ))}
        </g>

        <circle cx="175" cy="165" r="150" fill="url(#glow)" />

        {/* two orbits, each with a dot (they pass behind the orb) */}
        <g transform="rotate(-20 175 165)">
          <ellipse
            cx="175" cy="165" rx="160" ry="62"
            fill="none" stroke="#f4effc" strokeOpacity="0.22" strokeWidth="1.5"
          />
          <Dot
            path={ORBIT_A} dur="70s" begin="-14s"
            color="#ff7a8a" animate={animate} start={[15, 165]}
          />
        </g>
        <g transform="rotate(24 175 165)">
          <ellipse
            cx="175" cy="165" rx="132" ry="50"
            fill="none" stroke="#f4effc" strokeOpacity="0.14" strokeWidth="1.5"
          />
          <Dot
            path={ORBIT_B} dur="95s" begin="-30s"
            color="#ffc46b" animate={animate} start={[307, 165]}
          />
        </g>

        {/* pulse rings, only visible when .online */}
        <circle className="ring" cx="175" cy="165" r="104" />
        <circle className="ring two" cx="175" cy="165" r="104" />

        {/* the orb itself */}
        <circle
          cx="175" cy="165" r="92"
          fill="#1d1546" stroke="#f4effc" strokeOpacity="0.14"
        />

        {/* photo circle, with a camera placeholder underneath in case there's no photo */}
        <circle
          cx="175" cy="128" r="50"
          fill="#2a2158" stroke="#f4effc" strokeOpacity="0.2" strokeWidth="2"
        />
        <g
          transform="translate(163 108)"
          fill="none" stroke="#ffc46b" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </g>
        {photo && (
          <image
            href={photo.src}
            x="125"
            y="78"
            width="100"
            height="100"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#photoClip)"
          />
        )}

        {/* tap the photo: the orb pulses (and an Android phone buzzes) */}
        <circle
          cx="175" cy="128" r="50"
          fill="transparent"
          role="button"
          tabIndex={0}
          aria-label="Send a heartbeat"
          style={{ cursor: 'pointer' }}
          onClick={sendPulse}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') sendPulse()
          }}
        />

        {/* heartbeat line: a soft glow copy underneath the sharp one */}
        <path
          className="ecg-glow" d={ECG}
          fill="none" stroke="#ff7a8a" strokeWidth="7"
          strokeLinecap="round" strokeLinejoin="round"
        />
        <path
          d={ECG}
          fill="none" stroke="#ff7a8a" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
        />

        {/* tap to change how time together is shown */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Change how time together is shown"
          style={{ cursor: 'pointer' }}
          onClick={nextUnit}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') nextUnit()
          }}
        >
          <rect x="120" y="230" width="110" height="24" rx="12" fill="transparent" />
          <text x="175" y="246" textAnchor="middle" fontSize="14" fill="#a79bd1">
            {labels[unit]}
          </text>
        </g>
      </svg>

      {photo?.caption && <p className="hand photo-caption">{photo.caption}</p>}

      {moment?.type === 'today' && (
        <p className={`celebrate ${moment.kind === 'anniversary' ? 'big' : ''}`}>
          <Sparkles size={22} />
          {moment.text}
        </p>
      )}

      {moment?.type === 'upcoming' && (
        <>
          <p className={`caption ${moment.kind === 'anniversary' ? 'big' : ''}`}>
            {moment.days} {moment.days === 1 ? 'day' : 'days'} until {moment.label}
          </p>
          {moment.progress !== null && (
            <div className="progress">
              <div
                className="progress-fill"
                style={{ width: `${moment.progress * 100}%` }}
              />
            </div>
          )}
        </>
      )}

      <button
        className={`moon-card ${moonSaid ? 'said' : ''}`}
        onClick={sayMoon}
        aria-pressed={moonSaid}
      >
        <MoonDisc cycle={moon.cycle} k={moon.k} />
        <span>
          {moonSaid ? (
            <>
              <span className="moon-line hand">The moon is beautiful tonight, isn't it?</span>
              <span className="moon-sub">Our way of saying it.</span>
            </>
          ) : (
            <>
              <span className="moon-title">Tonight's moon: {moon.name}</span>
              <span className="moon-sub">
                {moon.lit}% lit. You're both under the same one.
                {isFull
                  ? ' It is full tonight. Tap and say it.'
                  : moon.daysToFull > 0
                    ? ` Full moon in ${moon.daysToFull} ${moon.daysToFull === 1 ? 'day' : 'days'}.`
                    : ' '}
              </span>
            </>
          )}
        </span>
      </button>

      <section className="daily">
        <p className="daily-head">
          <MessageCircleHeart size={18} />
          Today's question
        </p>
        <p className="daily-text">{question}</p>
        <p className="daily-hint">Ask each other tonight.</p>
      </section>

      <button
        className={`daily reason ${reasonOpen ? 'open' : ''}`}
        onClick={() => setReasonOpen(true)}
        aria-expanded={reasonOpen}
      >
        <span className="daily-head">
          <Heart size={18} />
          A reason I love you
        </span>
        <span className="daily-text">
          {reasonOpen ? reason : 'Tap to open today\'s'}
        </span>
      </button>
    </div>
  )
}