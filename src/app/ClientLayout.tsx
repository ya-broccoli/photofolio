'use client'

import React, { useEffect, useRef, useState } from 'react'
import { NavigationMenu } from '@/features/navigation/NavigationMenu/NavigationMenu'
import { Burger } from '@/features/navigation/Burger/Burger'

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
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
