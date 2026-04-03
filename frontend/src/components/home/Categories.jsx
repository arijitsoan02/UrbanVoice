import React from 'react';
import { Droplet, Zap, Trash2, Construction, MoreHorizontal } from 'lucide-react';

const cats = [
  { name: 'Road', icon: <Construction />, color: 'hover:bg-amber-500' },
  { name: 'Water', icon: <Droplet />, color: 'hover:bg-blue-500' },
  { name: 'Electricity', icon: <Zap />, color: 'hover:bg-yellow-500' },
  { name: 'Garbage', icon: <Trash2 />, color: 'hover:bg-green-500' },
  { name: 'Other', icon: <MoreHorizontal />, color: 'hover:bg-slate-500' },
];

const Categories = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl font-black text-slate-900 mb-12">Reporting Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {cats.map((item) => (
            <div key={item.name} className={`flex flex-col items-center p-8 rounded-[2rem] bg-slate-50 transition-all duration-300 group cursor-pointer ${item.color} hover:text-white`}>
              <div className="mb-4 transform group-hover:scale-110 transition-transform">
                {React.cloneElement(item.icon, { size: 40 })}
              </div>
              <span className="font-bold text-lg">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;