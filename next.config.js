/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'f3ravyia775ktyke.public.blob.vercel-storage.com',
              pathname: '**',
            },
          ],
      },
    
}

module.exports = nextConfig
