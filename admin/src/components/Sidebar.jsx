import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/adminContext'
import { 
  LayoutDashboard, 
  ListTree, 
  Users, 
  LogOut, 
  ShieldCheck 
} from 'lucide-react'

const Sidebar = () => {
  const { setAdminToken } = useContext(AdminContext);

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={22} /> },
    { name: 'All Reports', path: '/all-problems', icon: <ListTree size={22} /> },
    { name: 'Manage Users', path: '/users', icon: <Users size={22} /> },
  ];

  const handleLogout = () => {
    setAdminToken('');
    // Context useEffect will automatically clear localStorage
  };

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-slate-400 flex flex-col fixed border-r border-slate-800 shadow-2xl">
      
      {/* Admin Branding */}
      <div className="p-8 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-600/20">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-white font-black tracking-tighter text-xl uppercase">
              Admin<span className="text-blue-500">Panel</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Urban Voice</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-sm transition-all duration-300
              ${isActive 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20 translate-x-2' 
                : 'hover:bg-slate-800 hover:text-white hover:translate-x-1'
              }
            `}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button at bottom */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-sm text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
        >
          <LogOut size={22} />
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Sidebar