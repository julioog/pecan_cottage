import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Overview from './components/Overview'
import Reservations from './components/Reservations'
import Reviews from './components/Reviews'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-cream font-sans text-stone-800 antialiased">
      <Navbar />
      <main>
        <Hero />
        <Overview />
        <Reservations />
        <Reviews />
      </main>
      <Footer />
    </div>
  )
}
