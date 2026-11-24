import { useState } from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { destinationImage } from '../data/destinations'

export function AboutPage() {
  return (
    <main className="inner-page about-page">
      <section className="about-hero">
        <div><span className="section-kicker">A LITTLE ABOUT US</span><h1>For the places<br />that <em>stay with you.</em></h1><p>Wayfarer is a little space for gathering your someday places and bringing them a little closer.</p></div>
        <img src={destinationImage('photo-1470770841072-f978cf4d019e', 1200)} alt="A quiet lake tucked between green mountains" />
      </section>
      <section className="about-values"><article><span>01 — THE IDEA</span><h2>More meaning, less rushing.</h2><p>Travel is less about collecting stamps and more about finding a moment that changes the way you see things.</p></article><article><span>02 — THE PROMISE</span><h2>Your dreams stay yours.</h2><p>Your bucket list and plans stay in this browser, ready whenever you are.</p></article><article><span>03 — THE INVITATION</span><h2>Start anywhere.</h2><p>A faraway coastline or a little place two towns over. There’s no right size for an adventure.</p></article></section>
      <section className="about-cta"><p>There’s a whole world out there. Let’s find your part of it.</p><Link to="/explore" className="button button-cream">Explore the world <ArrowUpRight size={16} /></Link></section>
    </main>
  )
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    setSubmitted(true)
  }

  return (
    <main className="inner-page contact-page">
      <section className="contact-intro"><span className="section-kicker">WE’RE ALL EARS</span><h1>Say <em>hello.</em></h1><p>A question, a favorite corner of the world, or just a note from somewhere new? We’d love to hear from you.</p><a className="contact-email" href="mailto:hello@wayfarer.travel"><Mail size={18} /> hello@wayfarer.travel</a></section>
      <form className="contact-form" onSubmit={submit}><span className="section-kicker">SEND A LITTLE NOTE</span><h2>What’s on your mind?</h2><label className="field-label">Your name<input name="name" required placeholder="What should we call you?" /></label><label className="field-label">Your email<input name="email" type="email" required placeholder="you@somewhere.com" /></label><label className="field-label">Your message<textarea name="message" rows="5" required placeholder="Tell us everything..." /></label>{submitted && <p className="form-success" role="status">Thanks for reaching out. Your note is ready for our travel-loving team.</p>}<button className="button button-green" type="submit">Send your note <ArrowUpRight size={16} /></button><small className="form-caption">This demo doesn’t send messages to a server.</small></form>
    </main>
  )
}

export function AuthPage({ mode, onAuth }) {
  const signUp = mode === 'signup'
  const submit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email'))
    onAuth({ name: String(form.get('name') || email.split('@')[0]), email })
  }

  return (
    <main className="auth-page">
      <div className="auth-photo" style={{ backgroundImage: `linear-gradient(180deg, rgba(20, 52, 36, .12), rgba(20, 52, 36, .6)), url("${destinationImage('photo-1476514525535-07fb3b4ae5f1', 1400)}")` }}><span>THE WORLD IS WIDE OPEN</span><strong>There’s a place<br />with your name on it.</strong></div>
      <form className="auth-form" onSubmit={submit}><span className="section-kicker">{signUp ? 'LET’S GET GOING' : 'GOOD TO HAVE YOU BACK'}</span><h1>{signUp ? 'Make yourself at home.' : 'Welcome back.'}</h1><p>{signUp ? 'Save the places you love, all in one little place.' : 'Your next adventure is right where you left it.'}</p>{signUp && <label className="field-label">Your name<input name="name" required autoComplete="name" placeholder="How should we call you?" /></label>}<label className="field-label">Email address<input name="email" type="email" required autoComplete="email" placeholder="you@somewhere.com" /></label><label className="field-label">Password<input name="password" type="password" minLength="6" required autoComplete={signUp ? 'new-password' : 'current-password'} placeholder="At least 6 characters" /></label><button className="button button-green auth-submit" type="submit">{signUp ? 'Create my account' : 'Log in'} <ArrowUpRight size={16} /></button><small className="form-caption">Demo account details stay in this browser. No password is stored.</small><div className="auth-switch">{signUp ? 'Already have a little home here?' : 'New around here?'} <Link to={signUp ? '/login' : '/signup'}>{signUp ? 'Log in' : 'Make an account'}</Link></div></form>
    </main>
  )
}
