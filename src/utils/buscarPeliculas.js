import { useApi } from '../composables/useApi'

export async function buscarPorTexto(termino) {
  const { llamarApi } = useApi()
  const { results } = await llamarApi(`/search/movie?query=${encodeURIComponent(termino)}`)
  return results
}

export async function buscarPorGenero(idGenero) {
  const { llamarApi } = useApi()
  const { results } = await llamarApi(`/discover/movie?with_genres=${idGenero}`)
  return results
}

export async function buscarTextoYGenero(termino, idGenero) {
  const base = await buscarPorTexto(termino)
  return base.filter((p) => p.genre_ids.includes(+idGenero))
}
