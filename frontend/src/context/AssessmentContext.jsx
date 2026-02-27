import { createContext, useContext, useState } from 'react'

const AssessmentContext = createContext(null)

export function AssessmentProvider({ children }) {
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)

  const updateAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  const resetAssessment = () => {
    setAnswers({})
    setResult(null)
    setCurrentStep(1)
  }

  return (
    <AssessmentContext.Provider value={{
      answers, updateAnswer, setAnswers,
      result, setResult,
      currentStep, setCurrentStep,
      resetAssessment
    }}>
      {children}
    </AssessmentContext.Provider>
  )
}

export function useAssessment() {
  return useContext(AssessmentContext)
}
