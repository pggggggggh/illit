/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.teenvogue.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
