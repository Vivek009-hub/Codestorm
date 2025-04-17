
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm MedicAI, your health assistant. I can help answer general health questions, provide information about medications, and more. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      let response: string;
      
      // Simple pattern matching for demonstration
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('headache')) {
        response = "Headaches can be caused by various factors including stress, dehydration, lack of sleep, or eye strain. For occasional headaches, rest and over-the-counter pain relievers like acetaminophen or ibuprofen may help. If you experience severe or persistent headaches, please consult with a healthcare professional.";
      } else if (lowerInput.includes('cold') || lowerInput.includes('flu')) {
        response = "Common cold symptoms include runny nose, sore throat, and coughing. Rest, staying hydrated, and over-the-counter medications can help manage symptoms. Flu symptoms are similar but more intense, often with fever and body aches. If you have difficulty breathing or symptoms worsen, please seek medical attention.";
      } else if (lowerInput.includes('vitamin') || lowerInput.includes('supplement')) {
        response = "Vitamins and supplements can be beneficial, but it's important to consult with a healthcare provider before starting any new regimen. A balanced diet is generally the best way to get essential nutrients.";
      } else {
        response = "Thank you for your question. While I can provide general health information, I'm still learning and may not have complete information. For specific medical advice, please consult with a qualified healthcare professional.";
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: response,
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-2">
        <Bot className="h-5 w-5 text-medical-blue" />
        <h3 className="font-semibold">MedicAI Health Assistant</h3>
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.isBot 
                  ? 'bg-medical-lightblue text-gray-800' 
                  : 'bg-medical-blue text-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.isBot ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
                <span className="text-xs">
                  {message.isBot ? 'MedicAI' : 'You'}
                </span>
              </div>
              <p className="text-sm">{message.text}</p>
              <div className="text-right">
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-medical-lightblue rounded-lg p-4 max-w-[80%]">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <p className="text-sm">MedicAI is thinking...</p>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Form */}
      <form onSubmit={handleSend} className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type your health question here..."
            className="flex-1 resize-none"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          This AI assistant provides general information and is not a substitute for professional medical advice.
        </p>
      </form>
    </div>
  );
};

export default ChatBox;
