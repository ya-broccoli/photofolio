import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import s from './Button.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, Props>(
    ({ className = '', children, ...rest }, ref) => {
        return (
            <button ref={ref} className={`${s.button} ${className}`} {...rest}>
                {children}
            </button>
        )
    },
)

Button.displayName = 'Button'
