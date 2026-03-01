import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAssessment } from '../context/AssessmentContext.jsx'
import ScoreRing from '../components/ScoreRing.jsx'
import styles from './Results.module.css'

const RISK_BANDS = [
  { range: '0–20',   label: 'Low Risk',      color: '#059669' },
  { range: '21–40',  label: 'Mild Risk',      color: '#0891b2' },
  { range: '41–60',  label: 'Moderate Risk',  color: '#d97706' },
  { range: '61–80',  label: 'High Risk',      color: '#ea580c' },
  { range: '81–100', label: 'Very High Risk', color: '#dc2626' },
]

export default function Results() {
  const navigate = useNavigate()
  const { result, resetAssessment } = useAssessment()

  useEffect(() => {
    if (!result) navigate('/assessment')
    window.scrollTo(0, 0)
  }, [result, navigate])

  if (!result) return null

  const { score, category, color, bgColor, tagline, urgency, interpretation, breakdown, recommendations } = result

  const handleRetake = () => {
    resetAssessment()
    navigate('/assessment')
  }

  return (
    <div className={styles.page}>

      {/* ── HEADER ── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={() => navigate('/')}>← Home</button>
          <div>
            <div className={styles.headerTitle}>🫀 Your Heart Risk Results</div>
            <div className={styles.headerSub}>Educational assessment — not a medical diagnosis</div>
          </div>
        </div>
        <button className="btn-secondary" style={{ fontSize: '13px', padding: '9px 18px' }} onClick={handleRetake}>
          ↺ Retake Assessment
        </button>
      </header>

      <div className={styles.body}>

        {/* ── SCORE HERO ── */}
        <div className={`${styles.scoreCard} animate-fade-up`} style={{ borderColor: `${color}30`, background: `linear-gradient(135deg, ${bgColor}, var(--surface))` }}>
          <div className={styles.scoreDisplay}>
            <ScoreRing score={score} color={color} size={170} />
            <div className={styles.scoreMeta}>
              <div className={styles.scoreCategory} style={{ color }}>{category}</div>
              <p className={styles.scoreTagline}>{tagline}</p>
            </div>
          </div>

          {/* Interpretation */}
          <div className={styles.interpretation} style={{ borderColor: `${color}25`, background: `${bgColor}` }}>
            <div className={styles.interpretLabel}>What This Means</div>
            <p className={styles.interpretText}>{interpretation}</p>
          </div>

          {/* Urgency */}
          <div className={styles.urgency} style={{ color, borderColor: `${color}30`, background: `${bgColor}` }}>
            {urgency}
          </div>

          {/* Risk Scale */}
          <div className={styles.riskScale}>
            {RISK_BANDS.map(b => (
              <div
                key={b.label}
                className={`${styles.riskBand} ${b.label === category ? styles.riskBandActive : ''}`}
                style={{
                  borderColor: b.label === category ? b.color : 'transparent',
                  background: b.label === category ? `rgba(0,0,0,0.04)` : 'transparent'
                }}
              >
                <span className={styles.riskBandRange} style={{ color: b.color }}>{b.range}</span>
                <span className={styles.riskBandLabel} style={{ color: b.label === category ? b.color : 'var(--text-muted)', fontWeight: b.label === category ? 700 : 400 }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RECOMMENDATIONS ── */}
        <div className={`${styles.card} animate-fade-up`} style={{ animationDelay: '0.1s' }}>
          <div className={styles.cardTitle}>Personalised Recommendations</div>
          <div className={styles.recsList}>
            {recommendations.map((r, i) => (
              <div key={i} className={styles.recItem}>
                <span className={styles.recIcon}>{r.icon}</span>
                <span className={styles.recText}>{r.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── SCORE BREAKDOWN ── */}
        <div className={`${styles.card} animate-fade-up`} style={{ animationDelay: '0.2s' }}>
          <div className={styles.cardTitle}>Score Breakdown</div>
          <div className={styles.breakdown}>
            {breakdown.map((b, i) => (
              <div key={i} className={styles.breakdownRow} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface2)' }}>
                <span className={styles.bdFactor}>{b.factor}</span>
                <span className={styles.bdValue}>{b.value}</span>
                <span className={`${styles.bdPts} ${b.pts > 0 ? styles.ptsPos : b.pts < 0 ? styles.ptsNeg : styles.ptsZero}`}>
                  {b.pts > 0 ? '+' : ''}{b.pts}
                </span>
              </div>
            ))}
            <div className={styles.breakdownTotal}>
              <span className={styles.bdFactor}>Normalised Score</span>
              <span />
              <span className={styles.bdPtsTotal}>{score} / 100</span>
            </div>
          </div>
        </div>

        {/* ── DISCLAIMER ── */}
        <div className={styles.disclaimerNote}>
          This result is for awareness purposes only and does not constitute a medical diagnosis.<br />
          No data has been stored or transmitted. All calculations were performed server-side on your inputs.
        </div>

        <button className={styles.retakeBtn} onClick={handleRetake}>
          ↺ Retake the Assessment
        </button>

      </div>
    </div>
  )
}
