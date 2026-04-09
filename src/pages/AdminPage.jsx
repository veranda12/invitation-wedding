import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'

/**
 * Halaman Login Admin
 */
export function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError

      // Redirect ke admin dashboard
      window.location.href = '/admin'
    } catch (err) {
      setError(err.message || 'Login gagal. Periksa email dan password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, var(--color-cream) 0%, var(--color-cream-dark) 100%)' }}>

      <motion.div
        className="w-full max-w-sm glass rounded-3xl p-8 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <span className="text-4xl mb-3 block">🔐</span>
          <h1 className="text-2xl mb-1"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-warm-brown)' }}>
            Admin Panel
          </h1>
          <p className="text-xs" style={{ color: 'var(--color-sage)' }}>
            Login untuk mengelola undangan
          </p>
        </div>

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

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider mb-2 font-medium"
              style={{ color: 'var(--color-warm-brown)' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(201,169,110,0.2)',
                color: 'var(--color-charcoal)',
              }}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider mb-2 font-medium"
              style={{ color: 'var(--color-warm-brown)' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={{
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(201,169,110,0.2)',
                color: 'var(--color-charcoal)',
              }}
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full text-white text-sm tracking-wider uppercase font-medium cursor-pointer disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, var(--color-warm-brown), var(--color-gold-dark))' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </motion.button>
        </form>

        <p className="text-center text-[10px] mt-6" style={{ color: 'var(--color-sage)' }}>
          Buat akun admin di Supabase Dashboard → Authentication
        </p>
      </motion.div>
    </div>
  )
}

/**
 * Halaman Admin Dashboard — melihat data RSVP
 */
export function AdminDashboardPage() {
  const [rsvpData, setRsvpData] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ hadir: 0, tidak_hadir: 0, ragu: 0, totalGuests: 0 })

  useEffect(() => {
    fetchRsvpData()
  }, [])

  async function fetchRsvpData() {
    try {
      const { data, error } = await supabase
        .from('rsvp')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setRsvpData(data || [])

      // Hitung statistik
      const hadir = data.filter((r) => r.attendance === 'hadir')
      const tidakHadir = data.filter((r) => r.attendance === 'tidak_hadir')
      const ragu = data.filter((r) => r.attendance === 'ragu')
      const totalGuests = hadir.reduce((sum, r) => sum + (r.guests || 1), 0)

      setStats({
        hadir: hadir.length,
        tidak_hadir: tidakHadir.length,
        ragu: ragu.length,
        totalGuests,
      })
    } catch (err) {
      console.error('Error fetching RSVP:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus data ini?')) return
    try {
      await supabase.from('rsvp').delete().eq('id', id)
      setRsvpData((prev) => prev.filter((r) => r.id !== id))
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8"
      style={{ background: 'var(--color-cream)' }}>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-warm-brown)' }}>
              Dashboard Admin
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-sage)' }}>
              Kelola data RSVP tamu undangan
            </p>
          </div>
          <motion.button
            onClick={handleLogout}
            className="px-5 py-2 rounded-full text-sm cursor-pointer"
            style={{
              border: '1px solid var(--color-dusty-rose)',
              color: 'var(--color-dusty-rose-dark)',
              background: 'transparent',
            }}
            whileHover={{ scale: 1.05, background: 'rgba(201,169,166,0.1)' }}
          >
            Logout
          </motion.button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total RSVP', value: rsvpData.length, icon: '📋', color: 'var(--color-warm-brown)' },
            { label: 'Hadir', value: stats.hadir, icon: '✅', color: 'var(--color-sage)' },
            { label: 'Tidak Hadir', value: stats.tidak_hadir, icon: '❌', color: 'var(--color-dusty-rose)' },
            { label: 'Total Tamu', value: stats.totalGuests, icon: '👥', color: 'var(--color-gold)' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass rounded-2xl p-5 text-center shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-2xl mb-2 block">{stat.icon}</span>
              <p className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-serif)', color: stat.color }}>
                {stat.value}
              </p>
              <p className="text-xs" style={{ color: 'var(--color-sage)' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* RSVP Table */}
        <motion.div
          className="glass rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-5 flex items-center justify-between"
            style={{ borderBottom: '1px solid rgba(201,169,110,0.15)' }}>
            <h2 className="text-lg font-semibold"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-warm-brown)' }}>
              Daftar Tamu
            </h2>
            <motion.button
              onClick={fetchRsvpData}
              className="px-4 py-1.5 rounded-full text-xs cursor-pointer"
              style={{
                background: 'rgba(201,169,110,0.1)',
                color: 'var(--color-warm-brown)',
                border: '1px solid rgba(201,169,110,0.2)',
              }}
              whileHover={{ scale: 1.05 }}
            >
              🔄 Refresh
            </motion.button>
          </div>

          {loading ? (
            <div className="p-10 text-center">
              <div className="animate-spin w-8 h-8 mx-auto mb-3 rounded-full"
                style={{ border: '2px solid var(--color-cream-dark)', borderTopColor: 'var(--color-gold)' }} />
              <p className="text-sm" style={{ color: 'var(--color-sage)' }}>Memuat data...</p>
            </div>
          ) : rsvpData.length === 0 ? (
            <div className="p-10 text-center">
              <span className="text-4xl mb-3 block">📭</span>
              <p className="text-sm" style={{ color: 'var(--color-sage)' }}>Belum ada data RSVP</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'rgba(201,169,110,0.06)' }}>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-medium"
                      style={{ color: 'var(--color-sage-dark)' }}>#</th>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-medium"
                      style={{ color: 'var(--color-sage-dark)' }}>Nama</th>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-medium"
                      style={{ color: 'var(--color-sage-dark)' }}>Status</th>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-medium"
                      style={{ color: 'var(--color-sage-dark)' }}>Tamu</th>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-medium"
                      style={{ color: 'var(--color-sage-dark)' }}>Ucapan</th>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-medium"
                      style={{ color: 'var(--color-sage-dark)' }}>Waktu</th>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-wider font-medium"
                      style={{ color: 'var(--color-sage-dark)' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvpData.map((rsvp, index) => (
                    <tr key={rsvp.id}
                      className="transition-colors hover:bg-white/30"
                      style={{ borderBottom: '1px solid rgba(201,169,110,0.08)' }}>
                      <td className="px-5 py-3 text-xs" style={{ color: 'var(--color-sage)' }}>{index + 1}</td>
                      <td className="px-5 py-3 font-medium" style={{ color: 'var(--color-charcoal)' }}>
                        {rsvp.name}
                      </td>
                      <td className="px-5 py-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-medium"
                          style={{
                            background: rsvp.attendance === 'hadir'
                              ? 'rgba(168,181,162,0.2)' : rsvp.attendance === 'tidak_hadir'
                              ? 'rgba(201,169,166,0.2)' : 'rgba(201,169,110,0.2)',
                            color: rsvp.attendance === 'hadir'
                              ? 'var(--color-sage-dark)' : rsvp.attendance === 'tidak_hadir'
                              ? 'var(--color-dusty-rose-dark)' : 'var(--color-gold-dark)',
                          }}>
                          {rsvp.attendance === 'hadir' ? '✅ Hadir' : rsvp.attendance === 'tidak_hadir' ? '❌ Tidak' : '🤔 Ragu'}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-center" style={{ color: 'var(--color-charcoal)' }}>
                        {rsvp.guests || 1}
                      </td>
                      <td className="px-5 py-3 max-w-[200px] truncate text-xs" style={{ color: 'var(--color-sage-dark)' }}>
                        {rsvp.message || '-'}
                      </td>
                      <td className="px-5 py-3 text-xs whitespace-nowrap" style={{ color: 'var(--color-sage)' }}>
                        {rsvp.created_at ? new Date(rsvp.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        }) : '-'}
                      </td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => handleDelete(rsvp.id)}
                          className="text-xs px-3 py-1 rounded-full cursor-pointer transition-colors"
                          style={{
                            color: 'var(--color-dusty-rose-dark)',
                            background: 'rgba(201,169,166,0.1)',
                          }}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
