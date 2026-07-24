'use client'

import { useEffect, useState } from 'react'
import s from './ScrollToTop.module.css'
import { ArrowUpIcon } from '@/shared/ui/ArrowUpIcon/ArrowUpIcon'

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop

            setIsVisible(scrollY > 300)
        }

        window.addEventListener('scroll', toggleVisibility)

        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <button
            className={`${s.button} ${isVisible ? s.visible : ''}`}
            onClick={scrollToTop}
            aria-label="Наверх"
        >
            <ArrowUpIcon className={s.icon} />
        </button>
    )
}
