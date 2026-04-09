import { useState } from 'react'
import { motion } from 'framer-motion'
import Cover from '../components/Cover'
import CoupleSection from '../components/CoupleSection'
import Countdown from '../components/Countdown'
import LoveStory from '../components/LoveStory'
import EventInfo from '../components/EventInfo'
import Gallery from '../components/Gallery'
import RsvpForm from '../components/RsvpForm'
import Wishes from '../components/Wishes'
import GiftSection from '../components/GiftSection'
import Footer from '../components/Footer'
import MusicPlayer from '../components/MusicPlayer'
import PetalAnimation from '../components/PetalAnimation'
import OrnamentDivider from '../components/OrnamentDivider'

/**
 * Halaman utama undangan — menampilkan semua section
 */
export default function HomePage() {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <>
      {/* Cover / Amplop */}
      {!isOpened && <Cover onOpen={() => setIsOpened(true)} />}

      {/* Konten Undangan */}
      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Background Petals */}
          <PetalAnimation />

          {/* Music Player */}
          <MusicPlayer />

          {/* Hero Section dengan nama pasangan */}
          <HeroSection />

          <OrnamentDivider />

          {/* Countdown */}
          <Countdown />

          <OrnamentDivider />

          {/* Profil Mempelai */}
          <CoupleSection />

          <OrnamentDivider />

          {/* Cerita Cinta */}
          <LoveStory />

          <OrnamentDivider />

          {/* Informasi Acara + Peta */}
          <EventInfo />

          <OrnamentDivider />

          {/* Galeri */}
          <Gallery />

          <OrnamentDivider />

          {/* RSVP Form */}
          <RsvpForm />

          <OrnamentDivider />

          {/* Ucapan Tamu */}
          <Wishes />

          <OrnamentDivider />

          {/* Gift / Amplop Digital */}
          <GiftSection />

          {/* Footer */}
          <Footer />
        </motion.div>
      )}
    </>
  )
}

/**
 * Komponen hero section setelah cover dibuka
 */
function HeroSection() {
  return (
    <section
      className="min-h-[70vh] flex items-center justify-center text-center section-padding relative overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg,
            rgba(253,246,236,0.95) 0%,
            rgba(245,230,211,0.9) 50%,
            rgba(253,246,236,0.95) 100%
          ),
          url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=60')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        className="max-w-xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.p
          className="text-sm tracking-[0.3em] uppercase mb-4"
          style={{ color: 'var(--color-sage-dark)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          We Are Getting Married
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl mb-3"
          style={{ fontFamily: 'var(--font-script)', color: 'var(--color-warm-brown)' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8, type: 'spring' }}
        >
          Deni &amp; Reni
        </motion.h1>

        <motion.div
          className="ornament-divider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-2xl" style={{ color: 'var(--color-gold)' }}>✦</span>
        </motion.div>

        <motion.p
          className="text-sm mt-4 leading-relaxed max-w-sm mx-auto"
          style={{ color: 'var(--color-sage-dark)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          "Dan Kami ciptakan kamu berpasang-pasangan"
          <br />
          <span className="text-xs not-italic">— QS. An-Naba: 8</span>
        </motion.p>
      </motion.div>
    </section>
  )
}
