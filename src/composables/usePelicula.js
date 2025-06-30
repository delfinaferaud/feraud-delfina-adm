import { ref, onMounted, computed } from 'vue'
import { useApi } from './useApi'
import { useRoute, useRouter } from 'vue-router'

export default function usePelicula() {
  const { llamarApi } = useApi()

  const search = ref('')
  const peliculas = ref([])
  const mensaje = ref('')
  const generos = ref([])
  const filtroGenero = ref('')
  const peliculaNull = ref(null)
  const route = useRoute()
  const router = useRouter()

  onMounted(async () => {
    try {
      const apiPeliculas = `/movie/popular`
      const resultado = await llamarApi(apiPeliculas)
      peliculas.value = resultado.results
    } catch (error) {
      console.log(error)
    }
  })

  const buscarPelicula = () => {
    if (!query.value.q) {
      mensaje.value = 'Escribí un nombre de película'
      peliculas.value = []
      return
    }
    router.push({ path: '/resultados', query: query.value })
    search.value = ''
  }

  onMounted(async () => {
    try {
      if (!route.params.id) return
      const apiDetalle = `/movie/${route.params.id}`
      const data = await llamarApi(apiDetalle)
      peliculaNull.value = data
    } catch (error) {
      console.log(error)
    }
  })

  const cargarGeneros = async () => {
    try {
      const data = await llamarApi('/genre/movie/list')
      generos.value = data.genres
    } catch (error) {
      console.error('Error al cargar géneros', error)
    }
  }

  onMounted(() => {
    cargarGeneros()
  })

  const buscarPorGenero = () => {
    if (!query.value.q && !query.value.genero) {
      router.push('/')
      return
    }
    router.push({ path: '/resultados', query: query.value })
  }

  const query = computed(() => {
    const q = {}
    if (search.value.trim()) q.q = search.value.trim()
    if (filtroGenero.value !== '') q.genero = filtroGenero.value
    return q
  })

  return {
    search,
    peliculas,
    mensaje,
    buscarPelicula,
    peliculaNull,
    filtroGenero,
    generos,
    buscarPorGenero,
  }
}
