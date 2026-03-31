import { useInView } from '../hooks/useInView'

const AMENITIES = [
  { icon: '🏡', label: 'Fully equipped kitchen'        },
  { icon: '📶', label: 'High-speed Wi-Fi'               },
  { icon: '🔥', label: 'Outdoor fire pit & seating'    },
  { icon: '🛏',  label: 'King & queen beds, fresh linens' },
  { icon: '🌿', label: 'Covered wrap-around porch'     },
  { icon: '🚗', label: 'Free parking for 4 vehicles'   },
  { icon: '☕', label: 'Coffee bar & welcome basket'   },
  { icon: '🐾', label: 'Pet friendly (fee applies)'    },
  { icon: '🎲', label: 'Games, books & local guides'   },
  { icon: '🪵', label: 'Firewood provided'             },
]

const PHOTOS = [
  { label: 'Living Room',        gradient: 'from-forest-700 to-forest-900',  span: 'col-span-2' },
  { label: 'Master Bedroom',     gradient: 'from-pecan-700 to-pecan-900',    span: '' },
  { label: 'Wrap-Around Porch',  gradient: 'from-forest-500 to-forest-700',  span: '' },
  { label: 'Fire Pit',           gradient: 'from-pecan-500 to-pecan-700',    span: '' },
  { label: 'Full Kitchen',       gradient: 'from-stone-500 to-stone-700',    span: '' },
]

export default function Overview() {
  const [ref, inView] = useInView()

  return (
    <section id="overview" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div
          ref={ref}
          className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="text-pecan-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            The Cottage
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-forest-900 mb-4">
            Your home away from home
          </h2>
          <p className="text-stone-500 text-lg max-w-2xl leading-relaxed">
            Pecan Grove Cottage is a charming 3-bedroom retreat nestled among towering
            pecan trees on 5 private acres. Whether you're here for a romantic getaway,
            a family vacation, or a quiet solo escape, you'll find everything you need
            to truly relax.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="mt-12 grid lg:grid-cols-2 gap-12 items-start">

          {/* Photo grid */}
          <div className="grid grid-cols-2 gap-3">
            {PHOTOS.map(({ label, gradient, span }) => (
              <div
                key={label}
                className={`${span} ${span ? 'h-56 lg:h-64' : 'h-36 lg:h-40'} rounded-2xl bg-gradient-to-br ${gradient} flex items-end p-3 sm:p-4 overflow-hidden`}
              >
                <span className="text-white/80 text-xs sm:text-sm font-medium bg-black/20 backdrop-blur-sm px-2.5 sm:px-3 py-1 rounded-full">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Amenities + CTA */}
          <div>
            <h3 className="font-serif text-2xl text-forest-900 mb-5">What's included</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-8">
              {AMENITIES.map(({ icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-stone-600">
                  <span className="text-lg" role="img" aria-hidden="true">{icon}</span>
                  <span className="text-sm">{label}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() =>
                document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-forest-700 text-white font-semibold text-sm hover:bg-forest-600 transition-colors shadow-md"
            >
              Reserve Your Stay
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
