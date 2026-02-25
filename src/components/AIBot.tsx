import { useState, useRef, useEffect } from 'react';

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
      pricing: "I can help you get an instant price quote! What type of product are you interested in?\n\n• Custom Lanyards (from ₹35.50)\n• Festival Wristbands (from ₹15.25)\n• Silicone Wristbands (from ₹12.50)\n• ID Card Holders (from ₹25.50)\n\nYou can also use our Price Calculator above for detailed estimates!",
      design: "Our design team is here to help! 🎨\n\nWe offer:\n✓ Free design proofs\n✓ Logo upload & vectorization\n✓ Custom color matching\n✓ Layout suggestions\n\nWould you like to upload your logo or speak with a designer?",
      track: "To track your order, I'll need your order number. It should look like: LN-12345\n\nAlternatively, you can track orders using the email address you used during checkout.\n\nWhat's your order number?",
      faq: "Here are our most common questions:\n\n❓ What's your minimum order? 100 units\n⏱️ How fast can you deliver? 2-5 business days\n💳 What payment methods? All major cards + UPI/PayPal\n🌍 Where do you ship? Pan India and Worldwide\n\nWhat else would you like to know?"
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
        response = "Our standard turnaround is 2-5 business days. Rush orders are available for faster delivery. Shipping is free on orders over ₹25,000!";
      }

      addBotMessage(response);
    }, 800);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-8 z-40 w-16 h-14 bg-navy rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 border border-primary/20"
      >
        <span className="material-symbols-outlined text-primary text-3xl font-bold">smart_toy</span>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center border-4 border-navy shadow-lg">
          <span className="text-white text-[8px] font-black uppercase">AI</span>
        </div>
      </button>
    );
  }

  return (
    <div className={`fixed z-40 transition-all duration-500 ${isMinimized
      ? 'bottom-24 right-24 w-72 translate-y-2'
      : 'bottom-8 right-8 w-96'
      }`}>
      {isMinimized ? (
        // Minimized View
        <button
          onClick={() => setIsMinimized(false)}
          className="w-full bg-navy text-white p-5 rounded-2xl shadow-2xl flex items-center justify-between hover:scale-105 transition-all border border-primary/20"
        >
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary">smart_toy</span>
            <span className="font-black uppercase tracking-widest text-[10px]">Smart Assistant</span>
          </div>
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(45,127,136,0.8)]"></div>
          </div>
        </button>
      ) : (
        // Full View
        <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl overflow-hidden flex flex-col border border-slate-100 dark:border-slate-800" style={{ height: '640px' }}>
          {/* Header */}
          <div className="bg-navy text-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-primary text-2xl font-bold">smart_toy</span>
              </div>
              <div>
                <div className="font-black uppercase tracking-widest text-xs">LN AI Agent</div>
                <div className="text-[10px] font-bold text-slate-400 flex items-center gap-2 uppercase">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  Neural Link Active
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="w-8 h-8 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-sm">remove</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-950 no-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {message.sender === 'bot' && (
                    <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="material-symbols-outlined text-primary text-xl">smart_toy</span>
                    </div>
                  )}
                  <div className={message.sender === 'user' ? 'text-right' : 'text-left'}>
                    <div
                      className={`p-4 rounded-[24px] shadow-sm font-medium text-sm leading-relaxed ${message.sender === 'user'
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-tl-none border border-slate-100 dark:border-slate-800'
                        }`}
                    >
                      <p className="whitespace-pre-line">{message.text}</p>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 mt-2 block uppercase tracking-widest px-1">
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
            <div className="px-6 py-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.value)}
                    className="p-3 text-[10px] bg-slate-50 dark:bg-slate-950 hover:bg-primary hover:text-white rounded-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 font-black uppercase tracking-widest flex items-center justify-center text-navy dark:text-slate-300"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Inquire about bulk pricing..."
                className="flex-1 px-5 py-4 bg-slate-50 dark:bg-slate-950 border-none rounded-2xl focus:ring-2 focus:ring-primary/50 text-sm font-medium placeholder:text-slate-400 dark:text-white"
              />
              <button
                onClick={handleSendMessage}
                className="w-14 h-14 bg-primary text-white rounded-2xl hover:brightness-105 transition-all flex items-center justify-center shadow-lg shadow-primary/20"
              >
                <span className="material-symbols-outlined font-bold">send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
