import { useState, useEffect } from 'react'
import './styles/App.css'
import SlideIntro from './components/SlideIntro'
import SlideMessages from './components/SlideMessages'
import SlideUsers from './components/SlideUsers'
import SlideChannels from './components/SlideChannels'
import SlideActivity from './components/SlideActivity'
import SlideReactions from './components/SlideReactions'
import SlideWords from './components/SlideWords'
import SlideEmoji from './components/SlideEmoji'
import SlideArt from './components/SlideArt'
import SlideMedia from './components/SlideMedia'
import SlideEngagement from './components/SlideEngagement'
import SlideAchievements from './components/SlideAchievements'
import SlideTimeline from './components/SlideTimeline'
import SlideFunFacts from './components/SlideFunFacts'
import SlidePuns from './components/SlidePuns'
import SlideFFXIV from './components/SlideFFXIV'
import SlideOutro from './components/SlideOutro'
import { loadStats } from './utils/dataLoader'

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [backButtonClicks, setBackButtonClicks] = useState(0)
  const [showBackEasterEgg, setShowBackEasterEgg] = useState(false)
  const [backEasterEggTimestamp, setBackEasterEggTimestamp] = useState(null)

  useEffect(() => {
    loadStats()
      .then(data => {
        setStats(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load stats:', err)
        setLoading(false)
      })
  }, [])

  const slides = [
    SlideIntro,
    SlideMessages,
    SlideUsers,
    SlideChannels,
    SlideActivity,
    SlideReactions,
    SlideWords,
    SlideEmoji,
    SlideArt,
    SlideMedia,
    SlideEngagement,
    SlideAchievements,
    SlideTimeline,
    SlideFunFacts,
    SlidePuns,
    SlideFFXIV,
    SlideOutro,
  ]

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const handlePrev = () => {
    // Easter egg: clicking back button 3 times on first slide
    if (currentSlide === 0) {
      const newClickCount = backButtonClicks + 1
      setBackButtonClicks(newClickCount)

      if (newClickCount === 3) {
        setBackEasterEggTimestamp(new Date().toISOString())
        setShowBackEasterEgg(true)
        setBackButtonClicks(0) // Reset for next time
      }
    } else if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  // Touch/swipe handling for mobile
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      handleNext()
    }
    if (isRightSwipe && currentSlide > 0) {
      handlePrev()
    }
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(currentSlide + 1)
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentSlide > 0) {
          setCurrentSlide(currentSlide - 1)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide, slides.length])

  // Handle escape key for back easter egg modal
  useEffect(() => {
    if (!showBackEasterEgg) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowBackEasterEgg(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [showBackEasterEgg])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading your DED 2025 Wrapped...</p>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="error-screen">
        <h1>Unable to load stats</h1>
        <p>Please run: npm run process-data</p>
      </div>
    )
  }

  const CurrentSlideComponent = slides[currentSlide]

  return (
    <div
      className="app"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <CurrentSlideComponent stats={stats} />
      <div className="slide-controls">
        <button
          onClick={handlePrev}
          className={`nav-button prev ${currentSlide === 0 ? 'deactivated' : ''}`}
        >
          ←
        </button>
        <div className="slide-indicator">
          {currentSlide + 1} / {slides.length}
        </div>
        <button 
          onClick={handleNext} 
          disabled={currentSlide === slides.length - 1}
          className="nav-button next"
        >
          →
        </button>
      </div>

      {/* Back Button Easter Egg Modal */}
      {showBackEasterEgg && (
        <div
          id="back-easter-egg-modal-backdrop"
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
          onClick={() => setShowBackEasterEgg(false)}
        >
          <div style={{
            background: 'var(--guild-bg-card)',
            border: '3px solid var(--guild-orange)',
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
                setShowBackEasterEgg(false)
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
              🕹️ Old School Gamer Detected? 🕹️
            </h3>

            <p style={{
              color: 'var(--guild-text)',
              marginBottom: '1.5rem',
              lineHeight: '1.6',
              fontSize: '1.1rem'
            }}>
              Whoa there! Trying to go backwards in a slideshow? That's some serious old school gaming instinct right there! Did you know the original Metroid was the first game that rewarded you for going backwards at the start of it?

              <br/><br/>
              <strong>Congrats on finding one of our easter eggs!</strong> Take a screenshot and post it on discord to claim your prize!
            </p>

            <div style={{
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <img
                src={`${import.meta.env.BASE_URL}assets/backwards.gif`}
                alt="Going Backwards"
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
              Old School Gamer Achievement Unlocked at: {backEasterEggTimestamp ? new Date(backEasterEggTimestamp).toLocaleString() : 'Loading...'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

