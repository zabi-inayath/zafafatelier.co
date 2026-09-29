import React, { useState, useRef, useEffect, useMemo } from 'react';
import { COUNTRIES, DEFAULT_COUNTRY } from '../../data/countries';
import { RiArrowDownSLine, RiSearchLine, RiCheckLine, RiCloseLine } from 'react-icons/ri';

/**
 * Luxury Country Code Phone Input
 * Features:
 * - Default: India (+91)
 * - Complete world country dial codes with flags
 * - Instant searchable dropdown by country name or dial code
 * - Auto-detects pasted international numbers with country codes
 * - Prevents duplicate dial-code display
 * - Fully responsive, works seamlessly in Dark and Light themes
 */
export default function CountryCodePhoneInput({
  value = '',
  onChange,
  selectedCountry = DEFAULT_COUNTRY,
  onCountryChange,
  placeholder = '',
  required = false,
  disabled = false,
  className = '',
  id = 'whatsapp-phone-input',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // If value contains international dial code on mount or when changed externally, auto-select country
  useEffect(() => {
    if (value && typeof value === 'string' && value.trim().startsWith('+')) {
      const cleanVal = value.replace(/\s+/g, '');
      const matched = [...COUNTRIES]
        .sort((a, b) => b.dial_code.length - a.dial_code.length)
        .find((c) => cleanVal.startsWith(c.dial_code));
      if (matched && matched.code !== selectedCountry.code) {
        if (onCountryChange) onCountryChange(matched);
      }
    }
  }, [value]);

  // Strip country code from display value if present, so it doesn't duplicate
  const displayValue = useMemo(() => {
    if (!value || typeof value !== 'string') return '';
    const trimmed = value.trim();
    if (trimmed.startsWith(selectedCountry.dial_code)) {
      return trimmed.slice(selectedCountry.dial_code.length).trim();
    }
    return trimmed;
  }, [value, selectedCountry.dial_code]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearchQuery('');
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Filter countries by search query
  const filteredCountries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return COUNTRIES;
    const cleanQ = q.replace(/^\+/, '');
    return COUNTRIES.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.dial_code.replace('+', '').includes(cleanQ) ||
        c.dial_code.includes(q)
      );
    });
  }, [searchQuery]);

  const handleSelectCountry = (country) => {
    if (onCountryChange) {
      onCountryChange(country);
    }
    setIsOpen(false);
    setSearchQuery('');

    if (onChange) {
      onChange(displayValue, country);
    }
  };

  const handleNumberChange = (e) => {
    let raw = e.target.value;

    // Check if user pasted an international number starting with +
    if (raw.startsWith('+')) {
      const cleanRaw = raw.replace(/\s+/g, '');
      const matched = [...COUNTRIES]
        .sort((a, b) => b.dial_code.length - a.dial_code.length)
        .find((c) => cleanRaw.startsWith(c.dial_code));

      if (matched) {
        if (onCountryChange) onCountryChange(matched);
        const remainingDigits = cleanRaw.slice(matched.dial_code.length);
        if (onChange) onChange(remainingDigits, matched);
        return;
      }
    }

    if (onChange) {
      onChange(raw, selectedCountry);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="flex items-center w-full rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 focus-within:border-[#b5e8c5]/60 transition-all shadow-sm">
        {/* Country Selector Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          title={`Country: ${selectedCountry.name} (${selectedCountry.dial_code})`}
          className="flex items-center gap-1.5 pl-3 pr-2.5 py-2.5 text-xs font-medium text-white hover:bg-white/5 rounded-l-xl transition-colors cursor-pointer select-none shrink-0 border-r border-[#b5e8c5]/15 focus:outline-none"
        >
          <span className="text-base leading-none" role="img" aria-label={selectedCountry.name}>
            {selectedCountry.flag}
          </span>
          <span className="font-mono text-xs font-semibold text-[#b5e8c5] tracking-tight">
            {selectedCountry.dial_code}
          </span>
          <RiArrowDownSLine
            size={15}
            className={`text-[#8ab89c] transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[#b5e8c5]' : ''
            }`}
          />
        </button>

        {/* Local Number Input */}
        <input
          id={id}
          type="tel"
          value={displayValue}
          onChange={handleNumberChange}
          disabled={disabled}
          required={required}
          placeholder="7448552778"
          className="w-full pl-3 pr-4 py-2.5 rounded-r-xl bg-transparent text-sm text-white placeholder-[#385343] focus:outline-none transition-all"
        />
      </div>

      {/* Searchable Dropdown Popover */}
      {isOpen && (
        <div className="country-dropdown-popover absolute left-0 top-full mt-2 w-72 sm:w-80 max-w-[90vw] rounded-2xl bg-[#031424] border border-[#b5e8c5]/30 shadow-2xl shadow-black/80 p-2.5 z-50 animate-app-screen backdrop-blur-xl">
          {/* Search Bar */}
          <div className="relative mb-2">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8ab89c] text-sm pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country or code..."
              className="w-full pl-8 pr-7 py-2 rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 text-xs text-white placeholder-[#8ab89c]/60 focus:outline-none focus:border-[#b5e8c5]/60 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8ab89c] hover:text-white"
              >
                <RiCloseLine size={14} />
              </button>
            )}
          </div>

          {/* Header */}
          <div className="px-2 py-1 flex items-center justify-between text-[10px] uppercase tracking-wider text-[#8ab89c]/80 font-semibold border-b border-[#b5e8c5]/10 mb-1">
            <span>Select Country</span>
            <span>{filteredCountries.length} countries</span>
          </div>

          {/* Country List */}
          <div className="max-h-56 overflow-y-auto space-y-0.5 pr-1 no-scrollbar">
            {filteredCountries.length === 0 ? (
              <div className="p-4 text-center text-xs text-[#8ab89c]">
                No country found for &ldquo;{searchQuery}&rdquo;
              </div>
            ) : (
              filteredCountries.map((c) => {
                const isSelected = selectedCountry.code === c.code;
                return (
                  <button
                    key={`${c.code}-${c.dial_code}`}
                    type="button"
                    onClick={() => handleSelectCountry(c)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer group ${
                      isSelected
                        ? 'bg-[#b5e8c5]/15 text-[#b5e8c5] font-semibold border border-[#b5e8c5]/30'
                        : 'text-slate-200 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span className="text-base shrink-0" role="img" aria-label={c.name}>
                        {c.flag}
                      </span>
                      <span className="truncate">{c.name}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-xs text-[#8ab89c] group-hover:text-[#b5e8c5] font-semibold">
                        {c.dial_code}
                      </span>
                      {isSelected && (
                        <RiCheckLine size={14} className="text-[#b5e8c5]" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
