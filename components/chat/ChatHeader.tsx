'use client'

import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useAuth } from '@/contexts/AuthContext'
import { Menu, LogOut, MessageCircle } from 'lucide-react'

interface ChatHeaderProps {
  onToggleSidebar: () => void
  conversationTitle: string
}

export default function ChatHeader({ onToggleSidebar, conversationTitle }: ChatHeaderProps) {
  const { user, logout } = useAuth()

  return (
    <header className="border-b bg-card px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-primary" />
          <div>
            <h1 className="font-semibold text-foreground">{conversationTitle}</h1>
            <p className="text-xs text-muted-foreground">AI Assistant</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground hidden sm:block">
          Welcome, {user?.name}
        </span>
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          onClick={logout}
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}