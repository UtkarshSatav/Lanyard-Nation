import { useState, useEffect } from 'react';
import { getSiteContent } from '../firebase/advancedServices';

export const PromoBanner = () => {
    const [banner, setBanner] = useState<{ text: string, active: boolean, link?: string } | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fetchBanner = async () => {
            const data = await getSiteContent('promo-banner') as any;
            if (data && data.active) {
                setBanner(data);
            }
        };
        fetchBanner();
    }, []);

    if (!banner || !isVisible) return null;

    return (
        <div className="bg-[#0F2E4D] text-white py-2 relative overflow-hidden transition-all animate-in slide-in-from-top duration-500">
            <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-amber-400 text-sm animate-bounce">campaign</span>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                    {banner.text}
                    {banner.link && (
                        <a href={banner.link} className="ml-2 text-amber-400 hover:underline border-l border-white/20 pl-2">
                            Learn More
                        </a>
                    )}
                </p>
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full flex items-center justify-center"
                >
                    <span className="material-symbols-outlined text-sm">close</span>
                </button>
            </div>
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
    );
};
