import React from 'react';

const Stats = () => {
  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-[100px]"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center relative z-10">
        <div>
          <h2 className="text-6xl font-black mb-2 tracking-tight">450+</h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Problems Reported</p>
        </div>
        <div>
          <h2 className="text-6xl font-black mb-2 tracking-tight text-blue-500">320+</h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Issues Resolved</p>
        </div>
        <div>
          <h2 className="text-6xl font-black mb-2 tracking-tight">1.2k</h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Community Votes</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;