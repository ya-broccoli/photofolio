'use client'

import { useEffect, useRef, useState } from 'react'
import { usePWAInstall } from '@/shared/hooks/usePWAInstall'
import { Button } from '@/shared/ui/Button/Button'
import { InstallIcon } from '@/shared/ui/InstallIcon/InstallIcon'
import s from './InstallButton.module.css'
import fixed from '@/shared/styles/fixedControls.module.css'

export const InstallButton = () => {
    const { isInstallable, install, isIOS, isSafariMac } = usePWAInstall()

    const [showHint, setShowHint] = useState(false)

    const wrapperRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowHint(false)
            }
        }

        if (showHint) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showHint])

    const handleClick = () => {
        if (isIOS || isSafariMac) {
            setShowHint((prev) => !prev)
            return
        }

        install()
    }

    if (!isInstallable && !isIOS && !isSafariMac) {
        return null
    }

    return (
        <div ref={wrapperRef} className={s.wrapper}>
            <Button onClick={handleClick} className={`${s.installButton} ${fixed.controlButton}`}>
                <InstallIcon className={s.icon} />
            </Button>

            {showHint && (
                <div className={s.hint}>
                    {isIOS && (
                        <>
                            <span className={s.hintTitle}>Установить приложение</span>

                            <span>
                                Нажмите «Поделиться»
                                <br />→ «На экран “Домой”»
                            </span>
                        </>
                    )}

                    {isSafariMac && (
                        <>
                            <span className={s.hintTitle}>Добавить приложение</span>

                            <span>
                                Safari → Файл
                                <br />→ Добавить в Dock
                            </span>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
