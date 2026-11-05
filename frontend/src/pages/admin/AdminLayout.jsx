import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  RiDashboardLine,
  RiShoppingBag3Line,
  RiMailLine,
  RiAddCircleLine,
  RiLayoutMasonryLine,
  RiLogoutBoxRLine,
  RiExternalLinkLine,
  RiSparklingLine,
} from 'react-icons/ri';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Overview', to: '/admin', icon: RiDashboardLine, end: true },
    { label: 'Orders', to: '/admin/orders', icon: RiShoppingBag3Line },
    { label: 'Invitations', to: '/admin/invitations', icon: RiMailLine },
    { label: 'New Invitation', to: '/admin/invitations/new', icon: RiAddCircleLine },
    { label: 'Template Gallery', to: '/admin/templates', icon: RiLayoutMasonryLine },
  ];

  return (
    <div className="min-h-screen bg-[#020b17] text-[#e4f4ea] flex font-dmsans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#b5e8c5]/15 bg-[#031424] flex flex-col justify-between shrink-0 font-dmsans">
        <div>
          {/* Brand */}
          <div className="p-6 border-b border-[#b5e8c5]/10">
            <Link to="/" className="flex items-center gap-1.5">
              <span className="text-xl font-poppins font-bold tracking-wider text-white">ZAFAF</span>
              <span className="text-xl font-poppins font-light text-[#C49A45] tracking-wide">Atelier</span>
            </Link>
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-poppins font-semibold tracking-wider bg-[#123F36] text-[#b5e8c5] border border-[#b5e8c5]/30">
              <RiSparklingLine size={11} />
              <span>ADMIN PORTAL</span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="p-4 space-y-1.5 font-poppins">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all ${
                      isActive
                        ? 'bg-[#123F36] text-[#b5e8c5] border border-[#b5e8c5]/30 shadow-sm'
                        : 'text-[#8ab89c] hover:text-white hover:bg-[#082133]'
                    }`
                  }
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User profile & actions */}
        <div className="p-4 border-t border-[#b5e8c5]/10 space-y-3 font-dmsans">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-poppins text-[#8ab89c] hover:text-[#b5e8c5] hover:bg-[#082133] transition-colors"
          >
            <span className="inline-flex items-center gap-2">
              <RiExternalLinkLine size={14} />
              <span>View Main Website</span>
            </span>
          </Link>

          <div className="flex items-center justify-between pt-2 border-t border-[#b5e8c5]/10 px-1">
            <div className="truncate">
              <p className="text-xs font-poppins font-semibold text-white truncate">{user?.name || 'Admin Artisan'}</p>
              <p className="text-[10px] font-dmsans text-[#8ab89c]/70 truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-[#8ab89c] hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <RiLogoutBoxRLine size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
