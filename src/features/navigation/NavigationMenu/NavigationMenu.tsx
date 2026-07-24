'use client'

import s from './NavigationMenu.module.css'
import { NavigationLink } from './NavigationLink/NavigationLink'
import Vk from '@/shared/ui/SocialIcons/VkIcon'
import Youtube from '@/shared/ui/SocialIcons/Youtube'
import Flickr from '@/shared/ui/SocialIcons/Flickr'
import Vimeo from '@/shared/ui/SocialIcons/Vimeo'

type Props = {
    open: boolean
    onCloseAction: () => void
}

const categories = [
    { label: 'Главная', href: '/' },
    { label: 'Город', href: '/?category=city' },
    { label: 'Дачные истории', href: '/?category=dacha' },
    { label: 'Детские', href: '/?category=kids' },
    { label: 'Макро', href: '/?category=macro' },
    { label: 'Натюрморт', href: '/?category=still_life' },
    { label: 'Портреты', href: '/?category=portrait' },
    { label: 'Природа', href: '/?category=nature' },
    { label: 'Рабочие моменты', href: '/?category=work' },
]

const textPages = [{ label: 'Тексты', href: '/writings' }]

const socialLinks = [
    {
        href: 'https://www.youtube.com/channel/UCBR95mB8yr4L_0Jsf0_ZDrQ?app=desktop',
        icon: Youtube,
        label: 'YouTube',
    },
    {
        href: 'https://m.vk.com/id108467356',
        icon: Vk,
        label: 'VK',
    },
    {
        href: 'https://www.flickr.com/photos/143494231@N03/',
        icon: Flickr,
        label: 'Flickr',
    },
    {
        href: 'https://vimeo.com/user4822789',
        icon: Vimeo,
        label: 'Vimeo',
    },
]

export const NavigationMenu = ({ open, onCloseAction }: Props) => {
    return (
        <div className={`${s.overlay} ${open ? s.open : ''}`} onClick={onCloseAction}>
            <div className={`${s.menu} ${open ? s.open : ''}`} onClick={(e) => e.stopPropagation()}>
                {/* Блок 1: Категории */}
                <div className={s.section}>
                    <div className={s.sectionTitle}>Галерея</div>
                    {categories.map((item) => (
                        <NavigationLink
                            className={s.sectionItem}
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            onClickAction={onCloseAction}
                        />
                    ))}
                </div>

                {/* Блок 2: Текстовые страницы */}
                <div className={s.section}>
                    <div className={s.sectionTitle}>Заметки</div>
                    {textPages.map((item) => (
                        <NavigationLink
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            onClickAction={onCloseAction}
                        />
                    ))}
                </div>

                {/* Блок 3: Соцсети */}
                <div className={s.section}>
                    <div className={s.sectionTitle}>Соцсети</div>
                    <div className={s.socialLinks}>
                        {socialLinks.map(({ href, icon: Icon, label }) => (
                            <a
                                key={href}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={s.socialLink}
                                onClick={onCloseAction}
                                aria-label={label}
                            >
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
