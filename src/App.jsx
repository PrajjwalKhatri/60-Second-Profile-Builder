import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import InputSelection from "./components/InputSelection"
import DataInput from "./components/DataInput"
import ProcessingPage from "./components/ProcessingPage"
import ReviewPage from "./components/ReviewPage"
import ProfilePreview from "./components/ProfilePreview"
import { ProfileProvider } from "./context/ProfileContext"

function App() {
  return (
    <ProfileProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/input-selection" element={<InputSelection />} />
            <Route path="/data-input" element={<DataInput />} />
            <Route path="/processing" element={<ProcessingPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/preview" element={<ProfilePreview />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ProfileProvider>
  )
}

export default App
