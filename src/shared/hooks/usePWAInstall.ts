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

    useEffect(() => {
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
    }
}
