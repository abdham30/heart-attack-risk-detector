import { Routes, Route, useLocation } from 'react-router-dom'
import { AssessmentProvider } from './context/AssessmentContext.jsx'
import Navbar from './components/Navbar.jsx'
import Landing from './pages/Landing.jsx'
import Assessment from './pages/Assessment.jsx'
import Results from './pages/Results.jsx'

export default function App() {
  const location = useLocation()
  const hideNav = location.pathname === '/assessment' || location.pathname === '/results'

  return (
    <AssessmentProvider>
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/"           element={<Landing />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/results"    element={<Results />} />
      </Routes>
    </AssessmentProvider>
  )
}
