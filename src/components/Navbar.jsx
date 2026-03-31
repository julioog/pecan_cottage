import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Overview',     href: '#overview'     },
  { label: 'Reservations', href: '#reservations' },
  { label: 'Reviews',      href: '#reviews'      },
]

export default function Navbar() {
  const [isOpen,     setIsOpen]     = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    setIsOpen(false)
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const dark = isScrolled || isOpen

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        dark ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a
          href="#top"
          onClick={e => scrollTo(e, '#top')}
          className={`font-serif text-xl font-semibold transition-colors ${
            dark ? 'text-forest-800' : 'text-white'
          }`}
        >
          Pecan Grove Cottage
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={e => scrollTo(e, href)}
                className={`text-sm font-medium transition-colors hover:text-pecan-500 ${
                  isScrolled ? 'text-stone-600' : 'text-white/90'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#reservations"
          onClick={e => scrollTo(e, '#reservations')}
          className="hidden md:inline-flex px-5 py-2 rounded-full bg-pecan-500 text-white text-sm font-semibold hover:bg-pecan-600 transition-colors shadow-sm"
        >
          Book Now
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(o => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          className={`md:hidden p-2 flex flex-col gap-[5px] ${dark ? 'text-forest-800' : 'text-white'}`}
        >
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-stone-100 ${
          isOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="px-4 pt-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={e => scrollTo(e, href)}
                className="block py-2.5 text-stone-700 font-medium hover:text-pecan-500 transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="px-4 py-4">
          <a
            href="#reservations"
            onClick={e => scrollTo(e, '#reservations')}
            className="block text-center py-3 rounded-full bg-pecan-500 text-white font-semibold hover:bg-pecan-600 transition-colors"
          >
            Book Now
          </a>
        </div>
      </div>
    </header>
  )
}
