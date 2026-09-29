import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/common/ThemeToggle';
import CountryCodePhoneInput from '../components/common/CountryCodePhoneInput';
import { DEFAULT_COUNTRY } from '../data/countries';
import { useAuth } from '../context/AuthContext';
import DotMatrixLoader from '../components/common/DotMatrixLoader';
import {
  RiUserLine,
  RiMailLine,
  RiPhoneLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeOffLine,
  RiArrowRightLine,
  RiArrowLeftLine
} from 'react-icons/ri';

export default function SignupPage() {
  const { user, isAuthenticated, register, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/account', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    // Format full international phone number with selected country code
    const fullPhone = phone.trim()
      ? (phone.trim().startsWith('+') ? phone.trim() : `${selectedCountry.dial_code} ${phone.trim()}`)
      : '';
    const res = await register(name.trim(), email.trim(), password, fullPhone);
    setLoading(false);
    if (res.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(res.message);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#020b17] flex items-center justify-center p-6">
        <DotMatrixLoader text="Checking Session..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020b17] text-[#e4f4ea] relative overflow-x-clip flex flex-col justify-center items-center px-4 py-12 selection:bg-[#b5e8c5]/30 selection:text-[#b5e8c5]">
      {/* Background Glows */}
      <div className="fixed inset-0 ambient-glow pointer-events-none" />
      <div className="fixed inset-0 subtle-grid opacity-25 pointer-events-none" />

      

      <div className="relative w-full max-w-md bg-[#031327]/95 rounded-3xl border border-[#b5e8c5]/20 p-8 shadow-2xl backdrop-blur-xl z-10 anim-app-screen">
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block mb-3">
            <img
              src="/zafaf-trans.png"
              alt="Zafaf Atelier"
              className="h-16 w-auto mx-auto object-contain py-1 app-logo"
            />
          </Link>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#b5e8c5]/80 font-bold mb-1">
            Join Zafaf Atelier
          </p>
          <h1
            className="text-3xl text-white font-light"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Create Your Account
          </h1>
          <p className="text-xs text-[#8ab89c]/80 mt-1 font-light">
            Order bespoke web invitations, digital cards & track drafts
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs text-center animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] text-[#8ab89c] uppercase tracking-wider mb-1 font-semibold">
              Full Name *
            </label>
            <div className="relative">
              <RiUserLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b5e8c5]/50 text-base pointer-events-none" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Farhan"
                required
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 text-sm text-white placeholder-[#385343] focus:outline-none focus:border-[#b5e8c5]/60 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-[11px] text-[#8ab89c] uppercase tracking-wider mb-1 font-semibold">
                Email Address *
              </label>
              <div className="relative">
                <RiMailLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b5e8c5]/50 text-base pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@mail.com"
                  required
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 text-sm text-white placeholder-[#385343] focus:outline-none focus:border-[#b5e8c5]/60 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[#8ab89c] uppercase tracking-wider mb-1 font-semibold">
                WhatsApp Phone
              </label>
              <CountryCodePhoneInput
                value={phone}
                onChange={(val) => setPhone(val)}
                selectedCountry={selectedCountry}
                onCountryChange={(c) => setSelectedCountry(c)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-[11px] text-[#8ab89c] uppercase tracking-wider mb-1 font-semibold">
                Password *
              </label>
              <div className="relative">
                <RiLockPasswordLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b5e8c5]/50 text-base pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  required
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 text-sm text-white placeholder-[#385343] focus:outline-none focus:border-[#b5e8c5]/60 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#b5e8c5]/50 hover:text-[#b5e8c5] p-1 transition-colors"
                >
                  {showPassword ? <RiEyeOffLine size={15} /> : <RiEyeLine size={15} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[#8ab89c] uppercase tracking-wider mb-1 font-semibold">
                Confirm Password *
              </label>
              <div className="relative">
                <RiLockPasswordLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b5e8c5]/50 text-base pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  required
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 text-sm text-white placeholder-[#385343] focus:outline-none focus:border-[#b5e8c5]/60 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#020b17] border border-[#b5e8c5]/10 text-[11px] text-[#8ab89c] font-light flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b5e8c5] shrink-0" />
            <span>100% halal compliant, music-free & crafted with sacred reverence.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#b5e8c5] hover:bg-[#cbf4d8] text-[#020b17] font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-[#b5e8c5]/15 cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#020b17] border-t-transparent rounded-full animate-spin" />
                Creating account...
              </span>
            ) : (
              <>
                <span>Create Account</span>
                <RiArrowRightLine size={16} />
              </>
            )}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="mt-7 pt-5 border-t border-[#b5e8c5]/10 text-center">
          <p className="text-xs text-[#8ab89c]">
            Already registered with Zafaf?{' '}
            <Link
              to="/login"
              className="text-[#b5e8c5] font-semibold hover:underline transition-all ml-1"
            >
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
