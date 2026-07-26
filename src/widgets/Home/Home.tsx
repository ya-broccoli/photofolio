'use client'

import s from './Home.module.css'
import { InstallButton } from '@/features/pwa/InstallButton/InstallButton'

const Home = () => {
    return (
        <>
            <section className={s.cover}>
                <InstallButton />
                <div className={s.infoWrapper}>
                    <h1 className={s.title}>Владимир Верендеев</h1>
                    <p className={s.subtitle}>фотограф</p>
                    <div className={s.divider}></div>
                    <p className={s.description}>
                        То, что я в детстве пошёл в фотокружок – определило всю мою жизнь.
                        Фотография и кино – это и моё хобби, и профессия. И нет ничего лучше – всю
                        жизнь заниматься любимым делом.
                    </p>
                </div>
                <p className={s.signature}>Избранные работы</p>
            </section>
        </>
    )
}

export default Home
