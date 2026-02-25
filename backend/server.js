// ─────────────────────────────────────────────────────────────────────────────
//  Heart Disease Risk Awareness Tool — Backend (Node.js + Express)
//  Stateless. No database. Pure calculation.
// ─────────────────────────────────────────────────────────────────────────────

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// ─────────────────────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function calcBMI(heightCm, weightKg) {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// ─────────────────────────────────────────────────────────────────────────────
//  SCORING ENGINE
// ─────────────────────────────────────────────────────────────────────────────

function calculateRisk(input) {
  const breakdown = [];
  let score = 0;

  const addPoints = (factor, condition, points) => {
    breakdown.push({ factor, condition, points });
    score += points;
  };

  // ── Age ──────────────────────────────────────────────────────────────────
  if (input.age >= 65) {
    addPoints("Age", "65+", 16);
  } else if (input.age >= 55) {
    addPoints("Age", "55–64", 12);
  } else if (input.age >= 45) {
    addPoints("Age", "45–54", 8);
  }

  // ── Clinical ─────────────────────────────────────────────────────────────
  if (input.hasHypertension) {
    addPoints("Hypertension", "Diagnosed Yes", 12);
  }

  if (input.hasHighCholesterol) {
    addPoints("High Cholesterol", "Diagnosed Yes", 10);
  }

  if (input.hasDiabetes) {
    addPoints("Diabetes", "Diagnosed Yes", 15);
  }

  if (input.familyHistory) {
    addPoints("Family History", "Heart Disease Yes", 8);
  }

  // ── Smoking ──────────────────────────────────────────────────────────────
  if (input.smokingStatus === "current") {
    addPoints("Smoking", "Current Smoker", 15);
  } else if (input.smokingStatus === "former") {
    addPoints("Smoking", "Former Smoker", 5);
  }

  // ── BMI ──────────────────────────────────────────────────────────────────
  const bmi = calcBMI(input.heightCm, input.weightKg);

  if (bmi >= 30) {
    addPoints("BMI", `Obese (${bmi.toFixed(1)})`, 10);
  } else if (bmi >= 25) {
    addPoints("BMI", `Overweight (${bmi.toFixed(1)})`, 5);
  }

  // ── Alcohol ──────────────────────────────────────────────────────────────
  if (input.alcoholFrequency === "frequent") {
    addPoints("Alcohol", "Frequent", 5);
  }

  // ── Exercise ─────────────────────────────────────────────────────────────
  if (input.exerciseDaysPerWeek === 0) {
    addPoints("Exercise", "No Exercise", 10);
  } else if (input.exerciseDaysPerWeek <= 2) {
    addPoints("Exercise", "1–2 Days/Week", 5);
  } else if (input.exerciseDaysPerWeek >= 5) {
    addPoints("Exercise", "5+ Days/Week (Protective)", -5);
  }

  // ── Diet ─────────────────────────────────────────────────────────────────
  if (input.dietQuality === "good") {
    addPoints("Diet", "Healthy Diet (Protective)", -5);
  }

  // ── Stress ───────────────────────────────────────────────────────────────
  if (input.stressLevel === "low") {
    addPoints("Stress", "Low Stress (Protective)", -3);
  }

  // ── Finalize ─────────────────────────────────────────────────────────────
  const finalScore = clamp(score, 0, 100);

  let category;
  if (finalScore <= 20) category = "Low";
  else if (finalScore <= 40) category = "Moderate";
  else if (finalScore <= 60) category = "High";
  else category = "Very High";

  const recommendations = buildRecommendations(input, finalScore, bmi);

  return { score: finalScore, category, bmi: parseFloat(bmi.toFixed(1)), breakdown, recommendations };
}

// ─────────────────────────────────────────────────────────────────────────────
//  RECOMMENDATIONS
// ─────────────────────────────────────────────────────────────────────────────

function buildRecommendations(input, score, bmi) {
  const recs = [];

  if (input.smokingStatus === "current") {
    recs.push("🚭 Quitting smoking is the single most impactful change you can make. Ask your doctor about cessation programs.");
  }
  if (input.exerciseDaysPerWeek <= 2) {
    recs.push("🏃 Aim for at least 150 minutes of moderate aerobic activity per week (5 × 30 min sessions).");
  }
  if (bmi >= 25) {
    recs.push("⚖️ A 5–10% reduction in body weight can significantly lower cardiovascular risk.");
  }
  if (input.dietQuality === "poor" || input.dietQuality === "average") {
    recs.push("🥦 Adopt a heart-healthy diet: more vegetables, whole grains, lean protein, and less saturated fat.");
  }
  if (input.stressLevel === "high") {
    recs.push("🧘 Chronic stress elevates cortisol and blood pressure. Try mindfulness, sleep hygiene, and regular breaks.");
  }
  if (input.alcoholFrequency === "frequent") {
    recs.push("🍷 Reduce alcohol intake. Frequent consumption raises blood pressure and adds excess calories.");
  }
  if (input.hasHypertension) {
    recs.push("💊 If you have high blood pressure, work with your doctor to keep it controlled — ideally below 130/80 mmHg.");
  }
  if (input.hasDiabetes) {
    recs.push("🩸 Managing blood sugar tightly reduces cardiovascular complications. Follow your care plan consistently.");
  }
  if (input.hasHighCholesterol) {
    recs.push("🧪 High cholesterol is manageable with diet, exercise, and medication if needed. Get regular lipid panels.");
  }
  if (score >= 41) {
    recs.push("❤️ At your risk level, a consultation with a cardiologist or your GP for a full cardiovascular workup is strongly advisable.");
  }
  if (recs.length === 0) {
    recs.push("✅ You're doing well! Maintain your healthy habits and schedule annual check-ups.");
  }

  return recs;
}

// ─────────────────────────────────────────────────────────────────────────────
//  VALIDATION
// ─────────────────────────────────────────────────────────────────────────────

function validateInput(body) {
  const errors = [];

  if (typeof body.age !== "number" || body.age < 18 || body.age > 120) {
    errors.push("Age must be a number between 18 and 120.");
  }
  if (!["male", "female"].includes(body.sex)) {
    errors.push("Sex must be 'male' or 'female'.");
  }
  if (typeof body.hasHypertension !== "boolean") errors.push("hasHypertension must be boolean.");
  if (typeof body.hasHighCholesterol !== "boolean") errors.push("hasHighCholesterol must be boolean.");
  if (typeof body.hasDiabetes !== "boolean") errors.push("hasDiabetes must be boolean.");
  if (typeof body.familyHistory !== "boolean") errors.push("familyHistory must be boolean.");
  if (!["never", "former", "current"].includes(body.smokingStatus)) errors.push("Invalid smokingStatus.");
  if (!["none", "moderate", "frequent"].includes(body.alcoholFrequency)) errors.push("Invalid alcoholFrequency.");
  if (typeof body.exerciseDaysPerWeek !== "number" || body.exerciseDaysPerWeek < 0 || body.exerciseDaysPerWeek > 7) {
    errors.push("exerciseDaysPerWeek must be 0–7.");
  }
  if (typeof body.heightCm !== "number" || body.heightCm < 100 || body.heightCm > 250) {
    errors.push("heightCm must be between 100 and 250.");
  }
  if (typeof body.weightKg !== "number" || body.weightKg < 30 || body.weightKg > 300) {
    errors.push("weightKg must be between 30 and 300.");
  }
  if (!["good", "average", "poor"].includes(body.dietQuality)) errors.push("Invalid dietQuality.");
  if (!["low", "moderate", "high"].includes(body.stressLevel)) errors.push("Invalid stressLevel.");

  return errors;
}

// ─────────────────────────────────────────────────────────────────────────────
//  ROUTES
// ─────────────────────────────────────────────────────────────────────────────

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Heart Risk API is running." });
});

app.post("/api/assess-risk", (req, res) => {
  const errors = validateInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: "Validation failed", details: errors.join(" | ") });
  }

  try {
    const result = calculateRisk(req.body);
    res.json(result);
  } catch (err) {
    console.error("Scoring error:", err);
    res.status(500).json({ error: "Internal server error during risk calculation." });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
//  START
// ─────────────────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Heart Risk API running on http://localhost:${PORT}`);
});

module.exports = app;
