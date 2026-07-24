import { notFound } from 'next/navigation'
import s from './page.module.css'
import Gallery from '@/features/gallery/Gallery/Gallery'
import { categoryCovers } from '@/shared/config/categoryCovers'
import Home from '@/widgets/Home/Home'

type Props = {
    searchParams: Promise<{
        category?: string
    }>
}

export default async function HomePage({ searchParams }: Props) {
    const { category } = await searchParams

    if (category && !(category in categoryCovers)) {
        notFound()
    }

    return (
        <main className={s.page}>
            {!category && <Home />}
            {category && <Gallery category={category} />}
        </main>
    )
}
