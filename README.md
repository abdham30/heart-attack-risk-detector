# 🫀 Heart Disease Risk Awareness Tool v2.0
## Full-Stack MERN (without MongoDB) — React + Express

A stateless, full-stack cardiovascular risk awareness tool with 35 questions, 5 risk categories, a calm clinical UI, transparent scoring, and personalised recommendations.

---

## 📁 Project Structure

```
heart-risk-mern/
│
├── start.sh              ← Mac/Linux: one-command setup + launch
├── start.bat             ← Windows:   one-command setup + launch
│
├── backend/
│   ├── server.js         ← Express server entry point
│   ├── routes/
│   │   └── assess.js     ← POST /api/assess-risk, GET /api/health
│   ├── logic/
│   │   ├── scoring.js    ← Full 35-factor weighted scoring engine
│   │   └── recommendations.js ← Personalised recommendation engine
│   ├── middleware/
│   │   └── validate.js   ← Input validation
│   ├── package.json
│   └── .env              ← PORT, CORS_ORIGIN
│
└── frontend/
    ├── index.html
    ├── vite.config.js    ← Proxies /api → :4000
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx        ← Routes: / | /assessment | /results
        ├── index.css      ← Global calm palette CSS variables
        ├── context/
        │   └── AssessmentContext.jsx  ← Global state
        ├── pages/
        │   ├── Landing.jsx            ← Full landing page + Methodology
        │   ├── Assessment.jsx         ← 8-step form with progress %
        │   └── Results.jsx            ← Score, interpretation, recs
        ├── components/
        │   ├── Navbar.jsx             ← Sticky nav
        │   ├── ScoreRing.jsx          ← Animated SVG ring
        │   └── Question.jsx           ← OptionQuestion + NumberQuestion
        └── data/
            └── questions.js           ← All 35 questions data
```

---

## 🚀 Quick Start

### Requirements
- Node.js v18 or higher ([nodejs.org](https://nodejs.org))
- npm (included with Node.js)

### Mac / Linux
```bash
chmod +x start.sh
./start.sh
```

### Windows
```
Double-click start.bat
```

### Manual
```bash
# Terminal 1 — Backend
cd backend && npm install && npm start

# Terminal 2 — Frontend
cd frontend && npm install && npm run dev
```

### URLs
| Service    | URL                                    |
|------------|----------------------------------------|
| App        | http://localhost:3000                  |
| API        | http://localhost:4000                  |
| API Health | GET http://localhost:4000/api/health   |
| Risk API   | POST http://localhost:4000/api/assess-risk |

---

## 🌡 Risk Category Scale

| Score      | Category       | Colour   |
|------------|----------------|----------|
| 0 – 20     | Low Risk       | 🟢 Emerald |
| 21 – 40    | Mild Risk      | 🔵 Teal    |
| 41 – 60    | Moderate Risk  | 🟡 Amber   |
| 61 – 80    | High Risk      | 🟠 Orange  |
| 81 – 100   | Very High Risk | 🔴 Red     |

---

## 🔌 API Reference

### POST `/api/assess-risk`

**Key fields:**
```json
{
  "age": 52,
  "sex": "male",
  "bmi": "28.7",
  "waistCm": "92",
  "bp": "mid",
  "bpMed": "one",
  "diabetes": "none",
  "dmMed": "none",
  "chol": "mid",
  "cholMed": "no",
  "smoke": "former_old",
  "secondhand": "0",
  "alcFreq": "weekly",
  "alcAmt": "2-3",
  "exercise": "150-299",
  "sitting": "4-6",
  "strength": "2-3",
  "fruitveg": "3-4",
  "fried": "monthly",
  "procmeat": "rarely",
  "sugary": "rarely",
  "salt": "occasionally",
  "sleep": "7-8",
  "stress": "monthly",
  "anxiety": "rarely",
  "support": "strong",
  "sob": "never",
  "dizzy": "never",
  "palp": "never",
  "chest": "never",
  "fatigue": "never",
  "swelling": "never",
  "family": "no",
  "prevHeart": "no"
}
```

**Response:**
```json
{
  "score": 31,
  "raw": 87,
  "category": "Mild Risk",
  "color": "#0891b2",
  "bgColor": "rgba(8,145,178,0.10)",
  "tagline": "Your profile suggests a mild elevation...",
  "urgency": "Review the recommendations below...",
  "interpretation": "A mild risk score indicates...",
  "breakdown": [
    { "factor": "Age", "value": "45–54", "pts": 7 },
    ...
  ],
  "recommendations": [
    { "icon": "🧪", "priority": 2, "text": "Elevated LDL..." },
    ...
  ]
}
```

---

## ⚙️ Environment Variables

**backend/.env**
```
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**frontend/.env**
```
VITE_API_URL=http://localhost:4000
VITE_APP_NAME=Heart Risk
```

---

## 🗺️ Extending This Project

| Feature | What to Add |
|---|---|
| Data persistence | Add MongoDB + Mongoose to `/backend` |
| User accounts | JWT auth + user collection |
| Risk history | `/history` API + time-series chart |
| Mobile app | React Native sharing `data/questions.js` |
| Real clinical model | Integrate Framingham / ASCVD equations |
| AI explanations | Add Anthropic Claude API |
| Email results | Add Nodemailer to Express |
| PDF export | Add `pdfkit` to backend |

---

## ⚠️ Disclaimer

For **educational and awareness purposes only**.
Not a validated clinical prediction tool.
No data is stored. Always consult a healthcare professional.

© 2026 Heart Risk Awareness Project
