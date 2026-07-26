'use client'

import { usePWAInstall } from '@/shared/hooks/usePWAInstall'
import { Button } from '@/shared/ui/Button/Button'
import { InstallIcon } from '@/shared/ui/InstallIcon/InstallIcon'
import s from './InstallButton.module.css'
import fixed from '@/shared/styles/fixedControls.module.css'

export const InstallButton = () => {
    const { isInstallable, install } = usePWAInstall()

    if (!isInstallable) {
        return null
    }

    return (
        <Button onClick={install} className={`${s.installButton}  ${fixed.controlButton}`}>
            <InstallIcon className={s.icon} />
        </Button>
    )
}
