import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import useLocalStorage from './hooks/useLocalStorage'
import { AboutPage, AuthPage, ContactPage } from './pages/InfoPages'
import BucketList from './pages/BucketList'
import DestinationDetails from './pages/DestinationDetails'
import Explore from './pages/Explore'
import Home from './pages/Home'
import TripPlanner from './pages/TripPlanner'
import './App.css'

function AppRoutes() {
  const [savedIds, setSavedIds] = useLocalStorage('travel-bucket-list-saved-v1', [])
  const [visitedIds, setVisitedIds] = useLocalStorage('travel-bucket-list-visited-v1', [])
  const [account, setAccount] = useLocalStorage('travel-bucket-list-account-v1', null)
  const navigate = useNavigate()

  const toggleSaved = (id) => {
    setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }
  const toggleVisited = (id) => {
    setVisitedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }
  const signIn = (profile) => {
    setAccount(profile)
    navigate('/')
  }

  return (
    <Routes>
      <Route
        element={(
          <SiteLayout
            savedCount={savedIds.length}
            savedIds={savedIds}
            visitedIds={visitedIds}
            onToggleSave={toggleSaved}
            onToggleVisited={toggleVisited}
            account={account}
            onSignOut={() => setAccount(null)}
          />
        )}
      >
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="bucket-list" element={<BucketList />} />
        <Route path="planner" element={<TripPlanner />} />
        <Route path="destination/:id" element={<DestinationDetails />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<AuthPage mode="login" onAuth={signIn} />} />
        <Route path="signup" element={<AuthPage mode="signup" onAuth={signIn} />} />
        <Route path="*" element={<main className="inner-page"><div className="empty-panel"><span>That path wanders off the map.</span><p>Let’s find your way back to somewhere good.</p><button className="button button-green" onClick={() => navigate('/')}>Back to home</button></div></main>} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return <BrowserRouter basename={import.meta.env.BASE_URL}><AppRoutes /></BrowserRouter>
}
