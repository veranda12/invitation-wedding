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

  // Autoplay saat pertama kali setelah user interaksi (cover opened)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {})
      }
      document.removeEventListener('click', handleFirstInteraction)
    }

    // Delay listener agar tidak langsung dipancu oleh klik "buka undangan"
    const timer = setTimeout(() => {
      document.addEventListener('click', handleFirstInteraction)
    }, 1000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('click', handleFirstInteraction)
    }
  }, [])

  return (
    <button
      onClick={toggleMusic}
      className={`music-btn ${isPlaying ? 'music-playing' : 'music-paused'}`}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      title={isPlaying ? 'Pause music' : 'Play music'}
    >
      <div className="music-bars">
        <div className="music-bar" style={{ height: '8px' }} />
        <div className="music-bar" style={{ height: '14px' }} />
        <div className="music-bar" style={{ height: '6px' }} />
        <div className="music-bar" style={{ height: '12px' }} />
      </div>
    </button>
  )
}
