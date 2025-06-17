export const chatAPI = {
    async sendMessage(message: string): Promise<string> {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
      
      // Mock responses based on message content
      const responses = [
        "That's an interesting question! Let me think about that...",
        "I understand what you're asking. Here's my perspective:",
        "Great point! From what I can tell, the key factors to consider are:",
        "That's a complex topic. Let me break it down for you:",
        "I appreciate you sharing that. Based on the information provided:",
        "Thanks for the question! Here's what I think:",
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      // Add some contextual responses
      if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        return "Hello! I'm your AI assistant. How can I help you today?"
      }
      
      if (message.toLowerCase().includes('help')) {
        return "I'm here to help! You can ask me questions, request explanations, brainstorm ideas, or just have a conversation. What would you like to explore?"
      }
      
      if (message.toLowerCase().includes('weather')) {
        return "I don't have access to real-time weather data, but I'd recommend checking a reliable weather service for the most current conditions in your area."
      }
      
      return `${randomResponse} "${message}" is something I find quite fascinating. The topic involves multiple dimensions that are worth exploring further. Would you like me to elaborate on any particular aspect?`
    }
  }