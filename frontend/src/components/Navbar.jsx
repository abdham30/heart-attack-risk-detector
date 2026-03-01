import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoIcon}>♥</span>
        <span>Heart Risk</span>
      </Link>

      <div className={styles.links}>
        <button className={styles.link} onClick={() => scrollTo('how-it-works')}>How It Works</button>
        <button className={styles.link} onClick={() => scrollTo('methodology')}>Methodology</button>
        <button className={styles.link} onClick={() => scrollTo('features')}>Features</button>
        <button className={styles.link} onClick={() => scrollTo('disclaimer')}>Disclaimer</button>
      </div>

      <button className={styles.cta} onClick={() => navigate('/assessment')}>
        Check My Risk
      </button>
    </nav>
  )
}
