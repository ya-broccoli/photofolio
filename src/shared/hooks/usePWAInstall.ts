'use client'

import { useEffect, useState } from 'react'

type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>
    userChoice: Promise<{
        outcome: 'accepted' | 'dismissed'
        platform: string
    }>
}

export const usePWAInstall = () => {
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
    const [isInstallable, setIsInstallable] = useState(false)
    const [isIOS, setIsIOS] = useState(false)
    const [isSafariMac, setIsSafariMac] = useState(false)

    useEffect(() => {
        console.log('userAgent:', window.navigator.userAgent)
        console.log('maxTouchPoints:', navigator.maxTouchPoints)

        const userAgent = window.navigator.userAgent
        const isTouchDevice = 'ontouchend' in window

        setIsIOS(
            /iPhone|iPad|iPod/i.test(userAgent) || (/Macintosh/i.test(userAgent) && isTouchDevice),
        )

        setIsSafariMac(
            /Macintosh/i.test(userAgent) &&
                /Safari/i.test(userAgent) &&
                !/Chrome|CriOS|Firefox|FxiOS|EdgiOS/i.test(userAgent) &&
                !isTouchDevice,
        )

        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault()

            setInstallPrompt(event as BeforeInstallPromptEvent)
            setIsInstallable(true)
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        }
    }, [])

    const install = async () => {
        if (!installPrompt) return

        await installPrompt.prompt()

        const result = await installPrompt.userChoice

        if (result.outcome === 'accepted') {
            setIsInstallable(false)
        }

        setInstallPrompt(null)
    }

    return {
        isInstallable,
        install,
        isIOS,
        isSafariMac,
    }
}
