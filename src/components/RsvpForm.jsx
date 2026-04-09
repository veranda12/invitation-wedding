import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

/**
 * Form RSVP untuk konfirmasi kehadiran tamu
 * Data tersimpan ke tabel "rsvp" di Supabase
 */
export default function RsvpForm() {
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'hadir',
    guests: 1,
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: insertError } = await supabase
        .from('rsvp')
        .insert([
          {
            name: formData.name.trim(),
            attendance: formData.attendance,
            guests: parseInt(formData.guests),
            message: formData.message.trim(),
          },
        ])

      if (insertError) throw insertError
      setSubmitted(true)
      setFormData({ name: '', attendance: 'hadir', guests: 1, message: '' })
    } catch (err) {
      setError('Gagal mengirim RSVP. Silakan coba lagi.')
      console.error('RSVP Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="rsvp"
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--color-cream-dark) 0%, var(--color-cream) 100%)' }}
    >
      <div className="max-w-lg mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: 'var(--color-sage-dark)' }}>
            Konfirmasi Kehadiran
          </p>
          <h2 className="text-3xl md:text-4xl mb-3"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-warm-brown)' }}>
            RSVP
          </h2>
          <p className="text-sm" style={{ color: 'var(--color-sage-dark)' }}>
            Mohon konfirmasi kehadiran Anda sebagai tanda penghormatan
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              className="glass rounded-3xl p-10 text-center shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-5xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                💝
              </motion.div>
              <h3 className="text-xl mb-2"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-warm-brown)' }}>
                Terima Kasih!
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--color-sage-dark)' }}>
                Konfirmasi Anda telah kami terima. Kami sangat menantikan kehadiran Anda.
              </p>
              <motion.button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 rounded-full text-sm cursor-pointer"
                style={{
                  border: '1px solid var(--color-gold)',
                  color: 'var(--color-warm-brown)',
                  background: 'transparent',
                }}
                whileHover={{ scale: 1.05, background: 'rgba(201,169,110,0.1)' }}
                whileTap={{ scale: 0.98 }}
              >
                Kirim Lagi
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {error && (
                <motion.div
                  className="mb-4 p-3 rounded-xl text-sm text-center"
                  style={{ background: 'rgba(220,53,69,0.1)', color: '#dc3545' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.div>
              )}

              {/* Name */}
              <div className="mb-5">
                <label className="block text-xs uppercase tracking-wider mb-2 font-medium"
                  style={{ color: 'var(--color-warm-brown)' }}>
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.6)',
                    border: '1px solid rgba(201,169,110,0.2)',
                    color: 'var(--color-charcoal)',
                    fontFamily: 'var(--font-sans)',
                  }}
                />
              </div>

              {/* Attendance */}
              <div className="mb-5">
                <label className="block text-xs uppercase tracking-wider mb-2 font-medium"
                  style={{ color: 'var(--color-warm-brown)' }}>
                  Konfirmasi Kehadiran *
                </label>
                <div className="flex gap-3">
                  {[
                    { value: 'hadir', label: '✨ Hadir', color: 'var(--color-sage)' },
                    { value: 'tidak_hadir', label: '😔 Tidak Hadir', color: 'var(--color-dusty-rose)' },
                    { value: 'ragu', label: '🤔 Masih Ragu', color: 'var(--color-gold)' },
                  ].map((opt) => (
                    <motion.button
                      key={opt.value}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, attendance: opt.value }))}
                      className="flex-1 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all"
                      style={{
                        background: formData.attendance === opt.value
                          ? `${opt.color}`
                          : 'rgba(255,255,255,0.5)',
                        color: formData.attendance === opt.value ? 'white' : 'var(--color-charcoal)',
                        border: `1px solid ${formData.attendance === opt.value ? opt.color : 'rgba(201,169,110,0.2)'}`,
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {opt.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Number of Guests */}
              {formData.attendance === 'hadir' && (
                <motion.div
                  className="mb-5"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-xs uppercase tracking-wider mb-2 font-medium"
                    style={{ color: 'var(--color-warm-brown)' }}>
                    Jumlah Tamu
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none cursor-pointer"
                    style={{
                      background: 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(201,169,110,0.2)',
                      color: 'var(--color-charcoal)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n} orang</option>
                    ))}
                  </select>
                </motion.div>
              )}

              {/* Message */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-wider mb-2 font-medium"
                  style={{ color: 'var(--color-warm-brown)' }}>
                  Ucapan &amp; Doa
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tuliskan ucapan dan doa terbaik Anda..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.6)',
                    border: '1px solid rgba(201,169,110,0.2)',
                    color: 'var(--color-charcoal)',
                    fontFamily: 'var(--font-sans)',
                  }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full text-white text-sm tracking-wider uppercase font-medium cursor-pointer disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, var(--color-warm-brown), var(--color-gold-dark))',
                  fontFamily: 'var(--font-sans)',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(139,111,92,0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeDasharray="31.4" strokeDashoffset="10" />
                    </svg>
                    Mengirim...
                  </span>
                ) : (
                  'Kirim Konfirmasi'
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
