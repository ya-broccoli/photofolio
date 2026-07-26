import s from './InstallIcon.module.css'

type Props = {
    size?: number
    className?: string
}

export const InstallIcon = ({ size = 40, className = '' }: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${s.icon} ${className}`}
        >
            <path d="M12 17V3" />
            <path d="m6 11 6 6 6-6" />
            <path d="M19 21H5" />
        </svg>
    )
}
