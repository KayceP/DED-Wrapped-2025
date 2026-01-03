import { useState, useEffect } from 'react'
import '../styles/Slide.css'
import FloatingGhosts from './FloatingGhosts'

function SlideFFXIV({ stats }) {
  const ffxiv = stats?.ffxiv || {}
  const emojis = stats?.emojis || {}
  const topJobs = ffxiv.topJobs || []
  const topRaids = ffxiv.topRaids || []
  const topContent = ffxiv.topContent || []
  const topDedContent = ffxiv.topDedContent || []

  const [showSlutEasterEgg, setShowSlutEasterEgg] = useState(false)
  const [slutEasterEggTimestamp, setSlutEasterEggTimestamp] = useState(null)
  const [slutHoverTimeout, setSlutHoverTimeout] = useState(null)
  const [floatingEmojis, setFloatingEmojis] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Detect if device supports touch
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  // Render emoji function (Discord emojis and custom assets)
  const renderEmoji = (emojiKey, size = '2rem') => {
    // Check if it's a Discord emoji (format: name:id)
    if (typeof emojiKey === 'string' && emojiKey.includes(':')) {
      const emojiData = emojis.messageCustomEmojis?.[emojiKey] || emojis.reactionCustomEmojis?.[emojiKey]
      if (emojiData) {
        const extension = emojiData.animated ? 'gif' : 'png'
        const imageUrl = `https://cdn.discordapp.com/emojis/${emojiData.id}.${extension}`
        return (
          <img
            src={imageUrl}
            alt={emojiData.name}
            style={{
              width: size,
              height: size,
              objectFit: 'contain',
              verticalAlign: 'middle'
            }}
            onError={(e) => {
              // Fallback to text if image fails to load
              e.target.style.display = 'none'
            }}
          />
        )
      }
    }
    // Check if it's a custom asset (PNG/SVG file in assets folder)
    else if (typeof emojiKey === 'string' && (emojiKey.endsWith('.png') || emojiKey.endsWith('.svg') || emojiKey.endsWith('.gif'))) {
      const assetUrl = `${import.meta.env.BASE_URL}assets/${emojiKey}`
      return (
        <img
          src={assetUrl}
          alt={emojiKey.split('.')[0]}
          style={{
            width: size,
            height: size,
            objectFit: 'contain',
            verticalAlign: 'middle'
          }}
          onError={(e) => {
            // Fallback to text if image fails to load
            e.target.style.display = 'none'
          }}
        />
      )
    }
    // Fallback for unknown emojis
    return <span>{emojiKey}</span>
  }

  // Emoji mappings for floating effects (Discord emojis and custom assets)
  const emojiMappings = {
    'chud': 'chud.png', // Custom user avatar
    'mah wife': 'heartheart:1248721347459158168',
    'wolves den': 'STINKY:1384614772355502130',
    'phys ranged': 'Cat_In_Agony:1384621392787538114',
    'sister wives': 'SkeletonHeartHands:1384620342911434902',
    'cute': 'Lovereaper:1248711531068264592',
    'crime': 'Thron:1293024631317332079',
    '67': 'stressed:1384623535951187988',
    'slut': 'mpreg.svg' // Custom pregnant man emoji
  }

  // Special mappings for different behavior
  const specialMappings = {
    'yo tea': 'gif' // Shows GIF instead of emojis
  }

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const handleWordHover = (content) => {
    if (specialMappings[content] === 'gif') {
      // Special case for yo tea - show Alexander GIF
      setFloatingEmojis([{
        id: `${content}-gif`,
        emoji: 'ffxiv-perfect-alexander.gif',
        offsetX: 0,
        offsetY: -50,
        rotation: 0,
        isGif: true
      }])
    } else if (emojiMappings[content]) {
      // Create multiple floating emojis around the mouse
      const emojis = []
      for (let i = 0; i < 5; i++) {
        emojis.push({
          id: `${content}-${i}`,
          emoji: emojiMappings[content],
          offsetX: (Math.random() - 0.5) * 100, // Random offset between -50 and 50
          offsetY: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360
        })
      }
      setFloatingEmojis(emojis)
    }
  }

  const handleWordLeave = () => {
    setFloatingEmojis([])
  }

  const handleJobHover = (jobName) => {
    if (jobName.toLowerCase() === 'blue mage') {
      setFloatingEmojis([{
        id: 'blue-mage-hover',
        emoji: 'blu_hover.png',
        offsetX: 20,
        offsetY: -30,
        rotation: 0,
        isGif: false,
        width: '250px'
      }])
    } else if (jobName.toLowerCase() === 'dragoon') {
      setFloatingEmojis([{
        id: 'dragoon-hover',
        emoji: 'dragoon_hover.jpg',
        offsetX: 20,
        offsetY: -30,
        rotation: 0,
        isGif: false,
        width: '250px'
      }])
    }
  }

  const handleJobLeave = () => {
    setFloatingEmojis([])
  }


  const handleSlutClick = () => {
    setSlutEasterEggTimestamp(new Date().toISOString())
    setShowSlutEasterEgg(true)
  }

  const closeSlutEasterEgg = () => {
    setShowSlutEasterEgg(false)
  }

  // Mouse move tracking and cleanup
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (slutHoverTimeout) {
        clearTimeout(slutHoverTimeout)
      }
    }
  }, [slutHoverTimeout])

  // Handle escape key and outside clicks for modal
  useEffect(() => {
    if (!showSlutEasterEgg) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeSlutEasterEgg()
      }
    }

    const handleClickOutside = (e) => {
      if (e.target.id === 'slut-easter-egg-modal-backdrop') {
        closeSlutEasterEgg()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showSlutEasterEgg])

  // Map job names to icon filenames (data uses lowercase)
  const getJobIcon = (jobName) => {
    const iconMap = {
      'bard': 'Bard.png',
      'bluemage': 'BlueMage.png',
      'dancer': 'Dancer.png',
      'dragoon': 'Dragoon.png',
      'monk': 'Monk.png',
      'ninja': 'Ninja.png',
      'reaper': 'Reaper.png',
      'sage': 'Sage.png',
      'scholar': 'Scholar.png',
      'summoner': 'Summoner.png',
      'warrior': 'Warrior.png'
    }
    return iconMap[jobName.toLowerCase().replace(/\s+/g, '')] || null
  }

  // Map raid content to icon filenames
  const getRaidIcon = (raidName) => {
    const raidIconMap = {
      'savage': 'savage.png',
      'unreal': 'unreal.png',
      'dungeon': 'dungeon.png',
      'ultimate': 'ultimate.png',
      'extreme': 'extreme.png',
      'alliance': 'alliance.png',
      'trial': 'trial.png'
    }
    // Try different matching strategies
    const lowerName = raidName.toLowerCase()
    const icon = raidIconMap[lowerName] ||
                 raidIconMap[Object.keys(raidIconMap).find(key => lowerName.includes(key))]
    return icon || null
  }

  return (
    <div className="slide">
      <FloatingGhosts count={11} />
      <div className="slide-content">
        <h2 className="slide-title">FFXIV Highlights</h2>
        <p className="slide-subtitle">Your Free Company's adventures in Eorzea</p>
        
        {topJobs.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--ffxiv-gold)', marginBottom: '1rem' }}>
              Most Mentioned Jobs
            </h3>
            <div className="stat-grid">
              {topJobs.map((item, index) => {
                const iconFile = getJobIcon(item.job)
                return (
                  <div
                    key={item.job}
                    className="stat-card ffxiv-job-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onMouseEnter={() => (item.job.toLowerCase() === 'blue mage' || item.job.toLowerCase() === 'dragoon') && handleJobHover(item.job)}
                    onMouseLeave={() => (item.job.toLowerCase() === 'blue mage' || item.job.toLowerCase() === 'dragoon') && handleJobLeave()}
                  >
                    {iconFile && (
                      <div style={{
                        width: '60px',
                        height: '60px',
                        margin: '0 auto 1rem',
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <img
                          src={`${import.meta.env.BASE_URL}assets/${iconFile}`}
                          alt={`${item.job} icon`}
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'contain'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      </div>
                    )}
                  <div className="stat-card-title">{item.job}</div>
                  <div className="stat-card-value">{item.count.toLocaleString()}</div>
                </div>
                )
              })}
            </div>
          </div>
        )}

        {topRaids.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--ffxiv-gold)', marginBottom: '1rem' }}>
              Raid Content Mentions
            </h3>
            <div className="stat-grid">
              {topRaids.map((item, index) => {
                const raidIconFile = getRaidIcon(item.raid)
                return (
                  <div key={item.raid} className="stat-card ffxiv-raid-card" style={{ animationDelay: `${index * 0.1}s` }}>
                    {raidIconFile && (
                      <div style={{
                        width: '60px',
                        height: '60px',
                        margin: '0 auto 1rem',
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <img
                          src={`${import.meta.env.BASE_URL}assets/${raidIconFile}`}
                          alt={`${item.raid} icon`}
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'contain'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      </div>
                    )}
                  <div className="stat-card-title">{item.raid}</div>
                  <div className="stat-card-value">{item.count.toLocaleString()}</div>
                </div>
                )
              })}
            </div>
          </div>
        )}

        {topContent.length > 0 && (
            <div style={{ marginTop: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--ffxiv-gold)', marginBottom: '1rem' }}>
                Top 10 Content Mentions
              </h3>
              <div className="word-cloud">
                {topContent.map((item, index) => (
                  <span
                    key={item.content}
                    className="word-item"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {item.content === 'phys' ? 'phys ranged' : item.content} ({item.count.toLocaleString()})
                  </span>
                ))}
              </div>
            </div>
          )}

          {topDedContent.length > 0 && (
            <div style={{ marginTop: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--guild-orange)', marginBottom: '1rem' }}>
                DED Specific Content Mentions
              </h3>
              <div className="word-cloud">
                {topDedContent.map((item, index) => (
                  <span
                    key={item.content}
                    className="word-item"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      background: 'var(--guild-bg-card)',
                      border: '1px solid rgba(249, 115, 22, 0.3)',
                      cursor: item.content === 'slut' ? (isTouchDevice ? 'default' : 'pointer') : 'default'
                    }}
                    onMouseEnter={() => {
                      if (item.content === 'slut' && !isTouchDevice) {
                        // Desktop: Start 2-second hover timeout for slut easter egg
                        const timeout = setTimeout(() => {
                          // Find the slut text element and replace it
                          const slutTextElement = document.getElementById(`slut-text-${index}`)
                          if (slutTextElement) {
                            // Clear existing content
                            slutTextElement.innerHTML = ''

                            // Create the clickable span
                            const slutSpan = document.createElement('span')
                            slutSpan.id = 'slut-easter-egg-link'
                            slutSpan.style.color = 'var(--guild-orange)'
                            slutSpan.style.textDecoration = 'underline'
                            slutSpan.style.cursor = 'pointer'
                            slutSpan.textContent = 'slut'

                            // Store reference to state setters in the element
                            slutSpan._setSlutEasterEggTimestamp = setSlutEasterEggTimestamp
                            slutSpan._setShowSlutEasterEgg = setShowSlutEasterEgg

                            // Attach click handler directly to the span
                            slutSpan.addEventListener('click', function(e) {
                              e.stopPropagation() // Prevent event bubbling
                              this._setSlutEasterEggTimestamp(new Date().toISOString())
                              this._setShowSlutEasterEgg(true)
                            })

                            // Add the span to the element
                            slutTextElement.appendChild(slutSpan)

                            // Show the slut emoji at the same time as the text
                            handleWordHover('slut')
                          }
                        }, 2000) // 2 seconds for both text and emojis
                        setSlutHoverTimeout(timeout)
                      } else if (specialMappings[item.content] === 'gif') {
                        handleWordHover(item.content)
                      } else if (emojiMappings[item.content]) {
                        handleWordHover(item.content)
                      }
                    }}
                    onMouseLeave={() => {
                      if (item.content === 'slut' && !isTouchDevice) {
                        // Desktop: Clear the timeout if mouse leaves before 2 seconds
                        if (slutHoverTimeout) {
                          clearTimeout(slutHoverTimeout)
                          setSlutHoverTimeout(null)
                        }
                        // Reset the DOM element back to original state
                        const slutTextElement = document.getElementById(`slut-text-${index}`)
                        if (slutTextElement) {
                          slutTextElement.innerHTML = `     (${item.count.toLocaleString()})`
                        }
                        // Also clear any floating emojis
                        setFloatingEmojis([])
                      } else if (specialMappings[item.content] === 'gif' || emojiMappings[item.content]) {
                        handleWordLeave()
                      }
                    }}
                    onTouchStart={() => {
                      if (item.content === 'slut' && isTouchDevice) {
                        // Mobile: Start 2-second touch timeout for slut easter egg
                        const timeout = setTimeout(() => {
                          // Find the slut text element and replace it
                          const slutTextElement = document.getElementById(`slut-text-${index}`)
                          if (slutTextElement) {
                            // Clear existing content
                            slutTextElement.innerHTML = ''

                            // Create the clickable span
                            const slutSpan = document.createElement('span')
                            slutSpan.id = 'slut-easter-egg-link'
                            slutSpan.style.color = 'var(--guild-orange)'
                            slutSpan.style.textDecoration = 'underline'
                            slutSpan.style.cursor = 'pointer'
                            slutSpan.textContent = 'slut'

                            // Store reference to state setters in the element
                            slutSpan._setSlutEasterEggTimestamp = setSlutEasterEggTimestamp
                            slutSpan._setShowSlutEasterEgg = setShowSlutEasterEgg

                            // Attach click handler directly to the span
                            slutSpan.addEventListener('click', function(e) {
                              e.stopPropagation() // Prevent event bubbling
                              this._setSlutEasterEggTimestamp(new Date().toISOString())
                              this._setShowSlutEasterEgg(true)
                            })

                            // Add the span to the element
                            slutTextElement.appendChild(slutSpan)

                            // Show the slut emoji at the same time as the text
                            handleWordHover('slut')
                          }
                        }, 2000) // 2 seconds for both text and emojis
                        setSlutHoverTimeout(timeout)
                      }
                    }}
                    onTouchEnd={() => {
                      if (item.content === 'slut' && isTouchDevice) {
                        // Mobile: Clear the timeout if touch ends before 2 seconds
                        if (slutHoverTimeout) {
                          clearTimeout(slutHoverTimeout)
                          setSlutHoverTimeout(null)
                        }
                        // Reset the DOM element back to original state
                        const slutTextElement = document.getElementById(`slut-text-${index}`)
                        if (slutTextElement) {
                          slutTextElement.innerHTML = `     (${item.count.toLocaleString()})`
                        }
                        // Also clear any floating emojis
                        setFloatingEmojis([])
                      }
                    }}
                  >
                    {item.content === 'slut' ? (
                      <span id={`slut-text-${index}`}>     ({item.count.toLocaleString()})</span>
                    ) : (
                      `${item.content} (${item.count.toLocaleString()})`
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Slut Easter Egg Modal */}
          {showSlutEasterEgg && (
            <div
              id="slut-easter-egg-modal-backdrop"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000
              }}
            >
              <div style={{
                background: 'var(--guild-bg-card)',
                border: '3px solid var(--guild-orange)',
                borderRadius: '12px',
                padding: '2rem',
                maxWidth: '500px',
                width: '90%',
                textAlign: 'center',
                position: 'relative'
              }}>
                <button
                  onClick={closeSlutEasterEgg}
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
                  color: 'var(--guild-orange)',
                  marginBottom: '1rem',
                  fontSize: '1.3rem'
                }}>
                  🎉 Hidden Easter Egg Found! 🎉
                </h3>

                <p style={{
                  color: 'var(--guild-text)',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  Oh my! You found one of the hidden easter eggs! I bet you click any spoiler text without hesitation on discord, <strong>don't you?</strong> Take a screenshot of this and post it in the discord to claim your prize!
                </p>

                <div style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <img
                    src={`${import.meta.env.BASE_URL}assets/hehehe-why-yes.gif`}
                    alt="Hehehe Why Yes"
                    style={{
                      maxWidth: '200px',
                      maxHeight: '200px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                    }}
                  />
                </div>

                <div style={{
                  color: 'var(--ffxiv-red)',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  fontFamily: 'monospace',
                  background: 'rgba(220, 38, 38, 0.1)',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid var(--ffxiv-red)'
                }}>
                  Found at: {slutEasterEggTimestamp ? new Date(slutEasterEggTimestamp).toLocaleString() : 'Loading...'}
                </div>
              </div>
            </div>
          )}

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
                  alt="Perfect Alexander"
                  style={{
                    width: '100px',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                  }}
                />
              ) : floatingEmoji.width ? (
                <img
                  src={`${import.meta.env.BASE_URL}assets/${floatingEmoji.emoji}`}
                  alt="Large hover image"
                  style={{
                    width: floatingEmoji.width,
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                  }}
                />
              ) : (
                renderEmoji(floatingEmoji.emoji, '2rem')
              )}
            </div>
          ))}
        </div>
    </div>
  )
}

export default SlideFFXIV


