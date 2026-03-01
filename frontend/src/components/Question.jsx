import styles from './Question.module.css'

// ── Radio/Option Question ────────────────────────────────────────
export function OptionQuestion({ question, hint, options, value, onChange }) {
  return (
    <div className={styles.question}>
      <div className={styles.label}>{question}</div>
      {hint && <div className={styles.hint}>{hint}</div>}
      <div className={styles.options}>
        {options.map(opt => (
          <button
            key={opt.value}
            type="button"
            className={`${styles.option} ${value === opt.value ? styles.selected : ''}`}
            onClick={() => onChange(opt.value)}
          >
            <span className={styles.optionDot}>
              {value === opt.value && <span className={styles.optionDotInner} />}
            </span>
            <span className={styles.optionText}>{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Number Input Question ────────────────────────────────────────
export function NumberQuestion({ question, hint, placeholder, value, onChange, min = 0, max = 9999, unit }) {
  const handleChange = (e) => {
    const v = e.target.value
    if (v === '' || (parseFloat(v) > 0)) onChange(v)
  }

  return (
    <div className={styles.question}>
      <div className={styles.label}>{question}</div>
      {hint && <div className={styles.hint}>{hint}</div>}
      <div className={styles.inputWrap}>
        <input
          type="number"
          className={styles.input}
          placeholder={placeholder}
          value={value || ''}
          min={min}
          max={max}
          onChange={handleChange}
        />
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>
    </div>
  )
}
