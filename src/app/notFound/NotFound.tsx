'use client'

import { Button } from '@/shared/ui/Button/Button'

const NotFound = () => {
    return (
        <main className="not-found-page">
            <h1 className="not-found-title">404</h1>

            <p className="not-found-text">Страница не найдена</p>

            <Button className="not-found-button" onClick={() => (window.location.href = '/')}>
                На главную
            </Button>
        </main>
    )
}

export default NotFound
