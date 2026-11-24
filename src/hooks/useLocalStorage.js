import { useEffect, useState } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key)
      return saved === null ? initialValue : JSON.parse(saved)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
