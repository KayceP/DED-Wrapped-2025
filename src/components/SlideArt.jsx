import { useState, useEffect } from 'react'
import '../styles/Slide.css'

function SlideArt({ stats }) {
  const [artwork, setArtwork] = useState([])
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [isHoveringVideo, setIsHoveringVideo] = useState(false)

  useEffect(() => {
    // Load artwork from public/assets/art folder
    const loadArtwork = async () => {
      try {
        // Get all files from the art directory
        const artFiles = [
          // Images
          { filename: 'Thorn_1.png', artist: 'Thorn', type: 'image' },
          { filename: 'Thorn_2.mp4', artist: 'Thorn', type: 'video' },
          // Add more artwork files as they become available
        ]

        setArtwork(artFiles)
      } catch (error) {
        console.error('Error loading artwork:', error)
      }
    }

    loadArtwork()
  }, [])

  const openArtworkModal = (art) => {
    setSelectedArtwork(art)
  }

  const closeArtworkModal = () => {
    setSelectedArtwork(null)
    setIsHoveringVideo(false)
  }

  const getFileExtension = (filename) => {
    return filename.split('.').pop().toLowerCase()
  }

  const isVideo = (filename) => {
    const ext = getFileExtension(filename)
    return ['mp4', 'webm', 'ogg'].includes(ext)
  }

  if (!artwork.length) {
    return (
      <div className="slide">
        <div className="slide-content">
          <h2 className="slide-title">Community Artist Appreciation</h2>
          <p className="slide-subtitle">Loading community artwork...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="slide">
      <div className="slide-content">
        <h2 className="slide-title">🎨 Community Artist Appreciation</h2>
        <p className="slide-subtitle">Amazing artwork created by our talented community members</p>

        <div className="art-grid">
          {artwork.map((art, index) => (
            <div
              key={`${art.artist}-${art.filename}`}
              className="art-item"
              onClick={() => openArtworkModal(art)}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => {
                if (isVideo(art.filename)) {
                  setIsHoveringVideo(true)
                }
              }}
              onMouseLeave={() => {
                setIsHoveringVideo(false)
              }}
            >
              {isVideo(art.filename) ? (
                <video
                  src={`${import.meta.env.BASE_URL}assets/art/${art.filename}`}
                  alt={`${art.artist}'s artwork`}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                  muted
                  loop
                  onMouseEnter={(e) => {
                    e.target.play()
                  }}
                  onMouseLeave={(e) => {
                    e.target.pause()
                    e.target.currentTime = 0
                  }}
                />
              ) : (
                <img
                  src={`${import.meta.env.BASE_URL}assets/art/${art.filename}`}
                  alt={`${art.artist}'s artwork`}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                />
              )}

              <div className="art-item-hover-text">
                @{art.artist}
              </div>
            </div>
          ))}
        </div>

        {/* Artwork Modal */}
        {selectedArtwork && (
          <div
            className="art-modal-backdrop"
            onClick={closeArtworkModal}
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
          >
            <div className="art-modal-content">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  closeArtworkModal()
                }}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>

              {isVideo(selectedArtwork.filename) ? (
                <video
                  src={`${import.meta.env.BASE_URL}assets/art/${selectedArtwork.filename}`}
                  controls
                  autoPlay
                  style={{
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    borderRadius: '8px'
                  }}
                />
              ) : (
                <img
                  src={`${import.meta.env.BASE_URL}assets/art/${selectedArtwork.filename}`}
                  alt={`${selectedArtwork.artist}'s artwork`}
                  style={{
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                  }}
                />
              )}

              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '20px',
                fontSize: '1.1rem'
              }}>
                Artwork by @{selectedArtwork.artist}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SlideArt