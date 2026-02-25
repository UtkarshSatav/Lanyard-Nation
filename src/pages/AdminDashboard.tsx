import { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus, getAllProducts, addProduct, deleteProduct, updateOrderProductionStatus, convertQuoteToOrder, bulkAddProducts } from '../firebase/services';
import { getSLAStatus } from '../firebase/advancedServices';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Package,
    Truck,
    CheckCircle,
    Clock,
    Filter,
    Search,
    ChevronRight,
    User,
    ShoppingBag,
    IndianRupee,
    RefreshCcw,
    Plus,
    Trash2,
    Image as ImageIcon,
    Tag,
    Layers,
    X as CloseIcon,
    FileText,
    Printer,
    Download,
    AlertTriangle,
    Upload
} from 'lucide-react';
import { generatePickList, generateShippingLabel } from '../utils/pdfGenerator';
import { toast } from 'sonner';

interface Order {
    id: string;
    customerName?: string;
    customerEmail: string;
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    productionStatus?: 'awaiting-proof' | 'proof-approved' | 'in-production' | 'quality-check';
    type: 'quote' | 'order';
    customerType: 'event-organizer' | 'corporate' | 'agency' | 'ngo' | 'individual';
    isRush: boolean;
    createdAt: any;
    items: any[];
}

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    subcategory: string;
    image: string;
    inStock: boolean;
    stock: number;
}

export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'orders' | 'inventory'>('orders');
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [slaAlerts, setSlaAlerts] = useState<{ risks: any[], breached: any[] }>({ risks: [], breached: [] });

    // Form state for new product
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: 0,
        category: 'wristbands',
        subcategory: 'silicone-wristbands',
        image: '',
        inStock: true,
        stock: 0
    });

    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const { isAdmin, currentUser, loading: authLoadingState } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (authLoadingState) return;
        if (!isAdmin) {
            navigate('/auth');
            return;
        }
        fetchData();
    }, [isAdmin, authLoadingState, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        if (activeTab === 'orders') {
            await fetchOrders();
            await fetchSLAStatus();
        } else {
            await fetchProducts();
        }
        setLoading(false);
    };

    const fetchSLAStatus = async () => {
        try {
            const stats = await getSLAStatus();
            setSlaAlerts(stats);
        } catch (error) {
            console.error("Error fetching SLA:", error);
        }
    };

    const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const text = event.target?.result as string;
            const rows = text.split(/\r?\n/);
            const headers = rows[0].split(',').map(h => h.trim().toLowerCase());

            const productsArray = rows.slice(1).filter(r => r.trim()).map(row => {
                const values = row.split(',').map(v => v.trim());
                const get = (n: string) => values[headers.indexOf(n.toLowerCase())];
                return {
                    name: get('name') || 'Unnamed Product',
                    description: get('description') || '',
                    price: parseFloat(get('price') || '0') || 0,
                    category: get('category') || 'uncategorized',
                    subcategory: get('subcategory') || '',
                    image: get('image') || get('image_url') || '',
                    inStock: (get('instock') || 'true').toLowerCase() === 'true',
                    stock: parseInt(get('stock') || '0') || 0
                };
            });

            if (productsArray.length === 0) {
                toast.error('No products found in CSV');
                return;
            }

            setLoading(true);
            const res = await bulkAddProducts(productsArray);
            if (res.success) {
                toast.success(`Successfully uploaded ${productsArray.length} products`);
                fetchProducts();
            } else {
                toast.error('Bulk upload failed');
            }
            setLoading(false);
        };
        reader.readAsText(file);
    };

    const fetchOrders = async () => {
        try {
            const data = await getAllOrders();
            setOrders(data as Order[]);
        } catch (error) {
            toast.error('Failed to fetch orders');
        }
    };

    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data as Product[]);
        } catch (error) {
            toast.error('Failed to fetch products');
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await addProduct(newProduct);
            if (res.success) {
                toast.success('Product added successfully');
                setShowAddProduct(false);
                setNewProduct({
                    name: '',
                    description: '',
                    price: 0,
                    category: 'wristbands',
                    subcategory: 'silicone-wristbands',
                    image: '',
                    inStock: true,
                    stock: 0
                });
                fetchProducts();
            } else {
                toast.error('Failed to add product');
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const res = await deleteProduct(id);
            if (res.success) {
                toast.success('Product deleted');
                fetchProducts();
            } else {
                toast.error('Delete failed');
            }
        }
    };

    const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
        const result = await updateOrderStatus(orderId, newStatus);
        if (result.success) {
            toast.success(`Order status updated to ${newStatus}`);
            fetchOrders();
        } else {
            toast.error('Failed to update status');
        }
    };

    const handleProductionStatusChange = async (orderId: string, newStatus: Order['productionStatus']) => {
        const result = await updateOrderProductionStatus(orderId, newStatus!);
        if (result.success) {
            toast.success(`Production stage updated to ${newStatus}`);
            fetchOrders();
        } else {
            toast.error('Failed to update production stage');
        }
    };

    const handleConvertQuote = async (orderId: string) => {
        if (window.confirm('Convert this quote into an official order for production?')) {
            const result = await convertQuoteToOrder(orderId);
            if (result.success) {
                toast.success('Quote successfully converted to Order');
                fetchOrders();
            } else {
                toast.error('Conversion failed');
            }
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesFilter = filter === 'all' || order.status === filter;
        const matchesSearch = order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        totalOrders: orders.length,
        totalProducts: products.length,
        revenue: orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0),
        activeQuotes: orders.filter(o => o.type === 'quote').length,
        rushOrders: orders.filter(o => o.isRush).length,
        quoteConversion: orders.length > 0 ? (orders.filter(o => o.type === 'order').length / orders.length * 100).toFixed(1) : 0,
        slaBreaches: slaAlerts.breached.length,
        slaRisks: slaAlerts.risks.length
    };

    if (authLoadingState || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <RefreshCcw className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="h-32 w-full flex-shrink-0" /> {/* Dedicated Navbar Clearance */}
            <div className="flex-1 p-4 md:p-8 text-[#0F2E4D]">
                {/* Header */}
                <div className="max-w-7xl mx-auto mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-black text-[#0F2E4D] tracking-tight">Management Console</h1>
                            <p className="text-gray-500 mt-2 font-medium">Powering Lanyard Nation's backend operations</p>
                        </div>

                        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200">
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'orders'
                                    ? 'bg-[#0F2E4D] text-white shadow-lg'
                                    : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                <ShoppingBag className="w-4 h-4" />
                                Orders
                            </button>
                            <button
                                onClick={() => setActiveTab('inventory')}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'inventory'
                                    ? 'bg-[#0F2E4D] text-white shadow-lg'
                                    : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                <Package className="w-4 h-4" />
                                Inventory
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                    <StatCard icon={<ShoppingBag className="text-blue-600" />} label="Total Volume" value={stats.totalOrders} />
                    <StatCard icon={<FileText className="text-amber-600" />} label="Active Quotes" value={stats.activeQuotes} />
                    <StatCard icon={<Clock className="text-red-600" />} label="Rush Orders" value={stats.rushOrders} />
                    <StatCard icon={<AlertTriangle className="text-red-700" />} label="SLA Breaches" value={stats.slaBreaches} />
                    <StatCard icon={<RefreshCcw className="text-emerald-600" />} label="Conversion" value={`${stats.quoteConversion}%`} />
                </div>

                {/* SLA Alerts */}
                {activeTab === 'orders' && (slaAlerts.risks.length > 0 || slaAlerts.breached.length > 0) && (
                    <div className="max-w-7xl mx-auto mb-8 space-y-4">
                        {slaAlerts.breached.map(b => (
                            <div key={b.id} className="bg-red-50 border-2 border-red-100 p-4 rounded-2xl flex items-center justify-between animate-pulse">
                                <div className="flex items-center gap-4">
                                    <div className="bg-red-500 p-2 rounded-xl text-white">
                                        <AlertTriangle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-black text-red-700 uppercase tracking-widest text-sm">SLA BREACHED: Order #{b.id.slice(-6).toUpperCase()}</p>
                                        <p className="text-[10px] text-red-600 font-bold uppercase">Proof should have been sent by {b.sla_deadline.toDate().toLocaleTimeString()}</p>
                                    </div>
                                </div>
                                <button className="bg-red-600 text-white px-6 py-2 rounded-xl text-xs font-black shadow-lg shadow-red-500/20">URGENT ACTION</button>
                            </div>
                        ))}
                        {slaAlerts.risks.map(r => (
                            <div key={r.id} className="bg-amber-50 border-2 border-amber-100 p-4 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="bg-amber-500 p-2 rounded-xl text-white">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-black text-amber-700 uppercase tracking-widest text-sm">SLA RISK: Order #{r.id.slice(-6).toUpperCase()}</p>
                                        <p className="text-[10px] text-amber-600 font-bold uppercase">Proof deadline in less than 15 minutes</p>
                                    </div>
                                </div>
                                <span className="text-amber-600 font-black text-xs uppercase tracking-widest">Nearing Deadline</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Main Content Area */}
                <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder={activeTab === 'orders' ? "Search orders..." : "Search product catalogue..."}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#0F2E4D] transition-all font-medium"
                            />
                        </div>

                        {activeTab === 'inventory' && (
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/20 cursor-pointer">
                                    <Upload className="w-5 h-5" />
                                    Bulk Upload (CSV)
                                    <input type="file" accept=".csv" className="hidden" onChange={handleBulkUpload} />
                                </label>
                                <button
                                    onClick={() => setShowAddProduct(true)}
                                    className="flex items-center gap-2 bg-[#2D7F88] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#0F2E4D] transition-all shadow-lg hover:shadow-[#2D7F88]/20"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add New Product
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        {activeTab === 'orders' ? (
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 text-gray-500 text-[11px] uppercase tracking-widest font-black">
                                    <tr>
                                        <th className="px-8 py-5">Order Reference</th>
                                        <th className="px-8 py-5">Lead Segment</th>
                                        <th className="px-8 py-5">Valuation</th>
                                        <th className="px-8 py-5">Production Stage</th>
                                        <th className="px-8 py-5 text-right">Operations</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 font-medium">
                                    {filteredOrders.length === 0 ? (
                                        <tr><td colSpan={5} className="py-20 text-center text-gray-400 font-bold">No orders found</td></tr>
                                    ) : (
                                        filteredOrders.map(order => (
                                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${order.type === 'quote' ? 'border-amber-200 text-amber-600 bg-amber-50' : 'border-blue-200 text-blue-600 bg-blue-50'}`}>
                                                            {order.type || 'order'}
                                                        </span>
                                                        <span className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-black shadow-sm group-hover:border-blue-200 transition-all">
                                                            #{order.id.slice(-6).toUpperCase()}
                                                        </span>
                                                        {order.isRush && (
                                                            <span className="bg-red-500 text-white px-2 py-0.5 rounded text-[8px] font-black animate-pulse">RUSH</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="text-sm font-bold text-[#0F2E4D]">{order.customerEmail}</div>
                                                    <div className="flex items-center gap-1.5 mt-1">
                                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                                            {order.customerType?.replace('-', ' ') || 'Individual'}
                                                        </span>
                                                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{order.items?.length || 0} SKUs</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-sm font-black text-[#2D7F88]">₹{order.totalAmount?.toLocaleString()}</td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col gap-1.5">
                                                        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider w-fit ${getStatusStyles(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                        {order.productionStatus && (
                                                            <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-[0.15em] w-fit border ${getProductionStyles(order.productionStatus)}`}>
                                                                {order.productionStatus.replace('-', ' ')}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => generatePickList(order)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                            title="Generate Pick List"
                                                        >
                                                            <FileText className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => generateShippingLabel(order)}
                                                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                                            title="Generate Shipping Label"
                                                        >
                                                            <Printer className="w-4 h-4" />
                                                        </button>
                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[9px] font-black text-gray-400 w-16 uppercase">Logistics</span>
                                                                <select
                                                                    className="text-[10px] bg-gray-50 border-0 rounded-lg px-2 py-1 font-bold focus:ring-2 focus:ring-[#0F2E4D] outline-none cursor-pointer"
                                                                    value={order.status}
                                                                    onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                                                                >
                                                                    <option value="pending">Hold</option>
                                                                    <option value="processing">Process</option>
                                                                    <option value="shipped">Ship</option>
                                                                    <option value="delivered">Deliver</option>
                                                                </select>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[9px] font-black text-gray-400 w-16 uppercase">Production</span>
                                                                <select
                                                                    className="text-[10px] bg-gray-50 border-0 rounded-lg px-2 py-1 font-bold focus:ring-2 focus:ring-[#0F2E4D] outline-none cursor-pointer"
                                                                    value={order.productionStatus || ''}
                                                                    onChange={(e) => handleProductionStatusChange(order.id, e.target.value as Order['productionStatus'])}
                                                                >
                                                                    <option value="">N/A</option>
                                                                    <option value="awaiting-proof">Proofing</option>
                                                                    <option value="proof-approved">Approved</option>
                                                                    <option value="in-production">In Prod</option>
                                                                    <option value="quality-check">QC Pass</option>
                                                                </select>
                                                            </div>
                                                            {order.type === 'quote' && (
                                                                <button
                                                                    onClick={() => handleConvertQuote(order.id)}
                                                                    className="w-full py-1.5 bg-emerald-500 text-white text-[10px] font-black rounded-lg uppercase tracking-wider hover:bg-emerald-600 transition-all mt-1"
                                                                >
                                                                    Approve Quote
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 text-gray-500 text-[11px] uppercase tracking-widest font-black">
                                    <tr>
                                        <th className="px-8 py-5">Product Assets</th>
                                        <th className="px-8 py-5">Classification</th>
                                        <th className="px-8 py-5">Pricing</th>
                                        <th className="px-8 py-5">Availability</th>
                                        <th className="px-8 py-5 text-right">Operations</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 font-medium">
                                    {filteredProducts.length === 0 ? (
                                        <tr><td colSpan={5} className="py-20 text-center text-gray-400 font-bold">No products in catalogue</td></tr>
                                    ) : (
                                        filteredProducts.map(product => (
                                            <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <img src={product.image} className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-sm" alt="" />
                                                        <div>
                                                            <div className="text-sm font-black text-[#0F2E4D]">{product.name}</div>
                                                            <div className="text-[10px] text-gray-400 line-clamp-1 max-w-[200px]">{product.description}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="text-[10px] text-gray-400 uppercase tracking-widest font-black">{product.category}</div>
                                                    <div className="text-xs text-[#0F2E4D] font-bold mt-1">{product.subcategory}</div>
                                                </td>
                                                <td className="px-8 py-6 text-sm font-black text-[#2D7F88]">₹{product.price}</td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col">
                                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter w-fit ${product.stock > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                                            }`}>
                                                            {product.stock > 0 ? 'In Stock' : 'Stock Out'}
                                                        </span>
                                                        <span className="text-[10px] text-gray-400 font-bold mt-1 px-1">
                                                            {product.stock} Units Available
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button
                                                        onClick={() => handleDeleteProduct(product.id)}
                                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Add Product Modal */}
                {showAddProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <div className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-200">
                            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <div>
                                    <h2 className="text-2xl font-black text-[#0F2E4D]">Configure New Product</h2>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Global SKU Management</p>
                                </div>
                                <button onClick={() => setShowAddProduct(false)} className="p-2 hover:bg-white rounded-full transition-all">
                                    <CloseIcon className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleAddProduct} className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Product Identity</label>
                                        <div className="relative">
                                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                required
                                                type="text"
                                                placeholder="SKU Name"
                                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#0F2E4D] outline-none font-bold"
                                                value={newProduct.name}
                                                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Unit Valuation (₹)</label>
                                        <div className="relative">
                                            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                required
                                                type="number"
                                                placeholder="Cost Price"
                                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#0F2E4D] outline-none font-bold"
                                                value={newProduct.price}
                                                onChange={e => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Product Narrative</label>
                                    <textarea
                                        required
                                        placeholder="Technical specifications and feature set..."
                                        rows={3}
                                        className="w-full p-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#0F2E4D] outline-none font-medium text-sm"
                                        value={newProduct.description}
                                        onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Asset Reference (URL)</label>
                                        <div className="relative">
                                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                required
                                                type="url"
                                                placeholder="Cloudfront/Unsplash URL"
                                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#0F2E4D] outline-none font-bold text-sm"
                                                value={newProduct.image}
                                                onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Master Category</label>
                                        <div className="relative">
                                            <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <select
                                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#0F2E4D] outline-none font-bold"
                                                value={newProduct.category}
                                                onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                                            >
                                                <option value="wristbands">Wristbands</option>
                                                <option value="lanyards-id">Lanyards & ID</option>
                                                <option value="drinkware">Drinkware</option>
                                                <option value="bags">Bags & Totebags</option>
                                                <option value="usb-tech">Technology</option>
                                                <option value="marketing">Marketing & Stickers</option>
                                                <option value="tradeshow">Tradeshow</option>
                                                <option value="home-health">Home & Health</option>
                                                <option value="outdoor">Outdoor & Leisure</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Stock Quantity</label>
                                        <div className="relative">
                                            <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                required
                                                type="number"
                                                placeholder="Units"
                                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-[#0F2E4D] outline-none font-bold"
                                                value={newProduct.stock}
                                                onChange={e => {
                                                    const val = parseInt(e.target.value);
                                                    setNewProduct({ ...newProduct, stock: val, inStock: val > 0 });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[#0F2E4D] text-white rounded-[20px] font-black text-lg shadow-xl shadow-[#0F2E4D]/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
                                >
                                    Deploy to Catalogue
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
    <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="bg-gray-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
            {icon}
        </div>
        <div className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</div>
        <div className="text-3xl font-black text-[#0F2E4D] tracking-tight">{value}</div>
    </div>
);

const getProductionStyles = (status: Order['productionStatus']) => {
    switch (status) {
        case 'awaiting-proof': return 'bg-amber-50 text-amber-600 border-amber-100';
        case 'proof-approved': return 'bg-blue-50 text-blue-600 border-blue-100';
        case 'in-production': return 'bg-purple-50 text-purple-600 border-purple-100';
        case 'quality-check': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
        default: return 'bg-gray-50 text-gray-400 border-gray-100';
    }
}

const getStatusStyles = (status: Order['status']) => {
    switch (status) {
        case 'delivered': return 'bg-emerald-100 text-emerald-700';
        case 'shipped': return 'bg-blue-100 text-blue-700';
        case 'pending': return 'bg-amber-100 text-amber-700';
        case 'cancelled': return 'bg-red-100 text-red-700';
        case 'processing': return 'bg-purple-100 text-purple-700';
        default: return 'bg-gray-100 text-gray-700';
    }
};
