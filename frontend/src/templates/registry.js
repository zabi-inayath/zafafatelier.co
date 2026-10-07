/**
 * Zafaf Atelier - Wedding Invitation Templates Registry
 * Centralized, extensible registry for all bespoke wedding web invitations.
 */

export const TEMPLATES_REGISTRY = [
  {
    id: 'mizaan-royal',
    slug: 'mizaan-royal',
    name: 'Mizaan Royal',
    arabicTitle: 'الميزان الملكي',
    tag: 'Signature Islamic Web Suite',
    badge: 'Signature Suite',
    category: 'Web Invitation',
    occasion: 'Nikah & Walima',
    aesthetic: 'Royal Emerald, Warm Gold & Pearl Cream',
    description: 'An opulent, regal Islamic web invitation suite featuring majestic Arabic Bismillah calligraphy, sacred Quranic marriage verses, live countdown, dual ceremony itinerary, interactive Google Maps, and one-tap WhatsApp RSVP.',
    features: [
      'Authentic Thuluth & Diwani Calligraphy',
      'Sacred Surah Ar-Rum Quranic Verses',
      'Live Days/Hours/Minutes Countdown Timer',
      'Dual Ceremony Itinerary (Nikah & Walima)',
      'Add to Calendar (.ics & Google Calendar)',
      'Direct Google Maps Venue Navigation',
      'Interactive One-Touch WhatsApp RSVP',
      '100% Music-Free Spiritual Ambience Toggle',
      'Modest Etiquette & Photography Notes',
      'Ultra-Responsive on iPhone & Android'
    ],
    sampleCouple: {
      groom: 'Zayd Ibrahim',
      groomArabic: 'زَيْد إِبْرَاهِيم',
      bride: 'Maryam Al-Zahra',
      brideArabic: 'مَرْيَم الزَّهْرَاء',
      tagline: 'Under the grace and blessings of Almighty Allah, celebrating their sacred union'
    },
    sampleEvent: {
      weddingDate: '2026-11-28T11:30:00',
      dateFormatted: 'Saturday, 28th November 2026',
      hijriDate: '18th Jumada al-Awwal 1448 AH',
      city: 'Hyderabad, India'
    },
    route: '/mizaan-royal',
    templateRoute: '/templates/mizaan-royal',
    previewColor: '#03192e',
    accentColor: '#b5e8c5',
    goldColor: '#d4af37',
    isAvailable: true,
  }
];

export const UPCOMING_TEMPLATES = [
  {
    id: 'andalusian-gold',
    slug: 'andalusian-gold',
    name: 'Andalusian Gold',
    arabicTitle: 'ذهب الأندلس',
    tag: 'Moorish Heritage Suite',
    category: 'Web Invitation',
    aesthetic: 'Deep Ink, Antique Gold & Geometric Arches',
    description: 'Inspired by the Alhambra Palace in Granada, featuring intricate geometric mashrabiya lattice work and illuminated floral borders.',
    isAvailable: false,
    status: 'Artisan Drafting'
  },
  {
    id: 'madinah-rose',
    slug: 'madinah-rose',
    name: 'Madinah Rose',
    arabicTitle: 'ورد المدينة',
    tag: 'Botanical Elegance',
    category: 'Web Invitation',
    aesthetic: 'Blush Velvet, Sage & Gold Foil',
    description: 'Gentle blooming jasmine and Taif rose botanical flourishes framing sacred marriage prayers and a delicate pastel palette.',
    isAvailable: false,
    status: 'Artisan Drafting'
  },
  {
    id: 'noor-minimalist',
    slug: 'noor-minimalist',
    name: 'Noor Minimalist',
    arabicTitle: 'نور',
    tag: 'Modern Editorial',
    category: 'Web Invitation',
    aesthetic: 'Monochrome Ivory, Onyx & Fine Line Art',
    description: 'High-contrast luxury editorial typography with clean architectural whitespace and ultra-modern interactive guest experience.',
    isAvailable: false,
    status: 'Artisan Drafting'
  }
];

export function getTemplateBySlug(slug) {
  if (!slug) return null;
  const clean = slug.toLowerCase().trim();
  return TEMPLATES_REGISTRY.find(t => t.slug === clean || t.id === clean) || null;
}

export function getAllTemplates() {
  return TEMPLATES_REGISTRY;
}
