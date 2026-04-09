import { useState, useEffect } from 'react'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'

/**
 * Hook untuk menghitung mundur ke tanggal pernikahan
 * @param {string} targetDate - ISO date string target
 * @returns {{ days, hours, minutes, seconds, isExpired }}
 */
export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}

function calculateTimeLeft(targetDate) {
  const now = new Date()
  const target = new Date(targetDate)

  if (now >= target) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
  }

  const totalSeconds = differenceInSeconds(target, now)
  const days = differenceInDays(target, now)
  const hours = differenceInHours(target, now) % 24
  const minutes = differenceInMinutes(target, now) % 60
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, isExpired: false }
}
