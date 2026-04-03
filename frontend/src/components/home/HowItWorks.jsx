import React from 'react';
import { Camera, Vote, Navigation, CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  { icon: <Camera />, title: 'Report', desc: 'Snap a photo and describe the issue.', color: 'bg-blue-100 text-blue-600' },
  { icon: <Vote />, title: 'Vote', desc: 'Community validates the priority.', color: 'bg-purple-100 text-purple-600' },
  { icon: <Navigation />, title: 'Track', desc: 'Watch the status change in real-time.', color: 'bg-orange-100 text-orange-600' },
  { icon: <CheckCircle2 />, title: 'Resolve', desc: 'Authorities fix and confirm completion.', color: 'bg-green-100 text-green-600' },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4">How Urban Voice Works</h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mb-6`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 z-10 text-slate-200">
                  <ArrowRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;