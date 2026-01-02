export async function loadStats() {
  try {
    // In production, account for the base path
    const basePath = import.meta.env.BASE_URL || '/'

    const statsPath = `${basePath}data/stats.json`.replace(/\/+/g, '/')

    const response = await fetch(statsPath)

    if (!response.ok) {
      throw new Error(`Failed to load stats.json from ${statsPath} (status: ${response.status})`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error loading stats:', error)
    throw error
  }
}


