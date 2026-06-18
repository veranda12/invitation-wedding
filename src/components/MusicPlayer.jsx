import { useState, useRef, useEffect } from 'react'

/**
 * Tombol musik melayang (floating) dengan kontrol play/pause
 * Letakkan file musik di public/music/backsound.mp3
 */
export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    audioRef.current = new Audio('/music/backsound.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.4

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {
        console.log('Autoplay blocked — user needs to interact first')
      })
    }
    setIsPlaying(!isPlaying)
  }

  // Autoplay saat komponen di-mount (karena user sudah klik "Buka Undangan")
  useEffect(() => {
    if (audioRef.current && !isPlaying) {
      // Browser akan mengizinkan ini karena user baru saja mengklik tombol "Buka Undangan"
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => {
        console.log('Autoplay blocked:', err)
      })
    }
  }, [])

  return (
    <button
      onClick={toggleMusic}
      className={`music-btn ${isPlaying ? 'music-playing' : 'music-paused'}`}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      title={isPlaying ? 'Pause music' : 'Play music'}
    >
      <svg 
        width="22" height="22" viewBox="0 0 24 24" 
        fill="none" stroke="var(--color-gold-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
      </svg>
    </button>
  )
}
