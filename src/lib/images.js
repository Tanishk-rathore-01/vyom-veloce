const CACHE_TTL = 24 * 60 * 60 * 1000

function buildPexelsQuery(query, category) {
  const cleanQuery = query.trim()
  const suffix =
    category === 'motorcycle' ? ' motorcycle photography' : ' car photography'
  return `${cleanQuery}${suffix}`
}

function getCachedImage(cacheKey) {
  try {
    const cachedRaw = localStorage.getItem(cacheKey)
    if (!cachedRaw) {
      return null
    }

    const parsed = JSON.parse(cachedRaw)
    if (!parsed?.url || !parsed?.expiresAt) {
      localStorage.removeItem(cacheKey)
      return null
    }

    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem(cacheKey)
      return null
    }

    return parsed.url
  } catch {
    return null
  }
}

function setCachedImage(cacheKey, url) {
  try {
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        url,
        expiresAt: Date.now() + CACHE_TTL,
      }),
    )
  } catch {
    // Ignore cache write failures.
  }
}

export async function fetchVehiclePhoto(query, options = {}) {
  if (!query?.trim()) {
    return null
  }

  const { category = 'car', signal } = options
  const pexelsApiKey = import.meta.env.VITE_PEXELS_API_KEY
  if (!pexelsApiKey) {
    return null
  }

  const pexelsQuery = buildPexelsQuery(query, category)
  const cacheKey = `vyom_cache_${pexelsQuery.toLowerCase()}`
  const cachedImage = getCachedImage(cacheKey)
  if (cachedImage) {
    return cachedImage
  }

  const params = new URLSearchParams({
    query: pexelsQuery,
    per_page: '1',
    orientation: 'landscape',
  })

  const response = await fetch(`https://api.pexels.com/v1/search?${params.toString()}`, {
    headers: {
      Authorization: pexelsApiKey,
    },
    signal,
  })

  if (!response.ok) {
    throw new Error('Unable to fetch vehicle photography from Pexels.')
  }

  const payload = await response.json()
  const photoUrl = payload?.photos?.[0]?.src?.large2x ?? null
  if (photoUrl) {
    setCachedImage(cacheKey, photoUrl)
  }
  return photoUrl
}
