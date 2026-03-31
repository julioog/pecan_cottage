const STATS = [
  { value: '3', label: 'Bedrooms'      },
  { value: '2', label: 'Bathrooms'     },
  { value: '6', label: 'Guests Max'    },
  { value: '5', label: 'Private Acres' },
]

export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden"
      style={{
        background:
          'linear-gradient(150deg, #0f2018 0%, #1a362c 20%, #255340 45%, #7e4a2c 75%, #563324 100%)',
      }}
    >
      {/* Radial highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,255,255,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-20 pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full" aria-hidden>
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="#ffffff"
            fillOpacity="0.04"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <p className="text-pecan-300 text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-5">
          A peaceful retreat in the heart of nature
        </p>

        <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.1] mb-6">
          Pecan Grove
          <br />
          <em className="not-italic font-normal italic">Cottage</em>
        </h1>

        <p className="text-white/75 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Unplug, unwind, and reconnect beneath the canopy of century-old pecan
          trees — 3 bedrooms, 2 baths, and 5 private acres just waiting to be
          explored.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollTo('reservations')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-pecan-500 text-white font-semibold text-sm tracking-wide hover:bg-pecan-400 transition-all duration-200 hover:-translate-y-0.5 shadow-xl"
          >
            Check Availability
          </button>
          <button
            onClick={() => scrollTo('overview')}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/30 text-white font-semibold text-sm tracking-wide hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
          >
            Explore the Cottage
          </button>
        </div>

        {/* Quick stats */}
        <div className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-4 text-white/60 text-sm">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-pecan-300 font-serif text-2xl font-bold leading-none">
                {value}
              </span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg
          className="w-5 h-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
