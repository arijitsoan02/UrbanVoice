import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-white pt-10 pb-20 lg:pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
            #1 Civic Tech Platform
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
            Report local problems. <br />
            <span className="text-blue-600">Make your city better.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
            See a pothole? Power outage? Garbage pile? Report it in 30 seconds and track the resolution in real-time. Join the urban movement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/create')}
              className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl shadow-blue-100 active:scale-95"
            >
              Report a Problem
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => navigate('/problems')}
              className="flex items-center justify-center gap-2 bg-white text-slate-900 border-2 border-slate-100 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all"
            >
              View Feed
            </button>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="absolute -inset-4 bg-blue-100/50 rounded-[3rem] blur-2xl"></div>
          <img 
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000" 
            alt="Smart City" 
            className="relative rounded-[2.5rem] shadow-2xl object-cover h-[500px] w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;