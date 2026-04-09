import { motion } from 'framer-motion'
import { useRealtime } from '../hooks/useRealtime'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'

/**
 * Daftar ucapan tamu secara realtime dari Supabase
 */
export default function Wishes() {
  const { data: wishes, loading } = useRealtime('rsvp', {
    select: 'id,name,message,attendance,created_at',
    orderBy: 'created_at',
    ascending: false,
    limit: 50,
  })

  // Hanya tampilkan yang punya pesan
  const filteredWishes = wishes.filter((w) => w.message && w.message.trim() !== '')

  const getAttendanceBadge = (attendance) => {
    switch (attendance) {
      case 'hadir':
        return { text: 'Hadir', color: 'var(--color-sage)', bg: 'rgba(168,181,162,0.15)' }
      case 'tidak_hadir':
        return { text: 'Tidak Hadir', color: 'var(--color-dusty-rose)', bg: 'rgba(201,169,166,0.15)' }
      default:
        return { text: 'Ragu', color: 'var(--color-gold)', bg: 'rgba(201,169,110,0.15)' }
    }
  }

  return (
    <section className="section-padding relative overflow-hidden"
      style={{ background: 'var(--color-soft-white)' }}>

      <div className="max-w-2xl mx-auto relative z-10">
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
            Doa &amp; Ucapan
          </p>
          <h2 className="text-3xl md:text-4xl mb-3"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-warm-brown)' }}>
            Ucapan Tamu
          </h2>
          <p className="text-sm" style={{ color: 'var(--color-sage-dark)' }}>
            Terima kasih atas doa dan ucapan yang telah diberikan 💕
          </p>
        </motion.div>

        {/* Wishes List */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2"
          style={{ scrollbarWidth: 'thin' }}>
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin w-8 h-8 mx-auto mb-3 rounded-full"
                style={{ border: '2px solid var(--color-cream-dark)', borderTopColor: 'var(--color-gold)' }} />
              <p className="text-sm" style={{ color: 'var(--color-sage)' }}>Memuat ucapan...</p>
            </div>
          ) : filteredWishes.length === 0 ? (
            <motion.div
              className="text-center py-10 glass rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="text-4xl mb-3 block">💌</span>
              <p className="text-sm" style={{ color: 'var(--color-sage-dark)' }}>
                Belum ada ucapan. Jadilah yang pertama mengirim doa!
              </p>
            </motion.div>
          ) : (
            filteredWishes.map((wish, index) => {
              const badge = getAttendanceBadge(wish.attendance)
              return (
                <motion.div
                  key={wish.id}
                  className="glass rounded-2xl p-5 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ y: -2, shadow: 'lg' }}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, var(--color-sage), var(--color-gold))',
                        color: 'white',
                      }}>
                      {wish.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="text-sm font-semibold" style={{ color: 'var(--color-charcoal)' }}>
                          {wish.name}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                          style={{ background: badge.bg, color: badge.color }}>
                          {badge.text}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--color-sage-dark)' }}>
                        {wish.message}
                      </p>
                      <p className="text-[10px]" style={{ color: 'var(--color-sage)' }}>
                        {wish.created_at
                          ? formatDistanceToNow(new Date(wish.created_at), { addSuffix: true, locale: id })
                          : ''}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </div>

        {/* Counter */}
        {filteredWishes.length > 0 && (
          <motion.p
            className="text-center text-xs mt-6"
            style={{ color: 'var(--color-sage)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {filteredWishes.length} ucapan telah diterima 💝
          </motion.p>
        )}
      </div>
    </section>
  )
}
