/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thearak-next-computer.s3.ap-southeast-1.amazonaws.com',
      
      },
      {
        protocol: 'https',
        hostname: 'thearak-next-ecommerce.s3.ap-southeast-1.amazonaws.com',
        pathname: '/uploads/**',
      
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      
      },
       {
        protocol: 'https',
        hostname: 'www.pngmart.com',
      
      },
        {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      
      },

        {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      
      },
    ],
  },
  experimental: {
    serverActions: {
      serverComponentsExternalPackages: ['grammy'],
      bodySizeLimit: "5mb", // Increase the body size limit to 5 MB
    },
  },
};

export default nextConfig;
