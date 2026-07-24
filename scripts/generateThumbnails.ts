import dotenv from 'dotenv'
import axios from 'axios'
import sharp from 'sharp'
import FormData from 'form-data'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config()

const SECRET_KEY = process.env.IMAGEBAN_SECRET_KEY as string

if (!SECRET_KEY) {
    console.error('❌ SECRET_KEY не найден в .env.local')
    process.exit(1)
}

interface Photo {
    category: string
    fullUrl: string
    thumbnailUrl: string
    imageId: string
}

async function uploadToImageBan(imageBuffer: Buffer, filename: string): Promise<string> {
    const form = new FormData()
    form.append('image', imageBuffer, filename)

    const response = await axios.post('https://api.imageban.ru/v1', form, {
        headers: {
            ...form.getHeaders(),
            Authorization: `Bearer ${SECRET_KEY}`,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
    })

    if (response.data?.data?.link) {
        return response.data.data.link
    }
    throw new Error('Не удалось получить ссылку после загрузки')
}

async function generateThumbnails() {
    const jsonPath = path.resolve(process.cwd(), 'photos.json')

    if (!fs.existsSync(jsonPath)) {
        console.error('❌ Файл photos.json не найден')
        process.exit(1)
    }

    const photos: Photo[] = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))

    // Отбираем только те фото, где ещё нет миниатюры
    const toProcess = photos.filter((p) => p.thumbnailUrl === p.fullUrl)

    console.log(`📸 Всего фото: ${photos.length}`)
    console.log(`🖼️  Требуют обработки: ${toProcess.length}`)

    if (toProcess.length === 0) {
        console.log('✅ Все миниатюры уже созданы.')
        process.exit(0)
    }

    let updated = 0
    let failed = 0
    const startTime = Date.now()

    for (let i = 0; i < toProcess.length; i++) {
        const photo = toProcess[i]
        const originalPhoto = photos.find((p) => p.imageId === photo.imageId)!

        console.log(`\n[${i + 1}/${toProcess.length}] [${photo.category}] ${photo.imageId}`)

        try {
            // 1. Скачиваем оригинал
            const response = await axios.get(photo.fullUrl, {
                responseType: 'arraybuffer',
                timeout: 30000,
            })

            // 2. Создаём миниатюру (квадрат 300x300, обрезка по центру)
            const thumbnailBuffer = await sharp(response.data)
                .resize(300, 300, { fit: 'cover', position: 'centre' })
                .jpeg({ quality: 85 })
                .toBuffer()

            // 3. Загружаем на ImageBan
            const filename = `${photo.imageId}_thumb.jpg`
            const thumbnailUrl = await uploadToImageBan(thumbnailBuffer, filename)

            // 4. Обновляем оригинальный объект в массиве photos
            originalPhoto.thumbnailUrl = thumbnailUrl
            updated++

            console.log(`   ✅ Миниатюра загружена: ${thumbnailUrl}`)
        } catch (error) {
            const err = error as Error
            console.error(`   ❌ Ошибка: ${err.message}`)
            if ((error as any).response?.data) {
                console.error('   📦 Ответ сервера:', (error as any).response.data)
            }
            failed++
        }

        // Пауза 500ms, чтобы не превысить лимит
        await new Promise((resolve) => setTimeout(resolve, 500))
    }

    // Сохраняем обновлённый JSON
    fs.writeFileSync(jsonPath, JSON.stringify(photos, null, 2))

    const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(2)
    console.log(`\n✅ Обновлено ${updated} миниатюр`)
    console.log(`❌ Ошибок: ${failed}`)
    console.log(`⏱️ Время: ${elapsed} минут`)
}

generateThumbnails()
