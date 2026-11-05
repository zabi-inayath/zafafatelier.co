import React, { useState } from 'react';
import { RiSmartphoneLine, RiTabletLine, RiComputerLine, RiExternalLinkLine, RiRefreshLine } from 'react-icons/ri';
import MizaanRoyal from '../../templates/website/MizaanRoyal';
import RoyalMajesty from '../../templates/website/RoyalMajesty';
import ZafafRegal from '../../templates/website/ZafafRegal';
import RawdahLuxe from '../../templates/website/RawdahLuxe';

export default function LivePreviewFrame({ invitationData, previewKey = 0, onRefresh }) {
  const [device, setDevice] = useState('mobile'); // 'mobile' | 'tablet' | 'desktop'

  const renderActiveTemplate = () => {
    const slug = invitationData?.templateSlug || invitationData?.template_slug || 'mizaan-royal';
    switch (slug) {
      case 'mizaan-royal':
        return <MizaanRoyal key={previewKey} isPreview={false} invitation={invitationData} />;
      case 'royal-majesty':
        return <RoyalMajesty key={previewKey} isPreview={false} invitation={invitationData} />;
      case 'zafaf-regal':
        return <ZafafRegal key={previewKey} isPreview={false} invitation={invitationData} />;
      case 'rawdah-luxe':
        return <RawdahLuxe key={previewKey} isPreview={false} invitation={invitationData} />;
      default:
        return <MizaanRoyal key={previewKey} isPreview={false} invitation={invitationData} />;
    }
  };

  const getFrameWidth = () => {
    switch (device) {
      case 'mobile':
        return 'w-[390px] h-[780px] rounded-[44px] border-[10px] border-[#152332] shadow-[0_25px_60px_rgba(0,0,0,0.8)]';
      case 'tablet':
        return 'w-[680px] h-[860px] rounded-[32px] border-[10px] border-[#152332] shadow-[0_25px_60px_rgba(0,0,0,0.8)]';
      case 'desktop':
      default:
        return 'w-full h-full rounded-2xl border border-[#b5e8c5]/20 shadow-2xl';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#020b17] rounded-3xl p-4 border border-[#b5e8c5]/15 overflow-hidden font-dmsans">
      {/* Top Device Bar */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#b5e8c5]/10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-poppins font-semibold text-[#C49A45] uppercase tracking-wider">
            Live Preview
          </span>
          <span className="text-[11px] text-[#8ab89c]/70 font-mono">
            {invitationData?.templateSlug || 'mizaan-royal'}
          </span>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-[#031424] p-1 rounded-xl border border-[#b5e8c5]/15">
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            title="Mobile (iPhone View)"
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              device === 'mobile'
                ? 'bg-[#C49A45] text-[#020b17]'
                : 'text-[#8ab89c] hover:text-white'
            }`}
          >
            <RiSmartphoneLine size={16} />
          </button>
          <button
            type="button"
            onClick={() => setDevice('tablet')}
            title="Tablet View"
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              device === 'tablet'
                ? 'bg-[#C49A45] text-[#020b17]'
                : 'text-[#8ab89c] hover:text-white'
            }`}
          >
            <RiTabletLine size={16} />
          </button>
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            title="Desktop View"
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              device === 'desktop'
                ? 'bg-[#C49A45] text-[#020b17]'
                : 'text-[#8ab89c] hover:text-white'
            }`}
          >
            <RiComputerLine size={16} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              title="Reset Animation Preview"
              className="p-1.5 rounded-lg bg-[#031424] text-[#b5e8c5] hover:text-white border border-[#b5e8c5]/20 text-xs transition-colors"
            >
              <RiRefreshLine size={15} />
            </button>
          )}
          {invitationData?.slug && (
            <a
              href={`/invite/${invitationData.slug}`}
              target="_blank"
              rel="noreferrer"
              title="Open Live Public URL"
              className="inline-flex items-center gap-1 text-[11px] text-[#b5e8c5] hover:underline"
            >
              <span>/invite/{invitationData.slug}</span>
              <RiExternalLinkLine size={12} />
            </a>
          )}
        </div>
      </div>

      {/* Preview Stage */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-3 bg-gradient-to-b from-[#010610] to-[#031424] rounded-2xl relative">
        <div
          className={`${getFrameWidth()} overflow-y-auto bg-white transition-all duration-300 relative`}
          style={{ maxHeight: 'calc(100vh - 170px)' }}
        >
          {renderActiveTemplate()}
        </div>
      </div>
    </div>
  );
}
