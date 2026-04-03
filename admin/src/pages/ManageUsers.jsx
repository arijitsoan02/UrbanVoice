import React, { useEffect, useState, useContext } from 'react';
import { AdminContext } from '../context/adminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
    UserMinus, 
    Mail, 
    Shield, 
    User as UserIcon,
    Loader2,
    Search,
    Hash
} from 'lucide-react';

const ManageUsers = () => {
    const { backendUrl, adminToken } = useContext(AdminContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${backendUrl}/user/all-users`, {
                headers: { token: adminToken }
            });
            if (response.data.success) {
                setUsers(response.data.users);
            }
        } catch (error) {
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id, name) => {
        if (!window.confirm(`Are you sure you want to permanently delete user: ${name}? All their reports may become orphaned.`)) return;
        
        try {
            const response = await axios.delete(`${backendUrl}/user/delete-user/${id}`, {
                headers: { token: adminToken }
            });
            if (response.data.success) {
                toast.success("User removed successfully");
                setUsers(prev => prev.filter(u => u._id !== id));
            }
        } catch (error) {
            toast.error("Action failed");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(u => 
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Citizen Directory</h1>
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">Manage platform access and user integrity</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text"
                        placeholder="Search by name or email..."
                        className="bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all w-full md:w-96 font-medium shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                    <div key={user._id} className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group relative overflow-hidden">
                        
                        {/* Role Badge */}
                        <div className="absolute top-6 right-6">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                {user.role || 'User'}
                            </span>
                        </div>

                        <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                <UserIcon size={28} />
                            </div>

                            <div className="space-y-1 pr-12">
                                <h3 className="font-black text-slate-900 text-lg truncate">{user.name}</h3>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Mail size={14} />
                                    <span className="text-xs font-bold truncate">{user.email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                                <Hash size={12} />
                                <span>ID: {user._id.slice(-6)}</span>
                            </div>
                            
                            {/* Prevent Admin from deleting themselves */}
                            {user.role !== 'admin' && (
                                <button 
                                    onClick={() => handleDeleteUser(user._id, user.name)}
                                    className="flex items-center gap-2 text-red-400 hover:text-red-600 font-bold text-xs uppercase tracking-widest transition-colors p-2 hover:bg-red-50 rounded-xl"
                                >
                                    <UserMinus size={16} />
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredUsers.length === 0 && (
                <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No matching users found</p>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;