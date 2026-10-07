import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiShoppingBagLine, RiArrowLeftLine, RiFileCopyLine, RiCheckLine, RiEyeLine, RiEyeOffLine, RiSparklingLine } from 'react-icons/ri';
import toast from 'react-hot-toast';

export default function TemplatePreviewBar({ template }) {
  const [copied, setCopied] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const navigate = useNavigate();

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}${template?.route || '/mizaan-royal'}` : '';

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Live invitation link copied to clipboard!');
      setTimeout(() => setCopied(false), 2200);
    }
  };

  if (minimized) {
    return (
      <aside 
        aria-label="Atelier Template Preview Controller"
        className="fixed bottom-6 right-6 z-50 animate-app-screen"
      >
        <button
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#031424]/95 text-[#b5e8c5] border border-[#b5e8c5]/40 shadow-2xl backdrop-blur-xl hover:bg-[#062442] transition-all text-xs font-semibold cursor-pointer"
        >
          <RiEyeLine size={15} />
          <span>Show Preview Controls</span>
        </button>
      </aside>
    );
  }

  return (
    <aside 
      aria-label="Atelier Template Preview Bar"
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 animate-app-screen"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:px-5 sm:py-2.5 rounded-2xl bg-[#031424]/92 text-[#e4f4ea] border border-[#b5e8c5]/30 shadow-2xl shadow-black/80 backdrop-blur-xl">
        {/* Left: Template info & back link */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <Link
            to="/templates"
            className="flex items-center gap-1.5 text-xs text-[#8ab89c] hover:text-[#b5e8c5] transition-colors"
            title="Back to all invitation templates"
          >
            <RiArrowLeftLine size={15} />
            <span className="hidden md:inline">Catalog</span>
          </Link>

          <div className="h-4 w-px bg-[#b5e8c5]/20 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#b5e8c5] animate-pulse" />
            <span className="text-xs font-bold tracking-wide text-white">
              {template?.name || 'Mizaan Royal'}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#b5e8c5]/15 text-[#b5e8c5] border border-[#b5e8c5]/30">
              Interactive Preview
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#8ab89c] hover:text-white border border-white/10 transition-all cursor-pointer"
            title="Copy invitation link"
          >
            {copied ? <RiCheckLine size={14} className="text-[#b5e8c5]" /> : <RiFileCopyLine size={14} />}
            <span className="hidden xs:inline">{copied ? 'Copied' : 'Share Link'}</span>
          </button>

          <Link
            to="/dashboard"
            className="px-3 py-1.5 rounded-xl text-xs font-medium text-[#8ab89c] hover:text-white transition-colors"
          >
            Dashboard
          </Link>

          <Link
            to={`/order?template=${encodeURIComponent(template?.slug || 'mizaan-royal')}&type=Web+Invitation`}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#b5e8c5] hover:bg-[#cbf4d8] text-[#020b17] font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#b5e8c5]/20 cursor-pointer"
          >
            <RiSparklingLine size={14} />
            <span>Commission This Suite</span>
          </Link>

          <button
            onClick={() => setMinimized(true)}
            className="p-1.5 rounded-lg text-[#8ab89c] hover:text-white hover:bg-white/5 transition-colors"
            title="Minimize preview bar to view full screen"
          >
            <RiEyeOffLine size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
