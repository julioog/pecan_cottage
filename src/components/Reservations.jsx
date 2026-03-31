import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const TODAY = new Date().toISOString().split('T')[0]

const INIT = {
  checkin: '', checkout: '', guests: '',
  fname: '', lname: '', email: '', phone: '', message: '',
}

function validate(f) {
  const e = {}
  if (!f.checkin)  e.checkin  = 'Check-in date is required.'
  if (!f.checkout) e.checkout = 'Check-out date is required.'
  if (f.checkin && f.checkout && f.checkout <= f.checkin)
    e.checkout = 'Check-out must be after check-in.'
  if (!f.guests)   e.guests   = 'Please select the number of guests.'
  if (!f.fname.trim()) e.fname = 'First name is required.'
  if (!f.lname.trim()) e.lname = 'Last name is required.'
  if (!f.email.trim()) {
    e.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    e.email = 'Please enter a valid email address.'
  }
  return e
}

const inputCls = (hasError) =>
  `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors
   focus:ring-2 focus:ring-offset-0 bg-stone-50 placeholder-stone-400
   ${hasError
     ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
     : 'border-stone-200 focus:border-pecan-400 focus:ring-pecan-100'
   }`

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}

const PRICING = [
  ['Minimum stay',  '2 nights'],
  ['Cleaning fee',  '$75 (once)'],
  ['Pet fee',       '$30 / stay'],
  ['Max guests',    '6'],
  ['Check-in',      '3:00 PM'],
  ['Check-out',     '11:00 AM'],
]

const RULES = [
  'No smoking indoors',
  'Pets welcome (with fee)',
  'Quiet hours after 10 PM',
  'No events or parties',
  'Self check-in available',
]

export default function Reservations() {
  const [ref, inView] = useInView()
  const [fields,    setFields]    = useState(INIT)
  const [errors,    setErrors]    = useState({})
  const [submitted, setSubmitted] = useState(false)

  const set = (k) => (e) => setFields(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(fields)
    setErrors(errs)
    if (Object.keys(errs).length === 0) setSubmitted(true)
  }

  return (
    <section id="reservations" className="py-20 lg:py-28 bg-forest-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div
          ref={ref}
          className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-pecan-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Reservations
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-forest-900 mb-4">
            Plan your stay
          </h2>
          <p className="text-stone-500 text-lg max-w-2xl leading-relaxed">
            Fill out the form and we'll follow up within 24 hours to confirm availability
            and finalize your booking.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-10 items-start">

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="flex items-start gap-4 p-6 bg-white border border-forest-200 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-forest-800 text-lg">Request received!</p>
                  <p className="text-stone-500 mt-1 text-sm">
                    Thanks, {fields.fname}! We'll reach out to{' '}
                    <span className="font-medium">{fields.email}</span> within 24 hours
                    to confirm your dates.
                  </p>
                  <button
                    onClick={() => { setFields(INIT); setErrors({}); setSubmitted(false) }}
                    className="mt-4 text-sm text-pecan-600 hover:text-pecan-700 font-medium underline underline-offset-2"
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-stone-100"
              >
                {/* Dates */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Check-in Date" error={errors.checkin}>
                    <input type="date" value={fields.checkin} min={TODAY}
                      onChange={set('checkin')} className={inputCls(errors.checkin)} />
                  </Field>
                  <Field label="Check-out Date" error={errors.checkout}>
                    <input type="date" value={fields.checkout} min={fields.checkin || TODAY}
                      onChange={set('checkout')} className={inputCls(errors.checkout)} />
                  </Field>
                </div>

                {/* Guests + phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Number of Guests" error={errors.guests}>
                    <select value={fields.guests} onChange={set('guests')} className={inputCls(errors.guests)}>
                      <option value="">Select…</option>
                      {[1,2,3,4,5,6].map(n => (
                        <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Phone (optional)">
                    <input type="tel" value={fields.phone} onChange={set('phone')}
                      placeholder="(555) 000-0000" className={inputCls()} />
                  </Field>
                </div>

                {/* Name */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="First Name" error={errors.fname}>
                    <input type="text" value={fields.fname} onChange={set('fname')}
                      placeholder="Jane" className={inputCls(errors.fname)} />
                  </Field>
                  <Field label="Last Name" error={errors.lname}>
                    <input type="text" value={fields.lname} onChange={set('lname')}
                      placeholder="Smith" className={inputCls(errors.lname)} />
                  </Field>
                </div>

                {/* Email */}
                <Field label="Email Address" error={errors.email}>
                  <input type="email" value={fields.email} onChange={set('email')}
                    placeholder="jane@example.com" className={inputCls(errors.email)} />
                </Field>

                {/* Message */}
                <Field label="Special Requests or Questions (optional)">
                  <textarea value={fields.message} onChange={set('message')} rows={4}
                    placeholder="Any special requests, questions, or notes for your stay…"
                    className={`${inputCls()} resize-none`} />
                </Field>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-pecan-500 text-white font-semibold hover:bg-pecan-600 transition-colors shadow-md"
                >
                  Send Reservation Request
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Pricing card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
              <div className="flex items-baseline gap-1.5 mb-5 pb-4 border-b border-stone-100">
                <span className="font-serif text-4xl text-forest-900 font-bold">$185</span>
                <span className="text-stone-400 text-sm">/ night</span>
              </div>
              <ul className="space-y-0">
                {PRICING.map(([k, v]) => (
                  <li key={k} className="flex justify-between py-2.5 border-b border-stone-50 last:border-0">
                    <span className="text-stone-400 text-sm">{k}</span>
                    <span className="text-stone-800 text-sm font-medium">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* House rules */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
              <h3 className="font-semibold text-forest-900 mb-4">House Rules</h3>
              <ul className="space-y-2.5">
                {RULES.map(rule => (
                  <li key={rule} className="flex items-center gap-2.5 text-stone-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-pecan-400 shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
