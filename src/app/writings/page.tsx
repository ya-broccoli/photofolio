import Link from 'next/link'
import { writings } from '@/data/writings'
import s from './page.module.css'
import {ScrollToTop} from '@/shared/ui/ScrollToTop/ScrollToTop';

const WritingsListPage = () => {
    return (
        <main className={s.container}>
            <Link href="/" className={s.homeLink}>
                <span className={s.arrowBack}>←</span> На главную
            </Link>
            <h1 className={s.title}>Тексты фотографа</h1>
            <div className={s.list}>
                {writings.map((writing) => (
                    <Link
                        key={writing.id}
                        href={`/writings/${writing.id}`}
                        className={s.item}
                    >
                        <h2 className={s.itemTitle}>{writing.title}</h2>
                    </Link>
                ))}
            </div>
            <ScrollToTop />
        </main>
    )
}

export default WritingsListPage
