import { createFileRoute } from '@tanstack/react-router'
import sharp from 'sharp'
import { join } from 'path'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'

const ALLOWED_FORMATS = ['webp', 'avif', 'jpeg', 'png'] as const
type ImageFormat = (typeof ALLOWED_FORMATS)[number]

const CACHE_CONTROL = 'public, max-age=31536000, immutable'

export const Route = createFileRoute('/api/image')({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        try {
          const url = new URL(request.url)
          const src = url.searchParams.get('src')
          const width = url.searchParams.get('w')
          const height = url.searchParams.get('h')
          const quality = url.searchParams.get('q') || '80'
          const format = (url.searchParams.get('f') || 'webp') as ImageFormat

          if (!src) {
            return new Response('Missing src parameter', { status: 400 })
          }

          // Validate format
          if (!ALLOWED_FORMATS.includes(format)) {
            return new Response('Invalid format', { status: 400 })
          }

          // Sanitize path to prevent directory traversal
          const sanitizedSrc = src.replace(/^\/+/, '').replace(/\.\./g, '')
          const imagePath = join(process.cwd(), 'public', sanitizedSrc)

          if (!existsSync(imagePath)) {
            return new Response('Image not found', { status: 404 })
          }

          const imageBuffer = await readFile(imagePath)

          let sharpInstance = sharp(imageBuffer)

          // Resize if dimensions provided
          const resizeOptions: sharp.ResizeOptions = {}
          if (width) resizeOptions.width = parseInt(width, 10)
          if (height) resizeOptions.height = parseInt(height, 10)

          if (resizeOptions.width || resizeOptions.height) {
            sharpInstance = sharpInstance.resize({
              ...resizeOptions,
              fit: 'inside',
              withoutEnlargement: true,
            })
          }

          // Convert to specified format
          const qualityNum = Math.min(100, Math.max(1, parseInt(quality, 10)))

          let outputBuffer: Buffer
          let contentType: string

          switch (format) {
            case 'webp':
              outputBuffer = await sharpInstance.webp({ quality: qualityNum }).toBuffer()
              contentType = 'image/webp'
              break
            case 'avif':
              outputBuffer = await sharpInstance.avif({ quality: qualityNum }).toBuffer()
              contentType = 'image/avif'
              break
            case 'jpeg':
              outputBuffer = await sharpInstance.jpeg({ quality: qualityNum }).toBuffer()
              contentType = 'image/jpeg'
              break
            case 'png':
              outputBuffer = await sharpInstance.png({ quality: qualityNum }).toBuffer()
              contentType = 'image/png'
              break
            default:
              outputBuffer = await sharpInstance.webp({ quality: qualityNum }).toBuffer()
              contentType = 'image/webp'
          }

          return new Response(new Uint8Array(outputBuffer), {
            headers: {
              'Content-Type': contentType,
              'Cache-Control': CACHE_CONTROL,
            },
          })
        } catch (error) {
          console.error('Image optimization error:', error)
          return new Response('Error processing image', { status: 500 })
        }
      },
    },
  },
})
