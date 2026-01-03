import { useState, useEffect } from 'react'
import '../styles/Slide.css'

function SlideArt({ stats }) {
  const [selectedArt, setSelectedArt] = useState(null)
  const [artFiles, setArtFiles] = useState([])
  const [floatingEmojis, setFloatingEmojis] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const handleAmazingHover = () => {
    setFloatingEmojis([{
      id: 'amazing-hover',
      emoji: 'argo_hover.png',
      offsetX: 20,
      offsetY: -30,
      rotation: 0,
      isGif: false,
      width: '300px'
    }])
  }

  const handleAmazingLeave = () => {
    setFloatingEmojis([])
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // List of art files - this would ideally be dynamic, but for now we'll hardcode
  // based on the files we know exist
  const artData = [
    // Geru
    { filename: 'Esme_11.png', artist: 'Esme', type: 'image' },

    // Crowe
    { filename: 'Crowe_1.png', artist: 'Crowe', type: 'image' },
    { filename: 'Crowe_2.jpg', artist: 'Crowe', type: 'image' },
    { filename: 'Crowe_3.png', artist: 'Crowe', type: 'image' },
    { filename: 'Crowe_4.jpg', artist: 'Crowe', type: 'image' },
    { filename: 'Crowe_5.jpg', artist: 'Crowe', type: 'image' },

    // Esme
    { filename: 'Esme_1.png', artist: 'Esme', type: 'image' },
    { filename: 'Esme_2.gif', artist: 'Esme', type: 'image' },
    { filename: 'Esme_3.png', artist: 'Esme', type: 'image' },
    { filename: 'Esme_4.png', artist: 'Esme', type: 'image' },
    { filename: 'Esme_5.png', artist: 'Esme', type: 'image' },
    { filename: 'Esme_6.png', artist: 'Esme', type: 'image' },
    { filename: 'Esme_7.png', artist: 'Esme', type: 'image' },
    { filename: 'Esme_8.png', artist: 'Esme', type: 'image' },
    { filename: 'Esme_9.png', artist: 'Esme', type: 'image' },
    { filename: 'Esme_10.png', artist: 'Esme', type: 'image' },

    // Geru
    { filename: 'Geru_1.png', artist: 'Geru', type: 'image' },
    { filename: 'Geru_3.png', artist: 'Geru', type: 'image' },
    { filename: 'Geru_4.png', artist: 'Geru', type: 'image' },
    { filename: 'Geru_5.png', artist: 'Geru', type: 'image' },
    { filename: 'Geru_6.png', artist: 'Geru', type: 'image' },
    { filename: 'Geru_7.png', artist: 'Geru', type: 'image' },
    { filename: 'Geru_8.png', artist: 'Geru', type: 'image' },
    { filename: 'Geru_9.png', artist: 'Geru', type: 'image' },
    { filename: 'geru_10.png', artist: 'Geru', type: 'image' },
    { filename: 'Geru_11.png', artist: 'Geru', type: 'image' },
    { filename: 'Geru_12.png', artist: 'Geru', type: 'image' },

    // Grimm & Okin
    { filename: 'Grimm_&_Okin_1.png', artist: 'Grimm & Okin', type: 'image' },
    { filename: 'Grimm_&_Okin_2.png', artist: 'Grimm & Okin', type: 'image' },
    { filename: 'Grimm_&_Okin_3.png', artist: 'Grimm & Okin', type: 'image' },
    { filename: 'Grimm_&_Okin_4.png', artist: 'Grimm & Okin', type: 'image' },
    { filename: 'Grimm_&_Okin_5.png', artist: 'Grimm & Okin', type: 'image' },
    { filename: 'Grimm_&_Okin_6.png', artist: 'Grimm & Okin', type: 'image' },
    { filename: 'Grimm_&_Okin_7.png', artist: 'Grimm & Okin', type: 'image' },

    // Nymnir Nyven
    { filename: 'Nymnir_Nyven_1.png', artist: 'Nymnir Nyven', type: 'image' },
    { filename: 'Nymnir_Nyven_2.png', artist: 'Nymnir Nyven', type: 'image' },
    { filename: 'Nymnir_Nyven_3.png', artist: 'Nymnir Nyven', type: 'image' },
    { filename: 'Nymnir_Nyven_4.png', artist: 'Nymnir Nyven', type: 'image' },
    { filename: 'Nymnir_Nyven_5.png', artist: 'Nymnir Nyven', type: 'image' },

    // Thorn
    { filename: 'Thorn_1.png', artist: 'Thorn', type: 'image' },
    { filename: 'Thorn_2.mp4', artist: 'Thorn', type: 'video' },

    // Val
    { filename: 'Val_1.jpg', artist: 'Val', type: 'image' },

    // Vee
    { filename: 'Vee_1.jpg', artist: 'Vee', type: 'image' },
    { filename: 'Vee_2.jpg', artist: 'Vee', type: 'image' },
    { filename: 'Vee_3.jpg', artist: 'Vee', type: 'image' },
    { filename: 'Vee_4.jpg', artist: 'Vee', type: 'image' },
    { filename: 'Vee_5.jpg', artist: 'Vee', type: 'image' },
    { filename: 'Vee_6.jpg', artist: 'Vee', type: 'image' }
  ]

  useEffect(() => {
    setArtFiles(artData)
  }, [])

  const openModal = (art) => {
    setSelectedArt(art)
  }

  const closeModal = () => {
    setSelectedArt(null)
  }

  // Handle escape key and outside clicks for modal
  useEffect(() => {
    if (!selectedArt) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    const handleClickOutside = (e) => {
      if (e.target.id === 'art-modal-backdrop') {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [selectedArt])

  return (
    <div className="slide">
      <div className="slide-content">
        <h2 className="slide-title">Community Artist Appreciation</h2>
        <p className="slide-subtitle" style={{ fontSize: '1.4rem', marginTop: '1rem' }}>
          Celebrating the incredible talent in our community
        </p>

        <p style={{
          fontSize: '1.1rem',
          color: 'var(--guild-text)',
          lineHeight: '1.6',
          marginTop: '1.5rem',
          marginBottom: '2rem',
          maxWidth: '800px',
          textAlign: 'center',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Our server is blessed to be a digital home to so many talented artists that work with all sorts of mediums! While we may not have been able to capture every single creation you made in 2025, we wanted to highlight as many as we could. You can click an image to enlarge it, and also see the artist's name. Thank you for sharing your art with us,{' '}
          <span
            style={{ cursor: 'default' }}
            onMouseEnter={handleAmazingHover}
            onMouseLeave={handleAmazingLeave}
          >
            you are AMAZING!!
          </span>
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '2rem',
          padding: '1rem'
        }}>
          {artFiles.map((art, index) => (
            <div
              key={`${art.filename}-${index}`}
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                aspectRatio: '1'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'
              }}
              onClick={() => openModal(art)}
            >
              {art.type === 'video' ? (
                <video
                  src={`${import.meta.env.BASE_URL}assets/art/${art.filename}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  muted
                  loop
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                />
              ) : (
                <img
                  src={`${import.meta.env.BASE_URL}assets/art/${art.filename}`}
                  alt={`Art by ${art.artist}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  loading="lazy"
                />
              )}

              {/* Hover overlay with artist name */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
                  padding: '2rem 0.5rem 0.5rem 0.5rem',
                  opacity: '0',
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
              >
                <div style={{
                  color: 'var(--guild-orange)',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
                }}>
                  @{art.artist.replace(/\s*&\s*/g, ' & ').replace(/_/g, ' ')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for full-screen art view */}
        {selectedArt && (
          <div
            id="art-modal-backdrop"
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
            onClick={closeModal}
          >
            <div style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              position: 'relative'
            }}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  closeModal()
                }}
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '0',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                ×
              </button>

              <div style={{
                color: 'var(--guild-orange)',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '1rem',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
              }}>
                @{selectedArt.artist.replace(/\s*&\s*/g, ' & ').replace(/_/g, ' ')}
              </div>

              {selectedArt.type === 'video' ? (
                <video
                  src={`${import.meta.env.BASE_URL}assets/art/${selectedArt.filename}`}
                  controls
                  autoPlay
                  style={{
                    maxWidth: '100%',
                    maxHeight: '80vh',
                    borderRadius: '8px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
                  }}
                />
              ) : (
                <img
                  src={`${import.meta.env.BASE_URL}assets/art/${selectedArt.filename}`}
                  alt={`Art by ${selectedArt.artist}`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '80vh',
                    borderRadius: '8px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                    objectFit: 'contain'
                  }}
                />
              )}
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
                alt="floating emoji"
                style={{
                  width: floatingEmoji.width || '100px',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}
              />
            ) : floatingEmoji.width ? (
              <img
                src={`${import.meta.env.BASE_URL}assets/${floatingEmoji.emoji}`}
                alt="floating emoji"
                style={{
                  width: floatingEmoji.width,
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}
              />
            ) : (
              <span style={{ fontSize: '2rem' }}>{floatingEmoji.emoji}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SlideArt