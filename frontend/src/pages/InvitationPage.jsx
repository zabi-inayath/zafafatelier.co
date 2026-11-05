  import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { invitationApi } from '../services/invitationApi';
import { normalizeInvitation } from '../templates/data/sampleData';
import DotMatrixLoader from '../components/common/DotMatrixLoader';
import { RiSparklingLine, RiArrowLeftLine } from 'react-icons/ri';

// Template components
import MizaanRoyal from '../templates/website/MizaanRoyal';
import RoyalMajesty from '../templates/website/RoyalMajesty';
import ZafafRegal from '../templates/website/ZafafRegal';
import RawdahLuxe from '../templates/website/RawdahLuxe';

export default function InvitationPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [invitation, setInvitation] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchInvitation() {
      setLoading(true);
      setError(null);
      try {
        const res = await invitationApi.getBySlug(slug);
        if (res.data?.success && res.data?.invitation) {
          if (isMounted) {
            setInvitation(res.data.invitation);
          }
        } else {
          if (isMounted) setError('Invitation not found or currently unlisted.');
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
              'This wedding invitation is private, unpublished, or could not be found.'
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (slug) {
      fetchInvitation();
    }
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020b17] flex flex-col items-center justify-center p-6 text-center">
        <DotMatrixLoader />
        <p className="mt-4 text-xs font-serif text-[#b5e8c5]/70 tracking-widest uppercase">
          Preparing Sacred Invitation...
        </p>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen bg-[#020b17] text-[#e4f4ea] flex flex-col items-center justify-center p-6 text-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#031424] border border-[#b5e8c5]/20 max-w-md w-full space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#b5e8c5]/15 text-[#b5e8c5] flex items-center justify-center mx-auto">
            <RiSparklingLine size={28} />
          </div>
          <h2 className="text-2xl text-white font-light font-serif">
            Invitation Private or Unavailable
          </h2>
          <p className="text-xs text-[#8ab89c] leading-relaxed">
            {error || 'The requested wedding invitation is not available at this address.'}
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#b5e8c5] text-[#020b17] font-semibold text-xs uppercase tracking-wider hover:bg-[#cbf4d8] transition-all shadow-md"
            >
              <RiArrowLeftLine size={14} />
              <span>Return to Zafaf Atelier</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const normalized = normalizeInvitation(invitation);

  // Dynamically resolve template component based on template_slug
  const renderTemplate = () => {
    switch (normalized.templateSlug) {
      case 'mizaan-royal':
        return <MizaanRoyal isPreview={false} invitation={normalized} />;
      case 'royal-majesty':
        return <RoyalMajesty isPreview={false} invitation={normalized} />;
      case 'zafaf-regal':
        return <ZafafRegal isPreview={false} invitation={normalized} />;
      case 'rawdah-luxe':
        return <RawdahLuxe isPreview={false} invitation={normalized} />;
      default:
        return <MizaanRoyal isPreview={false} invitation={normalized} />;
    }
  };

  return <div className="relative">{renderTemplate()}</div>;
}
