import { Hourglass, Sparkles } from 'lucide-react'
import { TIMELINE, CAPSULE } from '../content'

// 'YYYY-MM-DD' to a Date at local midnight
function parseDate(s) {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

const fmt = (d) =>
  d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

export default function Timeline() {
  const today = new Date()
  const capsuleDate = parseDate(CAPSULE.opensOn)
  const sealed = today < capsuleDate
  const daysLeft = Math.ceil((capsuleDate - today) / 86400000)
  const entries = TIMELINE.map((e) => ({ ...e, when: parseDate(e.date) }))
    .filter((e) => e.when <= today)
    .sort((a, b) => a.when - b.when)

  return (
    <div className="screen">
      <header className="screen-head">
        <h1>Our story</h1>
        <span className="hand">the changelog of us, version by version</span>
      </header>

      <ol className="tl">
        {entries.map((e) => (
          <li className="tl-item" key={e.date + e.title}>
            <span className="tl-version">{e.version}</span>
            <p className="tl-date">{fmt(e.when)}</p>
            <h2 className="tl-title">{e.title}</h2>
            <p className="tl-text">{e.text}</p>
            {e.photo && <img className="tl-photo" src={e.photo} alt="" loading="lazy" />}
          </li>
        ))}
      </ol>

      <section className="capsule">
        <h2 className="capsule-title">
          {sealed ? <Hourglass size={20} /> : <Sparkles size={20} />}
          Time capsule
        </h2>
        {sealed ? (
          <p className="capsule-text">
            Sealed until {fmt(capsuleDate)}. {daysLeft} {daysLeft === 1 ? 'day' : 'days'} to go.
          </p>
        ) : (
          CAPSULE.notes.map((n) => (
            <div className="capsule-note" key={n.from + n.text}>
              <p className="capsule-from">{n.from}</p>
              <p className="hand capsule-body">{n.text}</p>
            </div>
          ))
        )}
      </section>
    </div>
  )
}