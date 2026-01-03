import '../styles/Slide.css'
import FloatingGhosts from './FloatingGhosts'
import { useMemo, useState, useEffect } from 'react'

function SlideWords({ stats }) {
  const topWords = stats?.topWords?.slice(0, 40) || []
  const [floatingEmojis, setFloatingEmojis] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Top words list
  const topListWords = useMemo(() => topWords.slice(0, 15), [topWords])

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const handleThornHover = () => {
    setFloatingEmojis([{
      id: 'thorn-gif-words',
      emoji: 'thorn_rozu.gif',
      offsetX: 20,
      offsetY: -30,
      rotation: 0,
      isGif: true
    }])
  }

  const handleThornLeave = () => {
    setFloatingEmojis([])
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="slide">
      <FloatingGhosts count={6} />
      <div className="slide-content">
        <h2 className="slide-title">Most Used Words</h2>
        <p className="slide-subtitle">The words that defined 2025</p>

        {/* Top Words List */}
        <div className="top-words-list">
          {topListWords.map((item, index) => (
            <div
              key={item.word}
              className="top-word-item"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
              onMouseEnter={() => index === 7 && handleThornHover()}
              onMouseLeave={() => index === 7 && handleThornLeave()}
            >
              <span className="word-rank">#{index + 1}</span>
              <span className="word-text">{item.word}</span>
              <span className="word-count">{item.count.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* Floating Emojis */}
        {floatingEmojis.map((floatingEmoji) => (
          <div
            key={floatingEmoji.id}
            style={{
              position: 'fixed',
              left: mousePosition.x + floatingEmoji.offsetX,
              top: mousePosition.y + floatingEmoji.offsetY,
              pointerEvents: 'none',
              zIndex: 9999,
              animation: floatingEmoji.isGif ? 'none' : 'float 2s ease-in-out infinite',
              transform: `rotate(${floatingEmoji.rotation}deg)`
            }}
          >
            {floatingEmoji.isGif ? (
              <img
                src={`${import.meta.env.BASE_URL}assets/${floatingEmoji.emoji}`}
                alt="Thorn Ro Zu"
                style={{
                  width: '80px',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SlideWords