import { useState } from 'react'
import { Pill, MailOpen } from 'lucide-react'
import { LETTERS } from '../content'
import { load, save } from '../store'

export default function Letters() {
  const [opened, setOpened] = useState(() => load('us-letters', []))
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => {
    setOpenId(openId === id ? null : id)
    if (!opened.includes(id)) {
      const next = [...opened, id]
      setOpened(next)
      save('us-letters', next)
    }
  }

  return (
    <div className="screen">
      <header className="screen-head">
        <h1>Open when…</h1>
        <span className="hand">prescribed for exactly the moments you need them</span>
      </header>

      <div className="rx-list">
        {LETTERS.map((l) => {
          const isOpen = openId === l.id
          const Icon = opened.includes(l.id) ? MailOpen : Pill
          return (
            <section className={`rx ${isOpen ? 'open' : ''}`} key={l.id}>
              <button
                className="rx-head"
                onClick={() => toggle(l.id)}
                aria-expanded={isOpen}
              >
                <Icon size={22} />
                <span>
                  <span className="rx-label">Take when</span>
                  <span className="rx-when">{l.when}</span>
                </span>
              </button>
              {isOpen && <p className="rx-text hand">{l.text}</p>}
            </section>
          )
        })}
      </div>
    </div>
  )
}