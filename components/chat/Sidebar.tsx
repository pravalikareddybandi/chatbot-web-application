'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Conversation } from '@/types/chat'
import { 
  Plus, 
  MessageSquare, 
  Trash2, 
  Download, 
  Lightbulb,
  X,
  FileText
} from 'lucide-react'

const PROMPT_TEMPLATES = [
  "Explain this concept in simple terms:",
  "Help me brainstorm ideas for:",
  "Analyze the pros and cons of:",
  "Create a step-by-step guide for:",
  "Summarize the key points about:",
  "What are the best practices for:",
]

interface SidebarProps {
  open: boolean
  onClose: () => void
  conversations: Conversation[]
  currentConversationId: string | null
  onNewConversation: () => void
  onSelectConversation: (id: string) => void
  onDeleteConversation: (id: string) => void
  onTemplateSelect: (template: string) => void
  onExportChat: () => void
}

export default function Sidebar({
  open,
  onClose,
  conversations,
  currentConversationId,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  onTemplateSelect,
  onExportChat
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'chats' | 'templates'>('chats')

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-card border-r transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Chat Assistant</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex mt-3 bg-muted rounded-lg p-1">
              <button
                onClick={() => setActiveTab('chats')}
                className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === 'chats'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <MessageSquare className="h-4 w-4 inline mr-2" />
                Chats
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === 'templates'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Lightbulb className="h-4 w-4 inline mr-2" />
                Templates
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'chats' ? (
              <div className="space-y-4">
                <Button
                  onClick={onNewConversation}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Conversation
                </Button>

                <div className="space-y-2">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`group flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                        conversation.id === currentConversationId
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => onSelectConversation(conversation.id)}
                    >
                      <MessageSquare className="h-4 w-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {conversation.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(conversation.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteConversation(conversation.id)
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={onExportChat}
                  variant="outline"
                  className="w-full justify-start"
                  disabled={!currentConversationId}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Chat
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Prompt Templates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {PROMPT_TEMPLATES.map((template, index) => (
                      <button
                        key={index}
                        onClick={() => onTemplateSelect(template)}
                        className="w-full text-left p-3 rounded-lg border hover:bg-accent transition-colors text-sm"
                      >
                        <FileText className="h-4 w-4 inline mr-2 text-muted-foreground" />
                        {template}
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}