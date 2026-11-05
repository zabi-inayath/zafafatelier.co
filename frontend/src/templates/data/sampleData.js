/**
 * Zafaf Atelier — Sample / Demo Invitation Data
 *
 * This data is used for:
 * 1. Template preview mode (isPreview=true) — shown in the public template gallery
 * 2. Local development / testing
 *
 * It is NEVER stored in the database or used for real customer invitations.
 * Real invitations always load their data from /api/invitations/:slug.
 */

/** @type {import('./schema').InvitationData} */
export const SAMPLE_INVITATION = {
  slug: 'demo-zayd-maryam',
  templateSlug: 'mizaan-royal',
  status: 'published',

  groomName: 'Zayd Ibrahim',
  groomArabic: 'زَيْد إِبْرَاهِيم',
  groomFather: 'Ibrahim Al-Hassan',
  groomMother: '',

  brideName: 'Maryam Al-Zahra',
  brideArabic: 'مَرْيَم الزَّهْرَاء',
  brideFather: 'Abdul Qadir Al-Zahra',
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
        address: 'Taj Falaknuma Palace, Hyderabad, India',
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
        address: 'Jubilee Hills, Hyderabad, India',
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
    hashtag: '#ZaydAndMaryam',
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
};

/**
 * Returns a copy of SAMPLE_INVITATION merged with any override fields.
 * Used internally by templates when rendering in preview mode.
 * @param {Partial<import('./schema').InvitationData>} [overrides]
 * @returns {import('./schema').InvitationData}
 */
export function getSampleInvitation(overrides = {}) {
  return {
    ...SAMPLE_INVITATION,
    ...overrides,
    events: overrides.events ?? SAMPLE_INVITATION.events,
    images: { ...SAMPLE_INVITATION.images, ...(overrides.images ?? {}) },
    content: { ...SAMPLE_INVITATION.content, ...(overrides.content ?? {}) },
    customization: { ...SAMPLE_INVITATION.customization, ...(overrides.customization ?? {}) },
  };
}

/**
 * Normalizes raw invitation data from API (snake_case) or JS state into a consistent format.
 * Falls back safely to SAMPLE_INVITATION for any missing required fields.
 */
export function normalizeInvitation(data) {
  if (!data) return SAMPLE_INVITATION;
  return {
    id: data.id,
    slug: data.slug || SAMPLE_INVITATION.slug,
    templateSlug: data.template_slug || data.templateSlug || 'mizaan-royal',
    status: data.status || 'published',
    groomName: data.groom_name ?? data.groomName ?? SAMPLE_INVITATION.groomName,
    groomArabic: data.groom_arabic ?? data.groomArabic ?? SAMPLE_INVITATION.groomArabic,
    groomFather: data.groom_father ?? data.groomFather ?? SAMPLE_INVITATION.groomFather,
    groomMother: data.groom_mother ?? data.groomMother ?? SAMPLE_INVITATION.groomMother,
    brideName: data.bride_name ?? data.brideName ?? SAMPLE_INVITATION.brideName,
    brideArabic: data.bride_arabic ?? data.brideArabic ?? SAMPLE_INVITATION.brideArabic,
    brideFather: data.bride_father ?? data.brideFather ?? SAMPLE_INVITATION.brideFather,
    brideMother: data.bride_mother ?? data.brideMother ?? SAMPLE_INVITATION.brideMother,
    tagline: data.tagline ?? SAMPLE_INVITATION.tagline,
    events: Array.isArray(data.events) && data.events.length > 0 ? data.events : SAMPLE_INVITATION.events,
    images: { ...SAMPLE_INVITATION.images, ...(data.images || {}) },
    content: { ...SAMPLE_INVITATION.content, ...(data.content || {}) },
    customization: { ...SAMPLE_INVITATION.customization, ...(data.customization || {}) },
    adminNotes: data.admin_notes ?? data.adminNotes ?? '',
  };
}

