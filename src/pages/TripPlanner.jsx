import { CalendarDays, Clock3, Trash2, Wallet } from 'lucide-react'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'
import { destinations } from '../data/destinations'

const blankDraft = {
  destination: '',
  departure: '',
  returnDate: '',
  budget: '',
  accommodation: '',
  food: '',
  transport: '',
  activities: '',
}

const expenseFields = [
  { key: 'accommodation', label: 'Accommodation', placeholder: 'Stay' },
  { key: 'food', label: 'Food', placeholder: 'Meals & coffee' },
  { key: 'transport', label: 'Transport', placeholder: 'Getting around' },
  { key: 'activities', label: 'Activities', placeholder: 'Things to do' },
]

function tripDays(departure, returnDate) {
  if (!departure || !returnDate || returnDate < departure) return 0
  const start = Date.parse(`${departure}T00:00:00Z`)
  const end = Date.parse(`${returnDate}T00:00:00Z`)
  return Math.floor((end - start) / 86400000) + 1
}

function money(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value || 0)
}

const createPlanId = () => window.crypto.randomUUID()

export default function TripPlanner() {
  const [draft, setDraft] = useLocalStorage('travel-planner-draft-v1', blankDraft)
  const [plans, setPlans] = useLocalStorage('travel-plans-v1', [])
  const [error, setError] = useState('')
  const { savedCount } = useOutletContext()
  const days = tripDays(draft.departure, draft.returnDate)
  const expenses = expenseFields.reduce((total, field) => total + Math.max(0, Number(draft[field.key]) || 0), 0)
  const budget = Math.max(0, Number(draft.budget) || 0)
  const remaining = budget - expenses

  const update = (event) => {
    const { name, value } = event.target
    setDraft((current) => ({ ...current, [name]: value }))
    setError('')
  }

  const addPlan = (event) => {
    event.preventDefault()
    if (draft.returnDate && draft.departure && draft.returnDate < draft.departure) {
      setError('Your return date should be after your departure date.')
      return
    }
    const plan = {
      id: createPlanId(),
      ...draft,
      days,
      expenses,
      remaining,
    }
    setPlans((current) => [plan, ...current])
    setError('')
  }

  return (
    <main className="inner-page planner-page">
      <section className="page-intro planner-intro">
        <span className="section-kicker">FROM DAYDREAM TO DEPARTURE DAY</span>
        <h1>A little plan for <em>somewhere.</em></h1>
        <p>Bring the dates, the details, or just the beginning of an idea. It’s all a good place to start.</p>
      </section>
      <div className="planner-layout">
        <form className="planner-form" onSubmit={addPlan}>
          <div className="planner-form-heading"><span className="planner-icon"><CalendarDays size={20} /></span><div><h2>Plan a getaway</h2><p>Your next story starts with a few details.</p></div></div>
          <label className="field-label">Where are you headed?
            <input name="destination" value={draft.destination} onChange={update} list="destination-suggestions" placeholder="A place you can’t stop thinking about" required />
            <datalist id="destination-suggestions">{destinations.map((place) => <option key={place.id} value={`${place.name}, ${place.country}`} />)}</datalist>
          </label>
          <div className="planner-dates">
            <label className="field-label">Departure date<input name="departure" type="date" value={draft.departure} onChange={update} /></label>
            <label className="field-label">Return date<input name="returnDate" type="date" min={draft.departure || undefined} value={draft.returnDate} onChange={update} /></label>
          </div>
          <div className="duration-readout"><Clock3 size={16} /> {days > 0 ? `${days} ${days === 1 ? 'day' : 'days'} away` : 'Add travel dates to see trip duration'}</div>
          <label className="field-label budget-label">Total travel budget
            <span className="currency-input"><span>$</span><input name="budget" type="number" min="0" step="1" value={draft.budget} onChange={update} placeholder="0" /></span>
          </label>
          <div className="budget-heading"><div><h3>Plan your spending</h3><p>A rough split is a lovely start.</p></div><Wallet size={19} /></div>
          <div className="expense-grid">
            {expenseFields.map((field) => <label className="field-label" key={field.key}>{field.label}<span className="currency-input"><span>$</span><input name={field.key} type="number" min="0" step="1" value={draft[field.key]} onChange={update} placeholder={field.placeholder} /></span></label>)}
          </div>
          <div className={`budget-summary${remaining < 0 ? ' over-budget' : ''}`}>
            <div><span>Estimated expenses</span><strong>{money(expenses)}</strong></div>
            <div><span>{remaining < 0 ? 'Over budget' : 'Still in your pocket'}</span><strong>{money(Math.abs(remaining))}</strong></div>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="button button-green planner-submit">Save this trip <span>↗</span></button>
        </form>

        <aside className="planner-aside">
          <div className="planner-image" />
          <div className="planner-aside-copy"><span className="section-kicker">A NOTE TO YOUR FUTURE SELF</span><blockquote>“You don’t have to see the whole staircase. Just take the first step.”</blockquote><span>— MARTIN LUTHER KING JR.</span></div>
          <div className="planner-aside-stat"><span>{savedCount}</span><p>places already waiting on your bucket list</p></div>
        </aside>
      </div>
      <section className="saved-plans">
        <div className="section-heading"><div><span className="section-kicker">YOUR LITTLE PLANS</span><h2>On the horizon</h2></div><span className="plans-count">{plans.length} {plans.length === 1 ? 'trip' : 'trips'}</span></div>
        {plans.length
          ? <div className="saved-plan-list">{plans.map((plan) => <article className="saved-plan" key={plan.id}><span className="saved-plan-icon"><CalendarDays size={19} /></span><div className="saved-plan-details"><h3>{plan.destination}</h3><p>{plan.departure || 'Dates still open'}{plan.returnDate ? ` — ${plan.returnDate}` : ''}{plan.days ? ` · ${plan.days} days` : ''}</p><span>Budget {money(Number(plan.budget) || 0)} · Planned expenses {money(plan.expenses)}</span></div><button className="delete-plan" onClick={() => setPlans((current) => current.filter((item) => item.id !== plan.id))} aria-label={`Delete ${plan.destination} plan`}><Trash2 size={17} /></button></article>)}</div>
          : <p className="no-plans">The first plan you save will be waiting here.</p>}
      </section>
    </main>
  )
}
