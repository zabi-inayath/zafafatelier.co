import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import TrustBar from '../components/landing/TrustBar';
import ServicesSection from '../components/landing/ServicesSection';
import TemplateGallery from '../components/landing/TemplateGallery';
import HowItWorks from '../components/landing/HowItWorks';
import OccasionsGrid from '../components/landing/OccasionsGrid';
import IslamicValuesBanner from '../components/landing/IslamicValuesBanner';
import Testimonials from '../components/landing/Testimonials';
import FaqSection from '../components/landing/FaqSection';
import CtaBanner from '../components/landing/CtaBanner';
import Footer from '../components/landing/Footer';
import InteractiveDemoModal from '../components/landing/InteractiveDemoModal';

export default function HomePage() {
  const navigate = useNavigate();
  const [interactiveDemoOpen, setInteractiveDemoOpen] = useState(false);

  const handleOpenOrder = (initial = {}) => {
    navigate('/order', { state: initial });
  };

  const handleSelectService = (serviceId) => {
    handleOpenOrder({ serviceId });
  };

  const handleOrderTemplate = (template) => {
    handleOpenOrder({
      templateTitle: template.title,
      serviceId: template.type.includes('Web') ? 'web-invitations' : 'e-invites',
    });
  };

  const handleSelectOccasion = (occasionTitle) => {
    handleOpenOrder({ occasionTitle });
  };

  return (
    <div className="min-h-screen bg-[#031327] text-[#e4f4ea] relative overflow-x-clip selection:bg-[#b5e8c5]/30 selection:text-[#b5e8c5]">
      {/* Global Background Glow Layers */}
      <div className="fixed inset-0 ambient-glow pointer-events-none" />
      <div className="fixed inset-0 subtle-grid opacity-25 pointer-events-none" />

      {/* Luxury Sticky Navbar */}
      <Navbar onOpenOrderModal={() => handleOpenOrder()} />

      {/* Main Content Sections */}
      <main className="relative z-10 anim-app-screen">
        <Hero
          onOpenOrderModal={() => handleOpenOrder()}
          onOpenInteractiveDemo={() => setInteractiveDemoOpen(true)}
        />
        <ServicesSection
          onSelectService={handleSelectService}
          onOpenInteractiveDemo={() => setInteractiveDemoOpen(true)}
        />
        {/* <TemplateGallery onOrderTemplate={handleOrderTemplate} /> */}
        {/* <HowItWorks onOpenOrderModal={() => handleOpenOrder()} /> */}
        <OccasionsGrid onSelectOccasion={handleSelectOccasion} />
        {/* <IslamicValuesBanner /> */}
        {/* <Testimonials onOpenOrderModal={() => handleOpenOrder()} /> */}
        <FaqSection />
        {/* <TrustBar /> */}
        {/* <CtaBanner
          onOpenOrderModal={() => handleOpenOrder()}
          onOpenInteractiveDemo={() => setInteractiveDemoOpen(true)}
        /> */}
      </main>

      <Footer onOpenOrderModal={() => handleOpenOrder()} />

      <InteractiveDemoModal
        isOpen={interactiveDemoOpen}
        onClose={() => setInteractiveDemoOpen(false)}
        onOrderThis={() => {
          setInteractiveDemoOpen(false);
          handleOpenOrder({ serviceId: 'web-invitations' });
        }}
      />
    </div>
  );
}
