'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Send, Mic, X } from 'lucide-react'
import { useInputHistory } from '@/hooks/useInputHistory'
import { useVoiceInput } from '@/hooks/useVoiceInput'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled: boolean
  selectedTemplate: string | null
  onClearTemplate: () => void
}

export default function ChatInput({ 
  onSendMessage, 
  disabled, 
  selectedTemplate, 
  onClearTemplate 
}: ChatInputProps) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  const { addToHistory, navigateHistory, resetNavigation } = useInputHistory()
  const { isListening, transcript, startListening, stopListening, isSupported } = useVoiceInput()

  useEffect(() => {
    if (selectedTemplate) {
      setMessage(selectedTemplate)
      textareaRef.current?.focus()
    }
  }, [selectedTemplate])

  useEffect(() => {
    if (transcript) {
      setMessage(prev => prev + (prev ? ' ' : '') + transcript)
    }
  }, [transcript])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      addToHistory(message.trim())
      setMessage('')
      resetNavigation()
      if (selectedTemplate) {
        onClearTemplate()
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    } else if (e.key === 'ArrowUp' && message === '') {
      e.preventDefault()
      const historyMessage = navigateHistory('up')
      if (historyMessage) setMessage(historyMessage)
    } else if (e.key === 'ArrowDown' && message === '') {
      e.preventDefault()
      const historyMessage = navigateHistory('down')
      if (historyMessage !== null) setMessage(historyMessage)
    }
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  return (
    <div className="border-t bg-card p-4">
      {selectedTemplate && (
        <div className="mb-2 flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Using template:</span>
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
            {selectedTemplate.slice(0, 50)}...
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearTemplate}
            className="h-6 w-6"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground min-h-[48px] max-h-[120px]"
            disabled={disabled}
            rows={1}
          />
          
          {isSupported && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={`absolute right-2 top-2 h-8 w-8 ${
                isListening ? 'text-red-500 animate-pulse' : 'text-muted-foreground'
              }`}
              onClick={isListening ? stopListening : startListening}
              disabled={disabled}
            >
              <Mic className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          size="icon"
          className="h-12 w-12"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
      
      <div className="mt-2 text-xs text-muted-foreground">
        Press Enter to send, Shift+Enter for new line, ↑↓ for message history
      </div>
    </div>
  )
}