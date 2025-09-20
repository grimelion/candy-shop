import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  try {
    const oembedUrl = `https://graph.facebook.com/v17.0/instagram_oembed?url=${encodeURIComponent(url)}&omitscript=true`

    const response = await fetch(oembedUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching Instagram oEmbed:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Instagram embed data' },
      { status: 500 }
    )
  }
}