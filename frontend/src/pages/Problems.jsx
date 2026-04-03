import React, { useEffect, useState, useContext } from 'react';
import { UrbanContext } from '../context/urbanContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    MapPin,
    Clock,
    ArrowUpCircle,
    ArrowRight,
    Layers,
    Search,
    Loader2,
    Sparkles
} from 'lucide-react';

const Problems = () => {
    const { backendUrl, token } = useContext(UrbanContext);
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const categories = ["All", "Road", "Water", "Electricity", "Garbage", "Other"];

    const fetchProblems = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${backendUrl}/problems/list`, {
                headers: { token }
            });
            if (response.data.success) {
                setProblems(response.data.problem);
            }
        } catch (error) {
            toast.error("Failed to load feed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProblems();
    }, []);

    // Search + Filter Logic
    const filteredProblems = problems.filter(p => {
        const matchesCategory = filter === 'All' || p.category === filter;
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.location.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfeff]">
                <Loader2 className="animate-spin text-blue-600" size={50} />
                <p className="text-slate-500 font-bold tracking-widest uppercase text-xs mt-4">Polishing the Feed...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F7FE] flex flex-col">
            {/* Header Area */}
            <div className="bg-white/70 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-200">
                            <Layers className="text-white" size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none">Live Issues</h2>
                            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mt-1">City Dashboard</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                        <div className="relative w-full sm:w-72 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Find an issue..."
                                className="w-full bg-slate-100/50 border border-transparent rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${filter === cat
                                            ? 'bg-slate-900 text-white border-slate-900 shadow-xl'
                                            : 'bg-white text-slate-500 border-slate-100 hover:border-blue-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content - No bottom padding to stay close to footer */}
            <div className="max-w-7xl mx-auto px-6 py-12 flex-grow">
                {filteredProblems.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="bg-white inline-block p-10 rounded-[3rem] shadow-sm border-2 border-dashed border-slate-200">
                            <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No results found</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {filteredProblems.map((problem) => (
                            <Link
                                to={`/problems/${problem._id}`}
                                key={problem._id}
                                className={`group relative rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col md:flex-row gap-6 overflow-hidden border border-white/50 ${getCardBg(problem.category)}`}
                            >
                                {/* Thumbnail */}
                                <div className="md:w-56 h-56 md:h-auto shrink-0 relative overflow-hidden rounded-[2rem] shadow-lg">
                                    {problem.images?.length > 0 ? (
                                        <img
                                            src={problem.images[0]}
                                            alt="issue"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-white/20 flex flex-col items-center justify-center text-white/50">
                                            <Layers size={32} strokeWidth={1} />
                                            <span className="text-[10px] font-bold mt-2 tracking-widest uppercase">No Image</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md bg-white/90 ${getStatusStyle(problem.status)}`}>
                                            {problem.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 py-4 pr-4 flex flex-col justify-between relative z-10 text-slate-800">
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-tighter shadow-sm bg-white/60 text-slate-800`}>
                                                {problem.category}
                                            </span>
                                            <div className="w-1.5 h-1.5 bg-slate-400/30 rounded-full"></div>
                                            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase">
                                                <Clock size={12} /> {new Date(problem.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-black text-slate-900 leading-[1.2] mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                                            {problem.title}
                                        </h3>

                                        <div className="flex items-center gap-2 text-slate-600 font-bold bg-white/40 self-start px-3 py-1.5 rounded-xl border border-white/50 shadow-sm">
                                            <MapPin size={14} className="text-red-500" />
                                            <span className="text-xs truncate max-w-[150px]">{problem.location}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/30">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-2xl shadow-sm border border-white">
                                                <ArrowUpCircle size={20} className="text-blue-600" />
                                                <span className="text-sm font-black text-slate-900">{problem.votes?.length || 0}</span>
                                            </div>
                                            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Supports</span>
                                        </div>

                                        <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white group-hover:bg-blue-600 transition-all shadow-lg group-hover:translate-x-1">
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- STYLING HELPERS ---

const getCardBg = (cat) => {
    switch (cat) {
        case 'Road': return 'bg-gradient-to-br from-orange-50 to-orange-100/50';
        case 'Water': return 'bg-gradient-to-br from-cyan-50 to-blue-100/50';
        case 'Electricity': return 'bg-gradient-to-br from-yellow-50 to-amber-100/50';
        case 'Garbage': return 'bg-gradient-to-br from-emerald-50 to-green-100/50';
        case 'Other': return 'bg-gradient-to-br from-purple-50 to-indigo-100/50';
        default: return 'bg-white';
    }
};

const getStatusStyle = (status) => {
    switch (status) {
        case 'Resolved': return 'text-green-600';
        case 'In Progress': return 'text-blue-600';
        case 'Rejected': return 'text-red-600';
        case 'Accepted': return 'text-purple-600';
        default: return 'text-slate-500';
    }
};

const getCategoryStyle = (cat) => {
    switch (cat) {
        case 'Road': return 'bg-orange-100 text-orange-600';
        case 'Water': return 'bg-cyan-100 text-cyan-600';
        case 'Electricity': return 'bg-yellow-100 text-yellow-600';
        case 'Garbage': return 'bg-emerald-100 text-emerald-600';
        default: return 'bg-blue-100 text-blue-600';
    }
};

export default Problems;