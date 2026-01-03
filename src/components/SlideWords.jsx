import '../styles/Slide.css'
import FloatingGhosts from './FloatingGhosts'
import { useMemo, useState, useEffect } from 'react'

function SlideWords({ stats }) {
  const topWords = stats?.topWords?.slice(0, 40) || []
  const [floatingEmojis, setFloatingEmojis] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [easterEggStage, setEasterEggStage] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [easterEggTimestamp, setEasterEggTimestamp] = useState(null)

  // Top words list with fake easter egg entry
  const topListWords = useMemo(() => {
    const realWords = topWords.slice(0, 15)
    // Add fake easter egg entry as #16
    realWords.push({
      word: "unionize my fellow FC members!!!",
      count: 9999,
      isEasterEgg: true
    })
    return realWords
  }, [topWords])

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

  const handleEasterEggClick = () => {
    if (easterEggStage < 3) {
      setEasterEggStage(prev => prev + 1)
    }
    if (easterEggStage === 2) {
      // On the 3rd click, show the easter egg
      setEasterEggTimestamp(new Date().toISOString())
      setShowEasterEgg(true)
    }
  }

  const closeEasterEgg = () => {
    setShowEasterEgg(false)
    setEasterEggStage(0) // Reset for next time
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Handle escape key and outside clicks for easter egg modal
  useEffect(() => {
    if (!showEasterEgg) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeEasterEgg()
      }
    }

    const handleClickOutside = (e) => {
      if (e.target.id === 'easter-egg-modal-backdrop') {
        closeEasterEgg()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showEasterEgg])

  return (
    <div className="slide">
      <FloatingGhosts count={6} />
      <div className="slide-content">
        <h2 className="slide-title">Most Used Words</h2>
        <p className="slide-subtitle">The words that defined 2025</p>

        {/* Top Words List */}
        <div className="top-words-list">
          {topListWords.map((item, index) => {
            const isEasterEgg = item.isEasterEgg
            const isMoving = isEasterEgg && easterEggStage > 0

            return (
              <div
                key={item.word}
                className={`top-word-item ${isEasterEgg ? 'easter-egg-item' : ''}`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  position: isMoving ? 'fixed' : 'relative',
                  left: isMoving ? `${100 + (easterEggStage - 1) * 150}px` : 'auto',
                  top: isMoving ? `${200 + (easterEggStage - 1) * 100}px` : 'auto',
                  zIndex: isMoving ? 1000 : 'auto',
                  cursor: isEasterEgg ? 'pointer' : 'default',
                  transform: isMoving ? 'rotate(15deg) scale(1.1)' : 'none',
                  transition: isMoving ? 'all 0.5s ease-in-out' : 'none',
                  backgroundColor: easterEggStage === 3 && isEasterEgg ? '#ff6b6b' : undefined,
                }}
                onMouseEnter={() => !isEasterEgg && index === 7 && handleThornHover()}
                onMouseLeave={() => !isEasterEgg && index === 7 && handleThornLeave()}
                onClick={() => isEasterEgg && handleEasterEggClick()}
              >
                {easterEggStage === 3 && isEasterEgg ? (
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2em' }}>
                    BUSTED!
                  </span>
                ) : (
                  <>
                    <span className="word-rank">#{index + 1}</span>
                    <span className="word-text">{item.word}</span>
                    <span className="word-count">{item.count.toLocaleString()}</span>
                  </>
                )}
              </div>
            )
          })}
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

        {/* Easter Egg Modal */}
        {showEasterEgg && (
          <div
            id="easter-egg-modal-backdrop"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000,
              cursor: 'pointer'
            }}
            onClick={closeEasterEgg}
          >
            <div style={{
              background: 'var(--guild-bg-card)',
              border: '3px solid #ff6b6b',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '600px',
              width: '90%',
              textAlign: 'center',
              position: 'relative',
              cursor: 'default'
            }}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  closeEasterEgg()
                }}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '15px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--guild-text-dim)',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                ×
              </button>

              <h3 style={{
                color: '#ff6b6b',
                marginBottom: '1rem',
                fontSize: '1.8rem'
              }}>
                You damn union buster!
              </h3>

              <p style={{
                color: 'var(--guild-text)',
                marginBottom: '1.5rem',
                lineHeight: '1.6',
                fontSize: '1.1rem'
              }}>
                Oh no! You found the secret FC unionizing plot! 🏭⚡<br/>
                <strong>Don't you dare rat us out to Thorn!</strong> 🤫<br/>
                Take a screenshot and post this in the discord to claim your prize!
              </p>

              <div style={{
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <img
                  src={`${import.meta.env.BASE_URL}assets/fc_drama.png`}
                  alt="FC Drama"
                  style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                  }}
                />
              </div>

              <div style={{
                color: '#ff6b6b',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                background: 'rgba(255, 107, 107, 0.1)',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ff6b6b'
              }}>
                Union Plot Exposed at: {easterEggTimestamp ? new Date(easterEggTimestamp).toLocaleString() : 'Loading...'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SlideWords