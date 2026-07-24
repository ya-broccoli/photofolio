import dotenv from 'dotenv'
import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config()

const CLIENT_ID = process.env.IMAGEBAN_CLIENT_ID
const SECRET_KEY = process.env.IMAGEBAN_SECRET_KEY

const ALBUMS = {
    city: 'eyCzYdy',
    dacha: '5M9IVLV',
    kids: 'Edzt3V2',
    macro: 'eApli2n',
    still_life: 'YMXykGE',
    portrait: 'kShmrel',
    nature: 'wZl15y8',
    work: 'aMkGsex',
}

async function fetchAlbumLinks(albumId: string, category: string) {
    console.log(`📂 Загружаю альбом: ${category} (${albumId})`)

    try {
        const response = await axios.get(`https://api.imageban.ru/v1/album/${albumId}`, {
            params: { client_id: CLIENT_ID },
            headers: { Authorization: `Bearer ${SECRET_KEY}` },
        })

        const data = response.data

        if (data?.data?.image && Array.isArray(data.data.image)) {
            const images = data.data.image
            console.log(`   ✅ Найдено фото: ${images.length}`)

            // Проверяем первую ссылку
            const firstImage = images[0]
            console.log(`   🔍 Пример ссылки из API: ${firstImage.link}`)
            console.log(
                `   🔍 Пример собранной ссылки: https://${firstImage.server}/out/${firstImage.date}/${firstImage.id}.${firstImage.name.split('.').pop()}`,
            )

            return images.map((img: any) => {
                // Используем img.link, если он есть
                const fullUrl =
                    img.link ||
                    `https://${img.server}/out/${img.date}/${img.id}.${img.name.split('.').pop()}`

                return {
                    category: category,
                    fullUrl: fullUrl,
                    thumbnailUrl: fullUrl,
                    alt: img.name || `${category} photo`,
                    width: parseInt(img.resolution?.split('x')[0]) || 0,
                    height: parseInt(img.resolution?.split('x')[1]) || 0,
                    imageId: img.id,
                    createdAt: new Date(`${img.date} ${img.time || '00:00:00'}`),
                }
            })
        } else {
            console.log(`   ⚠️ Нет фото в альбоме`)
            return []
        }
    } catch (error: any) {
        console.error(`   ❌ Ошибка: ${error.response?.data?.error?.text || error.message}`)
        return []
    }
}

async function syncImageBanAlbums() {
    console.log('🚀 Начинаем сбор ссылок из всех альбомов...\n')

    let allPhotos: any[] = []

    for (const [category, albumId] of Object.entries(ALBUMS)) {
        const photos = await fetchAlbumLinks(albumId, category)
        allPhotos = [...allPhotos, ...photos]
        await new Promise((resolve) => setTimeout(resolve, 500))
    }

    console.log(`\n📊 Итого собрано фото: ${allPhotos.length}`)

    const outputPath = path.resolve(process.cwd(), 'photos.json')
    fs.writeFileSync(outputPath, JSON.stringify(allPhotos, null, 2))
    console.log(`💾 Данные сохранены в: ${outputPath}`)
}

syncImageBanAlbums()
