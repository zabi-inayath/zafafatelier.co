import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';
import AppHeader from '../components/common/AppHeader';
import CountryCodePhoneInput from '../components/common/CountryCodePhoneInput';
import { DEFAULT_COUNTRY } from '../data/countries';
import ThemeToggle from '../components/common/ThemeToggle';
import { RiPaletteLine } from 'react-icons/ri';
import DotMatrixLoader from '../components/common/DotMatrixLoader';
import toast from 'react-hot-toast';
import {
  RiUserLine,
  RiMailLine,
  RiPhoneLine,
  RiShieldCheckLine,
  RiShoppingBagLine,
  RiLogoutBoxRLine,
  RiAddLine
} from 'react-icons/ri';
import { LuLogOut } from 'react-icons/lu';

export default function AccountPage() {
  const { user, loading, logout, myOrders } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY);
  const [saving, setSaving] = useState(false);

  // Sync user state
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fullPhone = phone.trim()
        ? (phone.trim().startsWith('+') ? phone.trim() : `${selectedCountry.dial_code} ${phone.trim()}`)
        : '';
      const res = await authApi.updateProfile({ name, phone: fullPhone });
      if (res.data?.success) {
        toast.success('Profile details updated successfully!');
      }
    } catch (err) {
      toast.error('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#020b17] text-[#e4f4ea] relative overflow-x-clip selection:bg-[#b5e8c5]/30 selection:text-[#b5e8c5]">
      {/* Background glow */}
      <div className="fixed inset-0 ambient-glow pointer-events-none" />
      <div className="fixed inset-0 subtle-grid opacity-25 pointer-events-none" />

      {/* App Header */}
      <AppHeader current="account" />

      {loading || !user ? (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center relative z-10">
          <DotMatrixLoader />
        </div>
      ) : (
        /* Dashboard Content */
        <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-10 anim-app-screen">
          {/* Header */}
          <div className="mb-10 pb-8 border-b border-[#b5e8c5]/15 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1
                className="text-4xl md:text-5xl text-white font-light tracking-wide"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Account
              </h1>
              <p className="text-sm text-[#8ab89c] mt-2 font-light">
                Manage your personal credentials, contact preferences & bespoke wedding invitations.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#031424] border border-[#b5e8c5]/25 text-[#b5e8c5] hover:bg-[#b5e8c5]/10 text-xs font-semibold transition-all shadow-sm"
              >
                <RiShoppingBagLine size={15} />
                <span>View My Orders</span>
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-950/40 border border-rose-500/25 text-rose-300 hover:bg-rose-900/40 text-xs font-semibold transition-all cursor-pointer"
              >
                <LuLogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Main Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Card: Profile Avatar & Summary */}
            <div className="p-6 rounded-3xl bg-[#031221] border border-[#b5e8c5]/15 flex flex-col items-center text-center shadow-xl shadow-black/30 relative overflow-hidden group hover:border-[#b5e8c5]/35 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#b5e8c5]/5 rounded-full blur-2xl pointer-events-none" />

              <div className="w-20 h-20 rounded-full bg-[#b5e8c5]/15 border-2 border-[#b5e8c5]/40 flex items-center justify-center text-2xl font-serif text-[#b5e8c5] mb-4 shadow-lg shadow-[#b5e8c5]/15 group-hover:scale-105 transition-transform duration-300">
                {user?.name ? user.name[0].toUpperCase() : 'Z'}
              </div>
              <h3 className="text-xl font-medium text-white">{user?.name || 'Patron'}</h3>
              <p className="text-xs text-[#8ab89c] mt-0.5 truncate max-w-full">{user?.email}</p>

              <div className="mt-6 w-full pt-6 border-t border-[#b5e8c5]/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8ab89c]">Account Type</span>
                  <span className="text-[#b5e8c5] font-semibold capitalize">{user?.role || 'Patron'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8ab89c]">Active Orders</span>
                  <span className="text-white font-mono">{myOrders.length}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8ab89c]">Halal Assurance</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <RiShieldCheckLine size={13} />
                    Verified
                  </span>
                </div>
              </div>


              {/* Appearance / Theme Switcher */}
              <div className="mt-6 w-full pt-6 border-t border-[#b5e8c5]/10 flex flex-col items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-[#8ab89c] font-semibold flex items-center gap-1.5">
                  <RiPaletteLine size={13} />
                  <span>Appearance</span>
                </span>
                <ThemeToggle variant="segmented" className="w-full justify-center" />
              </div>

              <div className="mt-8 w-full">
                <Link
                  to="/order"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#b5e8c5] hover:bg-[#cbf4d8] text-[#020b17] font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#b5e8c5]/15 hover:shadow-[#b5e8c5]/25"
                >
                  <RiAddLine size={16} />
                  <span>Commission Invite</span>
                </Link>
              </div>
            </div>

            {/* Right Card: Profile Form */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-[#031221] border border-[#b5e8c5]/15 shadow-xl shadow-black/30 hover:border-[#b5e8c5]/35 transition-all">
              <h2
                className="text-2xl text-white font-light mb-6 flex items-center gap-2"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                Personal Information
              </h2>

              <form onSubmit={handleUpdate} className="space-y-5">
                <div>
                  <label className="block text-[11px] text-[#8ab89c] uppercase tracking-wider mb-1 font-semibold">
                    Client Full Name
                  </label>
                  <div className="relative">
                    <RiUserLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b5e8c5]/50 text-base pointer-events-none" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g. Farhan & Zahra"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 text-sm text-white placeholder-[#385343] focus:outline-none focus:border-[#b5e8c5]/60 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#8ab89c] uppercase tracking-wider mb-1 font-semibold">
                    Email Address (Registered)
                  </label>
                  <div className="relative">
                    <RiMailLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b5e8c5]/50 text-base pointer-events-none" />
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#020b17]/50 border border-[#b5e8c5]/10 text-sm text-[#8ab89c]/70 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-[10px] text-[#8ab89c]/60 mt-1">
                    Email address is tied to your sacred wedding records and cannot be altered directly.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] text-[#8ab89c] uppercase tracking-wider mb-1 font-semibold">
                    WhatsApp Phone Number
                  </label>
                  <CountryCodePhoneInput
                    value={phone}
                    onChange={(val) => setPhone(val)}
                    selectedCountry={selectedCountry}
                    onCountryChange={(c) => setSelectedCountry(c)}
                  />
                  <p className="text-[10px] text-[#8ab89c]/60 mt-1">
                    Used by our atelier calligraphers to share digital drafts and RSVP previews.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#b5e8c5]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-[#8ab89c]">
                    <RiShieldCheckLine className="text-[#b5e8c5]" size={16} />
                    <span>Protected with JWT & MySQL encryption</span>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#b5e8c5] hover:bg-[#cbf4d8] text-[#020b17] font-semibold text-xs tracking-wider uppercase transition-all shadow-md shadow-[#b5e8c5]/15 cursor-pointer disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
