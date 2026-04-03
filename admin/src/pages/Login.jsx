import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/adminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const { setAdminToken, backendUrl } = useContext(AdminContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            // Targeting the existing login route in your userController
            const response = await axios.post(`${backendUrl}/user/login`, { email, password });

            // Checking the 'success' (or your backend's 'sucess' typo fallback)
            if (response.data.success || response.data.sucess) {
                // Check if the returned user is actually an admin
                if (response.data.user.role === 'admin') {
                    setAdminToken(response.data.token);
                    toast.success("Welcome, Administrator");
                } else {
                    toast.error("Access Denied: Not an Admin account");
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Server connection failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl rounded-[2.5rem] border border-slate-700 p-10 shadow-2xl relative z-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/20">
                        <ShieldCheck className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight uppercase">
                        Admin<span className="text-blue-500">Portal</span>
                    </h1>
                    <p className="text-slate-400 font-medium mt-2">Secure Management Access</p>
                </div>

                <form onSubmit={onSubmitHandler} className="space-y-6">
                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Admin Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                                placeholder="admin@urbanvoice.com"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Security Key</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-12 text-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                                placeholder="••••••••"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/20 transition-all active:scale-[0.98] mt-4"
                    >
                        Authenticate
                        <ArrowRight size={20} />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
                        Authorized Personnel Only
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;