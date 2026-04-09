import { motion } from 'framer-motion'
import { WEDDING_CONFIG } from '../lib/constants'

/**
 * Section profil pasangan mempelai
 */
export default function CoupleSection() {
  const { groom, bride } = WEDDING_CONFIG

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, var(--color-cream-dark) 0%, var(--color-soft-white) 50%, var(--color-cream) 100%)',
      }} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: 'var(--color-sage-dark)' }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </p>
          <h2 className="text-3xl md:text-4xl mb-3"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-warm-brown)' }}>
            Mempelai
          </h2>
          <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: 'var(--color-sage-dark)' }}>
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami
          </p>
        </motion.div>

        {/* Couple Cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Groom */}
          <CoupleCard person={groom} delay={0.2} />

          {/* Ampersand */}
          <motion.div
            className="text-5xl animate-float"
            style={{ fontFamily: 'var(--font-script)', color: 'var(--color-gold)' }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            &amp;
          </motion.div>

          {/* Bride */}
          <CoupleCard person={bride} delay={0.6} />
        </div>
      </div>
    </section>
  )
}

function CoupleCard({ person, delay }) {
  return (
    <motion.div
      className="text-center w-full max-w-[280px]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7 }}
    >
      {/* Photo */}
      <motion.div
        className="w-40 h-40 mx-auto mb-5 rounded-full overflow-hidden shadow-xl"
        style={{ border: '4px solid var(--color-gold)', padding: '3px' }}
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={person.photo}
          alt={person.name}
          className="w-full h-full object-cover rounded-full"
          loading="lazy"
        />
      </motion.div>

      {/* Name */}
      <h3 className="text-3xl mb-1"
        style={{ fontFamily: 'var(--font-script)', color: 'var(--color-warm-brown)' }}>
        {person.name}
      </h3>
      <p className="text-sm mb-3 font-medium" style={{ color: 'var(--color-charcoal)' }}>
        {person.fullName}
      </p>

      {/* Parents */}
      <div className="text-xs leading-relaxed" style={{ color: 'var(--color-sage-dark)' }}>
        <p>{person.childOrder} dari</p>
        <p className="font-medium" style={{ color: 'var(--color-charcoal)' }}>
          {person.father} &amp; {person.mother}
        </p>
      </div>
    </motion.div>
  )
}
