// ═══════════════════════════════════════════════════════════════
//  HEART RISK SCORING ENGINE
//  5 Categories: Low | Mild | Moderate | High | Very High
//  Score normalized to 0–100
// ═══════════════════════════════════════════════════════════════

const MAX_RAW = 280;

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function computeScore(a) {
  const breakdown = [];
  let raw = 0;

  function add(factor, value, pts) {
    breakdown.push({ factor, value, pts });
    raw += pts;
  }

  // ── 1. Age ─────────────────────────────────────────────────────
  const age = parseInt(a.age) || 0;
  if (age >= 75)      add('Age', '75+', 22);
  else if (age >= 65) add('Age', '65–74', 17);
  else if (age >= 55) add('Age', '55–64', 12);
  else if (age >= 45) add('Age', '45–54', 7);
  else if (age >= 35) add('Age', '35–44', 3);
  else                add('Age', 'Under 35', 0);

  // ── 2. Sex ─────────────────────────────────────────────────────
  if (a.sex === 'male') add('Biological Sex', 'Male', 3);

  // ── 3–4. BMI ───────────────────────────────────────────────────
  const bmi = parseFloat(a.bmi) || 0;
  if (bmi > 0) {
    if (bmi >= 35)       add('BMI', `Obese II+ (${bmi.toFixed(1)})`, 14);
    else if (bmi >= 30)  add('BMI', `Obese I (${bmi.toFixed(1)})`, 10);
    else if (bmi >= 25)  add('BMI', `Overweight (${bmi.toFixed(1)})`, 5);
    else if (bmi < 18.5) add('BMI', `Underweight (${bmi.toFixed(1)})`, 3);
    else                 add('BMI', `Normal (${bmi.toFixed(1)})`, 0);
  }

  // ── 5. Waist ───────────────────────────────────────────────────
  const waistCm = parseFloat(a.waistCm) || 0;
  if (waistCm > 0 && a.waistUnknown !== 'yes') {
    const isMale = a.sex === 'male';
    const cutHigh = isMale ? 102 : 88;
    const cutMid  = isMale ? 94  : 80;
    if (waistCm >= cutHigh)      add('Waist Circumference', `High (${waistCm.toFixed(0)} cm)`, 9);
    else if (waistCm >= cutMid)  add('Waist Circumference', `Borderline (${waistCm.toFixed(0)} cm)`, 4);
    else                         add('Waist Circumference', `Normal (${waistCm.toFixed(0)} cm)`, 0);
  }

  // ── 6. Blood Pressure ──────────────────────────────────────────
  const bpMap  = { high: 13, mid: 8, low: 4, notsure: 3, none: 0 };
  const bpLabels = { high: 'Yes, ≥140/90', mid: 'Yes, 130–139/80–89', low: 'Yes, <130/80', notsure: 'Not sure', none: 'No' };
  if (a.bp) add('Blood Pressure Diagnosis', bpLabels[a.bp] || a.bp, bpMap[a.bp] ?? 0);

  // ── 7. BP Medications ─────────────────────────────────────────
  const bpMedMap = { multi: 7, one: 4, notsure: 2, none: 0 };
  if (a.bpMed && a.bpMed !== 'none')
    add('BP Medications', a.bpMed === 'multi' ? 'Multiple meds' : a.bpMed === 'one' ? 'One med' : 'Not sure', bpMedMap[a.bpMed] ?? 0);

  // ── 8. Diabetes ────────────────────────────────────────────────
  const dmMap = { high: 16, mod: 11, good: 7, unknown: 9, notsure: 4, none: 0 };
  const dmLabels = { high: 'Yes, HbA1c ≥9%', mod: 'Yes, HbA1c 7–8.9%', good: 'Yes, HbA1c <7%', unknown: 'Yes (value unknown)', notsure: 'Not sure', none: 'No' };
  if (a.diabetes) add('Diabetes', dmLabels[a.diabetes] || a.diabetes, dmMap[a.diabetes] ?? 0);

  // ── 9. Diabetes Medications ────────────────────────────────────
  const dmMedMap = { both: 9, insulin: 7, tablets: 4, notsure: 2, none: 0 };
  if (a.dmMed && a.dmMed !== 'none')
    add('Diabetes Medications', a.dmMed, dmMedMap[a.dmMed] ?? 0);

  // ── 10. Cholesterol ────────────────────────────────────────────
  const cholMap = { high: 13, mid: 8, unknown: 7, notsure: 4, good: 3, none: 0 };
  const cholLabels = { high: 'Yes, LDL ≥160', mid: 'Yes, LDL 100–159', good: 'Yes, LDL <100', unknown: 'Yes (value unknown)', notsure: 'Not sure', none: 'No' };
  if (a.chol) add('Cholesterol', cholLabels[a.chol] || a.chol, cholMap[a.chol] ?? 0);

  // ── 11. Cholesterol Medication ─────────────────────────────────
  if (a.cholMed === 'yes') add('Cholesterol Medication', 'Yes (managed)', -3);

  // ── 12. Smoking ────────────────────────────────────────────────
  const smokeMap = { never: 0, former_old: 3, former_recent: 7, current_low: 9, current_mod: 12, current_high: 16, current_heavy: 20 };
  const smokeLabels = { never: 'Never smoked', former_old: 'Former, quit >1yr', former_recent: 'Former, quit <1yr', current_low: 'Current 1–5/day', current_mod: 'Current 6–10/day', current_high: 'Current 11–20/day', current_heavy: 'Current 20+/day' };
  if (a.smoke) add('Tobacco Use', smokeLabels[a.smoke] || a.smoke, smokeMap[a.smoke] ?? 0);

  // ── 13. Secondhand Smoke ───────────────────────────────────────
  const shMap = { '0': 0, '1-2': 2, '3-5': 4, '6-7': 6 };
  if (a.secondhand && a.secondhand !== '0')
    add('Secondhand Smoke', `${a.secondhand} days/week`, shMap[a.secondhand] ?? 0);

  // ── 14–15. Alcohol ─────────────────────────────────────────────
  const alcFreqMap = { none: 0, rare: 1, monthly: 2, weekly: 5, frequent: 8 };
  const alcAmtMap  = { none: 0, '1': 1, '2-3': 3, '4-5': 6, '5+': 9 };
  if (a.alcFreq && a.alcFreq !== 'none') add('Alcohol Frequency', a.alcFreq, alcFreqMap[a.alcFreq] ?? 0);
  if (a.alcAmt  && a.alcAmt  !== 'none') add('Alcohol Amount/Day', `${a.alcAmt} drink(s)`, alcAmtMap[a.alcAmt] ?? 0);

  // ── 16. Aerobic Exercise ───────────────────────────────────────
  const exMap = { '300+': -5, '150-299': -2, '75-149': 2, '<75': 6, none: 10 };
  const exLabels = { '300+': '300+ min/wk', '150-299': '150–299 min/wk', '75-149': '75–149 min/wk', '<75': '<75 min/wk', none: 'None' };
  if (a.exercise) add('Aerobic Activity', exLabels[a.exercise] || a.exercise, exMap[a.exercise] ?? 0);

  // ── 17. Sitting Time ───────────────────────────────────────────
  const sitMap = { '<4': 0, '4-6': 3, '7-9': 5, '9+': 8 };
  if (a.sitting && a.sitting !== '<4') add('Daily Sitting Time', `${a.sitting} hrs/day`, sitMap[a.sitting] ?? 0);

  // ── 18. Strength Training ──────────────────────────────────────
  const strMap = { '4+': -3, '2-3': 0, '1': 2, '<1': 4, none: 6 };
  const strLabels = { '4+': '4+ days/wk', '2-3': '2–3 days/wk', '1': '1 day/wk', '<1': '<1 day/wk', none: 'None' };
  if (a.strength) add('Strength Training', strLabels[a.strength] || a.strength, strMap[a.strength] ?? 0);

  // ── 19. Fruit & Veg ────────────────────────────────────────────
  const fvMap = { '5+': -4, '3-4': -1, '1-2': 3, rarely: 7 };
  const fvLabels = { '5+': '5+ servings/day', '3-4': '3–4 servings/day', '1-2': '1–2 servings/day', rarely: 'Rarely or none' };
  if (a.fruitveg) add('Fruit & Veg Intake', fvLabels[a.fruitveg] || a.fruitveg, fvMap[a.fruitveg] ?? 0);

  // ── 20. Fried/Fast Food ────────────────────────────────────────
  const friedMap = { rarely: 0, monthly: 2, weekly: 5, frequent: 8 };
  if (a.fried && a.fried !== 'rarely') add('Fried/Fast Food', a.fried, friedMap[a.fried] ?? 0);

  // ── 21. Processed Meats ────────────────────────────────────────
  const pmMap = { rarely: 0, monthly: 1, weekly: 3, frequent: 6 };
  if (a.procmeat && a.procmeat !== 'rarely') add('Processed Meats', a.procmeat, pmMap[a.procmeat] ?? 0);

  // ── 22. Sugary Drinks ──────────────────────────────────────────
  const sdMap = { rarely: 0, monthly: 1, weekly: 3, frequent: 6 };
  if (a.sugary && a.sugary !== 'rarely') add('Sugary Drinks', a.sugary, sdMap[a.sugary] ?? 0);

  // ── 23. Salt ───────────────────────────────────────────────────
  const saltMap = { never: 0, occasionally: 1, often: 3, always: 6 };
  if (a.salt && a.salt !== 'never') add('Added Salt', a.salt, saltMap[a.salt] ?? 0);

  // ── 24. Sleep ──────────────────────────────────────────────────
  const sleepMap = { '7-8': 0, '6': 3, '5': 5, '<5': 8, '9+': 3 };
  const sleepLabels = { '7-8': '7–8 hrs', '6': '6 hrs', '5': '5 hrs', '<5': '<5 hrs', '9+': '>9 hrs' };
  if (a.sleep && a.sleep !== '7-8') add('Sleep Duration', sleepLabels[a.sleep] || a.sleep, sleepMap[a.sleep] ?? 0);

  // ── 25. Stress ─────────────────────────────────────────────────
  const stressMap = { rarely: 0, monthly: 2, weekly: 5, daily: 8 };
  if (a.stress && a.stress !== 'rarely') add('Chronic Stress', a.stress, stressMap[a.stress] ?? 0);

  // ── 26. Anxiety ────────────────────────────────────────────────
  const anxMap = { rarely: 0, monthly: 2, weekly: 4, daily: 6 };
  if (a.anxiety && a.anxiety !== 'rarely') add('Anxiety/Restlessness', a.anxiety, anxMap[a.anxiety] ?? 0);

  // ── 27. Social Support ─────────────────────────────────────────
  const supMap = { strong: -3, moderate: 0, limited: 3, none: 5 };
  if (a.support) add('Social Support', a.support, supMap[a.support] ?? 0);

  // ── 28–33. Cardiac Symptoms ────────────────────────────────────
  const symMap = { never: 0, '1-2': 2, monthly: 5, weekly: 8, daily: 12 };
  const symptoms = [
    ['sob',      'Shortness of Breath'],
    ['dizzy',    'Dizziness'],
    ['palp',     'Palpitations'],
    ['chest',    'Chest Discomfort'],
    ['fatigue',  'Unusual Fatigue'],
    ['swelling', 'Foot/Ankle Swelling'],
  ];
  symptoms.forEach(([key, label]) => {
    const val = a[key];
    if (val && val !== 'never') add(`${label} (symptom)`, val, symMap[val] ?? 0);
  });

  // ── 34. Family History ─────────────────────────────────────────
  if (a.family === 'yes')     add('Family History (early heart event)', 'Yes', 12);
  else if (a.family === 'notsure') add('Family History', 'Not sure', 4);

  // ── 35. Prior Heart Diagnosis ──────────────────────────────────
  if (a.prevHeart === 'yes')     add('Prior Heart Diagnosis', 'Yes', 22);
  else if (a.prevHeart === 'notsure') add('Prior Heart Diagnosis', 'Not sure', 5);

  // ── Normalize to 0–100 ─────────────────────────────────────────
  const score = clamp(Math.round((raw / MAX_RAW) * 100), 0, 100);

  // ── 5-Category Classification ──────────────────────────────────
  let category, color, bgColor, tagline, urgency, interpretation;

  if (score <= 20) {
    category = 'Low Risk';
    color = '#059669';
    bgColor = 'rgba(5,150,105,0.10)';
    tagline = 'Your current lifestyle profile suggests a relatively low cardiovascular risk.';
    urgency = 'Continue your healthy habits and schedule a routine annual check-up.';
    interpretation = 'A score in this range indicates that the risk factors you have reported are within a generally favorable range. Maintaining current lifestyle choices and attending regular health screenings is recommended.';
  } else if (score <= 40) {
    category = 'Mild Risk';
    color = '#0891b2';
    bgColor = 'rgba(8,145,178,0.10)';
    tagline = 'Your profile suggests a mild elevation in cardiovascular risk with identifiable, manageable areas for improvement.';
    urgency = 'Review the recommendations below and consider discussing them with your GP.';
    interpretation = 'A mild risk score indicates some lifestyle or clinical factors that may increase cardiovascular risk over time. Many of these are modifiable through consistent lifestyle changes. Discussing your results with a primary care physician is advisable.';
  } else if (score <= 60) {
    category = 'Moderate Risk';
    color = '#d97706';
    bgColor = 'rgba(217,119,6,0.10)';
    tagline = 'Your profile indicates a moderate cardiovascular risk. Several significant risk factors have been identified.';
    urgency = 'We recommend consulting your GP within the next few months to discuss your cardiovascular health.';
    interpretation = 'A moderate score suggests the presence of multiple contributing risk factors. Targeted interventions — including lifestyle modification and clinical review — can meaningfully reduce this risk. Medical consultation is strongly encouraged.';
  } else if (score <= 80) {
    category = 'High Risk';
    color = '#ea580c';
    bgColor = 'rgba(234,88,12,0.10)';
    tagline = 'Your profile indicates a high cardiovascular risk. Multiple significant risk factors are present simultaneously.';
    urgency = 'Please consult a healthcare professional soon to evaluate your cardiovascular status.';
    interpretation = 'A high score indicates substantial cardiovascular risk driven by a combination of clinical and lifestyle factors. Medical evaluation, including appropriate testing, is strongly recommended. Risk reduction through both medical management and lifestyle change is important.';
  } else {
    category = 'Very High Risk';
    color = '#dc2626';
    bgColor = 'rgba(220,38,38,0.10)';
    tagline = 'Your profile indicates a very high cardiovascular risk requiring prompt medical attention.';
    urgency = '⚠ Please consult a cardiologist or your doctor as soon as possible.';
    interpretation = 'A very high score reflects a significant accumulation of severe cardiovascular risk factors. Immediate medical consultation with a qualified healthcare professional is strongly recommended. This score should not be ignored, though it does not represent a diagnosis.';
  }

  return { score, raw, category, color, bgColor, tagline, urgency, interpretation, breakdown };
}

module.exports = { computeScore };
