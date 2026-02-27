// ═══════════════════════════════════════════════════════════════
//  ASSESSMENT QUESTIONS DATA
//  35 questions across 8 sections
// ═══════════════════════════════════════════════════════════════

export const SECTIONS = [
  {
    id: 1,
    tag: 'Section 1 of 8',
    title: 'Basic Information',
    subtitle: 'Body measures and demographics used for risk stratification.',
    questions: [
      {
        id: 'age', type: 'number',
        question: '1. What is your age?',
        hint: 'Enter your age in years (18–110). System auto-stratifies by age group.',
        placeholder: 'e.g. 47', min: 18, max: 110
      },
      {
        id: 'sex', type: 'option',
        question: '2. What is your biological sex?',
        options: [
          { value: 'male',  label: 'Male' },
          { value: 'female',label: 'Female' },
          { value: 'other', label: 'Prefer not to say' },
        ]
      },
      {
        id: 'heightCm', type: 'number',
        question: '3. What is your height?',
        hint: 'Enter a positive value in centimetres. Used to calculate BMI.',
        placeholder: 'e.g. 172', min: 1, unit: 'cm'
      },
      {
        id: 'weightKg', type: 'number',
        question: '4. What is your weight?',
        hint: 'Enter a positive value in kilograms. BMI is auto-calculated.',
        placeholder: 'e.g. 78', min: 1, unit: 'kg'
      },
      {
        id: 'waistCm', type: 'number',
        question: '5. What is your waist circumference?',
        hint: 'Measure at the level of your navel. Enter a positive value in centimetres.',
        placeholder: 'e.g. 90', min: 1, unit: 'cm',
        optionalToggle: { id: 'waistUnknown', label: "I don't know my waist circumference" }
      },
    ]
  },
  {
    id: 2,
    tag: 'Section 2 of 8',
    title: 'Blood Pressure & Metabolic Health',
    subtitle: 'Clinical factors with significant impact on cardiovascular risk.',
    questions: [
      {
        id: 'bp', type: 'option',
        question: '6. Have you ever been diagnosed with High Blood Pressure?',
        hint: 'If yes, select based on your usual BP range.',
        options: [
          { value: 'none',    label: 'No' },
          { value: 'notsure', label: 'Not sure' },
          { value: 'low',     label: 'Yes, usually less than 130/80' },
          { value: 'mid',     label: 'Yes, usually 130–139 / 80–89' },
          { value: 'high',    label: 'Yes, usually 140/90 or higher' },
        ]
      },
      {
        id: 'bpMed', type: 'option',
        question: '7. Are you currently taking medications for Blood Pressure?',
        options: [
          { value: 'none',    label: 'No' },
          { value: 'one',     label: 'Yes, one medication' },
          { value: 'multi',   label: 'Yes, more than one medication' },
          { value: 'notsure', label: 'Not sure' },
        ]
      },
      {
        id: 'diabetes', type: 'option',
        question: '8. Have you been diagnosed with Diabetes?',
        hint: 'If yes, select based on your last known HbA1c value.',
        options: [
          { value: 'none',    label: 'No' },
          { value: 'notsure', label: 'Not sure' },
          { value: 'good',    label: 'Yes, HbA1c below 7%' },
          { value: 'mod',     label: 'Yes, HbA1c 7–8.9%' },
          { value: 'high',    label: 'Yes, HbA1c 9% or higher' },
          { value: 'unknown', label: "Yes, but I don't know my value" },
        ]
      },
      {
        id: 'dmMed', type: 'option',
        question: '9. Are you currently taking medications for Diabetes?',
        options: [
          { value: 'none',    label: 'No' },
          { value: 'tablets', label: 'Yes, tablets only' },
          { value: 'insulin', label: 'Yes, insulin' },
          { value: 'both',    label: 'Yes, both tablets and insulin' },
          { value: 'notsure', label: 'Not sure' },
        ]
      },
      {
        id: 'chol', type: 'option',
        question: '10. Have you been told you have high cholesterol?',
        hint: 'If yes, select based on your last known LDL value.',
        options: [
          { value: 'none',    label: 'No' },
          { value: 'notsure', label: 'Not sure' },
          { value: 'good',    label: 'Yes, LDL less than 100' },
          { value: 'mid',     label: 'Yes, LDL 100–159' },
          { value: 'high',    label: 'Yes, LDL 160 or higher' },
          { value: 'unknown', label: "Yes, but I don't know my value" },
        ]
      },
      {
        id: 'cholMed', type: 'option',
        question: '11. Are you currently taking cholesterol-lowering medication?',
        options: [
          { value: 'no',      label: 'No' },
          { value: 'yes',     label: 'Yes' },
          { value: 'notsure', label: 'Not sure' },
        ]
      },
    ]
  },
  {
    id: 3,
    tag: 'Section 3 of 8',
    title: 'Tobacco Exposure',
    subtitle: 'Both active and passive smoke exposure affect cardiovascular risk.',
    questions: [
      {
        id: 'smoke', type: 'option',
        question: '12. Which best describes your tobacco use?',
        options: [
          { value: 'never',          label: 'Never used' },
          { value: 'former_old',     label: 'Former user, quit more than 1 year ago' },
          { value: 'former_recent',  label: 'Former user, quit within the past 1 year' },
          { value: 'current_low',    label: 'Current user: 1–5 per day' },
          { value: 'current_mod',    label: 'Current user: 6–10 per day' },
          { value: 'current_high',   label: 'Current user: 11–20 per day' },
          { value: 'current_heavy',  label: 'Current user: More than 20 per day' },
        ]
      },
      {
        id: 'secondhand', type: 'option',
        question: '13. In the past 7 days, how many days were you in an enclosed space where someone was smoking?',
        hint: 'Home, work, car, restaurant, or other enclosed areas.',
        options: [
          { value: '0',   label: '0 days' },
          { value: '1-2', label: '1–2 days' },
          { value: '3-5', label: '3–5 days' },
          { value: '6-7', label: '6–7 days' },
        ]
      },
    ]
  },
  {
    id: 4,
    tag: 'Section 4 of 8',
    title: 'Alcohol Use',
    subtitle: 'Frequency and quantity of alcohol consumption both contribute to risk.',
    questions: [
      {
        id: 'alcFreq', type: 'option',
        question: '14. In the past 3 months, how often did you consume alcohol?',
        options: [
          { value: 'none',     label: 'I do not drink alcohol' },
          { value: 'rare',     label: 'Less than once per month' },
          { value: 'monthly',  label: '1–3 times per month' },
          { value: 'weekly',   label: '1–2 times per week' },
          { value: 'frequent', label: '3 or more times per week' },
        ]
      },
      {
        id: 'alcAmt', type: 'option',
        question: '15. On a typical drinking day, how many drinks do you consume?',
        options: [
          { value: 'none', label: 'I do not drink alcohol' },
          { value: '1',    label: '1 drink' },
          { value: '2-3',  label: '2–3 drinks' },
          { value: '4-5',  label: '4–5 drinks' },
          { value: '5+',   label: 'More than 5 drinks' },
        ]
      },
    ]
  },
  {
    id: 5,
    tag: 'Section 5 of 8',
    title: 'Physical Activity',
    subtitle: 'Both aerobic activity and sedentary time independently affect heart health.',
    questions: [
      {
        id: 'exercise', type: 'option',
        question: '16. Total minutes of moderate physical activity per week',
        hint: 'Brisk walking, cycling, swimming, dancing, or similar activities.',
        options: [
          { value: '300+',    label: '300 minutes or more' },
          { value: '150-299', label: '150–299 minutes' },
          { value: '75-149',  label: '75–149 minutes' },
          { value: '<75',     label: 'Less than 75 minutes' },
          { value: 'none',    label: 'None' },
        ]
      },
      {
        id: 'sitting', type: 'option',
        question: '17. On average, how many hours per day do you spend sitting?',
        hint: 'Work, TV, phone, travel, and other sedentary time.',
        options: [
          { value: '<4', label: 'Less than 4 hours' },
          { value: '4-6',label: '4–6 hours' },
          { value: '7-9',label: '7–9 hours' },
          { value: '9+', label: 'More than 9 hours' },
        ]
      },
      {
        id: 'strength', type: 'option',
        question: '18. On how many days per week do you perform strength training?',
        hint: 'Weights, resistance bands, bodyweight exercises.',
        options: [
          { value: '4+',  label: '4 or more days' },
          { value: '2-3', label: '2–3 days' },
          { value: '1',   label: '1 day' },
          { value: '<1',  label: 'Less than 1 day' },
          { value: 'none',label: 'None' },
        ]
      },
    ]
  },
  {
    id: 6,
    tag: 'Section 6 of 8',
    title: 'Diet Patterns',
    subtitle: 'Nutritional habits are a modifiable and influential cardiovascular risk factor.',
    questions: [
      {
        id: 'fruitveg', type: 'option',
        question: '19. How many servings of fruits and vegetables do you consume daily?',
        options: [
          { value: '5+',   label: '5 or more servings' },
          { value: '3-4',  label: '3–4 servings' },
          { value: '1-2',  label: '1–2 servings' },
          { value: 'rarely',label: 'Rarely or none' },
        ]
      },
      {
        id: 'fried', type: 'option',
        question: '20. How often do you eat fried or fast food?',
        options: [
          { value: 'rarely',   label: 'Rarely or never' },
          { value: 'monthly',  label: '1–3 times per month' },
          { value: 'weekly',   label: '1–2 times per week' },
          { value: 'frequent', label: '3 or more times per week' },
        ]
      },
      {
        id: 'procmeat', type: 'option',
        question: '21. How often do you consume processed meats?',
        hint: 'Sausages, bacon, hot dogs, packaged deli meats.',
        options: [
          { value: 'rarely',   label: 'Rarely or never' },
          { value: 'monthly',  label: '1–3 times per month' },
          { value: 'weekly',   label: '1–2 times per week' },
          { value: 'frequent', label: '3 or more times per week' },
        ]
      },
      {
        id: 'sugary', type: 'option',
        question: '22. How often do you consume sugary drinks?',
        hint: 'Soda, packaged juices, energy drinks, sweetened coffee or tea.',
        options: [
          { value: 'rarely',   label: 'Rarely or never' },
          { value: 'monthly',  label: '1–3 times per month' },
          { value: 'weekly',   label: '1–2 times per week' },
          { value: 'frequent', label: '3 or more times per week' },
        ]
      },
      {
        id: 'salt', type: 'option',
        question: '23. How often do you add extra salt to your food?',
        options: [
          { value: 'never',       label: 'Never' },
          { value: 'occasionally',label: 'Occasionally' },
          { value: 'often',       label: 'Often' },
          { value: 'always',      label: 'Almost always' },
        ]
      },
    ]
  },
  {
    id: 7,
    tag: 'Section 7 of 8',
    title: 'Sleep & Stress',
    subtitle: 'Psychological and sleep factors independently influence cardiovascular health.',
    questions: [
      {
        id: 'sleep', type: 'option',
        question: '24. How many hours do you sleep on average per night?',
        options: [
          { value: '7-8', label: '7–8 hours (optimal)' },
          { value: '6',   label: '6 hours' },
          { value: '5',   label: '5 hours' },
          { value: '<5',  label: 'Less than 5 hours' },
          { value: '9+',  label: 'More than 9 hours' },
        ]
      },
      {
        id: 'stress', type: 'option',
        question: '25. How often do you feel stressed or mentally overwhelmed?',
        options: [
          { value: 'rarely',  label: 'Rarely' },
          { value: 'monthly', label: 'A few times per month' },
          { value: 'weekly',  label: '1–3 times per week' },
          { value: 'daily',   label: 'Most days' },
        ]
      },
      {
        id: 'anxiety', type: 'option',
        question: '26. How often do you feel anxious, restless, or unable to relax?',
        options: [
          { value: 'rarely',  label: 'Rarely' },
          { value: 'monthly', label: 'A few times per month' },
          { value: 'weekly',  label: '1–3 times per week' },
          { value: 'daily',   label: 'Most days' },
        ]
      },
      {
        id: 'support', type: 'option',
        question: '27. How strong is your emotional or social support?',
        hint: 'Friends, family, or community you can rely on.',
        options: [
          { value: 'strong',   label: 'Very strong support' },
          { value: 'moderate', label: 'Moderate support' },
          { value: 'limited',  label: 'Limited support' },
          { value: 'none',     label: 'No reliable support' },
        ]
      },
    ]
  },
  {
    id: 8,
    tag: 'Section 8 of 8',
    title: 'Symptoms & Medical History',
    subtitle: 'Report symptoms experienced in the past 3 months.',
    questions: [
      {
        id: 'sob', type: 'option',
        question: '28. Shortness of breath during routine activities',
        hint: 'Walking on level ground, climbing one flight of stairs.',
        options: [
          { value: 'never',   label: 'Never' },
          { value: '1-2',     label: '1–2 times' },
          { value: 'monthly', label: 'A few times per month' },
          { value: 'weekly',  label: '1–3 times per week' },
          { value: 'daily',   label: 'Almost daily' },
        ]
      },
      {
        id: 'dizzy', type: 'option',
        question: '29. Dizziness or lightheadedness (unexpected)',
        options: [
          { value: 'never',   label: 'Never' },
          { value: '1-2',     label: '1–2 times' },
          { value: 'monthly', label: 'A few times per month' },
          { value: 'weekly',  label: '1–3 times per week' },
          { value: 'daily',   label: 'Almost daily' },
        ]
      },
      {
        id: 'palp', type: 'option',
        question: '30. Palpitations — awareness of fast or irregular heartbeat',
        options: [
          { value: 'never',   label: 'Never' },
          { value: '1-2',     label: '1–2 times' },
          { value: 'monthly', label: 'A few times per month' },
          { value: 'weekly',  label: '1–3 times per week' },
          { value: 'daily',   label: 'Almost daily' },
        ]
      },
      {
        id: 'chest', type: 'option',
        question: '31. Chest discomfort, pressure, or tightness during physical activity',
        options: [
          { value: 'never',   label: 'Never' },
          { value: '1-2',     label: '1–2 times' },
          { value: 'monthly', label: 'A few times per month' },
          { value: 'weekly',  label: '1–3 times per week' },
          { value: 'daily',   label: 'Almost daily' },
        ]
      },
      {
        id: 'fatigue', type: 'option',
        question: '32. Unusual fatigue with activities that previously felt easy',
        options: [
          { value: 'never',   label: 'Never' },
          { value: '1-2',     label: '1–2 times' },
          { value: 'monthly', label: 'A few times per month' },
          { value: 'weekly',  label: '1–3 times per week' },
          { value: 'daily',   label: 'Almost daily' },
        ]
      },
      {
        id: 'swelling', type: 'option',
        question: '33. Swelling in feet or ankles (not due to injury)',
        options: [
          { value: 'never',   label: 'Never' },
          { value: '1-2',     label: '1–2 times' },
          { value: 'monthly', label: 'A few times per month' },
          { value: 'weekly',  label: '1–3 times per week' },
          { value: 'daily',   label: 'Almost daily' },
        ]
      },
      {
        id: 'family', type: 'option',
        question: '34. Has any close family member had a heart attack or stroke before age 55 (male) or 65 (female)?',
        hint: 'Parent or sibling.',
        options: [
          { value: 'no',      label: 'No' },
          { value: 'notsure', label: 'Not sure' },
          { value: 'yes',     label: 'Yes' },
        ]
      },
      {
        id: 'prevHeart', type: 'option',
        question: '35. Have you had any previous heart-related diagnosis?',
        hint: 'Heart attack, angioplasty, stent placement, heart failure, or similar.',
        options: [
          { value: 'no',      label: 'No' },
          { value: 'notsure', label: 'Not sure' },
          { value: 'yes',     label: 'Yes' },
        ]
      },
    ]
  }
]
