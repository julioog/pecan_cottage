const YEAR = new Date().getFullYear()

const scrollTo = (e, href) => {
  e.preventDefault()
  if (href === '#top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-white/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-8">

        {/* Three columns */}
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          <div>
            <p className="font-serif text-xl text-white font-semibold mb-3">
              Pecan Grove Cottage
            </p>
            <p className="text-sm text-white/50 leading-relaxed">
              A charming 3-bedroom retreat nestled among century-old pecan trees
              on 5 private acres.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">
              Navigate
            </p>
            <ul className="space-y-3">
              {[
                ['Overview',     '#overview'     ],
                ['Reservations', '#reservations' ],
                ['Reviews',      '#reviews'      ],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={e => scrollTo(e, href)}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">
              Contact
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@pecangrove.com"
                  className="text-sm hover:text-white transition-colors"
                >
                  hello@pecangrove.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15550001234"
                  className="text-sm hover:text-white transition-colors"
                >
                  (555) 000-1234
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {YEAR} Pecan Grove Cottage. All rights reserved.
          </p>
          <a
            href="#top"
            onClick={e => scrollTo(e, '#top')}
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            Back to top
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
