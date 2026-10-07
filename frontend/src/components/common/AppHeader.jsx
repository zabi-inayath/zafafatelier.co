import React from 'react';
// import ThemeToggle from './ThemeToggle';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  RiArrowLeftLine,
  RiShoppingBagLine,
  RiUserLine,
  RiAddLine,
  RiLogoutBoxRLine,
  RiHome6Fill,
  RiSparklingLine
} from 'react-icons/ri';
import { LuLogOut } from "react-icons/lu";

export default function AppHeader({ current = '' }) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="w-full border-b border-[#b5e8c5]/10 bg-[#020b17]/90 backdrop-blur-xl sticky top-0 z-40 transition-all">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/dashboard" className="flex items-center">
            <img
              src="/zafaf-trans.png"
              alt="Zafaf Atelier"
              className="h-14 w-auto object-contain py-0.5"
            />
          </Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {/* <ThemeToggle /> */}
          {isAuthenticated ? (
            <>
              {current !== 'templates' && (
                <Link
                  to="/templates"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#b5e8c5]/20 text-[#8ab89c] hover:text-[#b5e8c5] hover:border-[#b5e8c5]/50 text-xs font-medium transition-all"
                >
                  <RiSparklingLine size={14} />
                  <span className="hidden sm:inline">Templates</span>
                </Link>
              )}
              {current !== 'orders' && (
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#b5e8c5]/20 text-[#8ab89c] hover:text-[#b5e8c5] hover:border-[#b5e8c5]/50 text-xs font-medium transition-all"
                >
                  <RiHome6Fill size={14} />
                  <span className="hidden sm:inline">Home</span>
                </Link>
              )}
              {current !== 'account' && (
                <Link
                  to="/account"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#b5e8c5]/20 text-[#8ab89c] hover:text-[#b5e8c5] hover:border-[#b5e8c5]/50 text-xs font-medium transition-all"
                >
                  <RiUserLine size={14} />
                  <span className="hidden sm:inline">Account</span>
                </Link>
              )}
              {current !== 'order' && (
                <Link
                  to="/order"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#b5e8c5] hover:bg-[#cbf4d8] text-[#020b17] font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                >
                  <RiAddLine size={15} />
                  <span className="hidden sm:inline">New Invite</span>
                  <span className="sm:hidden">Order</span>
                </Link>
              )}
              <button
                onClick={handleLogout}
                title="Sign Out"
                className="p-2 rounded-xl text-[#8ab89c] hover:text-rose-400 hover:bg-[#b5e8c5]/15 transition-colors cursor-pointer"
              >
                <LuLogOut size={17} />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#b5e8c5] text-[#020b17] font-semibold text-xs transition-all"
            >
              <RiUserLine size={14} />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}