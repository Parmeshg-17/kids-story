import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { BookmarkProvider } from './context/BookmarkContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

// Lazy load public pages
const HomePage = lazy(() => import('./pages/HomePage'))
const StoriesPage = lazy(() => import('./pages/StoriesPage'))
const StoryDetailPage = lazy(() => import('./pages/StoryDetailPage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/LegalPages').then(m => ({ default: m.PrivacyPolicyPage })))
const TermsPage = lazy(() => import('./pages/LegalPages').then(m => ({ default: m.TermsPage })))
const DisclaimerPage = lazy(() => import('./pages/LegalPages').then(m => ({ default: m.DisclaimerPage })))

// Lazy load admin pages
const AdminLogin = lazy(() => import('./admin/AdminLogin'))
const AdminLayout = lazy(() => import('./admin/AdminLayout'))
const Dashboard = lazy(() => import('./admin/Dashboard'))
const StoryForm = lazy(() => import('./admin/StoryForm'))
const ManageStories = lazy(() => import('./admin/ManageStories'))
const CategoryManagement = lazy(() => import('./admin/CategoryManagement'))
const SocialMediaSettings = lazy(() => import('./admin/SocialMediaSettings'))
const HomepageSettings = lazy(() => import('./admin/HomepageSettings'))
const AdsSettings = lazy(() => import('./admin/AdsSettings'))

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <span className="text-5xl" style={{ animation: 'bounce 1.5s infinite' }}>📚</span>
      <div className="w-8 h-8 rounded-full border-4 border-t-transparent animate-spin"
        style={{ borderColor: 'var(--primary) transparent var(--primary) transparent' }} />
    </div>
  </div>
)

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.35, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
)

function AppRoutes() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdmin && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<PageWrapper><Suspense fallback={<PageLoader />}><HomePage /></Suspense></PageWrapper>} />
          <Route path="/stories" element={<PageWrapper><Suspense fallback={<PageLoader />}><StoriesPage /></Suspense></PageWrapper>} />
          <Route path="/story/:slug" element={<PageWrapper><Suspense fallback={<PageLoader />}><StoryDetailPage /></Suspense></PageWrapper>} />
          <Route path="/category/:slug" element={<PageWrapper><Suspense fallback={<PageLoader />}><CategoryPage /></Suspense></PageWrapper>} />
          <Route path="/bookmarks" element={<PageWrapper><Suspense fallback={<PageLoader />}><BookmarksPage /></Suspense></PageWrapper>} />
          <Route path="/search" element={<PageWrapper><Suspense fallback={<PageLoader />}><SearchPage /></Suspense></PageWrapper>} />
          <Route path="/privacy-policy" element={<PageWrapper><Suspense fallback={<PageLoader />}><PrivacyPolicyPage /></Suspense></PageWrapper>} />
          <Route path="/terms" element={<PageWrapper><Suspense fallback={<PageLoader />}><TermsPage /></Suspense></PageWrapper>} />
          <Route path="/disclaimer" element={<PageWrapper><Suspense fallback={<PageLoader />}><DisclaimerPage /></Suspense></PageWrapper>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Suspense fallback={<PageLoader />}><AdminLogin /></Suspense>} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoader />}><AdminLayout /></Suspense>
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<Suspense fallback={<PageLoader />}><Dashboard /></Suspense>} />
            <Route path="stories" element={<Suspense fallback={<PageLoader />}><ManageStories /></Suspense>} />
            <Route path="stories/add" element={<Suspense fallback={<PageLoader />}><StoryForm /></Suspense>} />
            <Route path="stories/edit/:id" element={<Suspense fallback={<PageLoader />}><StoryForm /></Suspense>} />
            <Route path="categories" element={<Suspense fallback={<PageLoader />}><CategoryManagement /></Suspense>} />
            <Route path="social" element={<Suspense fallback={<PageLoader />}><SocialMediaSettings /></Suspense>} />
            <Route path="homepage" element={<Suspense fallback={<PageLoader />}><HomepageSettings /></Suspense>} />
            <Route path="ads" element={<Suspense fallback={<PageLoader />}><AdsSettings /></Suspense>} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<PageWrapper><Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <BookmarkProvider>
            <AppRoutes />
          </BookmarkProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
