import { useState } from 'react';

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
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 border border-slate-100 dark:border-slate-800">
          {/* Header */}
          <div className="bg-[#25D366] text-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <span className="material-symbols-outlined text-3xl">chat</span>
              </div>
              <div>
                <div className="font-black uppercase tracking-widest text-sm">Lanyard Nation</div>
                <div className="text-[10px] font-bold text-white/80 uppercase">Typical reply: Instant</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-6 space-y-4 bg-slate-50 dark:bg-slate-950">
            {/* Bot Message */}
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="material-symbols-outlined text-primary text-xl font-bold">join_inner</span>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[240px] border border-slate-100 dark:border-slate-800">
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                  Hi 👋 Welcome to Lanyard Nation. Need bulk pricing or a custom design preview?
                </p>
                <span className="text-[10px] font-bold text-slate-400 mt-2 block uppercase uppercase italic">Now</span>
              </div>
            </div>

            {/* Quick Replies */}
            <div className="space-y-2 pl-12">
              {[
                { label: '💰 Get Bulk Pricing', icon: 'payments' },
                { label: '🎨 Upload My Logo', icon: 'upload_file' },
                { label: '📦 Track My Order', icon: 'local_shipping' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={handleWhatsAppClick}
                  className="w-full text-left p-3.5 bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-md hover:border-primary transition-all text-xs text-navy dark:text-slate-300 font-bold border border-slate-100 dark:border-slate-800 flex items-center justify-between group"
                >
                  {item.label}
                  <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 text-primary transition-opacity">arrow_forward</span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleWhatsAppClick}
              className="w-full py-4 bg-[#25D366] text-white rounded-xl hover:brightness-105 transition-all font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/20"
            >
              <span className="material-symbols-outlined">chat</span>
              Open WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 hover:-rotate-6 transition-all duration-300 group"
      >
        {isOpen ? (
          <span className="material-symbols-outlined text-white text-3xl font-bold">close</span>
        ) : (
          <div className="relative">
            <span className="material-symbols-outlined text-white text-3xl font-bold">chat</span>
            {/* Notification Badge */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-4 border-[#25D366] flex items-center justify-center">
              <span className="text-white text-[10px] font-black">1</span>
            </div>
          </div>
        )}

        {/* Pulse Animation */}
        {!isOpen && (
          <>
            <div className="absolute inset-0 bg-[#25D366] rounded-2xl animate-ping opacity-20"></div>
          </>
        )}
      </button>
    </>
  );
}
