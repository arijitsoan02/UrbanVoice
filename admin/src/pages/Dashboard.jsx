import React, { useEffect, useState, useContext } from 'react';
import { AdminContext } from '../context/adminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
    Activity, 
    CheckCircle, 
    Clock, 
    AlertTriangle, 
    ThumbsUp, 
    BarChart3,
    TrendingUp
} from 'lucide-react';

const Dashboard = () => {
    const { backendUrl, adminToken } = useContext(AdminContext);
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${backendUrl}/problems/list`, {
                headers: { token: adminToken }
            });
            if (response.data.success) {
                setProblems(response.data.problem);
            }
        } catch (error) {
            toast.error("Failed to load dashboard statistics");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Logic to calculate statistics
    const stats = {
        total: problems.length,
        submitted: problems.filter(p => p.status === 'Submitted').length,
        inProgress: problems.filter(p => p.status === 'In Progress').length,
        resolved: problems.filter(p => p.status === 'Resolved').length,
        totalVotes: problems.reduce((acc, curr) => acc + (curr.votes?.length || 0), 0),
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Executive Overview</h1>
                <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-widest">Real-time City Infrastructure Monitoring</p>
            </div>

            {/* Top Row Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard 
                    title="Total Reports" 
                    value={stats.total} 
                    icon={<Activity size={20} />} 
                    color="bg-indigo-600" 
                />
                <StatsCard 
                    title="Action Required" 
                    value={stats.submitted} 
                    icon={<AlertTriangle size={20} />} 
                    color="bg-amber-500" 
                />
                <StatsCard 
                    title="In Progress" 
                    value={stats.inProgress} 
                    icon={<Clock size={20} />} 
                    color="bg-blue-500" 
                />
                <StatsCard 
                    title="Resolved" 
                    value={stats.resolved} 
                    icon={<CheckCircle size={20} />} 
                    color="bg-emerald-500" 
                />
            </div>

            {/* Secondary Row: Engagement Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Votes Summary */}
                <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-800">Public Engagement</h3>
                        <ThumbsUp className="text-blue-600" size={24} />
                    </div>
                    <div>
                        <p className="text-5xl font-black text-slate-900 tracking-tighter">{stats.totalVotes}</p>
                        <p className="text-slate-400 font-bold text-xs uppercase mt-2">Total Community Votes</p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-2 text-emerald-600 font-bold text-sm">
                        <TrendingUp size={16} /> 
                        <span>Active participation</span>
                    </div>
                </div>

                {/* Status Distribution Visualization (CSS Bar Chart) */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Resolution Pipeline</h3>
                        <BarChart3 size={20} className="text-slate-400" />
                    </div>
                    <div className="space-y-6">
                        <ProgressBar label="New Submissions" value={stats.submitted} total={stats.total} color="bg-amber-500" />
                        <ProgressBar label="Work in Progress" value={stats.inProgress} total={stats.total} color="bg-blue-500" />
                        <ProgressBar label="Completed Tasks" value={stats.resolved} total={stats.total} color="bg-emerald-500" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sub-component: StatsCard
const StatsCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
        <div className="flex items-center gap-4">
            <div className={`${color} p-3 rounded-2xl text-white shadow-lg shadow-inherit/20`}>
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
                <p className="text-2xl font-black text-slate-900 leading-tight">{value}</p>
            </div>
        </div>
    </div>
);

// Sub-component: ProgressBar for Dashboard
const ProgressBar = ({ label, value, total, color }) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                <span className="text-slate-500">{label}</span>
                <span className="text-slate-900">{value} ({Math.round(percentage)}%)</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                    className={`${color} h-full transition-all duration-1000`} 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default Dashboard;