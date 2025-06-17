'use client'

import { useAuth } from '@/contexts/AuthContext'
import AuthPage from '@/components/auth/AuthPage'
import ChatApp from '@/components/chat/ChatApp'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return user ? <ChatApp /> : <AuthPage />
}