import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

type ImageFormat = 'webp' | 'avif' | 'jpeg' | 'png'

interface OptimizedImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** Source path relative to public folder (e.g., "/images/hero.jpg") */
  src: string
  /** Alt text for accessibility */
  alt: string
  /** Desired width */
  width: number
  /** Desired height */
  height: number
  /** Image quality (1-100), defaults to 80 */
  quality?: number
  /** Output format, defaults to webp */
  format?: ImageFormat
  /** Priority loading (disables lazy loading) */
  priority?: boolean
  /** Fill container (uses object-fit: cover) */
  fill?: boolean
  /** Blur placeholder while loading */
  placeholder?: 'blur' | 'empty'
  /** Custom blur data URL for placeholder */
  blurDataURL?: string
  /** Callback when image loads */
  onLoad?: () => void
}

function buildImageUrl(
  src: string,
  width: number,
  height?: number,
  quality = 80,
  format: ImageFormat = 'webp'
): string {
  const params = new URLSearchParams({
    src,
    w: width.toString(),
    q: quality.toString(),
    f: format,
  })

  if (height) {
    params.set('h', height.toString())
  }

  return `/api/image?${params.toString()}`
}

function generateSrcSet(
  src: string,
  baseWidth: number,
  quality: number,
  format: ImageFormat
): string {
  const widths = [0.5, 1, 1.5, 2].map((multiplier) =>
    Math.round(baseWidth * multiplier)
  )

  return widths
    .map((w) => `${buildImageUrl(src, w, undefined, quality, format)} ${w}w`)
    .join(', ')
}

// Simple blur placeholder
const DEFAULT_BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PC9zdmc+'

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  quality = 80,
  format = 'webp',
  priority = false,
  fill = false,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  className,
  style,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(() => {
    setError(true)
    console.error('Image failed to load:', src)
  }, [src])

  // If error, fall back to original image
  const imageSrc = error ? src : buildImageUrl(src, width, height, quality, format)
  const srcSet = error ? undefined : generateSrcSet(src, width, quality, format)

  const showBlur = placeholder === 'blur' && !isLoaded && !error

  return (
    <div
      className={cn('relative overflow-hidden', fill && 'h-full w-full')}
      style={
        fill
          ? undefined
          : {
              width,
              height,
              ...style,
            }
      }
    >
      {/* Blur placeholder */}
      {showBlur && (
        <img
          src={blurDataURL || DEFAULT_BLUR_DATA_URL}
          alt=""
          aria-hidden="true"
          className={cn(
            'absolute inset-0 h-full w-full object-cover blur-lg scale-110',
            className
          )}
        />
      )}

      {/* Main image */}
      <img
        src={imageSrc}
        srcSet={srcSet}
        sizes={`${width}px`}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          fill && 'absolute inset-0 h-full w-full object-cover',
          !fill && 'h-full w-full object-cover',
          showBlur && 'opacity-0',
          isLoaded && 'opacity-100 transition-opacity duration-300',
          className
        )}
        style={fill ? undefined : style}
        {...props}
      />
    </div>
  )
}

export { type OptimizedImageProps, type ImageFormat }
