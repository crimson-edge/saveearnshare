import type { APIRoute } from 'astro';

const pages = [
  '',
  '/calculators',
  '/calculators/savings',
  '/get-started',
  '/blog',
  '/coupon-database',
  '/digital-couponing-guide',
  '/store-rewards-guide'
];

export const GET: APIRoute = async () => {
  const site = 'https://www.saveearnshare.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${site}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    },
  });
}
