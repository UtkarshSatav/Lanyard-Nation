import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    // In production, this would open WhatsApp with pre-filled message
    window.open('https://wa.me/?text=Hi%20👋%20Welcome%20to%20Lanyard%20Nation.%20Need%20pricing%20or%20design%20help?', '_blank');
  };

  return (
    <>
      {/* Chat Preview */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <div className="font-bold">Lanyard Nation</div>
                <div className="text-xs text-white/90">Typically replies instantly</div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 space-y-3 bg-[#E5DDD5]">
            {/* Bot Message */}
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2D7F88] to-[#0F2E4D] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">LN</span>
              </div>
              <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[240px]">
                <p className="text-sm text-gray-800">
                  Hi 👋 Welcome to Lanyard Nation. Need pricing or design help?
                </p>
                <span className="text-xs text-gray-400 mt-1 block">Just now</span>
              </div>
            </div>

            {/* Quick Replies */}
            <div className="space-y-2 pl-10">
              <button 
                onClick={handleWhatsAppClick}
                className="w-full text-left p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-sm text-[#2D7F88] font-medium border border-[#2D7F88]/20"
              >
                💰 Get Bulk Pricing
              </button>
              <button 
                onClick={handleWhatsAppClick}
                className="w-full text-left p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-sm text-[#2D7F88] font-medium border border-[#2D7F88]/20"
              >
                🎨 Upload My Logo
              </button>
              <button 
                onClick={handleWhatsAppClick}
                className="w-full text-left p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-sm text-[#2D7F88] font-medium border border-[#2D7F88]/20"
              >
                📦 Track My Order
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-white border-t border-gray-200">
            <button 
              onClick={handleWhatsAppClick}
              className="w-full py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#20bd5a] transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Open WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group"
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-8 h-8 text-white" />
            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">1</span>
            </div>
          </div>
        )}
        
        {/* Pulse Animation */}
        {!isOpen && (
          <>
            <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75"></div>
            <div className="absolute inset-0 bg-[#25D366] rounded-full animate-pulse"></div>
          </>
        )}
      </button>
    </>
  );
}
