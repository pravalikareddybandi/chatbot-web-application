'use client'

import { useState, useCallback } from 'react'
import { Conversation } from '@/types/chat'

export function useChatHistory() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)

  const createConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title: `Chat ${conversations.length + 1}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setConversations(prev => [newConversation, ...prev])
    setCurrentConversationId(newConversation.id)
  }, [conversations.length])

  const selectConversation = useCallback((id: string) => {
    setCurrentConversationId(id)
  }, [])

  const deleteConversation = useCallback((id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id))
    if (currentConversationId === id) {
      setCurrentConversationId(null)
    }
  }, [currentConversationId])

  // Create initial conversation if none exists
  if (conversations.length === 0 && currentConversationId === null) {
    const initialConversation: Conversation = {
      id: 'initial-chat',
      title: 'Welcome Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setConversations([initialConversation])
    setCurrentConversationId(initialConversation.id)
  }

  return {
    conversations,
    currentConversationId,
    createConversation,
    selectConversation,
    deleteConversation
  }
}
