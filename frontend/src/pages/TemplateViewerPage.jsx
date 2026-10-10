import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTemplateBySlug } from '../templates/registry';
import TemplatePreviewBar from '../templates/common/TemplatePreviewBar';
import MizaanRoyal from '../templates/mizaan-royal/MizaanRoyal';
import { RiArrowLeftLine, RiSparklingLine } from 'react-icons/ri';

export default function TemplateViewerPage() {
  const { templateSlug } = useParams();
  const template = getTemplateBySlug(templateSlug);

  if (!template) {
    return (
      <div className="min-h-screen bg-[#020b17] text-[#e4f4ea] flex flex-col items-center justify-center p-6 text-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#031424] border border-[#b5e8c5]/20 max-w-md w-full space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#b5e8c5]/15 text-[#b5e8c5] flex items-center justify-center mx-auto">
            <RiSparklingLine size={28} />
          </div>
          <h2 className="text-2xl text-white font-light font-serif">
            Template Not Found
          </h2>
          <p className="text-xs text-[#8ab89c]">
            The requested wedding invitation template &ldquo;{templateSlug}&rdquo; is not yet available or has been moved.
          </p>
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#b5e8c5] text-[#020b17] font-semibold text-xs uppercase tracking-wider hover:bg-[#cbf4d8] transition-all"
          >
            <RiArrowLeftLine size={14} />
            <span>Browse All Templates</span>
          </Link>
        </div>
      </div>
    );
  }

  // Component resolver mapping for future templates
  const renderTemplateComponent = () => {
    switch (template.slug) {
      case 'mizaan-royal':
      default:
        return <MizaanRoyal isPreview={true} />;
    }
  };

  return (
    <div className="relative">
      {/* Render the Invitation Suite */}
      {renderTemplateComponent()}
    </div>
  );
}
