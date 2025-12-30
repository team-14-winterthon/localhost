import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { Toaster } from 'react-hot-toast'
import { theme } from '@/shared/styles/theme'
import HomePage from '@/pages/Home'
import LoginPage from '@/pages/Login'
import SpotDetailPage from '@/pages/SpotDetail'
import CapturePage from '@/pages/Capture'
import VideoCreatePage from '@/pages/VideoCreate'
import VideoResultPage from '@/pages/VideoResult'
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/spots/:id" element={<SpotDetailPage />} />
        <Route path="/capture" element={<CapturePage />} />
        <Route path="/video/create" element={<VideoCreatePage />} />
        <Route path="/video/result/:id" element={<VideoResultPage />} />
      </Routes>
      <Toaster position="top-center" />
    </ThemeProvider>
  )
}

export default App
