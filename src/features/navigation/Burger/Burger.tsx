'use client'

import s from './Burger.module.css'
import fixed from '../../../shared/styles/fixedControls.module.css'
import { Button } from '@/shared/ui/Button/Button'
import { forwardRef } from 'react'

type Props = {
    isOpen: boolean
    onToggleAction: () => void
}

export const Burger = forwardRef<HTMLButtonElement, Props>(({ isOpen, onToggleAction }, ref) => {
    return (
        <Button
            ref={ref}
            className={`${s.burger} ${fixed.controlButton} ${isOpen ? s.open : ''}`}
            onClick={onToggleAction}
            aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
            <span />
        </Button>
    )
})

Burger.displayName = 'Burger'
