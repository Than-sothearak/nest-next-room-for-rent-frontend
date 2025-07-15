export default function manifest() {
  return {
    name: 'Next.js logment',
    short_name: 'NextLogment',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/images/logo.jpg',
        sizes: '192x192',
        type: 'image/png',
      },
      {
       src: '/images/logo.jpg',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}