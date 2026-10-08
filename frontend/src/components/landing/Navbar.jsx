import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa6';
import { RiMenu4Line, RiCloseLine, RiUserLine, RiShoppingBagLine, RiLogoutBoxRLine, RiSettings3Line } from 'react-icons/ri';
import { BRAND } from '../../constants';
import { useAuth } from '../../context/AuthContext';

const NAV_LINKS = [
  { label: 'Services', href: '/#services' },
  { label: 'Templates', href: '/templates' },
  { label: 'Occasions', href: '/#occasions' },
  // { label: 'Process', href: '/#process' },
  { label: 'FAQ', href: '/#faq' },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-[#020b17]/92 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-[88px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/zafaf-trans.png"
              alt="Zafaf Atelier"
              className="h-14 w-auto object-contain rounded-2xl py-1"
            />
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                className="relative text-[13px] font-medium text-[#c8e6d4]/70 hover:text-[#b5e8c5] transition-colors duration-200 tracking-wide
                  after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-[#b5e8c5]/60 hover:after:w-full after:transition-all after:duration-300"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions & Auth Links */}
          <div className="flex items-center gap-3">
            {/* <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full border border-[#25d366]/30 text-[#25d366] hover:bg-[#25d366]/12 hover:border-[#25d366]/70 transition-all"
            >
              <FaWhatsapp size={18} />
            </a> */}

            {/* Authenticated User Menu or Dedicated Link */}
            {/* {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#b5e8c5]/30 bg-[#031424] text-[#b5e8c5] hover:border-[#b5e8c5]/70 transition-all text-xs font-semibold cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-full bg-[#b5e8c5]/20 text-[#b5e8c5] flex items-center justify-center text-[10px] font-bold">
                    {user?.name ? user.name[0].toUpperCase() : 'Z'}
                  </span>
                  <span className="hidden sm:inline-block max-w-[100px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                </button>
                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#031221] border border-[#b5e8c5]/20 shadow-2xl p-2 z-50 animate-slide-up">
                    <div className="px-3 py-2 border-b border-[#b5e8c5]/10">
                      <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                      <p className="text-[10px] text-[#8ab89c]/70 truncate">{user?.email}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdown(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-medium text-[#c8e6d4]/80 hover:text-[#b5e8c5] hover:bg-[#b5e8c5]/10 rounded-xl transition-all cursor-pointer mt-1"
                    >
                      <RiShoppingBagLine size={15} className="text-[#b5e8c5]" />
                      <span>My Invitations &amp; Orders</span>
                    </Link>

                    <Link
                      to="/account"
                      onClick={() => setUserDropdown(false)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-medium text-[#c8e6d4]/80 hover:text-[#b5e8c5] hover:bg-[#b5e8c5]/10 rounded-xl transition-all cursor-pointer"
                    >
                      <RiSettings3Line size={15} className="text-[#b5e8c5]" />
                      <span>Account Settings</span>
                    </Link>

                    <button
                      onClick={() => {
                        setUserDropdown(false);
                        logout();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-medium text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer mt-0.5"
                    >
                      <RiLogoutBoxRLine size={15} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full border border-[#b5e8c5]/20 text-[#b5e8c5]/90 hover:text-[#b5e8c5] hover:border-[#b5e8c5]/60 hover:bg-[#b5e8c5]/10 text-sm font-medium transition-all"
                >
                  <RiUserLine size={14} />
                  <span>Sign In</span>
                </Link>
              </div>
            )} */}

            <span
              className="text-md sm:text-lg text-[#b5e8c5]/70 tracking-widest cursor-pointer select-none"
              style={{ fontFamily: 'Amiri, serif' }}
            >
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </span>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-[#b5e8c5]/20 text-[#b5e8c5] hover:border-[#b5e8c5]/50 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <RiCloseLine size={20} /> : <RiMenu4Line size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-[#020b17]/97 backdrop-blur-xl flex flex-col items-center justify-center gap-6 text-center"
          onClick={() => setOpen(false)}
        >
          {/* {isAuthenticated ? (
            <div className="flex flex-col items-center gap-2 pb-2">
              <span className="text-xs text-[#8ab89c]">Signed in as</span>
              <span className="text-base text-white font-semibold">{user?.name}</span>
              <div className="flex gap-4 text-xs font-medium mt-1">
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="text-[#b5e8c5] underline"
                >
                  My Invitations
                </Link>
                <Link
                  to="/account"
                  onClick={() => setOpen(false)}
                  className="text-[#b5e8c5] underline"
                >
                  Account
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 mb-2">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="px-5 py-2 rounded-full border border-[#b5e8c5]/40 text-[#b5e8c5] text-xs font-semibold"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="px-5 py-2 rounded-full bg-[#b5e8c5] text-[#020b17] text-xs font-bold"
              >
                Register
              </Link>
            </div>
          )} */}

          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              onClick={() => setOpen(false)}
              className="display-md text-white hover:text-[#b5e8c5] transition-colors"
              style={{ fontSize: '2rem', fontWeight: 300 }}
            >
              {l.label}
            </Link>
          ))}

          <div className="rule-fade w-48 my-2" />

          {isAuthenticated && (
            <button
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="text-xs text-rose-400 font-semibold"
            >
              Sign Out
            </button>
          )}

          <Link
            to="/order"
            onClick={() => setOpen(false)}
            className="btn-mint mt-2"
          >
            Order Invitation
          </Link>
        </div>
      )}
    </>
  );
}
