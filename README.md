# 🫀 Heart Disease Risk Awareness Tool

A stateless, rule-based cardiovascular risk scoring tool. No database. No accounts. No data stored.

---

## Project Structure

```
heartRiskApp/
├── types.ts                  ← Shared TypeScript interfaces
├── backend/
│   ├── server.js             ← Express API + scoring engine
│   └── package.json
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        └── App.jsx           ← Full React UI
```

---

## Quick Start

### 1. Backend

```bash
cd backend
npm install
npm run dev        # Starts on http://localhost:4000
```

Test it:
```bash
curl http://localhost:4000/health
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev        # Starts on http://localhost:3000
```

---

## API

### POST `/api/assess-risk`

**Request Body:**
```json
{
  "age": 52,
  "sex": "male",
  "hasHypertension": true,
  "systolicBP": 148,
  "hasHighCholesterol": false,
  "hasDiabetes": false,
  "familyHistory": true,
  "smokingStatus": "former",
  "alcoholFrequency": "moderate",
  "exerciseDaysPerWeek": 2,
  "heightCm": 175,
  "weightKg": 88,
  "dietQuality": "average",
  "stressLevel": "high"
}
```

**Response:**
```json
{
  "score": 42,
  "category": "High",
  "bmi": 28.7,
  "breakdown": [
    { "factor": "Age", "condition": "45–54", "points": 8 },
    { "factor": "Hypertension", "condition": "Diagnosed Yes", "points": 12 },
    ...
  ],
  "recommendations": [
    "💊 If you have high blood pressure, work with your doctor...",
    ...
  ]
}
```

---

## Scoring Model

| Category     | Score Range |
|--------------|-------------|
| Low Risk     | 0 – 20      |
| Moderate     | 21 – 40     |
| High Risk    | 41 – 60     |
| Very High    | 61 – 100    |

---

## Disclaimer

This tool is for **awareness purposes only** and does not constitute medical advice. It uses a simplified rule-based model and is not validated for clinical use. Always consult a qualified physician.

---

## Extending Later

- Add MongoDB to persist anonymized aggregate stats
- Add user accounts and tracking over time
- Integrate real clinical risk calculators (Framingham, ASCVD)
- Build a React Native mobile app
- Add AI-generated personalized guidance
