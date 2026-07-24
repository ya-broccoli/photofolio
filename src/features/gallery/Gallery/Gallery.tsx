'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import Image from 'next/image'
import s from './Gallery.module.css'
import { categoryCovers } from '@/shared/config/categoryCovers'
import { ThumbnailSlider } from '@/features/gallery/ThumbnailSlider/ThumbnailSlider'
import { FullscreenImage } from '@/features/gallery/FullscreenImage/FullscreenImage'
import allPhotos from '../../../data/photos.json'
import { useDeviceMode } from '@/shared/hooks/useDeviceMode'
import { useThumbnailVisibility } from '@/shared/hooks/useThumbnailVisibility'
import type { PhotoType } from '@/shared/types/photo'

type Props = {
    category: string
}

export default function Gallery({ category }: Props) {
    const [photos, setPhotos] = useState<PhotoType[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [showThumbs, setShowThumbs] = useState(false)
    const swiperRef = useRef<SwiperType | null>(null)

    const { isDesktop, isFinePointer } = useDeviceMode()
    const {
        ignoreNextThumbnailClick,
        openThumbsWithTimer,
        handleOpenThumbs,
        handleThumbnailMouseEnter,
        handleThumbnailMouseLeave,
    } = useThumbnailVisibility({
        isDesktop,
        setShowThumbs,
    })

    const cover = categoryCovers[category as keyof typeof categoryCovers]

    useEffect(() => {
        const filtered = allPhotos.filter((photo) => photo.category === category) as PhotoType[]

        setPhotos(filtered)
        setCurrentIndex(0)
        setIsFullscreen(false)
        setShowThumbs(!isDesktop)
    }, [category, isDesktop])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isFullscreen) return
            if (!showThumbs) return
            if (!isDesktop) return

            if (e.key === 'ArrowLeft') {
                swiperRef.current?.slidePrev()
            }

            if (e.key === 'ArrowRight') {
                swiperRef.current?.slideNext()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isFullscreen, showThumbs, isDesktop])

    const handleThumbClick = (index: number) => {
        if (ignoreNextThumbnailClick.current) {
            return
        }

        setCurrentIndex(index)
        setIsFullscreen(true)
        setShowThumbs(false)
    }

    const changePhoto = (newIndex: number) => {
        if (!photos.length) return

        setCurrentIndex((newIndex + photos.length) % photos.length)
    }

    const currentPhoto = photos[currentIndex]

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!isDesktop || !isFinePointer) return

            const rect = e.currentTarget.getBoundingClientRect()

            const mouseY = e.clientY - rect.top

            const isNearBottom = mouseY > rect.height - 80

            if (isNearBottom && !showThumbs) {
                openThumbsWithTimer()
            }
        },
        [isDesktop, isFinePointer, showThumbs, openThumbsWithTimer],
    )

    return (
        <section className={s.gallery} onMouseMove={handleMouseMove}>
            {cover && (
                <div className={s.coverPhoto}>
                    <Image
                        src={cover.fullUrl}
                        alt={cover.alt || category}
                        fill
                        sizes="100vw"
                        className={s.mainPhoto}
                        priority
                        fetchPriority="high"
                    />
                </div>
            )}

            {photos.length > 0 && (
                <ThumbnailSlider
                    photos={photos}
                    currentIndex={currentIndex}
                    onSelectAction={handleThumbClick}
                    isVisible={showThumbs}
                    onMouseEnterAction={handleThumbnailMouseEnter}
                    onMouseLeaveAction={handleThumbnailMouseLeave}
                    onHandleMouseEnterAction={handleOpenThumbs}
                    onHandleClickAction={handleOpenThumbs}
                    showNavigation={isDesktop && isFinePointer}
                    onSwiperReadyAction={(swiper) => {
                        swiperRef.current = swiper
                    }}
                />
            )}

            {isFullscreen && currentPhoto && (
                <FullscreenImage
                    src={currentPhoto.fullUrl}
                    alt={currentPhoto.alt}
                    descriptionId={currentPhoto.descriptionId}
                    currentIndex={currentIndex + 1}
                    total={photos.length}
                    onCloseAction={() => {
                        setIsFullscreen(false)
                        openThumbsWithTimer()
                    }}
                    onPrevAction={() => changePhoto(currentIndex - 1)}
                    onNextAction={() => changePhoto(currentIndex + 1)}
                />
            )}
        </section>
    )
}
