/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'flagcdn.com', // First domain
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org', // Second domain
            }
        ]
    }
};

export default nextConfig;
