import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  CONSTANTS & HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const API_URL = "http://localhost:4000/api/assess-risk";

const RISK_CONFIG = {
  Low:       { color: "#22c55e", bg: "#052e16", label: "Low Risk",       icon: "♥" },
  Moderate:  { color: "#eab308", bg: "#1c1a04", label: "Moderate Risk",  icon: "♥" },
  High:      { color: "#f97316", bg: "#1c0a04", label: "High Risk",      icon: "♥" },
  "Very High": { color: "#ef4444", bg: "#1c0404", label: "Very High Risk", icon: "♥" },
};

const defaultForm = {
  age: "",
  sex: "male",
  hasHypertension: false,
  systolicBP: "",
  hasHighCholesterol: false,
  totalCholesterol: "",
  hasDiabetes: false,
  familyHistory: false,
  smokingStatus: "never",
  alcoholFrequency: "none",
  exerciseDaysPerWeek: 3,
  heightCm: "",
  weightKg: "",
  dietQuality: "average",
  stressLevel: "moderate",
};

// ─────────────────────────────────────────────────────────────────────────────
//  STYLES
// ─────────────────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0e0f11;
    --surface: #16181c;
    --surface2: #1e2026;
    --border: #2a2d35;
    --text: #e8e9eb;
    --text-muted: #7a7f8e;
    --accent: #e8614a;
    --accent-glow: rgba(232,97,74,0.15);
  }

  body { 
    background: var(--bg); 
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  .app {
    max-width: 760px;
    margin: 0 auto;
    padding: 48px 24px 80px;
  }

  /* ── Header ── */
  .header {
    text-align: center;
    margin-bottom: 52px;
  }
  .header-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 16px;
  }
  .header h1 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(32px, 6vw, 52px);
    line-height: 1.1;
    color: #f2f3f5;
    margin-bottom: 14px;
  }
  .header h1 em {
    font-style: italic;
    color: var(--accent);
  }
  .header p {
    color: var(--text-muted);
    font-size: 15px;
    line-height: 1.7;
    max-width: 480px;
    margin: 0 auto;
  }
  .header-divider {
    width: 48px;
    height: 2px;
    background: var(--accent);
    margin: 24px auto 0;
    opacity: 0.6;
  }

  /* ── Section ── */
  .section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px 28px;
    margin-bottom: 16px;
  }
  .section-title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ── Form Fields ── */
  .field-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .field-grid.one-col { grid-template-columns: 1fr; }

  .field {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .field label {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-muted);
    letter-spacing: 0.04em;
  }
  .field input, .field select {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 11px 14px;
    width: 100%;
    transition: border-color 0.2s;
    -webkit-appearance: none;
    appearance: none;
  }
  .field input:focus, .field select:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }
  .field select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237a7f8e' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
    cursor: pointer;
  }

  /* ── Toggle ── */
  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
  }
  .toggle-row:last-child { border-bottom: none; }
  .toggle-label {
    font-size: 14px;
    color: var(--text);
  }
  .toggle-label small {
    display: block;
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 2px;
  }
  .toggle {
    position: relative;
    width: 44px;
    height: 24px;
    flex-shrink: 0;
  }
  .toggle input { opacity: 0; width: 0; height: 0; }
  .toggle-track {
    position: absolute;
    inset: 0;
    background: var(--border);
    border-radius: 24px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .toggle input:checked + .toggle-track { background: var(--accent); }
  .toggle-thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.2s;
    pointer-events: none;
  }
  .toggle input:checked ~ .toggle-thumb { transform: translateX(20px); }

  /* ── Slider ── */
  .slider-wrapper { display: flex; align-items: center; gap: 14px; }
  .slider-value {
    font-size: 22px;
    font-weight: 600;
    font-family: 'DM Serif Display', serif;
    color: var(--accent);
    width: 28px;
    text-align: center;
    flex-shrink: 0;
  }
  input[type="range"] {
    flex: 1;
    -webkit-appearance: none;
    height: 4px;
    background: var(--border);
    border-radius: 4px;
    outline: none;
    cursor: pointer;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--accent);
    cursor: pointer;
  }

  /* ── Submit ── */
  .submit-btn {
    width: 100%;
    padding: 16px;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.04em;
    cursor: pointer;
    margin-top: 8px;
    transition: opacity 0.2s, transform 0.1s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .submit-btn:hover { opacity: 0.9; }
  .submit-btn:active { transform: scale(0.99); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ── Error ── */
  .error-box {
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.3);
    border-radius: 10px;
    padding: 14px 18px;
    color: #fca5a5;
    font-size: 13px;
    margin-top: 12px;
  }

  /* ── Result ── */
  .result-card {
    border-radius: 20px;
    padding: 36px;
    margin-bottom: 16px;
    animation: fadeUp 0.5s ease;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .score-display {
    display: flex;
    align-items: center;
    gap: 28px;
    margin-bottom: 24px;
  }
  .score-ring {
    position: relative;
    width: 96px;
    height: 96px;
    flex-shrink: 0;
  }
  .score-ring svg {
    transform: rotate(-90deg);
    width: 96px;
    height: 96px;
  }
  .score-ring-bg { fill: none; stroke: rgba(255,255,255,0.08); stroke-width: 7; }
  .score-ring-fill { fill: none; stroke-width: 7; stroke-linecap: round; transition: stroke-dashoffset 1s ease; }
  .score-number {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'DM Serif Display', serif;
    font-size: 26px;
    line-height: 1;
  }
  .score-number small {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    opacity: 0.6;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin-top: 2px;
  }
  .score-meta {}
  .score-category {
    font-family: 'DM Serif Display', serif;
    font-size: 28px;
    line-height: 1.1;
    margin-bottom: 6px;
  }
  .score-bmi {
    font-size: 13px;
    opacity: 0.7;
  }

  /* ── Recommendations ── */
  .recs-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .recs-list li {
    background: rgba(255,255,255,0.05);
    border-radius: 10px;
    padding: 13px 16px;
    font-size: 14px;
    line-height: 1.6;
    color: #d4d6dc;
  }

  /* ── Breakdown ── */
  .breakdown-grid {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .breakdown-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: rgba(255,255,255,0.03);
    border-radius: 8px;
    font-size: 13px;
  }
  .breakdown-factor { color: var(--text-muted); }
  .breakdown-condition { color: var(--text); flex: 1; padding: 0 12px; }
  .breakdown-pts {
    font-weight: 600;
    font-size: 13px;
    min-width: 40px;
    text-align: right;
  }
  .pts-pos { color: #f87171; }
  .pts-neg { color: #4ade80; }
  .pts-zero { color: var(--text-muted); }

  /* ── Reset btn ── */
  .reset-btn {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-muted);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 8px;
    width: 100%;
    transition: border-color 0.2s, color 0.2s;
  }
  .reset-btn:hover { border-color: var(--text-muted); color: var(--text); }

  /* ── Disclaimer ── */
  .disclaimer {
    text-align: center;
    font-size: 11px;
    color: var(--text-muted);
    margin-top: 32px;
    line-height: 1.7;
    opacity: 0.7;
  }

  @media (max-width: 540px) {
    .field-grid { grid-template-columns: 1fr; }
    .section { padding: 22px 18px; }
    .score-display { flex-direction: column; text-align: center; }
    .result-card { padding: 24px; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
//  TOGGLE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function Toggle({ label, sublabel, checked, onChange }) {
  return (
    <div className="toggle-row">
      <div className="toggle-label">
        {label}
        {sublabel && <small>{sublabel}</small>}
      </div>
      <label className="toggle">
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
        <span className="toggle-track" />
        <span className="toggle-thumb" />
      </label>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  SCORE RING COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function ScoreRing({ score, color }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="score-ring">
      <svg viewBox="0 0 96 96">
        <circle className="score-ring-bg" cx="48" cy="48" r={r} />
        <circle
          className="score-ring-fill"
          cx="48" cy="48" r={r}
          stroke={color}
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="score-number" style={{ color }}>
        {score}
        <small>/ 100</small>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  RESULT VIEW
// ─────────────────────────────────────────────────────────────────────────────

function ResultView({ result, onReset }) {
  const cfg = RISK_CONFIG[result.category];
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <>
      <div className="result-card section" style={{ borderColor: cfg.color + "40", background: cfg.bg }}>
        <div className="score-display">
          <ScoreRing score={result.score} color={cfg.color} />
          <div className="score-meta">
            <div className="score-category" style={{ color: cfg.color }}>{cfg.label}</div>
            <div className="score-bmi">BMI: {result.bmi} · Score: {result.score} / 100</div>
          </div>
        </div>
        <ul className="recs-list">
          {result.recommendations.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>

      <div className="section">
        <div
          className="section-title"
          style={{ cursor: "pointer", userSelect: "none" }}
          onClick={() => setShowBreakdown(v => !v)}
        >
          Score Breakdown {showBreakdown ? "▲" : "▼"}
        </div>
        {showBreakdown && (
          <div className="breakdown-grid">
            {result.breakdown.map((item, i) => (
              <div className="breakdown-row" key={i}>
                <span className="breakdown-factor">{item.factor}</span>
                <span className="breakdown-condition">{item.condition}</span>
                <span className={`breakdown-pts ${item.points > 0 ? "pts-pos" : item.points < 0 ? "pts-neg" : "pts-zero"}`}>
                  {item.points > 0 ? "+" : ""}{item.points}
                </span>
              </div>
            ))}
            <div className="breakdown-row" style={{ borderTop: "1px solid #2a2d35", marginTop: 4 }}>
              <span className="breakdown-factor" style={{ fontWeight: 600 }}>Total</span>
              <span className="breakdown-condition" />
              <span className="breakdown-pts pts-pos" style={{ fontSize: 15 }}>{result.score}</span>
            </div>
          </div>
        )}
      </div>

      <button className="reset-btn" onClick={onReset}>← Recalculate</button>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN APP
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [form, setForm] = useState(defaultForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const payload = {
        ...form,
        age: Number(form.age),
        heightCm: Number(form.heightCm),
        weightKg: Number(form.weightKg),
        exerciseDaysPerWeek: Number(form.exerciseDaysPerWeek),
        systolicBP: form.systolicBP ? Number(form.systolicBP) : undefined,
        totalCholesterol: form.totalCholesterol ? Number(form.totalCholesterol) : undefined,
      };
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.details || data.error || "Unknown error");
      setResult(data);
    } catch (e) {
      setError(e.message || "Could not connect to the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <div className="header-eyebrow">Awareness Tool · Not Medical Advice</div>
          <h1>Know Your <em>Heart</em> Risk</h1>
          <p>Answer a few lifestyle and clinical questions to receive a personalized cardiovascular risk score and actionable guidance.</p>
          <div className="header-divider" />
        </div>

        {result ? (
          <ResultView result={result} onReset={() => setResult(null)} />
        ) : (
          <>
            {/* ── Demographics ── */}
            <div className="section">
              <div className="section-title">Demographics</div>
              <div className="field-grid">
                <div className="field">
                  <label>Age</label>
                  <input
                    type="number" min="18" max="120" placeholder="e.g. 47"
                    value={form.age} onChange={e => set("age", e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Biological Sex</label>
                  <select value={form.sex} onChange={e => set("sex", e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ── Clinical ── */}
            <div className="section">
              <div className="section-title">Clinical Factors</div>
              <Toggle
                label="Diagnosed High Blood Pressure" sublabel="Hypertension"
                checked={form.hasHypertension} onChange={v => set("hasHypertension", v)}
              />
              {form.hasHypertension && (
                <div className="field" style={{ marginTop: 12 }}>
                  <label>Systolic BP (optional, if known)</label>
                  <input type="number" placeholder="e.g. 145 mmHg"
                    value={form.systolicBP} onChange={e => set("systolicBP", e.target.value)} />
                </div>
              )}
              <Toggle
                label="Diagnosed High Cholesterol"
                checked={form.hasHighCholesterol} onChange={v => set("hasHighCholesterol", v)}
              />
              {form.hasHighCholesterol && (
                <div className="field" style={{ marginTop: 12 }}>
                  <label>Total Cholesterol (optional, if known)</label>
                  <input type="number" placeholder="e.g. 220 mg/dL"
                    value={form.totalCholesterol} onChange={e => set("totalCholesterol", e.target.value)} />
                </div>
              )}
              <Toggle
                label="Diagnosed Diabetes"
                checked={form.hasDiabetes} onChange={v => set("hasDiabetes", v)}
              />
              <Toggle
                label="Family History of Heart Disease" sublabel="Parent or sibling with heart disease"
                checked={form.familyHistory} onChange={v => set("familyHistory", v)}
              />
            </div>

            {/* ── Lifestyle ── */}
            <div className="section">
              <div className="section-title">Lifestyle Factors</div>
              <div className="field-grid" style={{ marginBottom: 14 }}>
                <div className="field">
                  <label>Smoking Status</label>
                  <select value={form.smokingStatus} onChange={e => set("smokingStatus", e.target.value)}>
                    <option value="never">Never Smoked</option>
                    <option value="former">Former Smoker</option>
                    <option value="current">Current Smoker</option>
                  </select>
                </div>
                <div className="field">
                  <label>Alcohol Frequency</label>
                  <select value={form.alcoholFrequency} onChange={e => set("alcoholFrequency", e.target.value)}>
                    <option value="none">None</option>
                    <option value="moderate">Moderate</option>
                    <option value="frequent">Frequent</option>
                  </select>
                </div>
                <div className="field">
                  <label>Diet Quality</label>
                  <select value={form.dietQuality} onChange={e => set("dietQuality", e.target.value)}>
                    <option value="good">Good</option>
                    <option value="average">Average</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
                <div className="field">
                  <label>Stress Level</label>
                  <select value={form.stressLevel} onChange={e => set("stressLevel", e.target.value)}>
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="field" style={{ marginBottom: 14 }}>
                <label>Exercise Days per Week</label>
                <div className="slider-wrapper">
                  <span className="slider-value">{form.exerciseDaysPerWeek}</span>
                  <input type="range" min="0" max="7" step="1"
                    value={form.exerciseDaysPerWeek}
                    onChange={e => set("exerciseDaysPerWeek", Number(e.target.value))} />
                  <span style={{ fontSize: 12, color: "var(--text-muted)", width: 40 }}>7 days</span>
                </div>
              </div>

              <div className="field-grid">
                <div className="field">
                  <label>Height (cm)</label>
                  <input type="number" placeholder="e.g. 172"
                    value={form.heightCm} onChange={e => set("heightCm", e.target.value)} />
                </div>
                <div className="field">
                  <label>Weight (kg)</label>
                  <input type="number" placeholder="e.g. 78"
                    value={form.weightKg} onChange={e => set("weightKg", e.target.value)} />
                </div>
              </div>
            </div>

            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⟳</span>
                  Calculating...
                </>
              ) : "Check My Heart Risk →"}
            </button>
            <style>{`@keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }`}</style>

            {error && <div className="error-box">⚠ {error}</div>}
          </>
        )}

        <div className="disclaimer">
          This tool is for awareness purposes only and does not constitute medical advice.<br />
          No data is stored or transmitted beyond the calculation. Always consult a qualified physician.
        </div>
      </div>
    </>
  );
}
