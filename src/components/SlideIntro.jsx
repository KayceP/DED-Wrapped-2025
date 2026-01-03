import { useState } from 'react'
import '../styles/Slide.css'
import FloatingGhosts from './FloatingGhosts'

function SlideIntro({ stats }) {
  const [currentBanner, setCurrentBanner] = useState(0)

  const banners = [
    'guild_banner.jpg',
    'guild_banner_christmas.png',
    'guild_banner_spooky.png'
  ]

  const handleBannerClick = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }
  return (
    <div className="slide">
      <FloatingGhosts count={10} />
      <div className="slide-content">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img
            src={`${import.meta.env.BASE_URL}assets/${banners[currentBanner]}`}
            alt="DED Guild Banner"
            onClick={handleBannerClick}
            style={{
              width: '100%',
              maxWidth: '700px',
              height: 'auto',
              borderRadius: '16px',
              boxShadow: '0 12px 40px rgba(220, 38, 38, 0.4)',
              marginBottom: '2rem',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          />
        </div>
        <h1 className="slide-title" style={{
          background: 'var(--gradient-red)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 20px rgba(220, 38, 38, 0.5)',
          marginBottom: '1rem'
        }}>
          Your DED 2025 Wrapped
        </h1>
        <p className="slide-subtitle" style={{ marginBottom: '2rem' }}>
          A year in review for Dead on Arrival
        </p>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--guild-text-dim)' }}>
            Press →, Space, or swipe on your screen to continue
          </p>
        </div>
      </div>
    </div>
  )
}

export default SlideIntro


