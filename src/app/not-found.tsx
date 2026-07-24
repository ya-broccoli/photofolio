import dynamic from 'next/dynamic'

const NotFound = dynamic(() => import('@/app/notFound/NotFound'), {
    ssr: true,
})

export default function NotFoundPage() {
    return <NotFound />
}
