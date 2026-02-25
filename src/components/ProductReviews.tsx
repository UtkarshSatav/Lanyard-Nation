import { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { submitReview } from '../firebase/advancedServices';
import { toast } from 'sonner';

interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: any;
}

export const ProductReviews = ({ productId }: { productId: string }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '', userName: '' });
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await submitReview({
                productId,
                ...newReview,
                createdAt: new Date()
            });
            if (res.success) {
                toast.success('Review submitted successfully!');
                setShowForm(false);
                setNewReview({ rating: 5, comment: '', userName: '' });
                // In a real app, we'd refetch or update state
            } else {
                toast.error('Failed to submit review');
            }
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-24 max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h2 className="text-3xl font-black text-[#0F2E4D] uppercase tracking-widest">Customer Voice</h2>
                    <p className="text-gray-500 font-medium mt-1 uppercase text-[10px] tracking-widest">Verified experiences from our B2B partners</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#0F2E4D] text-white rounded-2xl font-black text-xs shadow-xl hover:scale-105 transition-all"
                >
                    <MessageSquare className="w-4 h-4" />
                    Write a Review
                </button>
            </div>

            {showForm && (
                <div className="bg-white border-2 border-[#0F2E4D]/10 rounded-[32px] p-8 mb-12 animate-in zoom-in duration-300">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#0F2E4D] outline-none font-bold"
                                    value={newReview.userName}
                                    onChange={e => setNewReview({ ...newReview, userName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Rating</label>
                                <div className="flex items-center gap-2 h-[60px] bg-gray-50 rounded-2xl px-6">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                            className="transition-transform active:scale-90"
                                        >
                                            <Star className={`w-6 h-6 ${star <= newReview.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Detailed Feedback</label>
                            <textarea
                                required
                                rows={4}
                                className="w-full p-6 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#0F2E4D] outline-none font-medium text-sm"
                                value={newReview.comment}
                                onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                            />
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full py-5 bg-[#2D7F88] text-white rounded-2xl font-black text-lg shadow-xl shadow-teal-500/20 flex items-center justify-center gap-3"
                        >
                            {loading ? 'Submitting...' : (
                                <>
                                    Publish Review
                                    <Send className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            )}

            {/* Mock Reviews List */}
            <div className="space-y-8">
                {[
                    { name: 'Sameer Mehra', company: 'Global Events Inc', text: 'Exceptional quality and the 1-hour proof SLA is not a joke. They actually delivered it in 45 minutes.', rating: 5 },
                    { name: 'Priya Sharma', company: 'HR Solutionist', text: 'Best pricing for bulk lanyards in India. The sublimation colors are vibrant and matched our branding perfectly.', rating: 5 }
                ].map((rev, i) => (
                    <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm border-l-4 border-l-[#2D7F88] hover:shadow-xl transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="font-black text-[#0F2E4D]">{rev.name}</span>
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">• {rev.company}</span>
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                            </div>
                            <div className="flex items-center gap-1">
                                {[...Array(rev.rating)].map((_, j) => (
                                    <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-600 font-medium leading-relaxed italic">"{rev.text}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
