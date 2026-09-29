import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';

/**
 * Universal ThemeToggle button
 * variant: 'icon' (compact for headers) | 'segmented' (pill toggle with labels)
 */
export default function ThemeToggle({ variant = 'icon', className = '' }) {
  const { theme, isDark, toggleTheme, setTheme } = useTheme();

  if (variant === 'segmented') {
    return (
      <div
        className={`inline-flex items-center p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 ${className}`}
      >
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            !isDark
              ? 'bg-white text-[#020b17] shadow-sm'
              : 'text-[#8ab89c] hover:text-white'
          }`}
        >
          <RiSunLine size={14} className="text-amber-500" />
          <span>Light</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            isDark
              ? 'bg-[#031424] text-[#b5e8c5] shadow-sm border border-[#b5e8c5]/25'
              : 'text-[#436853] hover:text-[#020b17]'
          }`}
        >
          <RiMoonLine size={14} className="text-indigo-400" />
          <span>Dark</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      className={`relative p-2 rounded-xl border transition-all cursor-pointer group flex items-center justify-center ${
        isDark
          ? 'border-[#b5e8c5]/20 bg-[#031424]/60 text-[#b5e8c5] hover:border-[#b5e8c5]/50 hover:bg-[#b5e8c5]/10'
          : 'border-slate-300/80 bg-white/80 text-amber-600 hover:border-amber-400 hover:bg-amber-50/60 shadow-sm'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <RiSunLine
            size={16}
            className="transition-transform duration-300 group-hover:rotate-45 text-amber-300"
          />
        ) : (
          <RiMoonLine
            size={16}
            className="transition-transform duration-300 group-hover:-rotate-12 text-[#020b17]"
          />
        )}
      </div>
    </button>
  );
}
