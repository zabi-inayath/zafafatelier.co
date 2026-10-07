export const BRAND = {
  name: "Zafaf Atelier",
  arabicName: "زفاف",
  tagline: "Beautiful invitations for your blessed occasions 🤍",
  bio: "Web Invitations • E-Invites • Video Invites • No Music • No Haram Content",
  whatsappNumber: "+91 744 855 2778",
  whatsappRaw: "917448552778",
  whatsappUrl: "https://wa.me/917448552778?text=" + encodeURIComponent("Assalamu Alaikum! I would like to inquire about bespoke Islamic digital invitations from Zafaf Atelier."),
  email: "salam@mizaantech.co.in",
  instagramHandle: "@zafafatelier.co",
  instagramUrl: "https://instagram.com/zafafatelier.co",
  website: "zafaf.mizaantech.co.in",
  parentCompany: "Mizaan Technologies",
  parentCompanyUrl: "https://mizaantech.co.in",
};

export const SERVICES = [
  {
    id: "web-invitations",
    title: "Wedding Web Invitations",
    badge: "Interactive & Modern",
    description: "Bespoke digital invitation websites designed for your Nikah & Walima. Includes live countdown, interactive RSVP management, Google Maps venue navigation, and timeline schedules.",
    image: "/images/web-invite.jpg",
    features: [
      "Interactive RSVP & Guest Management",
      "Live Countdown to Event",
      "Direct Google Maps Location",
      "Multi-Event Timeline (Nikah, Walima, Haldi)",
      "Strictly Music-Free & Modest Aesthetics",
      "Custom Domain / Shareable Link"
    ],
    ctaText: "Order Web Invitation",
  },
  {
    id: "e-invites",
    title: "E-Invitations (Digital Cards)",
    badge: "Instant WhatsApp Sharing",
    description: "High-resolution digital invitation cards crafted in portrait mobile orientation. Perfect for effortless sharing across WhatsApp, Instagram, Telegram, and email.",
    image: "/images/e-invite-card.jpg",
    features: [
      "Ultra-HD Quality for Mobile Screens",
      "Bespoke Arabic & English Calligraphy",
      "Multi-Page Nikah & Walima Suites",
      "PDF & PNG High-Resolution Delivery",
      "Custom Quranic Verses & Duas",
      "Turnaround in 24–48 Hours"
    ],
    ctaText: "Order E-Invite Card",
  },
  {
    id: "video-invites",
    title: "Video Wedding Invitations",
    badge: "Cinematic • No Music",
    description: "Aesthetic, motion-crafted video invitations with gentle floral reveals and shimmering gold foil effects. Strictly 100% music-free, maintaining spiritual tranquility.",
    image: "/images/video-invite.jpg",
    features: [
      "Cinematic Motion Typography",
      "100% Music-Free / No Musical Instruments",
      "Elegant Islamic Arch & Geometric Accents",
      "Vertical 9:16 Video for Status & Reels",
      "Ready to Share on WhatsApp & Socials",
      "Fast Express Delivery Available"
    ],
    ctaText: "Order Video Invitation",
  },
];

export const TEMPLATES = [
  {
    id: "royal-walimah",
    title: "Royal Walimah Arabesque",
    category: "Walima",
    type: "E-Invite Card",
    image: "/images/e-invite-card.jpg",
    desc: "Midnight navy palette with gold foiled typography, mint floral borders, and traditional Thuluth Arabic script.",
    palette: ["#031327", "#b5e8c5", "#d4af37"],
  },
  {
    id: "zahra-farhan",
    title: "Bespoke Nikah Suite",
    category: "Nikah",
    type: "Digital Suite",
    image: "/images/hero-phone.jpg",
    desc: "Clean geometric archway styling with dual-language typography and delicate jasmine flourishes.",
    palette: ["#020b17", "#9fe5b7", "#f5e2b0"],
  },
  {
    id: "interactive-portal",
    title: "Zayd & Sophia Web Portal",
    category: "Websites",
    type: "Web Invitation",
    image: "/images/web-invite.jpg",
    desc: "A full interactive wedding web portal with guest RSVP, countdown, dress code notes, and direct navigation.",
    palette: ["#041f3c", "#b5e8c5", "#e4f4ea"],
  },
  {
    id: "amira-omar-video",
    title: "Aesthetic Motion Nikah",
    category: "Video Invites",
    type: "Motion Video",
    image: "/images/video-invite.jpg",
    desc: "Gently animated Islamic crescent and star motifs, candle glow atmosphere, completely free from musical instruments.",
    palette: ["#031327", "#d4af37", "#b5e8c5"],
  },
  {
    id: "aqiqah-blessing",
    title: "Celestial Aqiqah Card",
    category: "Aqiqah",
    type: "Digital Card",
    image: "/images/aqiqah-card.jpg",
    desc: "Golden crescent, Barakah typography, and delicate mint foliage to announce the arrival of your precious newborn.",
    palette: ["#031327", "#b5e8c5", "#d4af37"],
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Place Your Order",
    desc: "Select your desired invitation format (Web, E-Invite, or Video) and connect with our studio directly via WhatsApp or our instant form.",
  },
  {
    step: "02",
    title: "Share Your Details",
    desc: "Provide the names of the bride & groom, dates, timings, venue location, custom Quranic verses, and any special notes.",
  },
  {
    step: "03",
    title: "Design & Review",
    desc: "We curate your bespoke invitation preview within 24-48 hours. Review the design draft with unlimited minor text adjustments.",
  },
  {
    step: "04",
    title: "Receive & Share",
    desc: "Receive your final crystal-clear files or custom web link, ready to share with loved ones worldwide via WhatsApp and socials.",
  },
];

export const OCCASIONS = [
  {
    id: "nikah",
    title: "Nikah Invitations",
    desc: "Sacred marriage contracts & ceremonies with chosen Ayat & Hadith.",
    icon: "rings",
  },
  {
    id: "walima",
    title: "Walima Invitations",
    desc: "Sunnah feast celebrations designed to welcome honored family and friends.",
    icon: "mosque",
  },
  {
    id: "aqiqah",
    title: "Aqiqah Invitations",
    desc: "Celebrations welcoming new little blessings with gratitude and duas.",
    icon: "baby",
  },
  {
    id: "engagement",
    title: "Islamic Engagements",
    desc: "Mangni and family announcement cards crafted with modesty and warmth.",
    icon: "sparkles",
  },
  {
    id: "mahfil",
    title: "Mahfil & Khatam",
    desc: "Quran Khwani, Khatam-ul-Quran, and spiritual gathering invites.",
    icon: "book",
  },
  {
    id: "custom",
    title: "Custom Blessed Events",
    desc: "Hajj/Umrah homecoming, family anniversaries, and bespoke occasions.",
    icon: "calendar",
  },
];

export const TESTIMONIALS = [
  {
    quote: "MashAllah, the web invitation was a massive hit among all our guests! The RSVP counter and Google Maps button made logistics so seamless. Best of all, it honored our Islamic values with zero music. JazakAllah khair Zafaf Atelier!",
    author: "Ayesha & Tariq",
    event: "Nikah & Walima Web Suite",
    location: "Mumbai, India",
    rating: 5,
  },
  {
    quote: "The turnaround time was exceptional. Received our high-res WhatsApp card within 24 hours. The navy and gold calligraphy looked so royal on everyone's phones. Highly recommend to every Muslim couple!",
    author: "Mohammed Rayan",
    event: "Walimatul Nikah E-Invite",
    location: "Dubai, UAE",
    rating: 5,
  },
  {
    quote: "Finding an invitation studio that strictly avoids music and inappropriate imagery while maintaining ultra-modern luxury was an answer to our prayers. Professional, polite, and top-tier quality.",
    author: "Fatima & Zayd",
    event: "Video Invite & Digital Cards",
    location: "London, UK",
    rating: 5,
  },
];

export const FAQS = [
  {
    q: "How does your 'No Music' policy work for video invitations?",
    a: "In accordance with traditional Islamic etiquette, we strictly do not use instrumental music or songs in our video invitations. Instead, our video invites feature tranquil visual pacing, kinetic typography, ambient natural sounds (or gentle spoken nasheed/duas if requested), or silent artistic reveals that exude elegance without compromising Islamic values.",
  },
  {
    q: "How does the Wedding Web Invitation work for guests?",
    a: "Your guests receive a custom link (e.g. zafaf.mizaantech.co.in/your-names) that opens beautifully on any smartphone or computer. It includes a live countdown to the Nikah/Walima, one-tap Google Maps directions to the venue, event schedules, dress codes, and an interactive RSVP form where guest responses are sent directly to your email or WhatsApp.",
  },
  {
    q: "What is the typical delivery turnaround time?",
    a: "First design previews are delivered within 24 to 48 hours via WhatsApp. Once you review and approve the text, final high-resolution files (or your live interactive website link) are immediately handed over.",
  },
  {
    q: "Can invitations be customized in Arabic, Urdu, or other languages?",
    a: "Yes! We specialize in bilingual and multilingual invitations. We can include authentic Arabic calligraphy (Bismillah, Ayat, Duas), Urdu Nastaliq, and English side-by-side or as individual pages.",
  },
  {
    q: "Can I request revisions if event dates or venues change?",
    a: "Absolutely. We offer unlimited minor revisions for spelling, timings, and date corrections before final delivery. For Web Invitations, details can even be updated in real-time if timings change on the wedding day.",
  },
  {
    q: "How do I place an order?",
    a: "Simply click 'Order Your Invitation' or message us on WhatsApp at +91 744 855 2778. Share your event details, select your preferred theme, and our design team will begin crafting your custom preview.",
  },
];
