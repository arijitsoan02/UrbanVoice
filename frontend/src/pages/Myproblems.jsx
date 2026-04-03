import React, { useEffect, useState, useContext } from 'react';
import { UrbanContext } from '../context/urbanContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    Package,
    CheckCircle2,
    Clock,
    AlertCircle,
    ArrowRight,
    Loader2,
    Plus
} from 'lucide-react';

const Myproblems = () => {
    const { backendUrl, token } = useContext(UrbanContext);
    const [myReports, setMyReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyReports = async () => {
        try {
            setLoading(true);
            // Ensure the header key 'token' matches what your authUser middleware expects
            const response = await axios.get(`${backendUrl}/problems/myproblems`, {
                headers: { token }
            });

            if (response.data.success) {
                setMyReports(response.data.problem);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Could not load your reports");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchMyReports();
        } else {
            toast.error("Pls login to fetch your reports")
        }
    }, [token]);

    // Simple Stat Counters
    const stats = {
        total: myReports.length,
        resolved: myReports.filter(p => p.status === 'Resolved').length,
        pending: myReports.filter(p => p.status === 'Submitted' || p.status === 'In Progress').length
    };

    if (loading) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header / Stats Section */}
            <div className="bg-slate-900 pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Your Dashboard</h1>
                            <p className="text-slate-400 font-medium italic">Tracking your contribution to a better city.</p>
                        </div>
                        <Link to="/create" className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40 w-fit">
                            <Plus size={20} /> New Report
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
                        <StatCard label="Total Reports" value={stats.total} color="bg-slate-800 text-white" />
                        <StatCard label="Resolved" value={stats.resolved} color="bg-green-500/10 text-green-400 border border-green-500/20" />
                        <StatCard label="Pending Action" value={stats.pending} color="bg-blue-500/10 text-blue-400 border border-blue-500/20" />
                    </div>
                </div>
            </div>

            {/* Reports List */}
            <div className="max-w-7xl mx-auto px-6 -mt-10">
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="font-black text-xl text-slate-800">Recent Submissions</h3>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing {myReports.length} items</span>
                    </div>

                    {myReports.length === 0 ? (
                        <div className="py-20 text-center">
                            <Package className="mx-auto text-slate-200 mb-4" size={60} />
                            <p className="text-slate-500 font-bold">You haven't reported any problems yet.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {myReports.map((problem) => (
                                <div key={problem._id} className="p-6 md:p-8 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-start gap-6">
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                                            <img src={problem.images[0]} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${getStatusColor(problem.status)}`}>
                                                    {problem.status}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">{problem.category}</span>
                                            </div>
                                            <h4 className="text-lg font-bold text-slate-900 mb-1">{problem.title}</h4>
                                            <p className="text-sm text-slate-500 flex items-center gap-1 font-medium italic">
                                                <Clock size={14} /> Last Update: {new Date(problem.updatedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 pl-24 md:pl-0">
                                        <div className="text-right hidden md:block">
                                            <p className="text-lg font-black text-slate-900 leading-none">{problem.votes?.length || 0}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Community Votes</p>
                                        </div>
                                        <Link to={`/problems/${problem._id}`} className="p-3 bg-slate-100 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                                            <ArrowRight size={20} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, color }) => (
    <div className={`p-6 rounded-3xl ${color}`}>
        <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">{label}</p>
        <p className="text-3xl font-black">{value}</p>
    </div>
);

const getStatusColor = (status) => {
    switch (status) {
        case 'Resolved': return 'bg-green-100 text-green-600';
        case 'In Progress': return 'bg-blue-100 text-blue-600';
        case 'Rejected': return 'bg-red-100 text-red-600';
        default: return 'bg-slate-100 text-slate-600';
    }
};

export default Myproblems;