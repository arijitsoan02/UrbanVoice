import React, { useEffect, useState, useContext } from 'react';
import { AdminContext } from '../context/adminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
    Trash2, 
    ExternalLink, 
    MapPin, 
    Filter, 
    Search, 
    Loader2, 
    Calendar,
    Tag
} from 'lucide-react';

const AllProblems = () => {
    const { backendUrl, adminToken } = useContext(AdminContext);
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // New Filter States
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    const statusOptions = ["Submitted", "Accepted", "Rejected", "In Progress", "Resolved"];
    const categories = ["All", "Road", "Water", "Electricity", "Garbage", "Other"];

    const fetchAllProblems = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${backendUrl}/problems/list`, {
                headers: { token: adminToken }
            });
            if (response.data.success) {
                setProblems(response.data.problem);
            }
        } catch (error) {
            toast.error("Failed to fetch reports");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await axios.put(`${backendUrl}/problems/${id}/status`, 
                { status: newStatus },
                { headers: { token: adminToken } }
            );
            if (response.data.success) {
                toast.success(`Status updated to ${newStatus}`);
                fetchAllProblems();
            }
        } catch (error) {
            toast.error("Update failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this report permanently?")) return;
        try {
            const response = await axios.delete(`${backendUrl}/problems/${id}/delete`, {
                headers: { token: adminToken }
            });
            if (response.data.success) {
                toast.success("Report deleted successfully");
                setProblems(prev => prev.filter(p => p._id !== id));
            }
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    useEffect(() => {
        fetchAllProblems();
    }, []);

    // Enhanced Filter Logic
    const filteredProblems = problems.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             p.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
        const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
        
        return matchesSearch && matchesCategory && matchesStatus;
    });

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Manage Reports</h1>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Full city oversight</p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-3 w-full lg:w-auto">
                    {/* Category Filter */}
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-4 py-2 w-full md:w-auto shadow-sm">
                        <Tag size={16} className="text-slate-400" />
                        <select 
                            className="outline-none text-sm font-bold text-slate-700 bg-transparent cursor-pointer min-w-[100px]"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            {categories.map(cat => <option key={cat} value={cat}>{cat} Category</option>)}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-4 py-2 w-full md:w-auto shadow-sm">
                        <Filter size={16} className="text-slate-400" />
                        <select 
                            className="outline-none text-sm font-bold text-slate-700 bg-transparent cursor-pointer min-w-[100px]"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-80 shadow-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text"
                            placeholder="Search title or area..."
                            className="bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-6 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all w-full font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Issue</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Reporter</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Votes</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredProblems.map((problem) => (
                                <tr key={problem._id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src={problem.images[0]} 
                                                className="w-14 h-14 rounded-xl object-cover border border-slate-100 shadow-sm" 
                                                alt="" 
                                            />
                                            <div>
                                                <p className="font-bold text-slate-900 leading-tight mb-1">{problem.title}</p>
                                                <div className="flex items-center gap-1 text-slate-400 text-[11px] font-medium">
                                                    <MapPin size={12} className="text-blue-500" /> {problem.location}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* New Category Column */}
                                    <td className="px-6 py-6">
                                        <span className="text-[10px] font-black px-3 py-1 bg-slate-100 text-slate-600 rounded-lg uppercase tracking-wider">
                                            {problem.category}
                                        </span>
                                    </td>

                                    <td className="px-6 py-6">
                                        <p className="font-bold text-slate-700 text-sm">{problem.createdBy?.name || 'Unknown'}</p>
                                        <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-1 uppercase tracking-tighter">
                                            <Calendar size={10} /> {new Date(problem.createdAt).toLocaleDateString()}
                                        </p>
                                    </td>

                                    <td className="px-6 py-6">
                                        <select 
                                            value={problem.status}
                                            onChange={(e) => handleStatusChange(problem._id, e.target.value)}
                                            className={`text-[11px] font-black uppercase tracking-widest px-3 py-2 rounded-xl outline-none cursor-pointer border-none transition-all shadow-sm ${getStatusStyle(problem.status)}`}
                                        >
                                            {statusOptions.map(opt => (
                                                <option key={opt} value={opt} className="bg-white text-slate-900">{opt}</option>
                                            ))}
                                        </select>
                                    </td>

                                    <td className="px-6 py-6">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full">
                                            <span className="text-sm font-black text-slate-700">{problem.votes?.length || 0}</span>
                                        </div>
                                    </td>

                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => handleDelete(problem._id)}
                                                className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all rounded-xl"
                                                title="Delete Problem"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <a 
                                                href={`${import.meta.env.VITE_USER_FRONTEND_URL}/problems/${problem._id}`}
                                                target="_blank"
                                                className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all rounded-xl"
                                                title="View in Frontend"
                                            >
                                                <ExternalLink size={18} />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {filteredProblems.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">No reports match these filters</p>
                    </div>
                ) }
            </div>
        </div>
    );
};

const getStatusStyle = (status) => {
    switch (status) {
        case 'Resolved': return 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200';
        case 'In Progress': return 'bg-blue-100 text-blue-600 hover:bg-blue-200';
        case 'Rejected': return 'bg-red-100 text-red-600 hover:bg-red-200';
        case 'Accepted': return 'bg-purple-100 text-purple-600 hover:bg-purple-200';
        default: return 'bg-slate-100 text-slate-600 hover:bg-slate-200';
    }
};

export default AllProblems;