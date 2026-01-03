import { useState, useEffect } from 'react'
import '../styles/Slide.css'
import FloatingGhosts from './FloatingGhosts'

function SlideOutro({ stats }) {
  const [activeSection, setActiveSection] = useState(null) // 'credits' or 'faq'
  const [expandedQuestions, setExpandedQuestions] = useState({})
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [easterEggTimestamp, setEasterEggTimestamp] = useState(null)
  const [hoverTimeout, setHoverTimeout] = useState(null)
  const [floatingEmojis, setFloatingEmojis] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const handleUmaHover = () => {
    setFloatingEmojis([{
      id: 'uma-musume-gif',
      emoji: 'uma-musume.gif',
      offsetX: 20,
      offsetY: -30,
      rotation: 0,
      isGif: true
    }])
  }

  const handleUmaLeave = () => {
    setFloatingEmojis([])
  }

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section)
  }

  const toggleQuestion = (questionId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }))
  }

  const handleEasterEggHover = () => {
    const timeout = setTimeout(() => {
      // Create the link element
      const easterEggText = document.getElementById('easter-egg-text')
      if (easterEggText) {
        easterEggText.innerHTML = '<a href="#" id="easter-egg-link" style="color: var(--guild-orange); text-decoration: underline;">...of course not</a>'
        document.getElementById('easter-egg-link').addEventListener('click', (e) => {
          e.preventDefault()
          setEasterEggTimestamp(new Date().toISOString())
          setShowEasterEgg(true)
        })
      }
    }, 1500) // 1.5 seconds
    setHoverTimeout(timeout)
  }

  const handleEasterEggLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    // Reset the text
    const easterEggText = document.getElementById('easter-egg-text')
    if (easterEggText && !showEasterEgg) {
      easterEggText.textContent = '...of course not'
    }
  }

  const closeEasterEgg = () => {
    setShowEasterEgg(false)
    // Reset the text
    const easterEggText = document.getElementById('easter-egg-text')
    if (easterEggText) {
      easterEggText.textContent = '...of course not'
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [hoverTimeout])

  // Handle escape key and outside clicks for modal
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

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="slide">
      <FloatingGhosts count={12} />
      <div className="slide-content outro-content">
        <h2 className="slide-title">Thanks for an amazing 2025!</h2>
        <p className="slide-subtitle" style={{ fontSize: '1.8rem', marginTop: '2rem' }}>
          Here's to another year of adventures together in Eorzea and beyond
        </p>

        <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '2rem' }}>
          <img
            src={`${import.meta.env.BASE_URL}assets/end_cardL.jpg`}
            alt="End Card"
            style={{
              maxWidth: '100%',
              maxHeight: '450px',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              animation: 'fadeInUp 1s ease-out'
            }}
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--ffxiv-text-dim)' }}>
            Dead on Arrival
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--ffxiv-text-dim)', marginTop: '1rem' }}>
            2025
          </p>
        </div>

        {/* Credits and FAQ Section */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '1rem',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => toggleSection('credits')}
              style={{
                background: activeSection === 'credits' ? 'var(--guild-orange)' : 'var(--guild-bg-card)',
                border: '2px solid var(--guild-orange)',
                color: activeSection === 'credits' ? 'var(--guild-bg-dark)' : 'var(--guild-orange)',
                padding: '0.75rem 1.5rem',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '120px'
              }}
            >
              Credits {activeSection === 'credits' ? '▼' : '▶'}
            </button>

            <button
              onClick={() => toggleSection('faq')}
              style={{
                background: activeSection === 'faq' ? 'var(--guild-orange)' : 'var(--guild-bg-card)',
                border: '2px solid var(--guild-orange)',
                color: activeSection === 'faq' ? 'var(--guild-bg-dark)' : 'var(--guild-orange)',
                padding: '0.75rem 1.5rem',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '120px'
              }}
            >
              FAQ {activeSection === 'faq' ? '▼' : '▶'}
            </button>
          </div>

          {/* Credits Content */}
          {activeSection === 'credits' && (
            <div style={{
              maxWidth: '600px',
              margin: '0 auto',
              background: 'var(--guild-bg-card)',
              border: '1px solid rgba(75, 85, 99, 0.3)',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            alignItems: 'center',
            fontSize: '1rem',
            color: 'var(--guild-text)'
          }}>
            <div>
              <span style={{ color: 'var(--guild-orange)', fontWeight: 'bold' }}>Data Scraping:</span> Zi's Mammet
            </div>
            <div>
                  <span style={{ color: 'var(--guild-orange)', fontWeight: 'bold' }}>Analytics Library:</span> Chat-analytics
            </div>
            <div>
                  <span style={{ color: 'var(--guild-orange)', fontWeight: 'bold' }}>Programmer & Creative Director:</span> Zi
            </div>
            <div>
                  <span style={{ color: 'var(--guild-orange)', fontWeight: 'bold' }}>DED Beta Testers:</span> Thorn, Val Reina, A Cade, Cleo "League Dealer" Linieh, AArekin AAlatus
            </div>
            <div>
              <span style={{ color: 'var(--guild-orange)', fontWeight: 'bold' }}>Presentation Magic:</span> React & D3
            </div>
            <div>
                  <span style={{ color: 'var(--guild-orange)', fontWeight: 'bold' }}>Coding Fuel:</span> Cold Brew & FFXIV Music
                </div>
              </div>
            </div>
          )}

          {/* FAQ Content */}
          {activeSection === 'faq' && (
            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              textAlign: 'left'
            }}>
              {/* How was this made? */}
              <div style={{
                background: 'var(--guild-bg-card)',
                border: '1px solid rgba(75, 85, 99, 0.3)',
                borderRadius: '8px',
                marginBottom: '1rem',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => toggleQuestion('how-made')}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: 'var(--guild-text)',
                    padding: '1rem',
                    textAlign: 'left',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>A Dead Wrapped? What? How?!</span>
                  <span style={{
                    color: 'var(--guild-orange)',
                    fontSize: '1.2rem',
                    transition: 'transform 0.3s ease'
                  }}>
                    {expandedQuestions['how-made'] ? '▼' : '▶'}
                  </span>
                </button>
                {expandedQuestions['how-made'] && (
                  <div style={{
                    padding: '0 1rem 1rem 1rem',
                    color: 'var(--guild-text-dim)',
                    lineHeight: '1.6'
                  }}>
                    <p>Well, DED wrapped was born out of the desire to do something special for the FC as we step into 2026, and we figured... if everyone else is doing a wrapped, why can't a FFXIV FC have one?!</p>

                    <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>Step 1: Data Collection:</p>
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                      <li>Once we accepted the duty pop for the new year, Discord data was scraped from the DED discord server by our custom Discord bot <strong>Zi&apos;s Mammet</strong>, using the <a href="https://github.com/Tyrrrz/DiscordChatExporter"  target="_blank">DiscordChatExporter tool</a>.</li>
                      <li>The mammet diligently collected data covering the full year: <strong>January 1, 2025 to December 31, 2025</strong>. Then,  24+ hours later, we had the year exported in a sea of .json files!</li>
                      <li>This includes almost all messages, reactions, and user interactions across all channels. <em style={{ cursor: 'pointer' }} onMouseEnter={handleUmaHover} onMouseLeave={handleUmaLeave}>The only excluded data is any officer related channel or restricted channel, we couldn't let Arekin pad his numbers any more.</em></li>
                    </ul>

                    <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>Step 2: Build it in a cave, with a box of <s>scraps</s> libraries:</p>
					<p>Using the below libraries/frameworks/etc, we created a script that would process all the collected .json files and extract any statistic we wanted to highlight. The heavy lifters were:</p>
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                      <li><strong>React</strong> - Interactive user interface framework</li>
                      <li><strong>D3.js</strong> - Data visualization and charting</li>
                      <li><strong>Chat-analytics</strong> - Discord message analysis library</li>
                      <li><strong>Vite</strong> - Fast build tool and development server</li>
                      <li><strong>Node.js</strong> - JavaScript runtime environment</li>
                      <li><strong>Discord.js</strong> - Additional Bot framework for data collection</li>
                    </ul>
					<p>&nbsp;</p>
					<p>The website is designed in such a way that when you run the data processing script, it populates all the pages dynamically. So no need to manually update numbers! Only a few small pieces are static or needed to be done by hand, such as screenshots or this Credits and FAQ section, for instance.</p>
					
                    <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>Step 3: Hopefully, you enjoy the wrapped!</p>
					<p>If you have any other questions though, please ask us in the discord!</p>
                  </div>
                )}
              </div>

              {/* Is all our data private? */}
              <div style={{
                background: 'var(--guild-bg-card)',
                border: '1px solid rgba(75, 85, 99, 0.3)',
                borderRadius: '8px',
                marginBottom: '1rem',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => toggleQuestion('data-privacy')}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: 'var(--guild-text)',
                    padding: '1rem',
                    textAlign: 'left',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>Ok ok, but is this exposing our private discord data?!?!</span>
                  <span style={{
                    color: 'var(--guild-orange)',
                    fontSize: '1.2rem',
                    transition: 'transform 0.3s ease'
                  }}>
                    {expandedQuestions['data-privacy'] ? '▼' : '▶'}
                  </span>
                </button>
                {expandedQuestions['data-privacy'] && (
                  <div style={{
                    padding: '0 1rem 1rem 1rem',
                    color: 'var(--guild-text-dim)',
                    lineHeight: '1.6'
                  }}>
                    <p>Technically the DED discord isn't what one would consider 'private' data, but, we still took steps to ensure as much privacy as possible! The raw Discord data remains completely private and secure. Technically it does show our usernames/profile pictures, but that's really it, and it's not going to be broadcasted publiclly. If you're super curious, here's how it works:</p>
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                      <li><strong>Local Processing Only:</strong> All data analysis happens on the local dev machine (Zi's) using npm scripts. Nothing is uploaded to external servers.</li>
                      <li><strong>No Raw Data on GitHub:</strong> The original Discord JSON files stay on the dev machine. Only processed, aggregated statistics are stored in the repository.</li>
                      <li><strong><em>Mostly</em> Anonymous Results:</strong> The final wrapped shows community insights and trends, and no private personal data, beyond usernames and profile pictures.</li>
                      <li><strong>Open Source Transparency:</strong> You can review the <a href="https://github.com/KayceP/DED-Wrapped-2025/tree/main/scripts" target="_blank">processing code</a> yourself to see exactly how your data is handled.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Are there any easter eggs? */}
              <div style={{
                background: 'var(--guild-bg-card)',
                border: '1px solid rgba(75, 85, 99, 0.3)',
                borderRadius: '8px',
                marginBottom: '1rem',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => toggleQuestion('easter-eggs')}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: 'var(--guild-text)',
                    padding: '1rem',
                    textAlign: 'left',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>Are there any easter eggs?</span>
                  <span style={{
                    color: 'var(--guild-orange)',
                    fontSize: '1.2rem',
                    transition: 'transform 0.3s ease'
                  }}>
                    {expandedQuestions['easter-eggs'] ? '▼' : '▶'}
                  </span>
                </button>
                {expandedQuestions['easter-eggs'] && (
                  <div style={{
                    padding: '0 1rem 1rem 1rem',
                    color: 'var(--guild-text-dim)',
                    lineHeight: '1.6'
                  }}>
                    <p>What? Easter eggs?? With gil related prizes??? In OUR DED WRAPPED??? <span
                      id="easter-egg-text"
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                      onMouseEnter={handleEasterEggHover}
                      onMouseLeave={handleEasterEggLeave}
                    >...of course not</span>.</p>
                  </div>
                )}
              </div>
            </div>
          )}

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
                  onClick={closeEasterEgg}
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
                  🎉 Easter Egg Found! 🎉
                </h3>

                <p style={{
                  color: 'var(--guild-text)',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6'
                }}>
                  Can&apos;t fool you, congrats on finding one of the easter eggs! Take a screenshot of this and post it in the discord to claim your prize!
                </p>

                <div style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <img
                    src={`${import.meta.env.BASE_URL}assets/loporrit-dance.gif`}
                    alt="Loporrit Dance"
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
                  Found at: {easterEggTimestamp ? new Date(easterEggTimestamp).toLocaleString() : 'Loading...'}
                </div>
            </div>
          </div>
          )}
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
                alt="Uma Musume"
                style={{
                  width: '240px',
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

export default SlideOutro


