import { useState } from 'react'
import { HeartPulse, Milestone, Pill, FlaskConical } from 'lucide-react'
import { tap } from './feedback'
import Gate from './screens/Gate'
import Home from './screens/Home'
import Timeline from './screens/Timeline'
import Letters from './screens/Letters'
import Scratch from './screens/Scratch'

const TABS = [
  { id: 'home', label: 'Home', Icon: HeartPulse, Screen: Home },
  { id: 'story', label: 'Our Story', Icon: Milestone, Screen: Timeline },
  { id: 'letters', label: 'Open When', Icon: Pill, Screen: Letters },
  { id: 'scratch', label: 'Scratch', Icon: FlaskConical, Screen: Scratch },
]

export default function App() {
  const [tab, setTab] = useState('home')
  const Active = TABS.find((t) => t.id === tab).Screen

  return (
    <Gate>
      <Active />
      <nav className="tabbar">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`tab ${tab === id ? 'active' : ''}`}
            onClick={() => {
              tap()
              setTab(id)
            }}
            aria-label={label}
            aria-current={tab === id ? 'page' : undefined}
          >
            <Icon size={22} strokeWidth={2.4} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </Gate>
  )
}