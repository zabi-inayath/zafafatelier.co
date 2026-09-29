import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from '../components/common/ThemeToggle';
import { useAuth } from '../context/AuthContext';
import DotMatrixLoader from '../components/common/DotMatrixLoader';
import { RiMailLine, RiLockPasswordLine, RiEyeLine, RiEyeOffLine, RiArrowRightLine, RiArrowLeftLine, RiSparklingLine } from 'react-icons/ri';

export default function LoginPage() {
  const { user, isAuthenticated, login, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/account';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    const res = await login(email.trim(), password);
    setLoading(false);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.message);
    }
  };

  const handleFillDemo = () => {
    setEmail('testclient@zafaf.com');
    setPassword('password123');
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

      <div className="relative w-full max-w-md bg-[#031327]/95 rounded-3xl border border-[#b5e8c5]/20 p-8 sm:p-10 shadow-2xl backdrop-blur-xl z-10 anim-app-screen">
        {/* Logo */}
        <div className="text-center mb-7">
          <Link to="/" className="inline-block mb-3">
            <img
              src="/zafaf-logo.png"
              alt="Zafaf Atelier"
              className="h-16 w-auto mx-auto object-contain py-1 app-logo"
            />
          </Link>
          <h1
            className="text-3xl text-white font-light"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Sign In to Zafaf
          </h1>
          <p className="text-xs text-[#8ab89c]/80 mt-1 font-light">
            Access your invitations, track preview drafts & manage purchases
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs text-center animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] text-[#8ab89c] uppercase tracking-wider mb-1 font-semibold">
              Email Address
            </label>
            <div className="relative">
              <RiMailLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b5e8c5]/50 text-base pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. farhan@gmail.com"
                required
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 text-sm text-white placeholder-[#385343] focus:outline-none focus:border-[#b5e8c5]/60 transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] text-[#8ab89c] uppercase tracking-wider font-semibold">
                Password
              </label>
              <span className="text-[11px] text-[#b5e8c5]/50 hover:text-[#b5e8c5] cursor-default">
                Bismillah
              </span>
            </div>
            <div className="relative">
              <RiLockPasswordLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b5e8c5]/50 text-base pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 text-sm text-white placeholder-[#385343] focus:outline-none focus:border-[#b5e8c5]/60 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b5e8c5]/50 hover:text-[#b5e8c5] p-1 transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#b5e8c5] hover:bg-[#cbf4d8] text-[#020b17] font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-[#b5e8c5]/15 cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#020b17] border-t-transparent rounded-full animate-spin" />
                Signing in...
              </span>
            ) : (
              <>
                <span>Sign In</span>
                <RiArrowRightLine size={16} />
              </>
            )}
          </button>
        </form>

        {/* Demo Fill Option */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-[11px] text-[#b5e8c5]/70 hover:text-[#b5e8c5] inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RiSparklingLine size={13} />
            <span>Use Demo Client Account</span>
          </button>
        </div>

        {/* Switch to Signup */}
        <div className="mt-6 pt-5 border-t border-[#b5e8c5]/10 text-center">
          <p className="text-xs text-[#8ab89c]">
            Don't have an account yet?{' '}
            <Link
              to="/signup"
              className="text-[#b5e8c5] font-semibold hover:underline transition-all ml-1"
            >
              Create Blessed Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
