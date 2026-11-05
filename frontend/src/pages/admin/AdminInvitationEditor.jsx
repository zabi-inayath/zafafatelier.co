import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';
import { SAMPLE_INVITATION, normalizeInvitation } from '../../templates/data/sampleData';
import { TEMPLATES_REGISTRY } from '../../templates/registry';
import LivePreviewFrame from '../../components/admin/LivePreviewFrame';
import DotMatrixLoader from '../../components/common/DotMatrixLoader';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';
import toast from 'react-hot-toast';
import {
  RiArrowLeftLine,
  RiSaveLine,
  RiSparklingLine,
  RiExternalLinkLine,
  RiAddLine,
  RiDeleteBinLine,
  RiCheckLine,
} from 'react-icons/ri';

export default function AdminInvitationEditor() {
  const { id } = useParams();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [activeTab, setActiveTab] = useState('couple'); // 'couple' | 'events' | 'content' | 'media' | 'settings'

  // Master form state
  const [formData, setFormData] = useState(() => {
    // Initial default state based on SAMPLE_INVITATION
    return {
      slug: '',
      templateSlug: 'mizaan-royal',
      status: 'draft',
      groomName: '',
      groomArabic: '',
      groomFather: '',
      groomMother: '',
      brideName: '',
      brideArabic: '',
      brideFather: '',
      brideMother: '',
      tagline: 'Under the grace and blessings of Almighty Allah, celebrating their sacred union',
      events: [
        {
          type: 'nikah',
          title: 'Nikah Ceremony',
          date: '2027-01-25',
          time: '11:00',
          timeDisplay: '11:00 AM',
          hijriDate: '27th Rajab 1448 AH',
          venue: {
            name: 'The Royal Grand Ballroom',
            address: 'Taj Falaknuma Palace, Hyderabad',
            mapsUrl: 'https://maps.google.com/?q=Taj+Falaknuma+Palace+Hyderabad',
          },
          dresscode: 'Formal — Modest Islamic Attire',
        },
        {
          type: 'walima',
          title: 'Walima Reception',
          date: '2027-01-26',
          time: '14:00',
          timeDisplay: '2:00 PM',
          hijriDate: '28th Rajab 1448 AH',
          venue: {
            name: 'Crystal Lawns & Pavilion',
            address: 'Jubilee Hills, Hyderabad',
            mapsUrl: 'https://maps.google.com/?q=Jubilee+Hills+Hyderabad',
          },
          dresscode: 'Semi-Formal — Modest Attire',
        },
      ],
      images: {
        openingVideo: '/templates/template1/openingdemo2.mp4',
        heroBackground: '/templates/template1/background.png',
        thankYouCard: '/templates/template1/Thankyoucard1.png',
      },
      content: {
        bismillah: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم',
        quranicVerse: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا',
        quranicVerseRef: 'Surah Ar-Rum 30:21',
        openingMessage: 'With hearts full of gratitude to Allah (SWT), we joyfully invite you to witness and celebrate the blessed union of our children.',
        closingDua: 'May Allah bless them and bestow blessings upon them and join them in goodness.',
        hashtag: '#SacredUnion',
        dresscode: 'Modest Islamic Attire',
        rsvpWhatsapp: '917448552778',
        rsvpDeadline: '2027-01-15',
      },
      customization: {
        showCountdown: true,
        showWalima: true,
        showGallery: false,
        showParents: false,
        showScratchCard: true,
      },
      adminNotes: '',
      orderId: searchParams.get('order_id') ? parseInt(searchParams.get('order_id'), 10) : null,
    };
  });

  // Handle loading existing invitation
  useEffect(() => {
    if (!isNew) {
      async function fetchInvitation() {
        setLoading(true);
        try {
          const res = await adminApi.getInvitationById(id);
          if (res.data?.success && res.data?.invitation) {
            const normalized = normalizeInvitation(res.data.invitation);
            setFormData({
              ...normalized,
              orderId: res.data.invitation.order_id,
              status: res.data.invitation.status,
            });
          }
        } catch (err) {
          toast.error('Failed to load invitation.');
          navigate('/admin/invitations');
        } finally {
          setLoading(false);
        }
      }
      fetchInvitation();
    } else {
      // Pre-fill from query params if available
      const coupleNames = searchParams.get('couple_names');
      if (coupleNames) {
        const parts = coupleNames.split(/&|and/i).map((s) => s.trim());
        if (parts.length >= 2) {
          setFormData((prev) => ({
            ...prev,
            groomName: parts[0],
            brideName: parts[1],
            slug: `${parts[0]}-and-${parts[1]}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          }));
        }
      }
    }
  }, [id, isNew]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const updateEventField = (index, field, value) => {
    setFormData((prev) => {
      const updatedEvents = [...prev.events];
      updatedEvents[index] = { ...updatedEvents[index], [field]: value };
      return { ...prev, events: updatedEvents };
    });
  };

  const updateEventVenue = (index, field, value) => {
    setFormData((prev) => {
      const updatedEvents = [...prev.events];
      updatedEvents[index] = {
        ...updatedEvents[index],
        venue: {
          ...(updatedEvents[index].venue || {}),
          [field]: value,
        },
      };
      return { ...prev, events: updatedEvents };
    });
  };

  const addEvent = () => {
    setFormData((prev) => ({
      ...prev,
      events: [
        ...prev.events,
        {
          type: 'custom',
          title: 'Reception',
          date: '',
          time: '',
          timeDisplay: '',
          hijriDate: '',
          venue: { name: '', address: '', mapsUrl: '' },
          dresscode: '',
        },
      ],
    }));
  };

  const removeEvent = (index) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (targetStatus = null) => {
    if (!formData.slug?.trim()) {
      toast.error('Unique URL slug is required (e.g. zayd-maryam-2027)');
      setActiveTab('couple');
      return;
    }

    setSaving(true);
    const payload = {
      slug: formData.slug.trim().toLowerCase(),
      template_slug: formData.templateSlug,
      status: targetStatus || formData.status,
      groom_name: formData.groomName,
      groom_arabic: formData.groomArabic,
      groom_father: formData.groomFather,
      groom_mother: formData.groomMother,
      bride_name: formData.brideName,
      bride_arabic: formData.brideArabic,
      bride_father: formData.brideFather,
      bride_mother: formData.brideMother,
      tagline: formData.tagline,
      events: formData.events,
      images: formData.images,
      customization: formData.customization,
      content: formData.content,
      admin_notes: formData.adminNotes,
      order_id: formData.orderId || null,
    };

    try {
      if (isNew) {
        const res = await adminApi.createInvitation(payload);
        if (res.data?.success) {
          toast.success('Bespoke invitation created successfully!');
          navigate(`/admin/invitations/${res.data.invitation.id}`);
        }
      } else {
        const res = await adminApi.updateInvitation(id, payload);
        if (res.data?.success) {
          toast.success('Invitation suite updated.');
          setFormData((prev) => ({
            ...prev,
            status: targetStatus || prev.status,
          }));
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save invitation.');
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async () => {
    if (isNew) {
      await handleSave('published');
      return;
    }

    if (formData.status === 'published') {
      try {
        const res = await adminApi.unpublishInvitation(id);
        if (res.data?.success) {
          toast.success('Invitation unpublished.');
          setFormData((prev) => ({ ...prev, status: 'draft' }));
        }
      } catch (err) {
        toast.error('Failed to unpublish');
      }
    } else {
      try {
        const res = await adminApi.publishInvitation(id);
        if (res.data?.success) {
          toast.success('Invitation published live!');
          setFormData((prev) => ({ ...prev, status: 'published' }));
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to publish');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 font-dmsans">
        <DotMatrixLoader />
        <p className="mt-4 text-xs font-poppins font-medium text-[#b5e8c5]/80 tracking-widest uppercase">
          Loading Invitation Artisan Suite...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden font-dmsans">
      {/* Top Action Bar */}
      <header className="px-6 py-3.5 bg-[#031424] border-b border-[#b5e8c5]/15 flex items-center justify-between shrink-0 font-dmsans">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/invitations"
            className="p-2 rounded-xl bg-[#020b17] border border-[#b5e8c5]/15 text-[#8ab89c] hover:text-white transition-colors"
          >
            <RiArrowLeftLine size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-poppins font-bold text-white tracking-tight">
                {isNew ? 'Assemble New Wedding Suite' : `Editing Suite: ${formData.slug}`}
              </h1>
              <OrderStatusBadge status={formData.status} />
            </div>
            <p className="text-[11px] font-dmsans text-[#8ab89c]">
              Public URL: <span className="font-mono text-[#b5e8c5]">/invite/{formData.slug || '...'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {formData.status === 'published' && formData.slug && (
            <a
              href={`/invite/${formData.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#020b17] border border-[#b5e8c5]/20 text-[#b5e8c5] text-xs font-poppins font-medium hover:underline"
            >
              <span>View Live</span>
              <RiExternalLinkLine size={13} />
            </a>
          )}

          <button
            type="button"
            onClick={handleTogglePublish}
            disabled={saving}
            className={`px-3.5 py-2 rounded-xl text-xs font-poppins font-medium transition-colors ${
              formData.status === 'published'
                ? 'bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/30'
                : 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30'
            }`}
          >
            {formData.status === 'published' ? 'Unpublish to Draft' : 'Publish Live'}
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#C49A45] to-[#E8D5A3] text-[#020b17] font-poppins font-semibold text-xs tracking-wider uppercase hover:opacity-95 transition-all shadow-md"
          >
            <RiSaveLine size={15} />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </header>

      {/* Editor & Preview Split View */}
      <div className="flex-1 flex min-h-0">
        {/* Left: Form Panels */}
        <div className="w-1/2 flex flex-col border-r border-[#b5e8c5]/15 bg-[#020b17]">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 p-2 bg-[#031424] border-b border-[#b5e8c5]/10 overflow-x-auto shrink-0 font-poppins">
            {[
              { id: 'couple', label: '1. Couple & Slug' },
              { id: 'events', label: '2. Ceremonies & Venues' },
              { id: 'content', label: '3. Spiritual Content' },
              { id: 'media', label: '4. Video & Visuals' },
              { id: 'settings', label: '5. Settings & Order' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-xl text-xs font-medium tracking-wide whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#123F36] text-[#b5e8c5] border border-[#b5e8c5]/30'
                    : 'text-[#8ab89c] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* TAB 1: COUPLE & SLUG */}
            {activeTab === 'couple' && (
              <div className="space-y-5 font-dmsans">
                <div className="space-y-1">
                  <h3 className="text-sm font-poppins font-semibold text-white">Identity &amp; Template Configuration</h3>
                  <p className="text-xs text-[#8ab89c]">
                    Define the public URL slug, couple names, and select the design template suite.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-[11px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">
                      Public URL Slug (Required, lowercase letters, numbers, hyphens)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#8ab89c] font-mono">
                        /invite/
                      </span>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) =>
                          updateField(
                            'slug',
                            e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                          )
                        }
                        placeholder="ahmed-and-fatima-2027"
                        className="w-full pl-18 pr-4 py-2.5 rounded-xl bg-[#031424] border border-[#b5e8c5]/20 text-xs font-mono text-white focus:outline-none focus:border-[#C49A45]"
                      />
                    </div>
                  </div>

                  <div className="col-span-2 space-y-1.5">
                    <label className="text-[11px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">
                      Template Suite Component
                    </label>
                    <select
                      value={formData.templateSlug}
                      onChange={(e) => {
                        updateField('templateSlug', e.target.value);
                        setPreviewKey((prev) => prev + 1);
                      }}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#031424] border border-[#b5e8c5]/20 text-xs text-white focus:outline-none focus:border-[#C49A45] font-dmsans"
                    >
                      <option value="mizaan-royal">Mizaan Royal (Opulent Emerald &amp; Rose Gold Opening)</option>
                      <option value="royal-majesty">Royal Majesty (Moorish Arches &amp; Porcelain Blue)</option>
                      <option value="zafaf-regal">Zafaf Regal (High-Contrast Minimal Luxe &amp; Velvet)</option>
                      <option value="rawdah-luxe">Rawdah Luxe (Monochrome Ivory &amp; Botanical)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">
                      Groom Full Name (English)
                    </label>
                    <input
                      type="text"
                      value={formData.groomName}
                      onChange={(e) => updateField('groomName', e.target.value)}
                      placeholder="Zayd Ibrahim"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#031424] border border-[#b5e8c5]/20 text-xs text-white focus:outline-none focus:border-[#C49A45] font-dmsans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">
                      Groom Arabic Calligraphy Text
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.groomArabic}
                      onChange={(e) => updateField('groomArabic', e.target.value)}
                      placeholder="زَيْد إِبْرَاهِيم"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#031424] border border-[#b5e8c5]/20 text-xs text-white focus:outline-none focus:border-[#C49A45]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">
                      Bride Full Name (English)
                    </label>
                    <input
                      type="text"
                      value={formData.brideName}
                      onChange={(e) => updateField('brideName', e.target.value)}
                      placeholder="Maryam Al-Zahra"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#031424] border border-[#b5e8c5]/20 text-xs text-white focus:outline-none focus:border-[#C49A45] font-dmsans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">
                      Bride Arabic Calligraphy Text
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={formData.brideArabic}
                      onChange={(e) => updateField('brideArabic', e.target.value)}
                      placeholder="مَرْيَم الزَّهْرَاء"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#031424] border border-[#b5e8c5]/20 text-xs text-white focus:outline-none focus:border-[#C49A45]"
                    />
                  </div>

                  <div className="col-span-2 space-y-1.5">
                    <label className="text-[11px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">
                      Tagline / Lead Invitation Blessing
                    </label>
                    <textarea
                      rows={2}
                      value={formData.tagline}
                      onChange={(e) => updateField('tagline', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#031424] border border-[#b5e8c5]/20 text-xs text-white focus:outline-none focus:border-[#C49A45] font-dmsans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">
                      Groom Father / Parents
                    </label>
                    <input
                      type="text"
                      value={formData.groomFather}
                      onChange={(e) => updateField('groomFather', e.target.value)}
                      placeholder="Ibrahim Khan"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#031424] border border-[#b5e8c5]/20 text-xs text-white focus:outline-none focus:border-[#C49A45] font-dmsans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-poppins font-semibold uppercase tracking-wider text-[#8ab89c]">
                      Bride Father / Parents
                    </label>
                    <input
                      type="text"
                      value={formData.brideFather}
                      onChange={(e) => updateField('brideFather', e.target.value)}
                      placeholder="Abdul Qadir Al-Zahra"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#031424] border border-[#b5e8c5]/20 text-xs text-white focus:outline-none focus:border-[#C49A45] font-dmsans"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CEREMONIES & VENUES */}
            {activeTab === 'events' && (
              <div className="space-y-6 font-dmsans">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-poppins font-semibold text-white">Ceremonies &amp; Itinerary</h3>
                    <p className="text-xs text-[#8ab89c]">Configure Nikah, Walima, and other ceremonies.</p>
                  </div>
                  <button
                    type="button"
                    onClick={addEvent}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#123F36] text-[#b5e8c5] text-xs font-poppins font-medium hover:bg-[#1a554a]"
                  >
                    <RiAddLine size={14} />
                    <span>Add Ceremony</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.events.map((ev, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-2xl bg-[#031424] border border-[#b5e8c5]/15 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-[#b5e8c5]/10 pb-2">
                        <span className="text-xs font-poppins font-semibold uppercase tracking-wider text-[#C49A45]">
                          Ceremony {index + 1}: {ev.title || 'Untitled'}
                        </span>
                        {formData.events.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEvent(index)}
                            className="p-1 rounded text-[#8ab89c] hover:text-red-400"
                          >
                            <RiDeleteBinLine size={14} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-[10px] font-poppins font-semibold text-[#8ab89c] uppercase">Ceremony Title</label>
                          <input
                            type="text"
                            value={ev.title}
                            onChange={(e) => updateEventField(index, 'title', e.target.value)}
                            placeholder="Nikah Ceremony"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#020b17] border border-[#b5e8c5]/20 text-white mt-1 font-dmsans"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-poppins font-semibold text-[#8ab89c] uppercase">Date (YYYY-MM-DD)</label>
                          <input
                            type="date"
                            value={ev.date}
                            onChange={(e) => updateEventField(index, 'date', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#020b17] border border-[#b5e8c5]/20 text-white mt-1 font-dmsans"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-poppins font-semibold text-[#8ab89c] uppercase">Time Display</label>
                          <input
                            type="text"
                            value={ev.timeDisplay}
                            onChange={(e) => updateEventField(index, 'timeDisplay', e.target.value)}
                            placeholder="11:30 AM"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#020b17] border border-[#b5e8c5]/20 text-white mt-1 font-dmsans"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-poppins font-semibold text-[#8ab89c] uppercase">Hijri Date String</label>
                          <input
                            type="text"
                            value={ev.hijriDate}
                            onChange={(e) => updateEventField(index, 'hijriDate', e.target.value)}
                            placeholder="27th Rajab 1448 AH"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#020b17] border border-[#b5e8c5]/20 text-white mt-1 font-dmsans"
                          />
                        </div>

                        <div className="col-span-2">
                          <label className="text-[10px] font-poppins font-semibold text-[#8ab89c] uppercase">Venue Name</label>
                          <input
                            type="text"
                            value={ev.venue?.name || ''}
                            onChange={(e) => updateEventVenue(index, 'name', e.target.value)}
                            placeholder="The Royal Grand Ballroom, Taj Falaknuma Palace"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#020b17] border border-[#b5e8c5]/20 text-white mt-1 font-dmsans"
                          />
                        </div>

                        <div className="col-span-2">
                          <label className="text-[10px] font-poppins font-semibold text-[#8ab89c] uppercase">Venue Address / City</label>
                          <input
                            type="text"
                            value={ev.venue?.address || ''}
                            onChange={(e) => updateEventVenue(index, 'address', e.target.value)}
                            placeholder="Hyderabad, Telangana, India"
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#020b17] border border-[#b5e8c5]/20 text-white mt-1 font-dmsans"
                          />
                        </div>

                        <div className="col-span-2">
                          <label className="text-[10px] font-poppins font-semibold text-[#8ab89c] uppercase">Google Maps Navigation Link</label>
                          <input
                            type="url"
                            value={ev.venue?.mapsUrl || ''}
                            onChange={(e) => updateEventVenue(index, 'mapsUrl', e.target.value)}
                            placeholder="https://maps.google.com/?q=..."
                            className="w-full px-2.5 py-1.5 rounded-lg bg-[#020b17] border border-[#b5e8c5]/20 text-white mt-1 font-dmsans"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: SPIRITUAL CONTENT */}
            {activeTab === 'content' && (
              <div className="space-y-4 font-dmsans">
                <div className="space-y-1">
                  <h3 className="text-sm font-poppins font-semibold text-white">Spiritual Calligraphy &amp; Verses</h3>
                  <p className="text-xs text-[#8ab89c]">Bismillah, Quranic marriage verses, and WhatsApp RSVP configuration.</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] font-poppins font-semibold text-[#8ab89c] uppercase">Quranic Verse (Arabic)</label>
                    <textarea
                      rows={2}
                      dir="rtl"
                      value={formData.content?.quranicVerse || ''}
                      onChange={(e) => updateNestedField('content', 'quranicVerse', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#031424] border border-[#b5e8c5]/20 text-white mt-1 font-serif"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-poppins font-semibold text-[#8ab89c] uppercase">Verse Reference</label>
                    <input
                      type="text"
                      value={formData.content?.quranicVerseRef || ''}
                      onChange={(e) => updateNestedField('content', 'quranicVerseRef', e.target.value)}
                      placeholder="Surah Ar-Rum 30:21"
                      className="w-full px-3 py-2 rounded-xl bg-[#031424] border border-[#b5e8c5]/20 text-white mt-1 font-dmsans"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-poppins font-semibold text-[#8ab89c] uppercase">WhatsApp RSVP Phone Number (Digits only, including country code)</label>
                    <input
                      type="text"
                      value={formData.content?.rsvpWhatsapp || ''}
                      onChange={(e) => updateNestedField('content', 'rsvpWhatsapp', e.target.value)}
                      placeholder="917448552778"
                      className="w-full px-3 py-2 rounded-xl bg-[#031424] border border-[#b5e8c5]/20 text-white mt-1 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-poppins font-semibold text-[#8ab89c] uppercase">Wedding Hashtag</label>
                    <input
                      type="text"
                      value={formData.content?.hashtag || ''}
                      onChange={(e) => updateNestedField('content', 'hashtag', e.target.value)}
                      placeholder="#ZaydAndMaryam"
                      className="w-full px-3 py-2 rounded-xl bg-[#031424] border border-[#b5e8c5]/20 text-white mt-1 font-dmsans"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-poppins font-semibold text-[#8ab89c] uppercase">Closing Dua</label>
                    <textarea
                      rows={2}
                      value={formData.content?.closingDua || ''}
                      onChange={(e) => updateNestedField('content', 'closingDua', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#031424] border border-[#b5e8c5]/20 text-white mt-1 font-dmsans"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: MEDIA & VISUALS */}
            {activeTab === 'media' && (
              <div className="space-y-4 font-dmsans">
                <div className="space-y-1">
                  <h3 className="text-sm font-poppins font-semibold text-white">Media Assets &amp; Interactive Features</h3>
                  <p className="text-xs text-[#8ab89c]">Customize video paths and toggle template interactive sections.</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] font-poppins font-semibold text-[#8ab89c] uppercase">Opening Video URL</label>
                    <input
                      type="text"
                      value={formData.images?.openingVideo || ''}
                      onChange={(e) => updateNestedField('images', 'openingVideo', e.target.value)}
                      placeholder="/templates/template1/openingdemo2.mp4"
                      className="w-full px-3 py-2 rounded-xl bg-[#031424] border border-[#b5e8c5]/20 text-white mt-1 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-poppins font-semibold text-[#8ab89c] uppercase">Hero Background Pattern Image URL</label>
                    <input
                      type="text"
                      value={formData.images?.heroBackground || ''}
                      onChange={(e) => updateNestedField('images', 'heroBackground', e.target.value)}
                      placeholder="/templates/template1/background.png"
                      className="w-full px-3 py-2 rounded-xl bg-[#031424] border border-[#b5e8c5]/20 text-white mt-1 font-mono"
                    />
                  </div>

                  <div className="pt-3 border-t border-[#b5e8c5]/10 space-y-3">
                    <p className="text-xs font-poppins font-semibold uppercase tracking-wider text-[#C49A45]">Interactive Section Toggles</p>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-[#031424] border border-[#b5e8c5]/10 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.customization?.showCountdown ?? true}
                        onChange={(e) => updateNestedField('customization', 'showCountdown', e.target.checked)}
                        className="rounded border-[#b5e8c5]/30 text-[#C49A45] focus:ring-0"
                      />
                      <span className="text-xs text-white font-dmsans">Enable Live Countdown Timer</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-[#031424] border border-[#b5e8c5]/10 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.customization?.showScratchCard ?? true}
                        onChange={(e) => updateNestedField('customization', 'showScratchCard', e.target.checked)}
                        className="rounded border-[#b5e8c5]/30 text-[#C49A45] focus:ring-0"
                      />
                      <span className="text-xs text-white font-dmsans">Enable Interactive Gold Scratch Card Date Reveal</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 rounded-xl bg-[#031424] border border-[#b5e8c5]/10 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.customization?.showWalima ?? true}
                        onChange={(e) => updateNestedField('customization', 'showWalima', e.target.checked)}
                        className="rounded border-[#b5e8c5]/30 text-[#C49A45] focus:ring-0"
                      />
                      <span className="text-xs text-white font-dmsans">Show Walima Ceremony Card</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: SETTINGS & ORDER LINK */}
            {activeTab === 'settings' && (
              <div className="space-y-4 font-dmsans">
                <div className="space-y-1">
                  <h3 className="text-sm font-poppins font-semibold text-white">Order Linkage &amp; Internal Notes</h3>
                  <p className="text-xs text-[#8ab89c]">Associate with a customer order and record artisan notes.</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] font-poppins font-semibold text-[#8ab89c] uppercase">Linked Order ID</label>
                    <input
                      type="number"
                      value={formData.orderId || ''}
                      onChange={(e) => updateField('orderId', e.target.value ? parseInt(e.target.value, 10) : null)}
                      placeholder="e.g. 1"
                      className="w-full px-3 py-2 rounded-xl bg-[#031424] border border-[#b5e8c5]/20 text-white mt-1 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-poppins font-semibold text-[#8ab89c] uppercase">Artisan Internal Notes</label>
                    <textarea
                      rows={5}
                      value={formData.adminNotes}
                      onChange={(e) => updateField('adminNotes', e.target.value)}
                      placeholder="Notes regarding font preferences, WhatsApp confirmation logs, client revisions..."
                      className="w-full px-3 py-2 rounded-xl bg-[#031424] border border-[#b5e8c5]/20 text-white mt-1"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Live Interactive Simulator */}
        <div className="w-1/2 p-4 bg-[#010610] overflow-hidden">
          <LivePreviewFrame
            invitationData={formData}
            previewKey={previewKey}
            onRefresh={() => setPreviewKey((prev) => prev + 1)}
          />
        </div>
      </div>
    </div>
  );
}
