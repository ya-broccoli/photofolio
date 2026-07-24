import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const url = searchParams.get('url')

    if (!url) {
        return new NextResponse('Missing url', { status: 400 })
    }

    const response = await fetch(url)
    const buffer = await response.arrayBuffer()

    return new NextResponse(buffer, {
        headers: {
            'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
            'Cache-Control': 'public, max-age=31536000',
            'Access-Control-Allow-Origin': '*',
        },
    })
}
