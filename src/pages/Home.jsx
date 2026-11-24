import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Search } from 'lucide-react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import DestinationCard from '../components/DestinationCard'
import { destinationImage, featuredDestinations, popularDestinations } from '../data/destinations'

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { savedIds, onToggleSave } = useOutletContext()

  const search = (event) => {
    event.preventDefault()
    navigate(`/explore${query ? `?search=${encodeURIComponent(query)}` : ''}`)
  }

  return (
    <main>
      <section
        className="hero"
        style={{ '--hero-image': `url("${destinationImage('photo-1476514525535-07fb3b4ae5f1', 2000)}")` }}
      >
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="hero-kicker"><span /> YOUR NEXT GREAT STORY STARTS HERE</span>
            <h1>Discover Your<br /><em>Next Adventure</em></h1>
            <p>Find places that make you feel something, save the ones you love, and turn your daydreams into a plan.</p>
            <div className="hero-actions">
              <Link to="/explore" className="button button-cream">Explore destinations <ArrowUpRight size={17} /></Link>
              <Link to="/bucket-list" className="hero-secondary">See your bucket list <ArrowRight size={15} /></Link>
            </div>
            <form className="hero-search" onSubmit={search}>
              <Search size={18} />
              <input aria-label="Search destinations" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Where do you want to go?" />
              <button type="submit" aria-label="Search"><ArrowRight size={18} /></button>
            </form>
          </div>
          <div className="hero-caption"><span>46°42' N · 12°05' E</span><strong>A quieter kind of wonderful, Lago di Braies.</strong></div>
        </div>
        <a className="hero-scroll" href="#featured">A FEW PLACES TO BEGIN <span>↓</span></a>
      </section>

      <section className="content-section featured-section" id="featured">
        <div className="section-heading">
          <div><span className="section-kicker">WORTH THE WAY THERE</span><h2>Featured escapes</h2><p>Handpicked wonders to get your next adventure started.</p></div>
          <Link className="section-link" to="/explore">Explore all places <ArrowUpRight size={16} /></Link>
        </div>
        <div className="featured-grid">
          {featuredDestinations.map((place, index) => (
            <Link
              className={`featured-card featured-card-${index + 1}`}
              to={`/destination/${place.id}`}
              key={place.id}
              style={{ '--featured-image': `url("${destinationImage(place.image, 1000)}")` }}
            >
              <span className="featured-country">{place.country}</span>
              <span className="featured-card-bottom"><span><strong>{place.name}</strong><small>{place.description}</small></span><span className="featured-discover">Discover place <ArrowUpRight size={16} /></span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="content-section popular-section">
        <div className="section-heading">
          <div><span className="section-kicker">A LITTLE INSPIRATION</span><h2>Popular travel destinations</h2><p>A little inspiration for wherever your heart wants to go next.</p></div>
          <Link className="section-link" to="/explore">See all destinations <ArrowUpRight size={16} /></Link>
        </div>
        <div className="destination-grid">
          {popularDestinations.map((place) => <DestinationCard key={place.id} place={place} saved={savedIds.includes(place.id)} onToggleSave={onToggleSave} />)}
        </div>
      </section>

      <section className="dream-cta">
        <img src={destinationImage('photo-1470770841072-f978cf4d019e', 1500)} alt="" loading="lazy" />
        <div className="dream-cta-copy"><span className="section-kicker">THE WORLD IS WIDE OPEN</span><h2>Somewhere out there<br />is waiting for you.</h2><Link to="/planner" className="button button-cream">Start a trip plan <ArrowUpRight size={16} /></Link></div>
        <span className="dream-caption">MAKE ROOM FOR A SOMEWHERE.</span>
      </section>
    </main>
  )
}
