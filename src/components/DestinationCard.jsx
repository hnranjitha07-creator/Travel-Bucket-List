import { ArrowUpRight, Heart, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { destinationImage } from '../data/destinations'

export default function DestinationCard({ place, saved, onToggleSave }) {
  return (
    <article className="destination-card">
      <Link className="destination-image" to={`/destination/${place.id}`} aria-label={`Explore ${place.name}`}>
        <img src={destinationImage(place.image, 780)} alt={`${place.name}, ${place.country}`} loading="lazy" />
        <span className="destination-category">{place.category}</span>
      </Link>
      <div className="destination-card-copy">
        <div className="destination-card-topline">
          <span><MapPin size={13} /> {place.country}</span>
          <button
            type="button"
            className={`save-button${saved ? ' is-saved' : ''}`}
            onClick={() => onToggleSave(place.id)}
            aria-label={saved ? `Remove ${place.name} from bucket list` : `Add ${place.name} to bucket list`}
            aria-pressed={saved}
          >
            <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>
        <h3><Link to={`/destination/${place.id}`}>{place.name}</Link></h3>
        <p>{place.description}</p>
        <div className="destination-card-bottom">
          <Link to={`/destination/${place.id}`} className="discover-link">Explore place <ArrowUpRight size={15} /></Link>
          <button type="button" className="save-text" onClick={() => onToggleSave(place.id)}>
            {saved ? 'Saved' : 'Add to list'}
          </button>
        </div>
      </div>
    </article>
  )
}
