import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { WEDDING_CONFIG } from '../lib/constants'

// =============================================
// SVG Karakter Pasangan (inline, tidak perlu asset)
// =============================================

/**
 * Karakter pria - siluet sederhana & cute
 */
function GroomCharacter({ className = '', style = {} }) {
  return (
    <svg width="36" height="56" viewBox="0 0 36 56" fill="none" className={className} style={style}>
      {/* Kepala */}
      <circle cx="18" cy="10" r="8" fill="#8B6F5C" />
      {/* Rambut */}
      <path d="M10 8 Q18 2 26 8" stroke="#5C4033" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Badan - jas */}
      <rect x="10" y="18" width="16" height="20" rx="4" fill="#5C4033" />
      {/* Dasi */}
      <path d="M17 18 L18 28 L19 18" stroke="#C9A96E" strokeWidth="1.5" fill="#C9A96E" />
      {/* Kerah putih */}
      <path d="M14 18 L18 22 L22 18" fill="white" />
      {/* Kaki */}
      <rect x="11" y="38" width="6" height="14" rx="3" fill="#3C3C3C" />
      <rect x="19" y="38" width="6" height="14" rx="3" fill="#3C3C3C" />
      {/* Sepatu */}
      <ellipse cx="14" cy="52" rx="5" ry="3" fill="#2C2C2C" />
      <ellipse cx="22" cy="52" rx="5" ry="3" fill="#2C2C2C" />
      {/* Tangan kiri */}
      <circle cx="8" cy="28" r="3" fill="#C9A9A6" />
      {/* Tangan kanan */}
      <circle cx="28" cy="28" r="3" fill="#C9A9A6" />
    </svg>
  )
}

/**
 * Karakter wanita - siluet sederhana & cute
 */
function BrideCharacter({ className = '', style = {} }) {
  return (
    <svg width="36" height="60" viewBox="0 0 36 60" fill="none" className={className} style={style}>
      {/* Mahkota / veil */}
      <path d="M10 10 Q18 0 26 10" stroke="#C9A96E" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="18" cy="2" r="2" fill="#C9A96E" />
      <circle cx="11" cy="9" r="1.5" fill="#C9A96E" />
      <circle cx="25" cy="9" r="1.5" fill="#C9A96E" />
      {/* Kepala */}
      <circle cx="18" cy="12" r="8" fill="#C9ADA6" />
      {/* Rambut */}
      <path d="M10 12 Q8 18 10 22" stroke="#8B6F5C" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M26 12 Q28 18 26 22" stroke="#8B6F5C" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Gaun atas */}
      <path d="M12 20 L8 40 L28 40 L24 20 Q18 24 12 20Z" fill="white" />
      {/* Gaun bawah - bentuk A-line */}
      <path d="M8 38 L4 58 L32 58 L28 38Z" fill="white" />
      {/* Detail gaun - pita */}
      <path d="M14 32 Q18 35 22 32" stroke="#C9A9A6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Tangan kiri */}
      <circle cx="6" cy="30" r="3" fill="#C9ADA6" />
      {/* Tangan kanan */}
      <circle cx="30" cy="30" r="3" fill="#C9ADA6" />
    </svg>
  )
}

/**
 * Hati melayang kecil
 */
function FloatingHeart({ delay = 0, x = 0 }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, bottom: 60 }}
      initial={{ opacity: 0, y: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], y: -40, scale: [0, 1, 0.5] }}
      transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: 3 }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#C9A9A6">
        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
      </svg>
    </motion.div>
  )
}

/**
 * Karakter pasangan di setiap milestone dengan pose berbeda
 */
function CoupleAtMilestone({ index, total, inView }) {
  // Semakin maju timeline, semakin dekat karakter
  const gap = Math.max(4, 24 - (index * 4))
  const isLast = index === total - 1
  const isSecondLast = index === total - 2

  return (
    <motion.div
      className="relative flex items-end justify-center"
      style={{ gap: `${gap}px`, height: 70 }}
      initial={{ opacity: 0, y: 20, scale: 0.5 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 200 }}
    >
      {/* Hati melayang antara karakter jika sudah dekat */}
      {index >= 2 && (
        <>
          <FloatingHeart delay={0} x={isLast ? 10 : 12} />
          <FloatingHeart delay={1} x={isLast ? 16 : 18} />
        </>
      )}

      {/* Groom */}
      <motion.div
        animate={inView ? {
          x: isLast ? 6 : isSecondLast ? 3 : 0,
          rotate: isLast ? -5 : 0,
        } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <GroomCharacter />
      </motion.div>

      {/* Cincin jika lamaran/nikah */}
      {isSecondLast && (
        <motion.div
          className="absolute -top-2 left-1/2 -translate-x-1/2 text-lg"
          initial={{ scale: 0, rotate: -30 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.8, type: 'spring', stiffness: 300 }}
        >
          💍
        </motion.div>
      )}

      {/* Hati besar jika terakhir (nikah) */}
      {isLast && (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl"
          initial={{ scale: 0 }}
          animate={inView ? { scale: [0, 1.3, 1] } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          💕
        </motion.div>
      )}

      {/* Bride */}
      <motion.div
        animate={inView ? {
          x: isLast ? -6 : isSecondLast ? -3 : 0,
          rotate: isLast ? 5 : 0,
        } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <BrideCharacter />
      </motion.div>
    </motion.div>
  )
}

/**
 * Titik pada garis timeline
 */
function TimelineDot({ icon, index, inView }) {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center"
      initial={{ scale: 0, rotate: -180 }}
      animate={inView ? { scale: 1, rotate: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 250 }}
    >
      {/* Outer ring animasi */}
      <motion.div
        className="absolute w-14 h-14 rounded-full"
        style={{ border: '2px solid var(--color-gold)', opacity: 0.4 }}
        animate={inView ? { scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] } : {}}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      {/* Dot utama */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg z-10"
        style={{
          background: 'linear-gradient(135deg, var(--color-cream), white)',
          border: '2px solid var(--color-gold)',
          boxShadow: '0 4px 20px rgba(201,169,110,0.3)',
        }}
      >
        {icon}
      </div>
    </motion.div>
  )
}

/**
 * Satu item milestone
 */
function TimelineItem({ item, index, total }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center mb-2">

      {/* Kartu Kiri */}
      <div className={isLeft ? 'flex justify-end' : 'flex justify-start'}>
        {isLeft ? (
          <StoryCard item={item} inView={inView} direction={-1} />
        ) : (
          <div /> /* placeholder kosong */
        )}
      </div>

      {/* Tengah: Dot + Karakter Pasangan */}
      <div className="flex flex-col items-center gap-2 min-w-[90px]">
        <CoupleAtMilestone index={index} total={total} inView={inView} />
        <TimelineDot icon={item.icon} index={index} inView={inView} />
        {/* Tanggal */}
        <motion.span
          className="text-[10px] font-semibold tracking-wider uppercase text-center"
          style={{ color: 'var(--color-warm-brown)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {item.date}
        </motion.span>
      </div>

      {/* Kartu Kanan */}
      <div className={!isLeft ? 'flex justify-start' : 'flex justify-end'}>
        {!isLeft ? (
          <StoryCard item={item} inView={inView} direction={1} />
        ) : (
          <div /> /* placeholder kosong */
        )}
      </div>
    </div>
  )
}

function StoryCard({ item, inView, direction }) {
  return (
    <motion.div
      className="max-w-[200px] md:max-w-[260px] glass rounded-2xl p-4 shadow-md"
      style={{ border: '1px solid rgba(201,169,110,0.15)' }}
      initial={{ opacity: 0, x: direction * 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(201,169,110,0.2)' }}
    >
      <h3
        className="text-base font-semibold mb-1.5"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-warm-brown)' }}
      >
        {item.title}
      </h3>
      <p className="text-xs leading-relaxed" style={{ color: 'var(--color-sage-dark)' }}>
        {item.description}
      </p>
    </motion.div>
  )
}

/**
 * Main LoveStory Component
 */
export default function LoveStory() {
  const { loveStory } = WEDDING_CONFIG
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Garis timeline tumbuh saat scroll
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--color-soft-white) 0%, var(--color-cream) 100%)' }}
    >
      {/* Background dekoratif */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply"
            style={{
              width: 200 + i * 60,
              height: 200 + i * 60,
              left: i % 2 === 0 ? '-5%' : '75%',
              top: `${10 + i * 15}%`,
              background: i % 3 === 0
                ? 'rgba(201,169,110,0.04)'
                : i % 3 === 1
                ? 'rgba(168,181,162,0.05)'
                : 'rgba(201,169,166,0.04)',
            }}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Karakter parade di atas judul */}
          <motion.div
            className="flex justify-center items-end gap-3 mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <GroomCharacter style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }} />
            </motion.div>
            <motion.div
              className="text-4xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💕
            </motion.div>
            <motion.div
              animate={{ rotate: [5, -5, 5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <BrideCharacter style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }} />
            </motion.div>
          </motion.div>

          <p
            className="text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: 'var(--color-sage-dark)' }}
          >
            Our Journey Together
          </p>
          <h2
            className="text-3xl md:text-4xl"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-warm-brown)' }}
          >
            Cerita Cinta Kami
          </h2>
          <p
            className="text-sm mt-3 max-w-sm mx-auto"
            style={{ color: 'var(--color-sage)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}
          >
            "Setiap langkah menuju kamu adalah cerita yang paling indah"
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Garis tengah yang tumbuh saat scroll */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'rgba(201,169,110,0.15)' }}
          />
          <motion.div
            className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 origin-top rounded-full"
            style={{
              height: lineHeight,
              background: 'linear-gradient(to bottom, var(--color-gold), var(--color-dusty-rose), var(--color-sage))',
            }}
          />

          {/* Items */}
          <div className="flex flex-col gap-8 md:gap-12 pt-4 pb-8">
            {loveStory.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                total={loveStory.length}
              />
            ))}
          </div>
        </div>

        {/* Ending — karakter berpegangan tangan */}
        <motion.div
          className="flex flex-col items-center mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative flex items-end justify-center gap-0"
          >
            {/* Groom */}
            <motion.div
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <GroomCharacter style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.15))' }} />
            </motion.div>

            {/* Hati di tengah */}
            <motion.div
              className="flex flex-col items-center mx-1 mb-3"
              animate={{ y: [-4, 0, -4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-2xl">💕</span>
            </motion.div>

            {/* Bride */}
            <motion.div
              animate={{ rotate: [3, -3, 3] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <BrideCharacter style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.15))' }} />
            </motion.div>

            {/* Confetti / bintang */}
            {['✨', '🌸', '⭐', '🌟', '💫'].map((star, i) => (
              <motion.span
                key={i}
                className="absolute text-sm pointer-events-none"
                style={{
                  left: `${10 + i * 18}%`,
                  top: -30 - (i % 3) * 15,
                }}
                animate={{ y: [-5, 5, -5], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
              >
                {star}
              </motion.span>
            ))}
          </motion.div>
          <motion.p
            className="mt-4 text-sm italic"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-sage-dark)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Dan kini, kami siap melangkah bersama selamanya 🌸
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
