/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.imageban.ru',
            },
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60,
    },

    productionBrowserSourceMaps: false,

    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },

    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "img-src 'self' https://*.imageban.ru data: blob:",
                            "style-src 'self' 'unsafe-inline'",
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
                            "font-src 'self' data:",
                            "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
                        ].join('; '),
                    },
                ],
            },
        ]
    },
}

export default nextConfig
