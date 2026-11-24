import { ArrowLeft, ArrowUpRight, Check, Clock3, Heart, MapPin } from 'lucide-react'
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import DestinationCard from '../components/DestinationCard'
import { destinationById, destinationImage, destinations } from '../data/destinations'

export default function DestinationDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const place = destinationById(id)
  const { savedIds, visitedIds, onToggleSave, onToggleVisited } = useOutletContext()

  if (!place) {
    return <main className="inner-page"><div className="empty-panel"><span>We couldn’t find that place.</span><p>There are plenty more worth discovering.</p><Link className="button button-green" to="/explore">Explore destinations</Link></div></main>
  }

  const saved = savedIds.includes(place.id)
  const visited = visitedIds.includes(place.id)
  const nearby = destinations.filter((item) => item.id !== place.id && item.category === place.category).slice(0, 3)

  return (
    <main className="inner-page detail-page">
      <button className="back-button" onClick={() => navigate(-1)}><ArrowLeft size={16} /> Back to exploring</button>
      <section className="detail-cover" style={{ backgroundImage: `linear-gradient(180deg, rgba(13, 30, 21, .03) 30%, rgba(13, 30, 21, .69)), url("${destinationImage(place.image, 1800)}")` }}>
        <div className="detail-cover-copy"><span>{place.country.toUpperCase()} · {place.category.toUpperCase()}</span><h1>{place.name}</h1></div>
      </section>
      <section className="detail-body">
        <div className="detail-main">
          <span className="section-kicker">THE FEELING OF BEING THERE</span>
          <h2>{place.name}, <em>{place.country}</em></h2>
          <p>{place.description} Take the slower road, leave a little room in your day, and let this place surprise you.</p>
          <div className="detail-facts"><span><MapPin size={16} /> {place.country}</span><span><Clock3 size={16} /> A few days, at your own pace</span></div>
          <div className="detail-actions">
            <button type="button" className={`button ${saved ? 'button-outline' : 'button-green'}`} onClick={() => onToggleSave(place.id)}><Heart size={16} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Saved to your list' : 'Add to my bucket list'}</button>
            <button type="button" className={`button button-outline${visited ? ' visited-button' : ''}`} onClick={() => onToggleVisited(place.id)}><Check size={16} />{visited ? 'Been there' : 'Mark as visited'}</button>
            <Link to="/planner" className="button button-sage">Plan this trip <ArrowUpRight size={16} /></Link>
          </div>
        </div>
        <aside className="detail-note"><span className="section-kicker">KEEP THIS ONE CLOSE</span><p>A place doesn’t have to be far away to take you somewhere.</p><span>WAYFARER FIELD NOTES</span></aside>
      </section>
      {nearby.length > 0 && <section className="detail-related"><div className="section-heading"><div><span className="section-kicker">KEEP WANDERING</span><h2>More places like this</h2></div></div><div className="destination-grid">{nearby.map((item) => <DestinationCard key={item.id} place={item} saved={savedIds.includes(item.id)} onToggleSave={onToggleSave} />)}</div></section>}
    </main>
  )
}
