/** @type {import('next-sitemap').IConfig} */

module.exports = {
  sourceDir: 'build',
  siteUrl: 'https://www.bread-crumbs.tech',
  generateRobotsTxt: true,
  sitemapSize: 1000,
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => ({
    loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
    changefreq: config.changefreq,
    priority: path === '/' ? 1.0 : config.priority,
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    alternateRefs: config.alternateRefs ?? [],
  }),
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
