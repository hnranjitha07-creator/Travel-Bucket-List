import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Camera, CirclePlay, Compass, Menu, UsersRound, X } from 'lucide-react'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Explore', to: '/explore' },
  { label: 'My Bucket List', to: '/bucket-list' },
  { label: 'Trip Planners', to: '/planner' },
]

function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Travel Bucket List home">
      <span className="brand-icon"><Compass size={21} strokeWidth={1.7} /></span>
      <span>Travel Bucket List<span className="brand-dot">.</span></span>
    </Link>
  )
}

export default function SiteLayout({ savedCount, savedIds, visitedIds, onToggleSave, onToggleVisited, account, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="site-header">
        <div className="nav-inner">
          <Brand />
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            {links.map(({ label, to }) => (
              <NavLink key={to} to={to} end={to === '/'} onClick={closeMenu}>
                {label}
                {to === '/bucket-list' && savedCount > 0 && <span className="nav-count">{savedCount}</span>}
              </NavLink>
            ))}
            <div className="mobile-account">
              {account
                ? <button className="mobile-signout" onClick={() => { onSignOut(); closeMenu() }}>Sign out</button>
                : <Link to="/login" onClick={closeMenu}>Log in</Link>}
            </div>
          </nav>
          <div className="nav-account">
            {account
              ? <button onClick={onSignOut} className="account-link">Hi, {account.name} · Sign out</button>
              : <Link to="/login">Log in</Link>}
          </div>
        </div>
      </header>
      <Outlet context={{ savedCount, savedIds, visitedIds, onToggleSave, onToggleVisited, account }} />
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand />
            <p>Find places that make you feel something.<br />Then make a little room for them.</p>
            <div className="social-links" aria-label="Social media">
              <a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noreferrer"><Camera size={17} /></a>
              <a href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noreferrer"><UsersRound size={17} /></a>
              <a href="https://www.youtube.com/" aria-label="YouTube" target="_blank" rel="noreferrer"><CirclePlay size={18} /></a>
            </div>
          </div>
          <div className="footer-nav">
            <span className="footer-label">FIND YOUR WAY</span>
            {links.map(({ label, to }) => <Link key={to} to={to}>{label}</Link>)}
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-note">
            <span className="footer-label">A LITTLE REMINDER</span>
            <p>There’s no right time to start dreaming about somewhere new.</p>
            <Link to="/explore" className="footer-cta">Find your somewhere <span>↗</span></Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Wayfarer Travel Co.</span>
          <span>Made for all the places you haven’t been yet.</span>
        </div>
      </footer>
    </>
  )
}
