import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { REVIEWS } from '../data/reviews'

const PAGE_SIZE = 6

const CATEGORIES = [
  { label: 'Cleanliness',    score: 4.9, pct: 98  },
  { label: 'Communication',  score: 5.0, pct: 100 },
  { label: 'Check-in',       score: 4.9, pct: 98  },
  { label: 'Accuracy',       score: 4.8, pct: 96  },
  { label: 'Location',       score: 5.0, pct: 100 },
  { label: 'Value',          score: 4.7, pct: 94  },
]

function Stars({ rating, large = false }) {
  return (
    <span
      className={`flex gap-0.5 ${large ? 'text-2xl' : 'text-base'}`}
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n} className={n <= rating ? 'text-pecan-400' : 'text-stone-200'}>
          ★
        </span>
      ))}
    </span>
  )
}

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1 mt-0.5" role="group" aria-label="Select a rating">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          className={`text-3xl leading-none transition-colors focus-visible:outline-none ${
            n <= (hovered || value) ? 'text-pecan-400' : 'text-stone-300 hover:text-pecan-300'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

const reviewInputCls = (hasError) =>
  `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors
   focus:ring-2 focus:ring-offset-0 bg-stone-50 placeholder-stone-400
   ${hasError
     ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
     : 'border-stone-200 focus:border-pecan-400 focus:ring-pecan-100'
   }`

export default function Reviews() {
  const [ref, inView] = useInView()
  const [reviews,   setReviews]   = useState(REVIEWS)
  const [shown,     setShown]     = useState(PAGE_SIZE)
  const [form,      setForm]      = useState({ name: '', rating: 0, text: '' })
  const [formErrs,  setFormErrs]  = useState({})
  const [confirmed, setConfirmed] = useState(false)

  const setField = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const validateForm = () => {
    const e = {}
    if (!form.name.trim()) e.name   = 'Name is required.'
    if (!form.rating)      e.rating = 'Please select a rating.'
    if (!form.text.trim()) e.text   = 'Review text is required.'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validateForm()
    setFormErrs(errs)
    if (Object.keys(errs).length > 0) return

    const date     = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })
    const initials = form.name.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()

    setReviews(r => [
      { id: Date.now(), name: form.name, date, rating: form.rating, text: form.text, initials },
      ...r,
    ])
    setShown(s => s + 1)
    setForm({ name: '', rating: 0, text: '' })
    setFormErrs({})
    setConfirmed(true)
    setTimeout(() => setConfirmed(false), 4000)
  }

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div
          ref={ref}
          className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-pecan-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Guest Reviews
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-forest-900 mb-4">
            What our guests say
          </h2>
        </div>

        {/* Rating summary */}
        <div className="mt-8 flex flex-col sm:flex-row gap-8 p-6 sm:p-8 bg-forest-50 rounded-2xl">
          <div className="flex flex-col items-center justify-center sm:border-r border-forest-100 sm:pr-8 sm:min-w-[140px]">
            <span className="font-serif text-6xl font-bold text-forest-900 leading-none">4.9</span>
            <Stars rating={5} large />
            <span className="text-stone-400 text-xs mt-2">38 reviews</span>
          </div>
          <div className="flex-1 grid sm:grid-cols-2 gap-x-8 gap-y-3 content-center">
            {CATEGORIES.map(({ label, score, pct }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-xs text-stone-500 w-28 shrink-0">{label}</span>
                <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                  <div className="h-full bg-pecan-400 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs font-medium text-stone-700 w-6 text-right">{score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review cards */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.slice(0, shown).map(r => (
            <article
              key={r.id}
              className="bg-stone-50 rounded-2xl p-5 border border-stone-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-forest-700 text-white text-sm font-bold
                                flex items-center justify-center shrink-0" aria-hidden>
                  {r.initials}
                </div>
                <div>
                  <p className="font-medium text-stone-800 text-sm leading-tight">{r.name}</p>
                  <p className="text-stone-400 text-xs">{r.date}</p>
                </div>
              </div>
              <Stars rating={r.rating} />
              <p className="mt-3 text-stone-600 text-sm leading-relaxed">{r.text}</p>
            </article>
          ))}
        </div>

        {/* Load more */}
        {shown < reviews.length && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShown(s => s + PAGE_SIZE)}
              className="px-8 py-3 rounded-full border-2 border-forest-700 text-forest-700 font-semibold text-sm hover:bg-forest-700 hover:text-white transition-colors"
            >
              Load More Reviews
            </button>
          </div>
        )}

        {/* Leave a review */}
        <div className="mt-16 pt-12 border-t border-stone-100">
          <h3 className="font-serif text-2xl text-forest-900 mb-1">Share Your Experience</h3>
          <p className="text-stone-400 text-sm mb-6">
            Stayed at Pecan Grove Cottage? We'd love to hear about your visit.
          </p>

          {confirmed && (
            <div className="mb-5 flex items-center gap-2 text-forest-700 text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Your review has been added — thank you!
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="max-w-xl space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Your Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setField('name')(e.target.value)}
                  placeholder="Jane S."
                  className={reviewInputCls(formErrs.name)}
                />
                {formErrs.name && <p className="mt-1.5 text-xs text-red-500">{formErrs.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Rating</label>
                <StarPicker value={form.rating} onChange={setField('rating')} />
                {formErrs.rating && <p className="mt-1.5 text-xs text-red-500">{formErrs.rating}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Your Review</label>
              <textarea
                value={form.text}
                onChange={e => setField('text')(e.target.value)}
                rows={4}
                placeholder="Tell future guests what you loved about your stay…"
                className={`${reviewInputCls(formErrs.text)} resize-none`}
              />
              {formErrs.text && <p className="mt-1.5 text-xs text-red-500">{formErrs.text}</p>}
            </div>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-pecan-500 text-white font-semibold text-sm hover:bg-pecan-600 transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
