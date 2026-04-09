import { useEffect, useMemo } from 'react'

/**
 * Animasi kelopak bunga jatuh di latar belakang
 */
export default function PetalAnimation() {
  const petals = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${6 + Math.random() * 8}s`,
      size: 8 + Math.random() * 14,
      opacity: 0.2 + Math.random() * 0.4,
      color: ['#C9A9A6', '#A8B5A2', '#C9A96E', '#F5E6D3'][Math.floor(Math.random() * 4)],
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal"
          style={{
            left: petal.left,
            '--delay': petal.delay,
            '--duration': petal.duration,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill={petal.color}
          >
            <path d="M12 2C12 2 4 8 4 14C4 18 7.5 22 12 22C16.5 22 20 18 20 14C20 8 12 2 12 2Z" />
          </svg>
        </div>
      ))}
    </div>
  )
}
