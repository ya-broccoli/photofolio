'use client'

import Link from 'next/link'
import s from './NavigationLink.module.css'

type Props = {
    href: string
    label: string
    onClickAction?: () => void
    active?: boolean
    className?: string
}

export const NavigationLink = ({ href, label, onClickAction, active }: Props) => {
    return (
        <Link
            href={href}
            onClick={onClickAction}
            className={`${s.link} ${active ? s.active : ''}`}
            style={{ color: 'var(--icon-color, #E0E0E0)' }}
        >
            {label}
        </Link>
    )
}
