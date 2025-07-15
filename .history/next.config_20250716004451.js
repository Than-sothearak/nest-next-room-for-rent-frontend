const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      // Cache static files (images, fonts, etc.)
      urlPattern: /^https:\/\/your-domain\.com\/.*\.(?:png|jpg|jpeg|svg|gif|webp|woff2?|ttf|eot)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-assets",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
    {
      // Cache dynamic pages (like dashboard, booking list, etc.)
      urlPattern: /^https:\/\/your-domain\.com\/dashboard/,
      handler: "NetworkFirst",
      options: {
        cacheName: "pages",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24, // 1 day
        },
      },
    },
  ],
});

module.exports = withPWA({
  reactStrictMode: true,
});
