import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WEDDING_CONFIG } from '../lib/constants'

/**
 * Galeri foto pasangan dengan lightbox
 */
export default function Gallery() {
  const { gallery } = WEDDING_CONFIG
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <section className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--color-cream) 0%, var(--color-soft-white) 100%)' }}>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: 'var(--color-sage-dark)' }}>
            Our Moments
          </p>
          <h2 className="text-3xl md:text-4xl"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-warm-brown)' }}>
            Galeri Foto
          </h2>
        </motion.div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {gallery.map((src, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-2xl cursor-pointer group"
              style={{ aspectRatio: index === 0 || index === 5 ? '1' : '4/3' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedImage(src)}
            >
              <img
                src={src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <motion.svg
                  width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                  <path d="M11 8v6M8 11h6" />
                </motion.svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="Gallery Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
