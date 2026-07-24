import './globals.css'
import type { Metadata } from 'next'
import ClientLayout from './ClientLayout'
import { Analytics } from '@vercel/analytics/next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Photo Gallery',
    description:
        'Авторская фотогалерея. Чёрно-белая и цветная фотография, портреты, пейзажи, макро и творческие проекты. Взгляд сквозь объектив.',
    icons: {
        icon: [
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/android-chrome-192x192.png', sizes: '192x192' },
            { url: '/android-chrome-512x512.png', sizes: '512x512' },
        ],
        apple: '/apple-touch-icon.png',
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body className="antialiased">
                <ClientLayout>{children}</ClientLayout>
                <Analytics />
            </body>
        </html>
    )
}
