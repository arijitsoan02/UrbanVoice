import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UrbanContext } from '../context/urbanContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
    MapPin, 
    Clock, 
    ArrowUpCircle, 
    User, 
    ChevronLeft,
    ShieldCheck,
    Info,
    Calendar,
    Loader2
} from 'lucide-react';

const ProblemDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { backendUrl, token } = useContext(UrbanContext);

    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState('');

    const fetchProblemDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${backendUrl}/problems/${id}`);
            if (response.data.success) {
                setProblem(response.data.problem);
                if (response.data.problem.images?.length > 0) {
                    setMainImage(response.data.problem.images[0]);
                }
            }
        } catch (error) {
            toast.error("Problem not found");
            navigate('/problems');
        } finally {
            setLoading(false);
        }
    };

    const handleVote = async () => {
        if (!token) return toast.info("Please login to vote");
        try {
            const response = await axios.post(`${backendUrl}/problems/${id}/vote`, {}, {
                headers: { token }
            });
            if (response.data.success) {
                toast.success("Vote cast successfully!");
                fetchProblemDetails(); // Refresh data to update vote count
            } else {
                toast.warning(response.data.message);
            }
        } catch (error) {
            toast.error("Error casting vote");
        }
    };

    useEffect(() => {
        fetchProblemDetails();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
    );

    if (!problem) return null;

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Top Navigation Bar */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-sm transition-all bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100"
                >
                    <ChevronLeft size={18} /> Back to Feed
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* Left Column: Image Gallery & Description */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Main Image Viewer */}
                    <div className="bg-white p-3 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                        <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden bg-slate-100">
                            <img src={mainImage} alt="Main" className="w-full h-full object-cover" />
                        </div>
                        
                        {/* Thumbnail Strip */}
                        {problem.images?.length > 1 && (
                            <div className="flex gap-4 mt-4 p-2 overflow-x-auto no-scrollbar">
                                {problem.images.map((img, index) => (
                                    <img 
                                        key={index}
                                        src={img}
                                        onClick={() => setMainImage(img)}
                                        className={`w-24 h-20 object-cover rounded-2xl cursor-pointer transition-all border-2 ${mainImage === img ? 'border-blue-600 scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                        alt={`Thumbnail ${index}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Description Card */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="bg-blue-50 text-blue-600 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                                {problem.category}
                            </span>
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(problem.status)}`}>
                                {problem.status}
                            </span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
                            {problem.title}
                        </h1>
                        <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
                            {problem.description}
                        </p>
                    </div>
                </div>

                {/* Right Column: Sidebar Info & Actions */}
                <div className="space-y-6">
                    {/* Vote & Action Card */}
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">Community Support</h4>
                            <div className="flex items-end gap-2 mb-8">
                                <span className="text-5xl font-black tracking-tighter">{problem.votes?.length || 0}</span>
                                <span className="text-slate-400 font-bold pb-1 text-sm uppercase">Votes Received</span>
                            </div>
                            <button 
                                onClick={handleVote}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-blue-600/30"
                            >
                                <ArrowUpCircle size={24} />
                                Upvote Issue
                            </button>
                            <p className="text-center text-[10px] text-slate-500 mt-4 font-bold uppercase tracking-widest leading-relaxed">
                                More votes increase the visibility <br/> of this issue to authorities.
                            </p>
                        </div>
                        {/* Subtle Background Circle Decor */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
                    </div>

                    {/* Metadata Card */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Location</h5>
                                <p className="text-slate-800 font-bold">{problem.location}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Reported On</h5>
                                <p className="text-slate-800 font-bold">{new Date(problem.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric'})}</p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-50">
                            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Reported By</h5>
                            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-blue-600 border border-slate-100 shadow-sm">
                                    {problem.createdBy?.name?.charAt(0) || 'U'}
                                </div>
                                <span className="text-slate-800 font-bold text-sm">{problem.createdBy?.name || 'Urban Citizen'}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

// Reusable Status Badge Logic
const getStatusColor = (status) => {
    switch (status) {
        case 'Resolved': return 'bg-green-100 text-green-600';
        case 'In Progress': return 'bg-blue-100 text-blue-600';
        case 'Rejected': return 'bg-red-100 text-red-600';
        default: return 'bg-slate-100 text-slate-600';
    }
};

export default ProblemDetails;