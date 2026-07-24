'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import s from './FullscreenImage.module.css'
import { photoDescriptions } from '@/data/photoDescriptions'
import { Button } from '@/shared/ui/Button/Button'

export type FullscreenImageProps = {
    src: string
    alt?: string
    descriptionId?: keyof typeof photoDescriptions
    onCloseAction: () => void
    onPrevAction?: () => void
    onNextAction?: () => void
    currentIndex?: number
    total?: number
}

export const FullscreenImage = ({
    descriptionId,
    src,
    alt = '',
    onCloseAction,
    onPrevAction,
    onNextAction,
    currentIndex,
    total,
}: FullscreenImageProps) => {
    const [loading, setLoading] = useState(true)
    const [imageSrc, setImageSrc] = useState(src)
    const [showInfo, setShowInfo] = useState(false)
    const description = descriptionId ? photoDescriptions[descriptionId] : null
    const [uiVisible, setUiVisible] = useState(true)
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const infoPopupRef = useRef<HTMLDivElement | null>(null)

    // Таймер для скрытия UI
    const resetHideTimer = useCallback(() => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current)
        }
        hideTimeoutRef.current = setTimeout(() => {
            setUiVisible(false)
        }, 2000)
    }, [])

    useEffect(() => {
        setLoading(true)
        setImageSrc(src)
        setShowInfo(false)
        setUiVisible(true)
        resetHideTimer()
    }, [src, resetHideTimer])

    const handleMouseMove = useCallback(() => {
        setUiVisible(true)
        resetHideTimer()
    }, [resetHideTimer])

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (showInfo) {
                    setShowInfo(false)
                    return
                }

                onCloseAction()
            }
            if (e.key === 'ArrowLeft') onPrevAction?.()
            if (e.key === 'ArrowRight') onNextAction?.()
            setUiVisible(true)
            resetHideTimer()
        },
        [onCloseAction, onPrevAction, onNextAction, resetHideTimer, showInfo],
    )

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'hidden'

        resetHideTimer()

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current)
            }
        }
    }, [handleKeyDown, resetHideTimer])

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (showInfo) {
            if (infoPopupRef.current && !infoPopupRef.current.contains(e.target as Node)) {
                setShowInfo(false)
                return
            }
        }

        if (e.target === e.currentTarget) {
            onCloseAction()
        }
    }

    const handleImageLoad = () => {
        setLoading(false)
    }

    const touchStartX = useRef(0)
    const touchEndX = useRef(0)

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].clientX

        const delta = touchStartX.current - touchEndX.current

        if (Math.abs(delta) < 50) return

        if (delta > 0) {
            onNextAction?.()
        } else {
            onPrevAction?.()
        }

        setUiVisible(true)
        resetHideTimer()
    }

    return createPortal(
        <div
            className={s.overlay}
            onClick={handleBackdropClick}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <Button
                className={`${s.closeButton} ${!uiVisible ? s.hidden : ''}`}
                onClick={onCloseAction}
            >
                ✕
            </Button>

            {currentIndex && total && (
                <div className={`${s.counter} ${!uiVisible ? s.hidden : ''}`}>
                    {currentIndex} / {total}
                </div>
            )}

            {description && (
                <>
                    <button className={s.infoButton} onClick={() => setShowInfo((prev) => !prev)}>
                        i
                    </button>

                    {showInfo && (
                        <div className={s.infoPopup} ref={infoPopupRef}>
                            {description}
                        </div>
                    )}
                </>
            )}

            {onPrevAction && (
                <Button
                    className={`${s.navButton} ${s.prevButton} ${!uiVisible ? s.hidden : ''}`}
                    onClick={onPrevAction}
                >
                    ‹
                </Button>
            )}

            <div className={s.imageContainer}>
                {loading && (
                    <div className={s.spinner}>
                        <div className={s.loader}></div>
                    </div>
                )}
                <img
                    key={imageSrc}
                    src={imageSrc}
                    alt={alt}
                    className={s.mainImage}
                    onLoad={handleImageLoad}
                />
            </div>

            {onNextAction && (
                <Button
                    className={`${s.navButton} ${s.nextButton} ${!uiVisible ? s.hidden : ''}`}
                    onClick={onNextAction}
                >
                    ›
                </Button>
            )}
        </div>,
        document.body,
    )
}
