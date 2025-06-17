interface SpeechRecognition extends EventTarget {
    continuous: boolean
    interimResults: boolean
    lang: string
    start(): void
    stop(): void
    onresult: (event: SpeechRecognitionEvent) => void
    onerror: (event: SpeechRecognitionErrorEvent) => void
    onend: () => void
  }
  
  interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList
  }
  
  interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult
    readonly length: number
  }
  
  interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative
    readonly isFinal: boolean
    readonly length: number
  }
  
  interface SpeechRecognitionAlternative {
    readonly transcript: string
    readonly confidence: number
  }
  
  interface SpeechRecognitionErrorEvent {
    readonly error: string
    readonly message: string
  }
  
  declare global {
    interface Window {
      SpeechRecognition: typeof SpeechRecognition
      webkitSpeechRecognition: typeof SpeechRecognition
    }
  }