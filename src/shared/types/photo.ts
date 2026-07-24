import type { photoDescriptions } from '@/data/photoDescriptions'

export type PhotoType = {
    id: string
    category: string
    fullUrl: string
    thumbnailUrl: string
    alt?: string
    descriptionId?: keyof typeof photoDescriptions
    width?: number
    height?: number
}
