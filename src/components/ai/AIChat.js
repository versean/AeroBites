import React, { useState, useEffect, useRef } from "react";
import { Send, User, Loader2, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import brianClient from "../../api/brianClient";

// Simulate AWS Bedrock API call for hackathon demonstration
const simulateAWSBedrockCall = async (message, sessionId) => {
  console.log('simulateAWSBedrockCall called with:', message, sessionId);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  // Simulate AWS Bedrock response with Brian's personality
  const lowerMessage = message.toLowerCase();
  console.log('Processing message:', lowerMessage);
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hey there! 👋 I'm Brian, your personal food assistant powered by AWS Bedrock! I'm super excited to help you find some amazing food on campus. What are you in the mood for today?";
  }

  // Food ordering
  if (lowerMessage.includes('burger') || lowerMessage.includes('fries')) {
    return "Oh, burgers and fries! 🍔🍟 That's one of my favorites! I can get you a delicious burger from Crown College or Stevenson - they both have amazing burger bars. Would you like me to add that to your cart?";
  }

  if (lowerMessage.includes('pizza')) {
    return "Pizza is always a great choice! 🍕 I love the pizza at Merrill College - they have fresh slices and whole pies. What kind of toppings are you thinking? I can get you pepperoni, cheese, or even veggie!";
  }

  if (lowerMessage.includes('salad') || lowerMessage.includes('healthy')) {
    return "Great choice for staying healthy! 🥗 I'd recommend the Garden Salad from Crown College or the Veggie Bowl from Kresge. Both are super fresh and packed with nutrients. Want me to add one to your cart?";
  }

  // Dietary restrictions
  if (lowerMessage.includes('vegetarian') || lowerMessage.includes('veggie')) {
    return "Perfect! I've got tons of great vegetarian options for you! 🌱 The Veggie Burger at Stevenson is amazing, and Crown College has a fantastic salad bar. I can also get you some delicious pasta or veggie wraps. What sounds good?";
  }

  if (lowerMessage.includes('vegan')) {
    return "Absolutely! I love helping with vegan options! 🌿 Kresge College has an amazing vegan bowl, and Crown has great fruit salads. I can also get you some smoothies or fresh fruit. What would you like?";
  }

  if (lowerMessage.includes('gluten') || lowerMessage.includes('gluten-free')) {
    return "No problem at all! I've got you covered with gluten-free options! 🌾 The grilled chicken at Crown is fantastic, and Stevenson has great rice bowls. I can also get you fresh fruit or salads. What sounds good to you?";
  }

  // Location-specific
  if (lowerMessage.includes('crown') || lowerMessage.includes('crown college')) {
    return "Crown College has some of the best food on campus! 👑 I love their grilled chicken, sushi, and salad bar. They also have amazing tacos and stir fry. What are you thinking of trying?";
  }

  if (lowerMessage.includes('stevenson') || lowerMessage.includes('stevenson college')) {
    return "Stevenson is awesome! 🏛️ They have the best burger bar and amazing Casa options. I'm a big fan of their Casa Primera burritos and their stir fry station. What sounds good to you?";
  }

  if (lowerMessage.includes('cowell') || lowerMessage.includes('cowell college')) {
    return "Cowell is great! 🏰 They have amazing chicken tenders and a fantastic salad bar. I also love their pasta station and pizza. What are you in the mood for?";
  }

  // Delivery questions
  if (lowerMessage.includes('delivery') || lowerMessage.includes('deliver')) {
    return "I can definitely help with delivery! 🚁 We have drone delivery that takes just 5 minutes to any UCSC housing location. Just tell me where you want it delivered - Adams House, Casa Primera, or anywhere else on campus!";
  }

  // Price questions
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive')) {
    return "Great question! 💰 Most items are between $6-12, with burgers around $8.99, pizza slices at $3.99, and salads around $6.99. I can help you find something that fits your budget - just let me know what you're looking for!";
  }

  // Recommendations
  if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('what should')) {
    return "I'd love to give you some recommendations! 😊 Based on what's popular, I'd suggest the chicken tenders from Cowell, the burger from Stevenson, or the sushi from Crown. What type of food are you in the mood for?";
  }

  // Order processing
  if (lowerMessage.includes('order') || lowerMessage.includes('get me') || lowerMessage.includes('i want')) {
    return "Perfect! I'd be happy to help you order! 🛒 Just tell me what you'd like and I'll add it to your cart. You can say things like 'I want a burger and fries' or 'Get me a salad' and I'll take care of the rest!";
  }

  // Help requests
  if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
    return "I'm here to help with everything food-related! 🤝 I can help you order food, find recommendations, handle dietary restrictions, suggest delivery options, and answer questions about UCSC dining. Just tell me what you need!";
  }

  // Thank you responses
  if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
    return "You're so welcome! 😊 I love helping students find great food. Is there anything else I can help you with? Maybe some recommendations or help with your order?";
  }

  // AWS/Bedrock specific responses
  if (lowerMessage.includes('aws') || lowerMessage.includes('bedrock') || lowerMessage.includes('amazon')) {
    return "Yes! I'm powered by AWS Bedrock and Claude AI! 🤖 It's pretty cool - I can understand natural language, remember our conversation, and help you with complex food ordering. What would you like to know about UCSC dining?";
  }

  // Default responses
  const defaultResponses = [
    "That sounds interesting! 🤔 I'd love to help you with that. Are you looking to order some food or get recommendations?",
    "I'm here to help! 😊 What kind of food are you in the mood for? I can suggest some great options from our UCSC dining halls.",
    "Great question! 💭 I can help you find the perfect meal. Are you looking for something specific or would you like some recommendations?",
    "I'd be happy to help! 🍽️ What are you thinking of ordering? I can get you burgers, pizza, salads, or whatever you're craving!",
    "That's awesome! 🎉 I love helping students find great food. What can I get started for you today?"
  ];

  const response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  console.log('Returning response:', response);
  return response;
};

// Simple Brian response function
const getBrianResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hey there! 👋 I'm Brian, your personal food assistant powered by AWS Bedrock! I'm super excited to help you find some amazing food on campus. What are you in the mood for today?";
  }

  // Food ordering
  if (lowerMessage.includes('burger') || lowerMessage.includes('fries')) {
    return "Oh, burgers and fries! 🍔🍟 That's one of my favorites! I can get you a delicious burger from Crown College or Stevenson - they both have amazing burger bars. Would you like me to add that to your cart?";
  }

  if (lowerMessage.includes('pizza')) {
    return "Pizza is always a great choice! 🍕 I love the pizza at Merrill College - they have fresh slices and whole pies. What kind of toppings are you thinking? I can get you pepperoni, cheese, or even veggie!";
  }

  if (lowerMessage.includes('salad') || lowerMessage.includes('healthy')) {
    return "Great choice for staying healthy! 🥗 I'd recommend the Garden Salad from Crown College or the Veggie Bowl from Kresge. Both are super fresh and packed with nutrients. Want me to add one to your cart?";
  }

  // Dietary restrictions
  if (lowerMessage.includes('vegetarian') || lowerMessage.includes('veggie')) {
    return "Perfect! I've got tons of great vegetarian options for you! 🌱 The Veggie Burger at Stevenson is amazing, and Crown College has a fantastic salad bar. I can also get you some delicious pasta or veggie wraps. What sounds good?";
  }

  if (lowerMessage.includes('vegan')) {
    return "Absolutely! I love helping with vegan options! 🌿 Kresge College has an amazing vegan bowl, and Crown has great fruit salads. I can also get you some smoothies or fresh fruit. What would you like?";
  }

  // Location-specific
  if (lowerMessage.includes('crown') || lowerMessage.includes('crown college')) {
    return "Crown College has some of the best food on campus! 👑 I love their grilled chicken, sushi, and salad bar. They also have amazing tacos and stir fry. What are you thinking of trying?";
  }

  if (lowerMessage.includes('stevenson') || lowerMessage.includes('stevenson college')) {
    return "Stevenson is awesome! 🏛️ They have the best burger bar and amazing Casa options. I'm a big fan of their Casa Primera burritos and their stir fry station. What sounds good to you?";
  }

  // Delivery questions
  if (lowerMessage.includes('delivery') || lowerMessage.includes('deliver')) {
    return "I can definitely help with delivery! 🚁 We have drone delivery that takes just 5 minutes to any UCSC housing location. Just tell me where you want it delivered - Adams House, Casa Primera, or anywhere else on campus!";
  }

  // AWS/Bedrock specific responses
  if (lowerMessage.includes('aws') || lowerMessage.includes('bedrock') || lowerMessage.includes('amazon')) {
    return "Yes! I'm powered by AWS Bedrock and Claude AI! 🤖 It's pretty cool - I can understand natural language, remember our conversation, and help you with complex food ordering. What would you like to know about UCSC dining?";
  }

  // Default responses
  const defaultResponses = [
    "That sounds interesting! 🤔 I'd love to help you with that. Are you looking to order some food or get recommendations?",
    "I'm here to help! 😊 What kind of food are you in the mood for? I can suggest some great options from our UCSC dining halls.",
    "Great question! 💭 I can help you find the perfect meal. Are you looking for something specific or would you like some recommendations?",
    "I'd be happy to help! 🍽️ What are you thinking of ordering? I can get you burgers, pizza, salads, or whatever you're craving!",
    "That's awesome! 🎉 I love helping students find great food. What can I get started for you today?"
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

export default function AIChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const sessionId = useRef(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

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

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      console.log('Sending message to Brian:', inputMessage);
      
      // Simple response for testing
      const response = getBrianResponse(inputMessage);
      console.log('Brian response:', response);
      
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Brian Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "Oops! Something went wrong. Let me try that again!",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
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
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
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
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about food, order something, or get recommendations..."
              className="flex-1 rounded-xl"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Try: "Hey Brian, I want a burger and fries", "What's healthy at Crown?", or "Order me something vegetarian"
          </p>
        </div>
      </div>
    </div>
  );
}
