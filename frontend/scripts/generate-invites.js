import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, 'utf-8');

const orders = [
  {
    slug: 'sadullah-weds-safiya',
    title: 'Wedding Invitation | Sadullah & Safiya',
    description: "In The Name of Allah, The Most Gracious, The Most Merciful. With Allah's blessings, we joyfully invite you to the sacred Nikah & Walima celebration of Sadullah Hakikullah Khan & Safiya Abul Qasim Khan.",
    image: 'https://zafaf.mizaantech.co.in/images/sadullah-safiya-preview.png',
    url: 'https://zafaf.mizaantech.co.in/invite/sadullah-weds-safiya',
  },
  {
    slug: 'farhan-weds-haya',
    title: 'Wedding Invitation | Farhan & Haya',
    description: "In The Name of Allah, The Most Gracious, The Most Merciful. With Allah's blessings, we joyfully invite you to the sacred Nikah celebration of Farhan Ahmad Khan & Haya Ali on Thursday, 11th March 2027 in Al Khobar, Saudi Arabia.",
    image: 'https://zafaf.mizaantech.co.in/images/farhan-haya-preview1.png',
    url: 'https://zafaf.mizaantech.co.in/invite/farhan-weds-haya',
  },
  {
    slug: 'shiblu-weds-rena',
    title: 'Walima Reception Invitation | Shiblu & Rena',
    description: "In The Name of Allah, The Most Gracious, The Most Merciful. With Allah's blessings, we joyfully invite you to the Walima reception celebrating the marriage of Shiblu Rahman & Rena Begum at The Jumeirah Restaurant - Beckton, London.",
    image: 'https://zafaf.mizaantech.co.in/images/shiblu-rena-preview.jpg?v=2',
    url: 'https://zafaf.mizaantech.co.in/shiblu-weds-rena',
    isRootSlug: true
  }
];

function createHtmlWithMeta(baseHtml, order, pageUrl) {
  let html = baseHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/gi, `<title>${order.title}</title>`);

  // Replace Meta Description
  html = html.replace(/<meta\s+name=["']description["'][\s\S]*?\/>/gi, `<meta name="description" content="${order.description}" />`);

  // Replace or inject og:title
  if (/<meta\s+property=["']og:title["'][\s\S]*?\/>/i.test(html)) {
    html = html.replace(/<meta\s+property=["']og:title["'][\s\S]*?\/>/gi, `<meta property="og:title" content="${order.title}" />`);
  } else {
    html = html.replace('</head>', `  <meta property="og:title" content="${order.title}" />\n</head>`);
  }

  // Replace or inject og:description
  if (/<meta\s+property=["']og:description["'][\s\S]*?\/>/i.test(html)) {
    html = html.replace(/<meta\s+property=["']og:description["'][\s\S]*?\/>/gi, `<meta property="og:description" content="${order.description}" />`);
  } else {
    html = html.replace('</head>', `  <meta property="og:description" content="${order.description}" />\n</head>`);
  }

  const imageType = order.image.includes('.png') ? 'image/png' : 'image/jpeg';

  // Inject open graph tags
  const ogTags = `
  <!-- Dedicated Order Meta Preview -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:image" content="${order.image}" />
  <meta property="og:image:secure_url" content="${order.image}" />
  <meta property="og:image:type" content="${imageType}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${order.title}" />
  <meta property="og:site_name" content="${order.title}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${order.title}" />
  <meta name="twitter:description" content="${order.description}" />
  <meta name="twitter:image" content="${order.image}" />
</head>`;

  return html.replace('</head>', ogTags);
}

orders.forEach(order => {
  const inviteUrl = `https://zafaf.mizaantech.co.in/invite/${order.slug}`;
  const inviteHtml = createHtmlWithMeta(baseHtml, order, inviteUrl);

  const outDir = path.join(distDir, 'invite', order.slug);
  fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, 'index.html');
  fs.writeFileSync(outPath, inviteHtml, 'utf-8');
  console.log(`Generated prerendered meta page: ${outPath}`);

  // Also write flat html invite/<slug>.html
  const flatPath = path.join(distDir, 'invite', `${order.slug}.html`);
  fs.writeFileSync(flatPath, inviteHtml, 'utf-8');
  console.log(`Generated flat meta page: ${flatPath}`);

  if (order.isRootSlug) {
    const rootUrl = `https://zafaf.mizaantech.co.in/${order.slug}`;
    const rootHtml = createHtmlWithMeta(baseHtml, order, rootUrl);

    const rootOutDir = path.join(distDir, order.slug);
    fs.mkdirSync(rootOutDir, { recursive: true });
    const rootOutPath = path.join(rootOutDir, 'index.html');
    fs.writeFileSync(rootOutPath, rootHtml, 'utf-8');
    console.log(`Generated prerendered root meta page: ${rootOutPath}`);

    const rootFlatPath = path.join(distDir, `${order.slug}.html`);
    fs.writeFileSync(rootFlatPath, rootHtml, 'utf-8');
    console.log(`Generated root flat meta page: ${rootFlatPath}`);
  }
});
