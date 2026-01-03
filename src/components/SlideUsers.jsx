import { useState, useEffect } from 'react'
import '../styles/Slide.css'
import FloatingGhosts from './FloatingGhosts'

function SlideUsers({ stats }) {
  const topUsers = stats?.topUsers?.slice(0, 10) || []
  const [floatingEmojis, setFloatingEmojis] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const handleHover = (userIndex) => {
    if (userIndex === 0) {
      // #1 user - spray fish GIF
      setFloatingEmojis([{
        id: 'spray-fish-gif',
        emoji: 'spray_fish.gif',
        offsetX: 20,
        offsetY: -30,
        rotation: 0,
        isGif: true
      }])
    } else if (userIndex === 1) {
      // #2 user - thorn GIF
      setFloatingEmojis([{
        id: 'thorn-gif',
        emoji: 'thorn_rozu.gif',
        offsetX: 20,
        offsetY: -30,
        rotation: 0,
        isGif: true
      }])
    }
  }

  const handleLeave = () => {
    setFloatingEmojis([])
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])


  if (!stats || !topUsers.length) {
    return (
      <div className="slide">
        <div className="slide-content">
          <h2 className="slide-title">Most Active Members</h2>
          <p className="slide-subtitle">Loading user data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="slide">
      <FloatingGhosts count={4} />
      <div className="slide-content">
        <h2 className="slide-title">Most Active Members</h2>
        <p className="slide-subtitle">Top contributors of 2025</p>
        <div className="user-list">
          {topUsers.map((user, index) => (
            <div
              key={user.id}
              className="user-item"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => (index === 0 || index === 1) && handleHover(index)}
              onMouseLeave={() => (index === 0 || index === 1) && handleLeave()}
            >
              <div className="user-rank">#{index + 1}</div>
              {user.avatarUrl && (
                <img 
                  src={user.avatarUrl} 
                  alt={user.name}
                  className="user-avatar"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              )}
              <div className="user-info">
                <div className="user-name">{user.nickname || user.name}</div>
                <div className="user-stat">
                  {user.messageCount.toLocaleString()} messages
                  {user.reactionCount > 0 && ` • ${user.reactionCount.toLocaleString()} reactions received`}
                </div>
              </div>
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
                alt={floatingEmoji.emoji === 'spray_fish.gif' ? 'Spray Fish' : 'Thorn Ro Zu'}
                style={{
                  width: floatingEmoji.emoji === 'spray_fish.gif' ? '140px' : '80px',
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

export default SlideUsers


