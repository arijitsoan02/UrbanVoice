import React, { useState, useContext, useEffect } from 'react';
import { UrbanContext } from '../context/urbanContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
    Heart, 
    CreditCard, 
    CheckCircle2, 
    ArrowRight, 
    ShieldCheck, 
    Coins,
    Loader2
} from 'lucide-react';

const Donation = () => {
    const { backendUrl, token } = useContext(UrbanContext);
    const [searchParams] = useSearchParams();
    
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Check for success/cancel query parameters from Stripe redirect
    useEffect(() => {
        if (searchParams.get('success')) {
            setIsSuccess(true);
            toast.success("Thank you for your generous contribution!");
        }
        if (searchParams.get('canceled')) {
            toast.error("Payment cancelled.");
        }
    }, [searchParams]);

    const handleDonation = async (e) => {
        e.preventDefault();
        
        if (!token) {
            return toast.error("Please login to make a donation");
        }

        if (!amount || amount <= 0) {
            return toast.warning("Please enter a valid amount");
        }

        try {
            setLoading(true);
            const response = await axios.post(`${backendUrl}/donation/create-session`, 
                { amount: Number(amount) },
                { headers: { token } }
            );

            if (response.data.success) {
                // Redirect user to Stripe's hosted checkout page
                window.location.href = response.data.session_url;
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to initiate payment");
        } finally {
            setLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl shadow-blue-900/5 border border-slate-100 animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={48} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 mb-4">Thank You!</h1>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8">
                        Your contribution helps us build a better, more transparent city for everyone. We've sent a receipt to your email.
                    </p>
                    <button 
                        onClick={() => window.location.href = '/donation'}
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
                    >
                        Make Another Donation
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-20 px-6">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Side: Info */}
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                        <Heart size={14} /> Support Our Mission
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                        Empower Your <span className="text-blue-600">Community.</span>
                    </h1>
                    <p className="text-lg text-slate-500 font-medium leading-relaxed">
                        UrbanVoice is a non-profit initiative. Your donations fund the maintenance of this platform and help us reach more neighborhoods to solve local issues faster.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6 pt-4">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Secure</h4>
                                <p className="text-xs text-slate-400 font-medium">Stripe Encrypted</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-600">
                                <Coins size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Transparent</h4>
                                <p className="text-xs text-slate-400 font-medium">Direct Impact</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Donation Card */}
                <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden">
                    <form onSubmit={handleDonation} className="relative z-10 space-y-8">
                        <div className="space-y-4">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                Enter Amount (USD)
                            </label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-300 group-focus-within:text-blue-600 transition-colors">
                                    $
                                </div>
                                <input 
                                    type="number"
                                    required
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-[2rem] py-8 pl-12 pr-8 text-4xl font-black text-slate-900 outline-none focus:bg-white focus:border-blue-100 transition-all placeholder:text-slate-200"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {[10, 25, 50].map((val) => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => setAmount(val.toString())}
                                    className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${amount === val.toString() ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-500 hover:border-blue-200'}`}
                                >
                                    ${val}
                                </button>
                            ))}
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-blue-600 transition-all hover:shadow-xl hover:shadow-blue-200 active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    Proceed to Payment <ArrowRight size={20} />
                                </>
                            )}
                        </button>

                        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            <CreditCard size={14} /> Powered by Stripe
                        </div>
                    </form>
                    
                    {/* Decorative Background */}
                    <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
                </div>

            </div>
        </div>
    );
};

export default Donation;