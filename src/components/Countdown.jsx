import { motion } from 'framer-motion'
import { useCountdown } from '../hooks/useCountdown'
import { WEDDING_CONFIG } from '../lib/constants'

/**
 * Countdown timer dengan desain elegan
 */
export default function Countdown() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(WEDDING_CONFIG.weddingDate)

  const timeBlocks = [
    { value: days, label: 'Hari' },
    { value: hours, label: 'Jam' },
    { value: minutes, label: 'Menit' },
    { value: seconds, label: 'Detik' },
  ]

  return (
    <section className="section-padding text-center relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--color-cream) 0%, var(--color-cream-dark) 100%)' }}
    >
      {/* Decorative Circles */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-10"
        style={{ background: 'var(--color-sage)' }} />
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full opacity-10"
        style={{ background: 'var(--color-dusty-rose)' }} />

      <motion.div
        className="max-w-2xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="text-sm tracking-[0.3em] uppercase mb-3"
          style={{ color: 'var(--color-sage-dark)', fontFamily: 'var(--font-sans)' }}
        >
          Menghitung Hari
        </motion.p>

        <h2
          className="text-3xl md:text-4xl mb-2"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-warm-brown)' }}
        >
          {isExpired ? 'Hari Bahagia Telah Tiba!' : 'Menuju Hari Bahagia'}
        </h2>

        <p className="text-sm mb-10" style={{ color: 'var(--color-sage-dark)' }}>
          {WEDDING_CONFIG.events[0]?.date}
        </p>

        {!isExpired && (
          <div className="flex justify-center gap-4 md:gap-6">
            {timeBlocks.map((block, i) => (
              <motion.div
                key={block.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <motion.div
                  className="w-18 h-18 md:w-24 md:h-24 rounded-2xl glass flex items-center justify-center mb-2 shadow-lg"
                  style={{ border: '1px solid rgba(201,169,110,0.3)' }}
                  whileHover={{ scale: 1.05, y: -4 }}
                >
                  <span
                    className="text-3xl md:text-4xl font-bold"
                    style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-warm-brown)' }}
                  >
                    {String(block.value).padStart(2, '0')}
                  </span>
                </motion.div>
                <span
                  className="text-xs tracking-wider uppercase"
                  style={{ color: 'var(--color-sage-dark)', fontFamily: 'var(--font-sans)' }}
                >
                  {block.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}
