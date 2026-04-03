import React, { useContext, useState, useEffect } from 'react';
import { UrbanContext } from '../context/urbanContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight } from 'lucide-react';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(UrbanContext);
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState('Login');
  const [showPassword, setShowPassword] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/user/signup`, { name, email, password });
        
        // Checking for 'success' or the admin 'sucess' fallback
        if (response.data.success || response.data.sucess) {
          setToken(response.data.token);
          toast.success("Account created successfully");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/user/login`, { email, password });
        
        // Checking for 'success' or the admin 'sucess' fallback
        if (response.data.success || response.data.sucess) {
          setToken(response.data.token);
          toast.success("Welcome back!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 p-8 md:p-12 transition-all">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight uppercase">
            {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
          </h2>
          <p className="text-slate-500 font-medium">
            {currentState === 'Login' ? 'Welcome back to Urban Voice' : 'Join our community today'}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {currentState === 'Sign Up' && (
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPassword ? "text" : "password"}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-all active:scale-[0.98] mt-4"
          >
            {currentState === 'Login' ? 'Login' : 'Create Account'}
            <ArrowRight size={20} />
          </button>

          <div className="text-center mt-8">
            <p className="text-slate-500 font-medium">
              {currentState === 'Login' ? "Don't have an account?" : "Already have an account?"}{' '}
              <span
                onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
                className="text-blue-600 font-bold cursor-pointer hover:underline"
              >
                {currentState === 'Login' ? 'Sign Up Now' : 'Login Here'}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;