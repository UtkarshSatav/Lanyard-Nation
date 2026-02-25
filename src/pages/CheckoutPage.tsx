import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../firebase/services';
import { validateCoupon, createProofRequest } from '../firebase/advancedServices';
import { useAuth } from '../context/AuthContext';
import { MapPin, ShieldCheck, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export const CheckoutPage = () => {
    const { items, getTotalPrice, clearCart } = useCart();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [isAddressVerified, setIsAddressVerified] = useState(false);

    // Advanced Features State
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState({ amount: 0, code: '' });
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
    const [imprintText, setImprintText] = useState('');
    const [designFile, setDesignFile] = useState<File | null>(null);

    const [address, setAddress] = useState({
        street: '',
        city: '',
        zip: '',
        country: 'India'
    });

    const [b2bInfo, setB2bInfo] = useState({
        customerType: 'individual',
        orderType: 'order',
        isRush: false
    });

    const handleVerifyAddress = async () => {
        if (!address.street || !address.city || !address.zip) {
            toast.error('Please fill in all address fields');
            return;
        }

        setIsValidating(true);
        // Simulate Address Verification API call
        setTimeout(() => {
            const isMockValid = address.zip.length >= 5; // Simple mock rule
            if (isMockValid) {
                setIsAddressVerified(true);
                toast.success('Address Verified Successfully');
            } else {
                setIsAddressVerified(false);
                toast.error('Invalid address or postal code format');
            }
            setIsValidating(false);
        }, 1500);
    };

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        setIsApplyingCoupon(true);
        try {
            const res = await validateCoupon(couponCode, getTotalPrice()) as any;
            if (res.valid && res.promo) {
                const discountVal = res.promo.type === 'PERCENTAGE'
                    ? (getTotalPrice() * res.promo.value / 100)
                    : res.promo.value;
                setDiscount({ amount: discountVal, code: couponCode });
                toast.success(`Coupon ${couponCode} applied! Saved ₹${discountVal}`);
            } else {
                toast.error(res.message);
                setDiscount({ amount: 0, code: '' });
            }
        } catch (error) {
            toast.error('Failed to validate coupon');
        } finally {
            setIsApplyingCoupon(false);
        }
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAddressVerified) {
            toast.error('Please verify your address first');
            return;
        }

        setLoading(true);
        try {
            const finalAmount = getTotalPrice() - discount.amount;
            const orderData = {
                userId: currentUser?.uid,
                customerEmail: currentUser?.email,
                items: items,
                totalAmount: finalAmount,
                discount: discount,
                shippingAddress: address,
                paymentStatus: b2bInfo.orderType === 'quote' ? 'n/a' : 'pending',
                customerType: b2bInfo.customerType,
                type: b2bInfo.orderType,
                isRush: b2bInfo.isRush,
                status: b2bInfo.orderType === 'quote' ? 'pending' : 'processing',
                productionStatus: b2bInfo.orderType === 'quote' ? 'awaiting-proof' : 'awaiting-proof',
                imprintText: imprintText
            };

            const res = await createOrder(orderData);
            if (res.success) {
                // If it's a quote or needs proof, create proof request
                await createProofRequest(res.id, {
                    imprint_text: imprintText,
                    logo_url: designFile ? "mocked_path_to_s3" : ""
                });

                toast.success('Order placed successfully!');
                clearCart();
                navigate('/profile');
            } else {
                toast.error('Failed to place order');
            }
        } catch (error) {
            toast.error('An error occurred during checkout');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left: Shipping Details */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl font-black text-[#0F2E4D] mb-2">Secure Checkout</h1>
                            <p className="text-gray-500 font-medium">Step 1 of 2: Shipping & Validation</p>
                        </div>

                        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Street Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="123 Lanyard St."
                                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#2D7F88] outline-none font-bold"
                                            value={address.street}
                                            onChange={e => {
                                                setAddress({ ...address, street: e.target.value });
                                                setIsAddressVerified(false);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
                                        <input
                                            type="text"
                                            placeholder="Mumbai"
                                            className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#2D7F88] outline-none font-bold"
                                            value={address.city}
                                            onChange={e => {
                                                setAddress({ ...address, city: e.target.value });
                                                setIsAddressVerified(false);
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Postal Code</label>
                                        <input
                                            type="text"
                                            placeholder="400001"
                                            className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#2D7F88] outline-none font-bold"
                                            value={address.zip}
                                            onChange={e => {
                                                setAddress({ ...address, zip: e.target.value });
                                                setIsAddressVerified(false);
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* B2B Segmentation */}
                                <div className="space-y-4 pt-6 border-t border-gray-100">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Customer Segment</label>
                                        <select
                                            className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#2D7F88] outline-none font-bold text-sm"
                                            value={b2bInfo.customerType}
                                            onChange={e => setB2bInfo({ ...b2bInfo, customerType: e.target.value })}
                                        >
                                            <option value="individual">Individual / Regular</option>
                                            <option value="event-organizer">Event Organizer (Conferences/Festivals)</option>
                                            <option value="corporate">Corporate / HR Team</option>
                                            <option value="agency">Agency / Print Reseller</option>
                                            <option value="ngo">NGO / School / Club</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setB2bInfo({ ...b2bInfo, orderType: 'order' })}
                                            className={`p-4 rounded-2xl border-2 transition-all text-center ${b2bInfo.orderType === 'order' ? 'border-[#2D7F88] bg-[#2D7F88]/10' : 'border-gray-50 bg-gray-50 opacity-60'}`}
                                        >
                                            <div className="text-xs font-black text-[#0F2E4D] uppercase">Direct Order</div>
                                            <div className="text-[10px] text-gray-500 font-bold mt-1">Instant Fulfillment</div>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setB2bInfo({ ...b2bInfo, orderType: 'quote' })}
                                            className={`p-4 rounded-2xl border-2 transition-all text-center ${b2bInfo.orderType === 'quote' ? 'border-[#FF8C42] bg-[#FF8C42]/10' : 'border-gray-50 bg-gray-50 opacity-60'}`}
                                        >
                                            <div className="text-xs font-black text-[#0F2E4D] uppercase">Request Quote</div>
                                            <div className="text-[10px] text-gray-500 font-bold mt-1">Proofing First</div>
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-100">
                                        <input
                                            type="checkbox"
                                            id="rush"
                                            className="w-5 h-5 rounded-lg border-red-300 text-red-600 focus:ring-red-500"
                                            checked={b2bInfo.isRush}
                                            onChange={e => setB2bInfo({ ...b2bInfo, isRush: e.target.checked })}
                                        />
                                        <label htmlFor="rush" className="flex-1">
                                            <p className="text-xs font-black text-red-700 uppercase tracking-widest">Rush Production Required</p>
                                            <p className="text-[9px] text-red-600 font-bold">Priority handling for tight event timelines</p>
                                        </label>
                                    </div>
                                </div>

                                {/* Order Validation Section */}
                                <div className={`p-6 rounded-3xl transition-all ${isAddressVerified ? 'bg-emerald-50 border-2 border-emerald-100' : 'bg-gray-50 border-2 border-transparent'}`}>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            {isAddressVerified ? (
                                                <CheckCircle className="w-6 h-6 text-emerald-500" />
                                            ) : (
                                                <ShieldCheck className="w-6 h-6 text-gray-400" />
                                            )}
                                            <div>
                                                <p className={`font-black text-sm ${isAddressVerified ? 'text-emerald-700' : 'text-[#0F2E4D]'}`}>
                                                    {isAddressVerified ? 'Address Verified' : 'Order Validation Required'}
                                                </p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Automatic Address Sanitization</p>
                                            </div>
                                        </div>

                                        {!isAddressVerified && (
                                            <button
                                                type="button"
                                                onClick={handleVerifyAddress}
                                                disabled={isValidating}
                                                className="px-6 py-2 bg-[#0F2E4D] text-white rounded-xl text-xs font-black shadow-lg hover:bg-black transition-all disabled:opacity-50"
                                            >
                                                {isValidating ? 'Validating...' : 'Verify Now'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {isAddressVerified && (
                                    <div className="space-y-6 pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Design Branding (Optional)</label>
                                            <textarea
                                                placeholder="Enter imprint text or branding instructions..."
                                                className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#2D7F88] outline-none font-medium text-sm"
                                                rows={2}
                                                value={imprintText}
                                                onChange={e => setImprintText(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Upload Logo/Template</label>
                                            <div className="flex items-center justify-center w-full">
                                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-100 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <ShieldCheck className="w-8 h-8 mb-3 text-gray-400" />
                                                        <p className="mb-2 text-sm text-gray-500 font-bold">
                                                            {designFile ? designFile.name : 'Click to upload design asset'}
                                                        </p>
                                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-[0.1em]">AI, PDF, PNG (Max 5MB)</p>
                                                    </div>
                                                    <input type="file" className="hidden" onChange={e => setDesignFile(e.target.files?.[0] || null)} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xl font-black text-[#0F2E4D] mb-2">Order Review</h2>
                            <p className="text-gray-500 font-medium">Finalize your selection</p>
                        </div>

                        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                            <div className="space-y-4 mb-8">
                                {items.map(item => (
                                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <div>
                                            <p className="font-bold text-[#0F2E4D]">{item.name}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-black text-[#2D7F88]">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex justify-between text-sm font-bold text-gray-500">
                                    <span>Subtotal</span>
                                    <span>₹{getTotalPrice().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold text-gray-500">
                                    <span>Logistics & Handling</span>
                                    <span className="text-emerald-600 uppercase text-[10px] tracking-widest font-black">Free Delivery</span>
                                </div>

                                <div className="pt-4 mt-4 border-t border-gray-100">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Promo Code"
                                            className="flex-1 px-4 py-2 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-[#FF8C42] outline-none font-bold text-xs uppercase"
                                            value={couponCode}
                                            onChange={e => setCouponCode(e.target.value)}
                                        />
                                        <button
                                            onClick={handleApplyCoupon}
                                            disabled={isApplyingCoupon}
                                            className="px-4 py-2 bg-[#0F2E4D] text-white rounded-xl text-xs font-black"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {discount.amount > 0 && (
                                        <div className="flex justify-between items-center mt-2 px-1">
                                            <span className="text-[10px] font-black text-emerald-600 uppercase">Discount Applied ({discount.code})</span>
                                            <span className="text-sm font-bold text-emerald-600">-₹{discount.amount.toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-lg font-black text-[#0F2E4D]">Total Payable</span>
                                    <span className="text-3xl font-black text-[#2D7F88]">₹{(getTotalPrice() - discount.amount).toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={!isAddressVerified || loading}
                                className={`w-full py-5 rounded-[24px] font-black text-lg transition-all flex items-center justify-center gap-3 ${isAddressVerified
                                    ? 'bg-[#FF8C42] text-white shadow-xl shadow-orange-500/20 hover:scale-[1.02]'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {loading ? 'Processing...' : (
                                    <>
                                        Confirm & Place Order
                                        <Truck className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            {!isAddressVerified && (
                                <p className="text-center mt-4 text-[10px] font-black text-amber-600 uppercase tracking-widest flex items-center justify-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    Verify address to unlock payment
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
