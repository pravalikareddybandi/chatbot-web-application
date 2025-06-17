'use client'

import { useState } from 'react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessage'
import ChatInput from './ChatInput'
import Sidebar from './Sidebar'
import { useChatHistory } from '@/hooks/useChatHistory'
import { useMessages } from '@/hooks/useMessages'

export default function ChatApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const {
    conversations,
    currentConversationId,
    createConversation,
    selectConversation,
    deleteConversation,
  } = useChatHistory()
  const { messages, isTyping, sendMessage, exportMessages } = useMessages(
    currentConversationId
  )

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        conversations={conversations}
        currentConversationId={currentConversationId}
        onNewConversation={createConversation}
        onSelectConversation={selectConversation}
        onDeleteConversation={deleteConversation}
        onTemplateSelect={setSelectedTemplate}
        onExportChat={() => exportMessages(messages)}
      />

      <div className="flex-1 flex flex-col">
        <ChatHeader
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          conversationTitle={
            conversations.find((c) => c.id === currentConversationId)?.title ||
            'New Chat'
          }
        />

        <ChatMessages messages={messages} isTyping={isTyping} />

        <ChatInput
          onSendMessage={sendMessage}
          disabled={isTyping}
          selectedTemplate={selectedTemplate}
          onClearTemplate={() => setSelectedTemplate(null)}
        />
      </div>
    </div>
  )
}
