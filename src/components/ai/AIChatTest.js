import React, { useState, useEffect, useRef } from "react";
import { Send, User, Loader2, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function AIChatTest({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Add welcome message from Brian
      setMessages([{
        id: 1,
        role: 'assistant',
        content: "Hey there! I'm Brian, your personal food ordering assistant powered by AWS Bedrock! 🍕🤖 I'm here to help you find the perfect meal from UCSC dining halls, handle your dietary needs, and make ordering super easy. What can I get started for you today?",
        timestamp: new Date().toISOString()
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    console.log('Sending message:', inputMessage);

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simple test response
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: `Thanks for your message: "${inputMessage}". I'm Brian and I'm here to help with food ordering! 🍕`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold text-sm">B</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Brian</h3>
              <p className="text-sm text-gray-500">Your personal food assistant</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-[80%] ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                {message.role === 'user' ? (
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center border border-orange-500">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-xs">B</span>
                    </div>
                  </div>
                )}
                <div className={`rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center border border-orange-500">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-xs">B</span>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-gray-600">Brian is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex items-center gap-3">
          <Input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask Brian anything..."
            className="flex-1 rounded-xl"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || inputMessage.trim() === ""}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
