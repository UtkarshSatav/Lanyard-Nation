import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Minimize2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function AIBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm LN Smart Assistant 🤖 How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { label: '💰 Get Price Quote', value: 'pricing' },
    { label: '🎨 Design Help', value: 'design' },
    { label: '📦 Track Order', value: 'track' },
    { label: '❓ FAQs', value: 'faq' }
  ];

  const handleQuickAction = (value: string) => {
    const responses: { [key: string]: string } = {
      pricing: "I can help you get an instant price quote! What type of product are you interested in?\n\n• Custom Lanyards (from £0.30)\n• Festival Wristbands (from £0.15)\n• Silicone Wristbands (from £0.25)\n• ID Card Holders (from £0.50)\n\nYou can also use our Price Calculator above for detailed estimates!",
      design: "Our design team is here to help! 🎨\n\nWe offer:\n✓ Free design proofs\n✓ Logo upload & vectorization\n✓ Custom color matching\n✓ Layout suggestions\n\nWould you like to upload your logo or speak with a designer?",
      track: "To track your order, I'll need your order number. It should look like: LN-12345\n\nAlternatively, you can track orders using the email address you used during checkout.\n\nWhat's your order number?",
      faq: "Here are our most common questions:\n\n❓ What's your minimum order? 100 units\n⏱️ How fast can you deliver? 2-5 business days\n💳 What payment methods? All major cards + PayPal\n🌍 Where do you ship? UK, EU, and worldwide\n\nWhat else would you like to know?"
    };

    addUserMessage(quickActions.find(a => a.value === value)?.label || '');
    setTimeout(() => {
      addBotMessage(responses[value] || "I'm here to help! How can I assist you?");
    }, 500);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let response = "Thanks for your message! For specific inquiries, please use the quick actions above or contact our support team. We're here to help! 😊";

      if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('quote')) {
        response = "I'd be happy to help with pricing! Please use our interactive Price Calculator on this page for an instant quote. Or click '💰 Get Price Quote' above for more details!";
      } else if (lowerInput.includes('design') || lowerInput.includes('logo')) {
        response = "Great! For design assistance, click '🎨 Design Help' above. Our team can help with logo uploads, custom designs, and color matching. We offer free design proofs!";
      } else if (lowerInput.includes('order') || lowerInput.includes('track')) {
        response = "To track your order, click '📦 Track Order' above and enter your order number. You can also check your email for tracking updates!";
      } else if (lowerInput.includes('time') || lowerInput.includes('fast') || lowerInput.includes('delivery')) {
        response = "Our standard turnaround is 2-5 business days. Rush orders are available for faster delivery. Shipping is free on orders over £500!";
      }

      addBotMessage(response);
    }, 800);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-8 z-40 w-14 h-14 bg-gradient-to-br from-[#2D7F88] to-[#0F2E4D] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300"
      >
        <Bot className="w-7 h-7 text-white" />
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#FF8C42] rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">AI</span>
        </div>
      </button>
    );
  }

  return (
    <div className={`fixed z-40 transition-all duration-300 ${
      isMinimized 
        ? 'bottom-6 right-24 w-64'
        : 'bottom-6 right-6 w-96'
    }`}>
      {isMinimized ? (
        // Minimized View
        <button
          onClick={() => setIsMinimized(false)}
          className="w-full bg-gradient-to-br from-[#2D7F88] to-[#0F2E4D] text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between hover:shadow-3xl transition-all"
        >
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6" />
            <span className="font-bold">LN Smart Assistant</span>
          </div>
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-[#6EB5B7] rounded-full animate-pulse"></div>
          </div>
        </button>
      ) : (
        // Full View
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col" style={{ height: '600px' }}>
          {/* Header */}
          <div className="bg-gradient-to-br from-[#2D7F88] to-[#0F2E4D] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold">LN Smart Assistant</div>
                <div className="text-xs text-white/80 flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#6EB5B7] rounded-full animate-pulse"></div>
                  Online
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsMinimized(true)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F7F9FB]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2D7F88] to-[#0F2E4D] flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div>
                    <div
                      className={`rounded-2xl p-3 ${
                        message.sender === 'user'
                          ? 'bg-[#2D7F88] text-white rounded-br-none'
                          : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                    <span className="text-xs text-gray-400 mt-1 block px-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="px-4 py-3 bg-white border-t border-gray-200">
              <div className="text-xs text-gray-500 mb-2 font-semibold">Quick Actions:</div>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.value)}
                    className="p-2 text-xs bg-[#F7F9FB] hover:bg-[#2D7F88] hover:text-white rounded-lg transition-all duration-300 border border-gray-200 font-medium"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-[#F7F9FB] border border-gray-200 rounded-xl focus:outline-none focus:border-[#2D7F88] text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-3 bg-[#2D7F88] text-white rounded-xl hover:bg-[#0F2E4D] transition-all duration-300"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
