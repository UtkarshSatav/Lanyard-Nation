import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    User, Mail, Shield, Calendar, LogOut, Package,
    XCircle, Clock, CheckCircle, ArrowRight, RefreshCcw,
    Trash2, Edit3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUserOrders, updateOrderStatus } from '../firebase/services';
import { toast } from 'sonner';

interface Order {
    id: string;
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: any;
    items: any[];
}

export const ProfilePage = () => {
    const { currentUser, userData, logout } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            fetchOrders();
        }
    }, [currentUser]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const userOrders = await getUserOrders(currentUser?.uid);
            setOrders(userOrders as Order[]);
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Failed to load your orders");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async (orderId: string) => {
        if (window.confirm('Do you really want to cancel this order? This action cannot be undone.')) {
            try {
                const res = await updateOrderStatus(orderId, 'cancelled');
                if (res.success) {
                    toast.success('Order cancelled successfully');
                    fetchOrders();
                }
            } catch (error) {
                toast.error('Failed to cancel order');
            }
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/auth');
    };

    if (!currentUser) return null;

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4 text-amber-500" />;
            case 'delivered': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
            case 'cancelled': return <XCircle className="w-4 h-4 text-red-500" />;
            default: return <RefreshCcw className="w-4 h-4 text-blue-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                    <div className="h-32 bg-gradient-to-r from-[#0F2E4D] to-[#2D7F88]"></div>
                    <div className="px-8 pb-8">
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="p-1 bg-white rounded-2xl shadow-lg">
                                <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center border-4 border-white">
                                    <User className="w-12 h-12 text-gray-400" />
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-6 py-2.5 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-all border border-red-100"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{userData?.fullName || 'Lanyard User'}</h1>
                            <p className="text-gray-500 flex items-center gap-2 mt-1">
                                <Mail className="w-4 h-4" />
                                {currentUser.email}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Account Status</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <Shield className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Role</p>
                                        <p className="text-sm font-bold text-gray-900 capitalize">{userData?.role || 'Customer'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-50 rounded-lg">
                                        <Calendar className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Member Since</p>
                                        <p className="text-sm font-bold text-gray-900">
                                            {userData?.createdAt?.toDate ? userData.createdAt.toDate().toLocaleDateString() : 'February 2026'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Your Orders</h3>
                                <div className="bg-gray-50 px-3 py-1 rounded-full text-xs font-bold text-gray-500">
                                    {orders.length} TOTAL
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <RefreshCcw className="w-8 h-8 animate-spin text-[#2D7F88]" />
                                </div>
                            ) : orders.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <Package className="w-12 h-12 text-gray-200 mb-4" />
                                    <h4 className="text-gray-900 font-semibold">No orders yet</h4>
                                    <p className="text-gray-500 text-sm mt-1">Ready to create your first custom lanyard?</p>
                                    <button onClick={() => navigate('/products')} className="mt-6 px-6 py-2 bg-[#2D7F88] text-white rounded-xl font-semibold hover:bg-[#0F2E4D] transition-all">
                                        Browse Products
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map(order => (
                                        <div key={order.id} className="border border-gray-100 rounded-2xl p-5 hover:border-gray-200 transition-all bg-gray-50/30">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</p>
                                                    <p className="text-sm font-black text-[#0F2E4D]">#{order.id.slice(-8).toUpperCase()}</p>
                                                </div>
                                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase ${order.status === 'cancelled' ? 'bg-red-50 text-red-600' :
                                                        order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' :
                                                            'bg-blue-50 text-blue-600'
                                                    }`}>
                                                    {getStatusIcon(order.status)}
                                                    {order.status}
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount Paid</p>
                                                    <p className="text-xl font-black text-[#2D7F88]">₹{order.totalAmount?.toLocaleString()}</p>
                                                </div>

                                                {order.status === 'pending' && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleCancelOrder(order.id)}
                                                            className="flex items-center gap-1 px-3 py-1.5 text-red-500 bg-white border border-red-100 rounded-lg text-[10px] font-bold hover:bg-red-50 transition-all"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                            Cancel Order
                                                        </button>
                                                        <button
                                                            onClick={() => toast.info("Coming Soon: Self-service editing is under maintenance. Please contact support.")}
                                                            className="flex items-center gap-1 px-3 py-1.5 text-[#0F2E4D] bg-white border border-gray-100 rounded-lg text-[10px] font-bold hover:bg-gray-50 transition-all"
                                                        >
                                                            <Edit3 className="w-3.5 h-3.5" />
                                                            Edit Info
                                                        </button>
                                                    </div>
                                                )}

                                                {order.status !== 'pending' && (
                                                    <button className="text-[10px] font-bold text-gray-400 flex items-center gap-1 hover:text-[#0F2E4D]">
                                                        Details <ArrowRight className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
