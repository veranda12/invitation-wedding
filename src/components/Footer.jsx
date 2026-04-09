import { motion } from 'framer-motion'
import { WEDDING_CONFIG } from '../lib/constants'

/**
 * Footer undangan
 */
export default function Footer() {
  const { groom, bride } = WEDDING_CONFIG

  return (
    <footer className="section-padding text-center relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--color-cream) 0%, var(--color-cream-dark) 100%)' }}>

      <div className="max-w-md mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Quote */}
          <motion.p
            className="text-sm italic leading-relaxed mb-6"
            style={{ color: 'var(--color-sage-dark)', fontFamily: 'var(--font-serif)' }}
          >
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri,
            supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang."
          </motion.p>
          <p className="text-xs mb-10" style={{ color: 'var(--color-sage)' }}>
            — QS. Ar-Rum: 21
          </p>

          {/* Couple Names */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-sage)' }}>
              Dengan penuh cinta
            </p>
            <h3 className="text-4xl"
              style={{ fontFamily: 'var(--font-script)', color: 'var(--color-warm-brown)' }}>
              {groom.name} &amp; {bride.name}
            </h3>
          </motion.div>

          {/* Thank you */}
          <motion.p
            className="text-sm leading-relaxed mb-8"
            style={{ color: 'var(--color-sage-dark)' }}
          >
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
          </motion.p>

          {/* Divider */}
          <div className="ornament-divider mb-6">
            <span style={{ color: 'var(--color-gold)' }}>♥</span>
          </div>

          {/* Credits */}
          <p className="text-[10px] tracking-wider" style={{ color: 'var(--color-sage)' }}>
            Made with Deni Maulana Shobri • &copy; {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
