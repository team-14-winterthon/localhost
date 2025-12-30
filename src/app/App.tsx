import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { queryClient } from '@/shared/lib/queryClient'
import { theme } from '@/shared/styles/theme'
import SplashPage from '@/pages/Splash'
import AuthCallbackPage from '@/pages/AuthCallback'
import ProfileSetupPage from '@/pages/ProfileSetup'
import HomePage from '@/pages/Home'
import LoginPage from '@/pages/Login'
import SpotDetailPage from '@/pages/SpotDetail'
import CapturePage from '@/pages/Capture'
import CaptureSuccessPage from '@/pages/CaptureSuccess'
import VideoCreatePage from '@/pages/VideoCreate'
import VideoResultPage from '@/pages/VideoResult'
import MoviePage from '@/pages/Movie'
import MovieListPage from '@/pages/MovieList'
import MovieCreatePage from '@/pages/MovieCreate'
import MovieResultPage from '@/pages/MovieResult'
import VideoViewPage from '@/pages/VideoView'
import MapPage from '@/pages/Map'
import './App.css'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/profile-setup" element={<ProfileSetupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/spots/:id" element={<SpotDetailPage />} />
        <Route path="/capture" element={<CapturePage />} />
        <Route path="/capture/success" element={<CaptureSuccessPage />} />
        <Route path="/video/create" element={<VideoCreatePage />} />
        <Route path="/video/result/:id" element={<VideoResultPage />} />
        <Route path="/video" element={<MoviePage />} />
        <Route path="/video/my" element={<MovieListPage type="my" />} />
        <Route path="/video/popular" element={<MovieListPage type="popular" />} />
        <Route path="/video/view/:id" element={<VideoViewPage />} />
        <Route path="/movie/create" element={<MovieCreatePage />} />
        <Route path="/movie/result" element={<MovieResultPage />} />
        </Routes>
        <Toaster position="top-center" />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
