import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto bg-blue-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to improve your neighborhood?</h2>
          <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto font-medium">
            Join thousands of active citizens making their cities cleaner, safer, and better every single day.
          </p>
          <button 
            onClick={() => navigate('/create')}
            className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-100 transition-all active:scale-95 shadow-lg"
          >
            Start Reporting Now
          </button>
        </div>
        {/* Decorative background circle */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500 rounded-full opacity-50"></div>
      </div>
    </section>
  );
};

export default CTA;