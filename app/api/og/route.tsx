import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'LnY - Logaritmik Büyüme ve Yenilik'
    const description = searchParams.get('description') || 'AR-GE Danışmanlığı, Mekanik Tasarım ve Yazılım Otomasyonu'
    const type = searchParams.get('type') || 'website'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#111111',
            backgroundImage: 'linear-gradient(135deg, #111111 0%, #1a1a1a 50%, #000000 100%)',
            position: 'relative',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                radial-gradient(circle at 25% 25%, #F5C10E 0%, transparent 30%),
                radial-gradient(circle at 75% 75%, #F5C10E 0%, transparent 30%)
              `,
              opacity: 0.1,
            }}
          />
          
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#F5C10E',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '20px',
                fontSize: '40px',
              }}
            >
              ⚡
            </div>
            <div
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #F5C10E, #FFE55C)',
                backgroundClip: 'text',
                color: 'transparent',
                fontFamily: 'system-ui',
              }}
            >
              LnY
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 50 ? '48px' : '56px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: 1.2,
              marginBottom: '20px',
              fontFamily: 'system-ui',
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '24px',
              color: '#cccccc',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: 1.4,
              fontFamily: 'system-ui',
            }}
          >
            {description}
          </div>

          {/* Type Badge */}
          {type !== 'website' && (
            <div
              style={{
                position: 'absolute',
                top: '40px',
                right: '40px',
                backgroundColor: '#F5C10E',
                color: '#000',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '16px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontFamily: 'system-ui',
              }}
            >
              {type}
            </div>
          )}

          {/* Bottom Accent */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '8px',
              background: 'linear-gradient(90deg, #F5C10E 0%, #FFE55C 50%, #F5C10E 100%)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}