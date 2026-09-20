// Speech Recognition and Text-to-Speech (TTS) Service

export interface SpeechRecognitionHandlers {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
  onResult?: (transcript: string) => void;
}

declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

class SpeechService {
  private recognition: any = null;
  private isListening: boolean = false;
  private currentVoice: SpeechSynthesisVoice | null = null;
  private voicesLoaded: boolean = false;

  constructor() {
    this.initTTS();
  }

  private initTTS() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          this.voicesLoaded = true;
          // Prefer Russian female voice or Russian voice
          const ruVoices = voices.filter(v => v.lang.startsWith('ru'));
          const femaleRu = ruVoices.find(v => 
            v.name.toLowerCase().includes('female') || 
            v.name.toLowerCase().includes('жен') ||
            v.name.toLowerCase().includes('anna') ||
            v.name.toLowerCase().includes('tatyana') ||
            v.name.toLowerCase().includes('milena') ||
            v.name.toLowerCase().includes('victoria')
          );
          this.currentVoice = femaleRu || ruVoices[0] || voices[0];
        }
      };

      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }

  isSpeechRecognitionSupported(): boolean {
    return typeof window !== 'undefined' && (!!window.SpeechRecognition || !!window.webkitSpeechRecognition);
  }

  startListening(handlers: SpeechRecognitionHandlers): boolean {
    if (!this.isSpeechRecognitionSupported()) {
      handlers.onError?.('Распознавание речи не поддерживается в данном браузере.');
      return false;
    }

    try {
      this.stopListening();

      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognitionClass();
      this.recognition.lang = 'ru-RU';
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
        handlers.onStart?.();
      };

      this.recognition.onend = () => {
        this.isListening = false;
        handlers.onEnd?.();
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        handlers.onError?.(event.error || 'Ошибка микрофона');
        handlers.onEnd?.();
      };

      this.recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          handlers.onResult?.(transcript);
        }
      };

      this.recognition.start();
      return true;
    } catch (e: any) {
      handlers.onError?.(e.message || 'Не удалось запустить микрофон');
      return false;
    }
  }

  stopListening() {
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {}
      this.recognition = null;
    }
    this.isListening = false;
  }

  speak(text: string, options: { femaleVoice?: boolean; quietMode?: boolean } = {}) {
    if (options.quietMode) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      // Cancel previous utterance
      window.speechSynthesis.cancel();

      // Clean text for speech
      const cleanText = text
        .replace(/•/g, '')
        .replace(/[#*_~`]/g, '')
        .replace(/https?:\/\/\S+/g, 'ссылка')
        .trim();

      if (!cleanText) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ru-RU';

      if (!this.voicesLoaded) {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          const ruVoice = voices.find(v => v.lang.startsWith('ru'));
          if (ruVoice) this.currentVoice = ruVoice;
        }
      }

      if (this.currentVoice) {
        utterance.voice = this.currentVoice;
      }

      // Voice pitch and rate matching LIRA
      if (options.femaleVoice !== false) {
        utterance.pitch = 1.15;
        utterance.rate = 1.05;
      } else {
        utterance.pitch = 0.95;
        utterance.rate = 1.0;
      }

      window.speechSynthesis.speak(utterance);
    } catch {}
  }

  stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const speechService = new SpeechService();
