import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

/**
 * Hook untuk subscribe realtime changes di Supabase table
 * @param {string} table - Nama tabel
 * @param {object} options - { select, order, ascending, limit }
 * @returns {{ data, loading, error }}
 */
export function useRealtime(table, options = {}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const {
    select = '*',
    orderBy = 'created_at',
    ascending = false,
    limit = 100,
  } = options

  // Fetch initial data
  useEffect(() => {
    fetchData()
  }, [table])

  // Subscribe to realtime changes
  useEffect(() => {
    const channel = supabase
      .channel(`realtime-${table}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setData((prev) => [payload.new, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            setData((prev) =>
              prev.map((item) =>
                item.id === payload.new.id ? payload.new : item
              )
            )
          } else if (payload.eventType === 'DELETE') {
            setData((prev) =>
              prev.filter((item) => item.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [table])

  async function fetchData() {
    try {
      setLoading(true)
      const { data: result, error: fetchError } = await supabase
        .from(table)
        .select(select)
        .order(orderBy, { ascending })
        .limit(limit)

      if (fetchError) throw fetchError
      setData(result || [])
    } catch (err) {
      setError(err.message)
      console.error(`Error fetching ${table}:`, err)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch: fetchData }
}
