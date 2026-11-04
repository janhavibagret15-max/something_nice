import { useEffect, useRef, useState } from 'react'
import { Heart, Ticket, Gift } from 'lucide-react'
import { SCRATCH_CARDS } from '../content'
import { load, save } from '../store'

const KINDS = {
  memory: { Icon: Heart, label: 'Memory' },
  coupon: { Icon: Ticket, label: 'Coupon' },
  surprise: { Icon: Gift, label: 'Surprise' },
}

function ScratchCard({ card, done, onDone }) {
  const wrap = useRef(null)
  const canvas = useRef(null)
  const drawing = useRef(false)
  const last = useRef(null)
  const moves = useRef(0)

  // paint the silver cover
  useEffect(() => {
    if (done) return
    const el = canvas.current
    const { width, height } = wrap.current.getBoundingClientRect()
    el.width = Math.round(width)
    el.height = Math.round(height)
    const ctx = el.getContext('2d')
    const g = ctx.createLinearGradient(0, 0, width, height)
    g.addColorStop(0, '#b9a8f0')
    g.addColorStop(0.5, '#e6dcff')
    g.addColorStop(1, '#9d8be0')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = 'rgba(21, 16, 47, 0.55)'
    ctx.font = '700 18px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('scratch here', width / 2, height / 2)
  }, [done])

  const point = (e) => {
    const rect = canvas.current.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const cleared = () => {
    const el = canvas.current
    const { data } = el.getContext('2d').getImageData(0, 0, el.width, el.height)
    let clear = 0
    let total = 0
    for (let i = 3; i < data.length; i += 64) {
      total += 1
      if (data[i] < 128) clear += 1
    }
    return clear / total
  }

  const down = (e) => {
    canvas.current.setPointerCapture(e.pointerId)
    drawing.current = true
    last.current = point(e)
    move(e)
  }

  const move = (e) => {
    if (!drawing.current) return
    const ctx = canvas.current.getContext('2d')
    const p = point(e)
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineCap = 'round'
    ctx.lineWidth = 38
    ctx.beginPath()
    ctx.moveTo(last.current.x, last.current.y)
    ctx.lineTo(p.x, p.y)
    ctx.stroke()
    last.current = p
    moves.current += 1
    if (moves.current % 6 === 0 && cleared() > 0.55) {
      drawing.current = false
      navigator.vibrate?.([30, 50, 30])
      onDone(card.id)
    }
  }

  const up = () => {
    drawing.current = false
  }

  const { Icon, label } = KINDS[card.kind] || KINDS.surprise

  return (
    <section className="sc">
      <p className="sc-kind">
        <Icon size={16} />
        {label}
      </p>
      <div className="sc-box" ref={wrap}>
        <p className="sc-reveal hand">{card.reveal}</p>
        {!done && (
          <canvas
            ref={canvas}
            className="sc-cover"
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
            aria-label="Scratch to reveal"
          />
        )}
      </div>
    </section>
  )
}

export default function Scratch() {
  const [done, setDone] = useState(() => load('us-scratched', []))

  const finish = (id) => {
    setDone((prev) => {
      const next = prev.includes(id) ? prev : [...prev, id]
      save('us-scratched', next)
      return next
    })
  }

  return (
    <div className="screen">
      <header className="screen-head">
        <h1>Scratch cards</h1>
        <span className="hand">sealed results, reveal on your own time</span>
      </header>

      {SCRATCH_CARDS.map((c) => (
        <ScratchCard key={c.id} card={c} done={done.includes(c.id)} onDone={finish} />
      ))}
    </div>
  )
}