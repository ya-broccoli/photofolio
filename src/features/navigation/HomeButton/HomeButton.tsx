'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/Button/Button'
import { HomeIcon } from '@/shared/ui/HomeIcon/HomeIcon'

import s from './HomeButton.module.css'
import fixed from '@/shared/styles/fixedControls.module.css'

export const HomeButton = () => {
    const router = useRouter()

    return (
        <Button
            onClick={() => router.push('/')}
            className={`${s.homeButton} ${fixed.controlButton}`}
            aria-label="На главную"
        >
            <HomeIcon className={s.icon} />
        </Button>
    )
}
