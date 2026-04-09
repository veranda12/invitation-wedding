import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WEDDING_CONFIG } from '../lib/constants'
import { useCountdown } from '../hooks/useCountdown'

/**
 * Halaman pembuka undangan dengan efek buka amplop
 */
export default function Cover({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false)
  const { groom, bride, weddingDate } = WEDDING_CONFIG
  const { days, hours, minutes, seconds } = useCountdown(weddingDate)

  const handleOpen = useCallback(() => {
    setIsOpening(true)
    setTimeout(() => {
      onOpen?.()
    }, 800)
  }, [onOpen])

  // Ambil nama tamu dari URL query param
  const params = new URLSearchParams(window.location.search)
  const guestName = params.get('to') || 'Tamu Undangan'

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #FDF6EC 0%, #F5E6D3 50%, #E8D5C4 100%)' }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, #8B6F5C 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }} />
          </div>

          {/* Envelope Card */}
          <motion.div
            className="relative w-[90vw] max-w-md mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Top Ornament */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="text-5xl">💌</span>
            </motion.div>

            {/* Main Card */}
            <motion.div
              className="glass rounded-3xl p-8 md:p-10 text-center shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {/* Bismillah */}
              <motion.p
                className="text-sm tracking-[0.3em] uppercase mb-6"
                style={{ color: 'var(--color-warm-brown)', fontFamily: 'var(--font-sans)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
              </motion.p>

              {/* The Wedding Of */}
              <motion.p
                className="text-sm tracking-[0.25em] uppercase mb-2"
                style={{ color: 'var(--color-sage-dark)', fontFamily: 'var(--font-sans)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                The Wedding Of
              </motion.p>

              {/* Couple Names */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <h1
                  className="text-4xl md:text-5xl mb-1"
                  style={{ fontFamily: 'var(--font-script)', color: 'var(--color-warm-brown)' }}
                >
                  {groom.name}
                </h1>
                <p
                  className="text-2xl my-2"
                  style={{ fontFamily: 'var(--font-script)', color: 'var(--color-gold)' }}
                >
                  &amp;
                </p>
                <h1
                  className="text-4xl md:text-5xl mb-4"
                  style={{ fontFamily: 'var(--font-script)', color: 'var(--color-warm-brown)' }}
                >
                  {bride.name}
                </h1>
              </motion.div>

              {/* Mini Countdown */}
              <motion.div
                className="flex justify-center gap-4 my-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {[
                  { value: days, label: 'Hari' },
                  { value: hours, label: 'Jam' },
                  { value: minutes, label: 'Menit' },
                  { value: seconds, label: 'Detik' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-semibold mb-1"
                      style={{
                        background: 'rgba(201,169,110,0.1)',
                        color: 'var(--color-warm-brown)',
                        fontFamily: 'var(--font-serif)',
                        border: '1px solid rgba(201,169,110,0.2)',
                      }}
                    >
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-sage-dark)' }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Guest Name */}
              <motion.div
                className="my-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="text-xs tracking-wider uppercase mb-1" style={{ color: 'var(--color-sage-dark)' }}>
                  Kepada Yth.
                </p>
                <p
                  className="text-xl font-medium"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-charcoal)' }}
                >
                  {guestName}
                </p>
              </motion.div>

              {/* Open Button */}
              <motion.button
                onClick={handleOpen}
                className="group relative px-8 py-3 rounded-full text-white text-sm tracking-wider uppercase overflow-hidden cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, var(--color-warm-brown), var(--color-gold-dark))',
                  fontFamily: 'var(--font-sans)',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(139,111,92,0.3)' }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Buka Undangan
                </span>
              </motion.button>
            </motion.div>

            {/* Bottom Ornament */}
            <motion.p
              className="text-center text-xs mt-6 tracking-wider"
              style={{ color: 'var(--color-sage)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.5 }}
            >
              Scroll ke bawah untuk informasi lengkap
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
