export const useApi = () => {
  const acceso =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTMyYzJkODRlYzVlYzdjODJkN2I4OGIwZTM0MmViYyIsIm5iZiI6MTc1MTE1NzY3Mi44NzYsInN1YiI6IjY4NjA4YmE4YzBiNzlkOWUxNzRkMWJkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qEByz5SaF35y0JoJiWMQ9g_JhvoqeLSDktv_ZNTNKS4'

  const llamarApi = async (endpoint) => {
    const url = `https://api.themoviedb.org/3${endpoint}`

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${acceso}`,
      },
    }

    const res = await fetch(url, options)
      return await res.json()
  }

  return {
    llamarApi,
  }
}