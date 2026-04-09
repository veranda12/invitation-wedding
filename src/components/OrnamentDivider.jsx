import { motion } from 'framer-motion'

/**
 * Divider ornamental dengan motif elegan
 */
export default function OrnamentDivider({ className = '' }) {
  return (
    <motion.div
      className={`ornament-divider ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-gold">
        <path
          d="M20 4L23 14H34L25.5 20L28 30L20 24L12 30L14.5 20L6 14H17L20 4Z"
          fill="currentColor"
          opacity="0.6"
        />
        <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.8" />
      </svg>
    </motion.div>
  )
}
