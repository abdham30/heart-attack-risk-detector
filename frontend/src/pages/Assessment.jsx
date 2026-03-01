import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAssessment } from '../context/AssessmentContext.jsx'
import { OptionQuestion, NumberQuestion } from '../components/Question.jsx'
import { SECTIONS } from '../data/questions.js'
import styles from './Assessment.module.css'

const TOTAL_STEPS = SECTIONS.length

export default function Assessment() {
  const navigate = useNavigate()
  const { answers, updateAnswer, setResult, currentStep, setCurrentStep } = useAssessment()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [bmi, setBmi] = useState(null)

  // Reset to step 1 on mount
  useEffect(() => { setCurrentStep(1) }, [])

  // BMI live calculation
  useEffect(() => {
    const h = parseFloat(answers.heightCm)
    const w = parseFloat(answers.weightKg)
    if (h > 0 && w > 0) {
      const b = w / ((h / 100) ** 2)
      setBmi(b)
      updateAnswer('bmi', b.toFixed(1))
    }
  }, [answers.heightCm, answers.weightKg])

  const section = SECTIONS[currentStep - 1]
  const pct = Math.round(((currentStep - 1) / TOTAL_STEPS) * 100)
  const isLast = currentStep === TOTAL_STEPS

  const goNext = () => { window.scrollTo(0, 0); setCurrentStep(s => Math.min(s + 1, TOTAL_STEPS)) }
  const goPrev = () => { window.scrollTo(0, 0); setCurrentStep(s => Math.max(s - 1, 1)) }

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      const payload = {
        ...answers,
        age: parseInt(answers.age) || 0,
        heightCm: parseFloat(answers.heightCm) || 0,
        weightKg: parseFloat(answers.weightKg) || 0,
        waistCm: answers.waistUnknown === 'yes' ? 0 : parseFloat(answers.waistCm) || 0,
      }

      const res = await fetch('/api/assess-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.details?.join(', ') || data.error || 'Unknown error')

      setResult(data)
      navigate('/results')
    } catch (e) {
      setError(e.message || 'Could not connect to the server. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  const renderQuestion = (q) => {
    if (q.type === 'option') {
      return (
        <OptionQuestion
          key={q.id}
          question={q.question}
          hint={q.hint}
          options={q.options}
          value={answers[q.id]}
          onChange={v => updateAnswer(q.id, v)}
        />
      )
    }
    if (q.type === 'number') {
      const field = (
        <NumberQuestion
          key={q.id}
          question={q.question}
          hint={q.hint}
          placeholder={q.placeholder}
          min={q.min}
          max={q.max}
          unit={q.unit}
          value={answers[q.id]}
          onChange={v => updateAnswer(q.id, v)}
        />
      )

      // BMI display after weight
      const showBmi = q.id === 'weightKg' && bmi
      // Optional toggle (waist unknown)
      const showToggle = q.optionalToggle

      return (
        <div key={q.id}>
          {field}
          {showBmi && (
            <div className={styles.bmiDisplay}>
              <span>Calculated BMI: </span>
              <strong style={{ color: bmi >= 30 ? '#ea580c' : bmi >= 25 ? '#d97706' : '#059669' }}>
                {bmi.toFixed(1)}
              </strong>
              <span className={styles.bmiCat}>
                {bmi >= 30 ? ' — Obese' : bmi >= 25 ? ' — Overweight' : bmi < 18.5 ? ' — Underweight' : ' — Normal'}
              </span>
            </div>
          )}
          {showToggle && (
            <button
              type="button"
              className={`${styles.toggleChk} ${answers[q.optionalToggle.id] === 'yes' ? styles.toggleChkOn : ''}`}
              onClick={() => updateAnswer(q.optionalToggle.id, answers[q.optionalToggle.id] === 'yes' ? '' : 'yes')}
            >
              <span className={styles.chkBox}>{answers[q.optionalToggle.id] === 'yes' ? '✓' : ''}</span>
              {q.optionalToggle.label}
            </button>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className={styles.page}>

      {/* ── STICKY HEADER ──────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={() => navigate('/')}>← Home</button>
          <div>
            <div className={styles.headerTitle}>🫀 Heart Risk Lifestyle Assessment</div>
            <div className={styles.headerSub}>Section {currentStep} of {TOTAL_STEPS}</div>
          </div>
        </div>
        <div className={styles.progressWrap}>
          <span className={styles.progressPct}>{pct}% complete</span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${pct}%` }}
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <span className={styles.progressStep}>{currentStep}/{TOTAL_STEPS}</span>
        </div>
      </header>

      {/* ── STEP DOTS ────────────────────────────────────── */}
      <div className={styles.stepDots}>
        {SECTIONS.map((_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i + 1 < currentStep ? styles.dotDone : ''} ${i + 1 === currentStep ? styles.dotActive : ''}`}
            title={`Section ${i + 1}`}
          />
        ))}
      </div>

      {/* ── BODY ─────────────────────────────────────────── */}
      <div className={styles.body}>
        <div className={`${styles.panel} animate-fade-up`} key={currentStep}>

          {/* Section Header */}
          <div className={styles.stepHeader}>
            <span className={styles.stepTag}>{section.tag}</span>
            <h2>{section.title}</h2>
            {section.subtitle && <p className={styles.stepSub}>{section.subtitle}</p>}
          </div>

          {/* Questions */}
          <div className={styles.questions}>
            {section.questions.map(q => renderQuestion(q))}
          </div>

          {/* Error */}
          {error && <div className={styles.errorBox}>⚠ {error}</div>}

          {/* Navigation */}
          <div className={styles.nav}>
            {currentStep > 1
              ? <button className="btn-ghost" onClick={goPrev}>← Previous</button>
              : <div />
            }
            <span className={styles.navCounter}>Step {currentStep} of {TOTAL_STEPS}</span>
            {isLast ? (
              <button
                className={styles.submitBtn}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <><span className={styles.spinner}>⟳</span> Calculating...</>
                ) : 'Calculate My Risk ♥'}
              </button>
            ) : (
              <button className="btn-primary" onClick={goNext}>
                Next Section →
              </button>
            )}
          </div>

        </div>
      </div>

    </div>
  )
}
