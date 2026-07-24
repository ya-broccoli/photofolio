import s from './FilmPerforationStrip.module.css'
import { FilmPerforation } from '@/shared/ui/FilmPerforation/FilmPerforation'

type Props = {
    count?: number
    position?: 'top' | 'bottom'
}

export const FilmPerforationStrip = ({
                                         count = 120,
                                         position = 'top',
                                     }: Props) => {
    return (
        <div
            className={`${s.perforationStrip} ${position === 'top' ? s.top : s.bottom}`}
        >
            {Array.from({ length: count }).map((_, index) => (
                <FilmPerforation
                    key={index}
                    className={s.perforation}
                />
            ))}
        </div>
    )
}
