'use client'

import { useState, useRef } from 'react'

export function useInputHistory() {
  const [history, setHistory] = useState<string[]>([])
  const historyIndex = useRef(-1)

  const addToHistory = (message: string) => {
    if (message.trim() && !history.includes(message)) {
      setHistory(prev => [message, ...prev].slice(0, 50)) // Keep last 50 messages
    }
  }

  const navigateHistory = (direction: 'up' | 'down'): string | null => {
    if (history.length === 0) return null

    if (direction === 'up') {
      historyIndex.current = Math.min(historyIndex.current + 1, history.length - 1)
    } else {
      historyIndex.current = Math.max(historyIndex.current - 1, -1)
    }

    return historyIndex.current === -1 ? '' : history[historyIndex.current]
  }

  const resetNavigation = () => {
    historyIndex.current = -1
  }

  return {
    addToHistory,
    navigateHistory,
    resetNavigation
  }
}