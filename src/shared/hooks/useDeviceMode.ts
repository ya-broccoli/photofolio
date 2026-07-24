import { useEffect, useState } from 'react'

export function useDeviceMode() {
    const [isDesktop, setIsDesktop] = useState(false)
    const [isFinePointer, setIsFinePointer] = useState(false)

    useEffect(() => {
        const desktop = window.matchMedia('(min-width: 1025px)')
        const pointer = window.matchMedia('(pointer: fine)')

        const update = () => {
            setIsDesktop(desktop.matches)
            setIsFinePointer(pointer.matches)
        }

        update()

        desktop.addEventListener('change', update)
        pointer.addEventListener('change', update)

        return () => {
            desktop.removeEventListener('change', update)
            pointer.removeEventListener('change', update)
        }
    }, [])

    return {
        isDesktop,
        isFinePointer,
    }
}
