// ─────────────────────────────────────────────
//  Heart Disease Risk Tool — TypeScript Interfaces
// ─────────────────────────────────────────────

export type BiologicalSex = "male" | "female";
export type SmokingStatus = "never" | "former" | "current";
export type AlcoholFrequency = "none" | "moderate" | "frequent";
export type DietQuality = "good" | "average" | "poor";
export type StressLevel = "low" | "moderate" | "high";
export type RiskCategory = "Low" | "Moderate" | "High" | "Very High";

// ─── Form Input ────────────────────────────────
export interface RiskFormInput {
  // Demographics
  age: number;
  sex: BiologicalSex;

  // Clinical (High Weight)
  hasHypertension: boolean;
  systolicBP?: number;       // optional — if known
  hasHighCholesterol: boolean;
  totalCholesterol?: number; // optional — if known
  hasDiabetes: boolean;
  familyHistory: boolean;

  // Lifestyle (Modifiable)
  smokingStatus: SmokingStatus;
  alcoholFrequency: AlcoholFrequency;
  exerciseDaysPerWeek: number; // 0–7
  heightCm: number;
  weightKg: number;
  dietQuality: DietQuality;
  stressLevel: StressLevel;
}

// ─── Score Breakdown ────────────────────────────
export interface ScoreBreakdownItem {
  factor: string;
  condition: string;
  points: number;
}

// ─── API Response ───────────────────────────────
export interface RiskAssessmentResult {
  score: number;           // 0–100 (clamped)
  category: RiskCategory;
  bmi: number;
  breakdown: ScoreBreakdownItem[];
  recommendations: string[];
}

// ─── API Error ──────────────────────────────────
export interface ApiError {
  error: string;
  details?: string;
}
