import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import ServicesSection from './components/ServicesSection';
import TemplateGallery from './components/TemplateGallery';
import HowItWorks from './components/HowItWorks';
import OccasionsGrid from './components/OccasionsGrid';
import IslamicValuesBanner from './components/IslamicValuesBanner';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import InteractiveDemoModal from './components/InteractiveDemoModal';
import OrderModal from './components/OrderModal';

export default function App() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderModalData, setOrderModalData] = useState({});
  const [interactiveDemoOpen, setInteractiveDemoOpen] = useState(false);

  const handleOpenOrderModal = (initial = {}) => {
    setOrderModalData(initial);
    setOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setOrderModalOpen(false);
    setOrderModalData({});
  };

  const handleSelectService = (serviceId) => {
    handleOpenOrderModal({ serviceId });
  };

  const handleOrderTemplate = (template) => {
    handleOpenOrderModal({ templateTitle: template.title, serviceId: template.type.includes('Web') ? 'web-invitations' : 'e-invites' });
  };

  const handleSelectOccasion = (occasionTitle) => {
    handleOpenOrderModal({ occasionTitle });
  };

  return (
    <div className="min-h-screen bg-[#031327] text-[#e4f4ea] relative overflow-x-hidden selection:bg-[#b5e8c5]/30 selection:text-[#b5e8c5]">
      
      {/* Global Background Glow Layers */}
      <div className="fixed inset-0 ambient-glow pointer-events-none" />
      <div className="fixed inset-0 subtle-grid opacity-25 pointer-events-none" />

      {/* Luxury Sticky Navbar */}
      <Navbar onOpenOrderModal={() => handleOpenOrderModal()} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        
        {/* Hero Section */}
        <Hero
          onOpenOrderModal={() => handleOpenOrderModal()}
          onOpenInteractiveDemo={() => setInteractiveDemoOpen(true)}
        />

        {/* 4 Pillars Trust Bar */}
        <TrustBar />

        {/* Our Services: Web, E-Invites, Video */}
        <ServicesSection
          onSelectService={handleSelectService}
          onOpenInteractiveDemo={() => setInteractiveDemoOpen(true)}
        />

        {/* Templates Portfolio Gallery */}
        <TemplateGallery onOrderTemplate={handleOrderTemplate} />

        {/* How It Works (4 Simple Steps) */}
        <HowItWorks onOpenOrderModal={() => handleOpenOrderModal()} />

        {/* Occasions We Create For */}
        <OccasionsGrid onSelectOccasion={handleSelectOccasion} />

        {/* Islamic Values & Sacred Commitment */}
        <IslamicValuesBanner />

        {/* Client Love Testimonials */}
        <Testimonials onOpenOrderModal={() => handleOpenOrderModal()} />

        {/* FAQ Accordion */}
        <FaqSection />

        {/* Pre-Footer Call to Action Banner */}
        <CtaBanner
          onOpenOrderModal={() => handleOpenOrderModal()}
          onOpenInteractiveDemo={() => setInteractiveDemoOpen(true)}
        />

      </main>

      {/* Studio Footer */}
      <Footer onOpenOrderModal={() => handleOpenOrderModal()} />

      {/* Modals */}
      <InteractiveDemoModal
        isOpen={interactiveDemoOpen}
        onClose={() => setInteractiveDemoOpen(false)}
        onOrderThis={() => {
          setInteractiveDemoOpen(false);
          handleOpenOrderModal({ serviceId: 'web-invitations' });
        }}
      />

      <OrderModal
        isOpen={orderModalOpen}
        onClose={handleCloseOrderModal}
        initialData={orderModalData}
      />

    </div>
  );
}
