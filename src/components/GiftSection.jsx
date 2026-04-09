import { useState } from 'react'
import { motion } from 'framer-motion'
import { WEDDING_CONFIG } from '../lib/constants'

/**
 * Section hadiah / amplop digital
 */
export default function GiftSection() {
  const { bankAccounts } = WEDDING_CONFIG
  const [copiedIndex, setCopiedIndex] = useState(null)

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch {
      // Fallback
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    }
  }

  return (
    <section className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--color-cream-dark) 0%, var(--color-cream) 100%)' }}>

      <div className="max-w-lg mx-auto relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: 'var(--color-sage-dark)' }}>
            Wedding Gift
          </p>
          <h2 className="text-3xl md:text-4xl mb-3"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-warm-brown)' }}>
            Amplop Digital
          </h2>
          <p className="text-sm max-w-sm mx-auto" style={{ color: 'var(--color-sage-dark)' }}>
            Tanpa mengurangi rasa hormat, bagi yang ingin memberikan tanda kasih dapat melalui:
          </p>
        </motion.div>

        <div className="space-y-4">
          {bankAccounts.map((account, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: 'var(--color-sage)' }}>
                    {account.bank}
                  </p>
                  <p className="text-lg font-semibold tracking-wider mb-0.5"
                    style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-charcoal)' }}>
                    {account.number}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-sage-dark)' }}>
                    a.n. {account.name}
                  </p>
                </div>
                <motion.button
                  onClick={() => copyToClipboard(account.number, index)}
                  className="px-4 py-2 rounded-xl text-xs font-medium cursor-pointer"
                  style={{
                    background: copiedIndex === index
                      ? 'var(--color-sage)'
                      : 'rgba(201,169,110,0.1)',
                    color: copiedIndex === index
                      ? 'white'
                      : 'var(--color-warm-brown)',
                    border: `1px solid ${copiedIndex === index ? 'var(--color-sage)' : 'rgba(201,169,110,0.2)'}`,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copiedIndex === index ? '✓ Tersalin' : 'Salin'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
