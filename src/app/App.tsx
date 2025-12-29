import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from '@/pages/Home'
import LoginPage from '@/pages/Login'
import SpotDetailPage from '@/pages/SpotDetail'
import CapturePage from '@/pages/Capture'
import VideoCreatePage from '@/pages/VideoCreate'
import VideoResultPage from '@/pages/VideoResult'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/spots/:id" element={<SpotDetailPage />} />
        <Route path="/capture" element={<CapturePage />} />
        <Route path="/video/create" element={<VideoCreatePage />} />
        <Route path="/video/result/:id" element={<VideoResultPage />} />
      </Routes>
      <Toaster position="top-center" />
    </>
  )
}

export default App
