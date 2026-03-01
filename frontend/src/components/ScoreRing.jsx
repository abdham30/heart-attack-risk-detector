import { useEffect, useRef, useState } from 'react'
import styles from './ScoreRing.module.css'

export default function ScoreRing({ score, color, size = 160 }) {
  const [displayScore, setDisplayScore] = useState(0)
  const [filled, setFilled] = useState(false)
  const animRef = useRef(null)

  const R = (size / 2) - 10
  const CIRC = 2 * Math.PI * R
  const offset = CIRC - (score / 100) * CIRC

  useEffect(() => {
    // Animate fill
    const timer = setTimeout(() => setFilled(true), 100)

    // Animate counter
    let count = 0
    const duration = 1400
    const steps = score
    const interval = steps > 0 ? duration / steps : 0

    const counter = setInterval(() => {
      count = Math.min(count + 1, score)
      setDisplayScore(count)
      if (count >= score) clearInterval(counter)
    }, interval)

    return () => {
      clearTimeout(timer)
      clearInterval(counter)
    }
  }, [score])

  return (
    <div className={styles.wrap} style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          className={styles.trackBg}
          cx={size / 2} cy={size / 2} r={R}
        />
        <circle
          className={styles.fill}
          cx={size / 2} cy={size / 2} r={R}
          stroke={color}
          strokeDasharray={CIRC}
          strokeDashoffset={filled ? offset : CIRC}
          style={{ transition: 'stroke-dashoffset 1.3s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      <div className={styles.center}>
        <span className={styles.number} style={{ color }}>{displayScore}</span>
        <span className={styles.label}>out of 100</span>
      </div>
    </div>
  )
}
