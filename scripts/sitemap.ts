import { SitemapStream, streamToPromise } from 'sitemap';

import { writeFile } from 'fs';

(async () => {
  try {
    const smStream = new SitemapStream({
      hostname: 'https://calitb.dev',
    });

    const urls = buildURLs();

    urls.forEach(({ url, priority }) => {
      smStream.write({
        url,
        changefreq: 'weekly',
        priority,
      });
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    writeFile('public/sitemap.xml', sitemapOutput, (err) => {
      if (err) {
        return console.error(err);
      }
      // eslint-disable-next-line no-console
      console.log('Sitemap generated!');
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Failed to generate the sitemap');
  }
})();

export {};

function buildURLs(): Array<{ url: string; priority: number }> {
  const fixedURLs = [
    { url: '', priority: 0.5 },
    { url: 'repositories', priority: 1.0 },
    { url: 'wiki', priority: 1.0 },
  ];

  return fixedURLs;
}
