import { motion } from 'framer-motion'
import { WEDDING_CONFIG } from '../lib/constants'

/**
 * Timeline cerita cinta interaktif
 */
export default function LoveStory() {
  const { loveStory } = WEDDING_CONFIG

  return (
    <section className="section-padding relative overflow-hidden"
      style={{ background: 'var(--color-soft-white)' }}>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: 'var(--color-sage-dark)' }}>
            Our Journey
          </p>
          <h2 className="text-3xl md:text-4xl"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-warm-brown)' }}>
            Cerita Cinta Kami
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--color-gold), var(--color-gold), transparent)' }} />

          {loveStory.map((item, index) => {
            const isLeft = index % 2 === 0

            return (
              <motion.div
                key={index}
                className={`relative flex items-center mb-12 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-cream), var(--color-soft-white))',
                      border: '2px solid var(--color-gold)',
                    }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {item.icon}
                  </motion.div>
                </div>

                {/* Content Card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${isLeft ? 'md:pr-4' : 'md:pl-4'}`}>
                  <motion.div
                    className="glass rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ y: -4 }}
                  >
                    <span className="inline-block text-xs px-3 py-1 rounded-full mb-3 font-medium"
                      style={{
                        background: 'rgba(201,169,110,0.15)',
                        color: 'var(--color-warm-brown)',
                      }}>
                      {item.date}
                    </span>
                    <h3 className="text-lg font-semibold mb-2"
                      style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-warm-brown)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-sage-dark)' }}>
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
