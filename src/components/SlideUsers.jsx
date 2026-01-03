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
    } else if (userIndex === 2) {
      // #3 user - discord perms image
      setFloatingEmojis([{
        id: 'discord-perms-img',
        emoji: 'discord_perms.png',
        offsetX: 20,
        offsetY: -30,
        rotation: 0,
        isGif: false
      }])
    } else if (userIndex === 3) {
      // #4 user - asha image
      setFloatingEmojis([{
        id: 'asha-img',
        emoji: 'asha.png',
        offsetX: 20,
        offsetY: -30,
        rotation: 0,
        isGif: false
      }])
    } else if (userIndex === 4) {
      // #5 user - satsuma GIF
      setFloatingEmojis([{
        id: 'satsuma-gif',
        emoji: 'satsuma.gif',
        offsetX: 20,
        offsetY: -30,
        rotation: 0,
        isGif: true
      }])
    } else if (userIndex === 5) {
      // #6 user - anna image
      setFloatingEmojis([{
        id: 'anna-img',
        emoji: 'anna.png',
        offsetX: 20,
        offsetY: -30,
        rotation: 0,
        isGif: false
      }])
    } else if (userIndex === 6) {
      // #7 user - hr GIF
      setFloatingEmojis([{
        id: 'hr-gif',
        emoji: 'hr.gif',
        offsetX: 20,
        offsetY: -30,
        rotation: 0,
        isGif: true
      }])
    } else if (userIndex === 7) {
      // #8 user - elara GIF
      setFloatingEmojis([{
        id: 'elara-gif',
        emoji: 'elara.gif',
        offsetX: 20,
        offsetY: -30,
        rotation: 0,
        isGif: true
      }])
    } else if (userIndex === 8) {
      // #9 user - zi image
      setFloatingEmojis([{
        id: 'zi-img',
        emoji: 'zi.png',
        offsetX: 20,
        offsetY: -30,
        rotation: 0,
        isGif: false
      }])
    } else if (userIndex === 9) {
      // #10 user - athena image
      setFloatingEmojis([{
        id: 'athena-img',
        emoji: 'athena.jpg',
        offsetX: 20,
        offsetY: -30,
        rotation: 0,
        isGif: false
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
      <FloatingGhosts count={8} />
      <div className="slide-content">
        <h2 className="slide-title">Most Active Members</h2>
        <p className="slide-subtitle">Top contributors of 2025</p>
        <div className="user-list">
          {topUsers.map((user, index) => (
            <div
              key={user.id}
              className="user-item"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => (index >= 0 && index <= 9) && handleHover(index)}
              onMouseLeave={() => (index >= 0 && index <= 9) && handleLeave()}
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
            <img
              src={`${import.meta.env.BASE_URL}assets/${floatingEmoji.emoji}`}
              alt={
                floatingEmoji.emoji === 'spray_fish.gif' ? 'Spray Fish' :
                floatingEmoji.emoji === 'thorn_rozu.gif' ? 'Thorn Ro Zu' :
                floatingEmoji.emoji === 'discord_perms.png' ? 'Discord Perms' :
                floatingEmoji.emoji === 'asha.png' ? 'Asha' :
                floatingEmoji.emoji === 'satsuma.gif' ? 'Satsuma' :
                floatingEmoji.emoji === 'anna.png' ? 'Anna' :
                floatingEmoji.emoji === 'hr.gif' ? 'HR' :
                floatingEmoji.emoji === 'elara.gif' ? 'Elara' :
                floatingEmoji.emoji === 'zi.png' ? 'Zi' :
                floatingEmoji.emoji === 'athena.jpg' ? 'Athena' : 'Image'
              }
              style={{
                width:
                  floatingEmoji.emoji === 'spray_fish.gif' ? '280px' : // #1: 140px + 100% = 280px
                  (floatingEmoji.emoji === 'thorn_rozu.gif' || // #2
                   floatingEmoji.emoji === 'satsuma.gif' ||   // #5
                   floatingEmoji.emoji === 'hr.gif' ||        // #7
                   floatingEmoji.emoji === 'elara.gif') ? '160px' : // 80px + 100% = 160px
                  (floatingEmoji.emoji === 'discord_perms.png' || // #3
                   floatingEmoji.emoji === 'asha.png' ||      // #4
                   floatingEmoji.emoji === 'zi.png') ? '120px' : // 80px + 50% = 120px
                  '80px', // #6 (anna.png), #10 (athena.jpg) stay at 80px
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SlideUsers


