import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: '/',
        name: 'Photo Gallery',
        short_name: 'Gallery',
        description: 'Авторская фотогалерея. Чёрно-белая и цветная фотография.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
        // screenshots: [
        //     {
        //         src: '/screenshots/desktop.png',
        //         sizes: '1280x720',
        //         type: 'image/png',
        //         form_factor: 'wide',
        //     },
        //     {
        //         src: '/screenshots/mobile.png',
        //         sizes: '390x844',
        //         type: 'image/png',
        //     },
        // ],
    }
}
