import { useCallback, useRef } from 'react'

type Props = {
    isDesktop: boolean
    setShowThumbs: (value: boolean) => void
}

export const useThumbnailVisibility = ({ isDesktop, setShowThumbs }: Props) => {
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const ignoreNextThumbnailClick = useRef(false)

    const resetHideTimer = useCallback(() => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current)
        }

        hideTimeoutRef.current = setTimeout(() => {
            if (isDesktop) {
                setShowThumbs(false)
            }
        }, 5000)
    }, [isDesktop, setShowThumbs])

    const openThumbsWithTimer = useCallback(() => {
        setShowThumbs(true)

        if (isDesktop) {
            resetHideTimer()
        }
    }, [isDesktop, resetHideTimer, setShowThumbs])

    const handleOpenThumbs = useCallback(() => {
        if (!isDesktop) return

        ignoreNextThumbnailClick.current = true

        openThumbsWithTimer()

        setTimeout(() => {
            ignoreNextThumbnailClick.current = false
        }, 300)
    }, [isDesktop, openThumbsWithTimer])

    const handleThumbnailMouseEnter = useCallback(() => {
        resetHideTimer()
    }, [resetHideTimer])

    const handleThumbnailMouseLeave = useCallback(() => {
        resetHideTimer()
    }, [resetHideTimer])

    return {
        ignoreNextThumbnailClick,
        resetHideTimer,
        openThumbsWithTimer,
        handleOpenThumbs,
        handleThumbnailMouseEnter,
        handleThumbnailMouseLeave,
    }
}
