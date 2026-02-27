// ═══════════════════════════════════════════════════════════════
//  PERSONALISED RECOMMENDATIONS ENGINE
// ═══════════════════════════════════════════════════════════════

function buildRecommendations(a, score) {
  const recs = [];

  // Smoking
  const smoke = a.smoke;
  if (smoke && smoke.startsWith('current')) {
    recs.push({ icon: '🚭', priority: 1, text: 'Quitting smoking is the single most impactful change you can make for your heart. Cardiovascular risk begins to fall within weeks of stopping. Ask your doctor about cessation support programs, nicotine replacement, or medication.' });
  } else if (smoke === 'former_recent') {
    recs.push({ icon: '✅', priority: 1, text: 'You recently quit smoking — an excellent decision. Your cardiovascular risk will continue to decrease significantly over the coming years. Maintain this commitment.' });
  }

  // Blood Pressure
  const bp = a.bp;
  if (bp === 'high' || bp === 'mid') {
    recs.push({ icon: '💊', priority: 1, text: 'High blood pressure is a leading driver of heart attack and stroke. If diagnosed, ensure your readings are monitored regularly. The target is below 130/80 mmHg. Medication, a low-sodium diet, and regular exercise all contribute to effective management.' });
  }

  // Diabetes
  const dm = a.diabetes;
  if (dm && dm !== 'none' && dm !== 'notsure') {
    recs.push({ icon: '🩸', priority: 1, text: 'Diabetes significantly increases cardiovascular risk. Maintaining tight blood sugar control (HbA1c below 7%) is essential. Work with your care team on medication adherence, dietary choices, and consistent monitoring.' });
  }

  // Cholesterol
  const chol = a.chol;
  if (chol === 'high' || chol === 'mid' || chol === 'unknown') {
    recs.push({ icon: '🧪', priority: 2, text: 'Elevated LDL cholesterol contributes directly to arterial plaque formation. A heart-healthy diet (less saturated fat, more fibre and omega-3s), regular exercise, and statins where appropriate can substantially reduce LDL levels.' });
  }

  // Exercise
  const ex = a.exercise;
  if (ex === 'none' || ex === '<75') {
    recs.push({ icon: '🏃', priority: 2, text: 'Aim for at least 150 minutes of moderate aerobic activity per week (e.g. 5 × 30-min sessions of brisk walking, cycling, or swimming). Even beginning with 10-minute daily walks provides measurable cardiovascular benefit.' });
  } else if (ex === '75-149') {
    recs.push({ icon: '🏃', priority: 2, text: 'You are active but below the recommended level. Adding 1–2 more sessions per week to reach 150 minutes will provide meaningful additional cardiovascular protection.' });
  }

  // BMI
  const bmi = parseFloat(a.bmi) || 0;
  if (bmi >= 30) {
    recs.push({ icon: '⚖️', priority: 2, text: `Your BMI (${bmi.toFixed(1)}) is in the obese range. A 5–10% reduction in body weight can significantly reduce blood pressure, cholesterol, and diabetes risk. Gradual, sustainable changes are more effective than rapid weight loss.` });
  } else if (bmi >= 25) {
    recs.push({ icon: '⚖️', priority: 2, text: `Your BMI (${bmi.toFixed(1)}) indicates you are overweight. Even a modest 5% reduction in body weight can positively impact cardiovascular risk markers.` });
  }

  // Diet
  const fv = a.fruitveg;
  const fried = a.fried;
  const salt = a.salt;
  if (fv === 'rarely' || fried === 'frequent' || salt === 'always' || salt === 'often') {
    recs.push({ icon: '🥗', priority: 2, text: 'Your dietary pattern is associated with elevated cardiovascular risk. Prioritise: 5+ daily servings of fruit and vegetables, whole grains, oily fish twice weekly, limited processed meat, and fewer than 6g of salt per day.' });
  }

  // Sleep
  const sleep = a.sleep;
  if (sleep === '<5' || sleep === '5') {
    recs.push({ icon: '😴', priority: 3, text: 'Short sleep duration is independently associated with cardiovascular disease. Aim for 7–8 hours of quality sleep nightly. Address sleep hygiene, reduce screen exposure before bed, and consult a doctor if you suspect sleep apnoea.' });
  }

  // Stress
  const stress = a.stress;
  if (stress === 'daily' || stress === 'weekly') {
    recs.push({ icon: '🧘', priority: 3, text: 'Chronic stress activates the sympathetic nervous system, elevating blood pressure and contributing to inflammatory pathways. Regular mindfulness practice, sufficient sleep, physical activity, and social connection are all evidence-supported countermeasures.' });
  }

  // Alcohol
  const alc = a.alcFreq;
  const alcAmt = a.alcAmt;
  if (alc === 'frequent' || alcAmt === '4-5' || alcAmt === '5+') {
    recs.push({ icon: '🍷', priority: 3, text: 'Heavy alcohol consumption raises blood pressure, triglycerides, and the risk of heart failure. Reducing intake to 1–2 drinks per occasion, fewer than 5 days per week, meaningfully lowers cardiovascular risk.' });
  }

  // Sedentary behaviour
  const sitting = a.sitting;
  if (sitting === '7-9' || sitting === '9+') {
    recs.push({ icon: '🪑', priority: 3, text: 'Prolonged sitting is a cardiovascular risk factor independent of exercise. Breaking sitting time every 30–60 minutes with brief walks or standing reduces this risk. Consider a standing desk or setting activity reminders.' });
  }

  // Secondhand smoke
  if (a.secondhand === '6-7' || a.secondhand === '3-5') {
    recs.push({ icon: '💨', priority: 3, text: 'Regular exposure to secondhand smoke increases your cardiovascular risk. Where possible, minimise time in enclosed spaces where others smoke.' });
  }

  // Family history
  if (a.family === 'yes') {
    recs.push({ icon: '🧬', priority: 2, text: 'A family history of early heart disease elevates your inherited risk. Regular screening for blood pressure, cholesterol, and blood glucose is especially important. Discuss your family history in detail with your doctor.' });
  }

  // Symptoms
  const symptoms = ['sob', 'dizzy', 'palp', 'chest', 'fatigue', 'swelling'];
  const hasFrequent = symptoms.some(k => a[k] === 'weekly' || a[k] === 'daily' || a[k] === 'monthly');
  if (a.chest === 'weekly' || a.chest === 'daily' || a.chest === 'monthly') {
    recs.push({ icon: '⚠️', priority: 1, text: 'Recurring chest discomfort or tightness during activity may indicate angina or reduced coronary blood flow. This symptom requires prompt medical evaluation — do not delay seeking assessment.' });
  } else if (hasFrequent) {
    recs.push({ icon: '🏥', priority: 2, text: 'You have reported recurring cardiac symptoms. These warrant evaluation by a healthcare professional, particularly if they are new, progressive, or occur at rest.' });
  }

  // Prior heart diagnosis
  if (a.prevHeart === 'yes') {
    recs.push({ icon: '❤️', priority: 1, text: 'With a prior cardiac diagnosis, ongoing medical management is essential — including medication adherence, cardiac rehabilitation if recommended, lifestyle optimisation, and regular specialist follow-up.' });
  }

  // Fallback
  if (recs.length === 0) {
    recs.push({ icon: '✅', priority: 3, text: 'Your lifestyle profile appears well-balanced across most assessed areas. Continue your current habits, schedule annual health screenings, and remain aware of how risk factors may change with age.' });
  }

  // Sort by priority
  return recs.sort((a, b) => a.priority - b.priority);
}

module.exports = { buildRecommendations };
