import Link from 'next/link'
import { notFound } from 'next/navigation'
import { writings } from '@/data/writings'
import s from './page.module.css'
import { ScrollToTop } from '@/shared/ui/ScrollToTop/ScrollToTop'

type Props = {
    params: Promise<{
        id: string
    }>
}

const WritingDetailPage = async ({ params }: Props) => {
    const { id } = await params
    const writing = writings.find((w) => w.id === id)

    if (!writing) {
        notFound()
    }

    return (
        <main className={s.container}>
            <Link href="/writings" className={s.homeLink}>
                <span className={s.arrowBack}>←</span> Назад к списку
            </Link>
            <article className={s.article}>
                <h2 className={s.title}>{writing.title}</h2>
                <div className={s.content} dangerouslySetInnerHTML={{ __html: writing.content }} />
            </article>
            <ScrollToTop />
        </main>
    )
}

export default WritingDetailPage
