import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

/**
 * Protected Route — hanya bisa diakses setelah login via Supabase Auth
 */
export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cek sesi saat ini
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--color-cream)' }}>
        <div className="text-center">
          <div className="animate-spin w-8 h-8 mx-auto mb-3 rounded-full"
            style={{ border: '2px solid var(--color-cream-dark)', borderTopColor: 'var(--color-gold)' }} />
          <p className="text-sm" style={{ color: 'var(--color-sage)' }}>Memverifikasi akses...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
