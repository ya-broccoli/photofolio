'use client'

import React, { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { NavigationMenu } from '@/features/navigation/NavigationMenu/NavigationMenu'
import { Burger } from '@/features/navigation/Burger/Burger'
import { InstallButton } from '@/features/pwa/InstallButton/InstallButton'

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const category = searchParams.get('category')
    const showInstallButton = pathname === '/' && !category

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const burgerRef = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
        const handleFirstTab = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return

            const active = document.activeElement

            if (active === document.body) {
                e.preventDefault()
                burgerRef.current?.focus()
            }
        }

        window.addEventListener('keydown', handleFirstTab)

        return () => {
            window.removeEventListener('keydown', handleFirstTab)
        }
    }, [])

    return (
        <>
            {showInstallButton && <InstallButton />}

            <Burger
                ref={burgerRef}
                isOpen={isMenuOpen}
                onToggleAction={() => setIsMenuOpen((prev) => !prev)}
            />

            <NavigationMenu open={isMenuOpen} onCloseAction={() => setIsMenuOpen(false)} />

            {children}
        </>
    )
}

export default ClientLayout
