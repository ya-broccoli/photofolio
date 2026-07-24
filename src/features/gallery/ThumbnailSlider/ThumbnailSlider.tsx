'use client'

import { useRef } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import s from './ThumbnailSlider.module.css'
import Image from 'next/image'
import { FilmPerforationStrip } from '@/shared/ui/FilmPerforation/FilmPerforationStrip'
import { Button } from '@/shared/ui/Button/Button'
import { thumbnailBreakpoints } from '@/shared/config/swiperConfig'
import type { PhotoType } from '@/shared/types/photo'

type ThumbnailSliderProps = {
    photos: PhotoType[]
    currentIndex: number
    onSelectAction: (index: number) => void
    isVisible?: boolean
    onMouseEnterAction?: () => void
    onMouseLeaveAction?: () => void
    onHandleMouseEnterAction?: () => void
    onHandleClickAction?: () => void
    showNavigation?: boolean
    onSwiperReadyAction?: (swiper: SwiperType) => void
}

export const ThumbnailSlider = ({
    photos,
    currentIndex,
    onSelectAction,
    isVisible = false,
    onMouseEnterAction,
    onMouseLeaveAction,
    onHandleMouseEnterAction,
    onHandleClickAction,
    showNavigation = false,
    onSwiperReadyAction,
}: ThumbnailSliderProps) => {
    const prevRef = useRef<HTMLButtonElement | null>(null)
    const nextRef = useRef<HTMLButtonElement | null>(null)

    const handleSwiperInit = (swiper: SwiperType) => {
        setTimeout(() => {
            onSwiperReadyAction?.(swiper)

            if (swiper.destroyed) return

            if (!prevRef.current || !nextRef.current) return

            const navigation = swiper.params.navigation

            if (navigation && typeof navigation !== 'boolean') {
                navigation.prevEl = prevRef.current
                navigation.nextEl = nextRef.current
            }

            swiper.navigation.destroy()
            swiper.navigation.init()
            swiper.navigation.update()
        })
    }

    return (
        <>
            <div
                className={`${s.handle} ${isVisible ? s.handleHidden : ''}`}
                onMouseEnter={onHandleMouseEnterAction}
                onPointerDown={(e) => {
                    e.stopPropagation()
                    onHandleClickAction?.()
                }}
            />

            <div
                className={`
                    ${s.thumbnailStrip}
                    ${isVisible ? s.visible : s.hidden}
                    ${!showNavigation ? s.withoutNavigation : ''}
                `}
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={onMouseEnterAction}
                onMouseMove={onMouseEnterAction}
                onPointerDown={onMouseEnterAction}
                onMouseLeave={onMouseLeaveAction}
            >
                {showNavigation && (
                    <Button
                        ref={prevRef}
                        className={`${s.customPrev} ${s.customNav}`}
                        aria-label="Previous"
                    >
                        ‹
                    </Button>
                )}

                <FilmPerforationStrip position="top" />

                <Swiper
                    key={`${photos[0]?.id || 'empty'}-${showNavigation}`}
                    modules={[Navigation]}
                    spaceBetween={8}
                    className={s.swiperWrapper}
                    loop={photos.length > 3}
                    navigation={showNavigation}
                    onSwiper={handleSwiperInit}
                    breakpoints={thumbnailBreakpoints}
                >
                    {photos.map((photo, index) => (
                        <SwiperSlide key={photo.id}>
                            <div
                                className={`${s.thumbnailWrapper} ${
                                    index === currentIndex ? s.active : ''
                                }`}
                                onClick={() => onSelectAction(index)}
                            >
                                <Image
                                    src={`/api/image-proxy?url=${encodeURIComponent(
                                        photo.thumbnailUrl,
                                    )}`}
                                    fill
                                    alt={photo.alt || `Thumbnail ${index + 1}`}
                                    loading="lazy"
                                    sizes="(max-width: 768px) 15vw, 8vw"
                                    style={{ objectFit: 'cover' }}
                                    unoptimized
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <FilmPerforationStrip position="bottom" />

                {showNavigation && (
                    <Button
                        ref={nextRef}
                        className={`${s.customNext} ${s.customNav}`}
                        aria-label="Next"
                    >
                        ›
                    </Button>
                )}
            </div>
        </>
    )
}
