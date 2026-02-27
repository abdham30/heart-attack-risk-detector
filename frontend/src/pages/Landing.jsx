import { useNavigate } from 'react-router-dom'
import styles from './Landing.module.css'

// ── Risk Category Table ──────────────────────────────────────────
const RISK_BANDS = [
  { range: '0 – 20', label: 'Low Risk', color: '#059669', bg: 'rgba(5,150,105,0.08)' },
  { range: '21 – 40', label: 'Mild Risk', color: '#0891b2', bg: 'rgba(8,145,178,0.08)' },
  { range: '41 – 60', label: 'Moderate Risk', color: '#d97706', bg: 'rgba(217,119,6,0.08)' },
  { range: '61 – 80', label: 'High Risk', color: '#ea580c', bg: 'rgba(234,88,12,0.08)' },
  { range: '81 – 100', label: 'Very High Risk', color: '#dc2626', bg: 'rgba(220,38,38,0.08)' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroGrid} />
          <div className={styles.heroGlow} />
          <div className={styles.ecgContainer}>
            <svg className={styles.ecgSvg} viewBox="0 0 1200 80" fill="none"
              stroke="rgba(37,99,235,0.5)" strokeWidth="2" strokeLinejoin="round">
              <polyline points="0,40 80,40 100,40 110,10 120,65 130,20 140,40 200,40 220,40 230,8 240,68 250,18 260,40 320,40 340,40 350,10 360,65 370,20 380,40 440,40 460,40 470,8 480,68 490,18 500,40 560,40 580,40 590,10 600,65 610,20 620,40 680,40 700,40 710,8 720,68 730,18 740,40 800,40 820,40 830,10 840,65 850,20 860,40 920,40 940,40 950,8 960,68 970,18 980,40 1040,40 1060,40 1070,10 1080,65 1090,20 1100,40 1160,40 1200,40" />
            </svg>
          </div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeDot} />
            Cardiovascular Awareness Tool
          </div>
          <h1>
            Understand Your <br />
            <em className={styles.heroEm}>Heart Risk</em><br />
            in less than 5 Minutes
          </h1>
          <p className={styles.heroSub}>
            A structured, lifestyle-based cardiovascular risk awareness tool built using
            recognised health risk factors. Get a clear risk estimate and practical guidance
            — quickly and responsibly.
          </p>
          <div className={styles.heroActions}>
            <button className={`btn-primary ${styles.heroCta}`} onClick={() => navigate('/assessment')}>
              Check My Heart Risk →
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
              ▶ How It Works
            </button>
          </div>
          <div className={styles.heroStats}>
            {[
              { num: '35', label: 'Clinical Questions' },
              { num: '< 5 min', label: 'Completion Time' },
              { num: '5', label: 'Risk Categories' },
              { num: '0', label: 'Data Stored' },
            ].map(s => (
              <div key={s.label} className={styles.heroStat}>
                <span className={styles.heroStatNum}>{s.num}</span>
                <span className={styles.heroStatLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────── */}
      <section className={styles.problemSection}>
        <div className={styles.sectionInner}>
          <div className={styles.problemGrid}>
            <div>
              <span className="section-tag">The Problem</span>
              <h2>Heart Disease Develops <em className="text-accent">Gradually</em> — Often Without Warning</h2>
              <div className="divider" />
              <p>Cardiovascular risk builds over time through measurable factors such as blood pressure, cholesterol levels, diabetes, smoking, and physical activity patterns.</p>
              <br />
              <p>Many adults are unaware of how these factors combine to influence long-term heart health. Early awareness helps you make informed lifestyle decisions before serious complications develop.</p>
            </div>
            <div className={styles.problemCards}>
              {[
                { icon: '🩸', title: 'Blood Pressure', body: 'Uncontrolled hypertension silently damages arteries over years with no apparent symptoms.' },
                { icon: '🧬', title: 'Cholesterol Buildup', body: 'LDL accumulates in arterial walls over decades, progressively narrowing blood flow.' },
                { icon: '🍬', title: 'Metabolic Risk', body: 'Diabetes and insulin resistance significantly accelerate cardiovascular damage.' },
                { icon: '🚬', title: 'Lifestyle Factors', body: 'Smoking, inactivity, and poor diet compound biological risk factors exponentially.' },
              ].map(c => (
                <div key={c.title} className={styles.problemCard}>
                  <div className={styles.problemCardIcon}>{c.icon}</div>
                  <div>
                    <h4>{c.title}</h4>
                    <p>{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section id="how-it-works" className={styles.howSection}>
        <div className={styles.sectionInner}>
          <span className="section-tag">Process</span>
          <h2>How the <em className="text-accent">Assessment</em> Works</h2>
          <p className={styles.sectionLead}>Three clear steps from input to actionable insight. No medical training required.</p>
          <div className={styles.stepsGrid}>
            {[
              { n: '01', title: 'Enter Your Health Details', body: 'Provide information across 8 structured categories — including age, blood pressure status, cholesterol, lifestyle habits, symptoms, and medical history.', time: '~90 seconds' },
              { n: '02', title: 'Structured Risk Evaluation', body: 'Your inputs are analysed using a transparent, weighted scoring model inspired by established cardiovascular risk principles and clinically relevant thresholds.', time: 'Instant' },
              { n: '03', title: 'Get Your Risk Category & Guidance', body: 'Receive a clear score, risk category (Low → Very High), an interpretation statement, a full score breakdown, and personalised lifestyle recommendations.', time: 'Immediate' },
            ].map(s => (
              <div key={s.n} className={styles.stepCard}>
                <div className={styles.stepNum}>{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <span className={styles.stepTime}>{s.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY ──────────────────────────────────────── */}
      <section id="methodology" className={styles.methodSection}>
        <div className={styles.sectionInner}>
          <span className="section-tag">Methodology</span>
          <h2>How the <em className="text-accent">Scoring Model</em> Works</h2>
          <div className="divider" />
          <div className={styles.methodGrid}>
            <div className={styles.methodText}>
              <p>This tool uses a structured, rule-based weighted scoring system designed for educational awareness — not clinical prediction.</p>
              <br />
              <div className={styles.methodPoints}>
                {[
                  { icon: '📚', title: 'Inspired by established risk factors', body: 'The variables included are drawn from widely recognised cardiovascular risk frameworks used in global prevention guidelines, including factors validated in large population studies.' },
                  { icon: '⚖️', title: 'Rule-based weighted scoring', body: 'Each question response is assigned a point value based on its relative clinical significance. Higher-weight factors (e.g. prior heart diagnosis, diabetes, heavy smoking) contribute more to the total score.' },
                  { icon: '🔢', title: 'Transparent normalisation', body: 'Raw points are normalised to a 0–100 scale. Protective factors (e.g. 5+ days of exercise, healthy diet) reduce the total score.' },
                  { icon: '🎓', title: 'Educational use only', body: 'This is not a validated clinical prediction equation such as Framingham or ASCVD. It does not account for all individual variables and should not be used to make clinical decisions.' },
                ].map(p => (
                  <div key={p.title} className={styles.methodPoint}>
                    <span className={styles.methodIcon}>{p.icon}</span>
                    <div>
                      <strong>{p.title}</strong>
                      <p>{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.riskTable}>
              <div className={styles.riskTableHeader}>Risk Category Scale</div>
              {RISK_BANDS.map(b => (
                <div key={b.label} className={styles.riskBand} style={{ borderLeft: `4px solid ${b.color}`, background: b.bg }}>
                  <span className={styles.riskRange} style={{ color: b.color }}>{b.range}</span>
                  <span className={styles.riskLabel} style={{ color: b.color }}>{b.label}</span>
                </div>
              ))}
              <p className={styles.riskNote}>Scores are calculated on a 0–100 normalised scale. Higher scores reflect a greater accumulation of cardiovascular risk factors across all assessed domains.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CREDIBILITY ──────────────────────────────────────── */}
      <section className={styles.credSection}>
        <div className={styles.sectionInner}>
          <div className={styles.credGrid}>
            <div>
              <span className="section-tag">Evidence-Based</span>
              <h2>Built on Established <em className="text-accent">Cardiovascular Risk Principles</em></h2>
              <div className="divider" />
              <p>This tool incorporates widely recognised heart disease risk factors commonly referenced in global prevention guidelines and large population studies. The scoring model is transparent and designed for educational awareness.</p>
              <div className={styles.credNote}>
                ⚠ This tool does not replace professional medical diagnosis. Always consult a qualified healthcare professional for clinical assessment.
              </div>
            </div>
            <div>
              <p className={styles.factorsLabel}>Core Variables Assessed</p>
              <div className={styles.factorsGrid}>
                {['Age & Biological Sex', 'Systolic Blood Pressure', 'Total Cholesterol / LDL', 'Diabetes & HbA1c', 'Smoking Status', 'BMI & Waist Measure', 'Family History', 'Physical Activity', 'Diet Patterns', 'Sleep & Stress', 'Cardiac Symptoms', 'Alcohol Consumption'].map(f => (
                  <div key={f} className={styles.factorChip}>
                    <span className={styles.factorDot} />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section id="features" className={styles.featuresSection}>
        <div className={styles.sectionInner}>
          <span className="section-tag">Features</span>
          <h2>What This <em className="text-accent">Tool</em> Provides</h2>
          <div className={styles.featuresGrid}>
            {[
              { icon: '📊', title: 'Clinically Structured Risk Score', body: 'Weighted scoring across 35 factors, normalised to a transparent 0–100 scale with five evidence-informed risk categories.' },
              { icon: '🔍', title: 'Transparent Score Breakdown', body: 'See exactly how each factor contributed to your score — no black-box result. Full point-by-point breakdown included.' },
              { icon: '📝', title: 'Clear Interpretation Text', body: 'Each risk category comes with a detailed interpretation statement explaining what your score means in plain language.' },
              { icon: '✅', title: 'Progress Tracking', body: 'Step-by-step progress indicator shows exactly where you are in the assessment — percentage complete and section number.' },
              { icon: '💡', title: 'Personalised Recommendations', body: 'Targeted lifestyle improvement suggestions generated from your specific answers — not generic advice.' },
              { icon: '🔒', title: 'Zero Data Storage', body: 'Your information is processed server-side and not saved or stored anywhere. Complete privacy by design.' },
            ].map((f, i) => (
              <div key={f.title} className={`${styles.featureCard} ${i === 0 || i === 5 ? styles.highlight : ''}`}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREVENTION ───────────────────────────────────────── */}
      <section className={styles.eduSection}>
        <div className={styles.sectionInner}>
          <span className="section-tag">Prevention</span>
          <h2>Focused on <em className="text-accent">Prevention</em> and Awareness</h2>
          <div className="divider" style={{ margin: '20px auto' }} />
          <p className={styles.eduBody}>
            Understanding your cardiovascular risk is the first step toward prevention. Even small improvements in physical activity, diet, blood pressure control, and smoking habits can significantly influence long-term heart health. This tool helps you recognise areas where change may have the greatest impact.
          </p>
          <div className={styles.pillars}>
            {[
              { icon: '🏃', title: 'Move More', body: '150+ min/week reduces risk significantly' },
              { icon: '🥗', title: 'Eat Better', body: 'Whole foods, less salt and saturated fat' },
              { icon: '🚭', title: 'Stop Smoking', body: 'Single most impactful change available' },
              { icon: '💊', title: 'Control BP', body: 'Below 130/80 mmHg is the target' },
              { icon: '😴', title: 'Sleep Well', body: '7–8 hours nightly supports heart health' },
            ].map(p => (
              <div key={p.title} className={styles.pillar}>
                <div className={styles.pillarIcon}>{p.icon}</div>
                <h4>{p.title}</h4>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ───────────────────────────────────────── */}
      <section id="disclaimer" className={styles.disclaimerSection}>
        <div className={styles.sectionInner}>
          <div className={styles.disclaimerBox}>
            <span className="section-tag">Important Notice</span>
            <h2>Medical Disclaimer</h2>
            <p>This application is intended for <strong>educational and awareness purposes only</strong>. It does not provide medical diagnosis, treatment, or professional healthcare advice.</p>
            <p>The risk score generated is based on self-reported data and a simplified rule-based model. It has not been validated in clinical trials and should not be used to make medical decisions.</p>
            <p>If you have symptoms, existing medical conditions, or concerns about your cardiovascular health, please consult a qualified healthcare professional promptly.</p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBg} />
        <div className={styles.sectionInner} style={{ position: 'relative', textAlign: 'center' }}>
          <span className="section-tag">Get Started</span>
          <h2>Take the First Step Toward<br /><em className="text-accent">Better Heart Health</em></h2>
          <p className={styles.ctaSub}>Understanding your risk today can help protect your health tomorrow.</p>
          <button className="btn-primary" style={{ padding: '16px 40px', fontSize: '16px' }} onClick={() => navigate('/assessment')}>
            Check My Risk Now →
          </button>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <p> <button className={styles.footerLink} onClick={() => document.getElementById('disclaimer')?.scrollIntoView({ behavior: 'smooth' })}>&nbsp;&nbsp;Disclaimer &nbsp;&nbsp;</button>
          © 2026 Heart Risk Awareness Project &nbsp;·&nbsp; For educational use only &nbsp;·&nbsp;
        </p>
      </footer>

    </div>
  )
}
