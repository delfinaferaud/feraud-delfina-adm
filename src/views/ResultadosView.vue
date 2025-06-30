<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '../composables/useApi'

const route = useRoute()
const { llamarApi } = useApi()

const peliculas = ref([])
const mensaje = ref('')
const favoritas = ref(new Set())

onMounted(() => {
  const guardados = localStorage.getItem('favoritasPeliculas')
  if (guardados) {
    try {
      favoritas.value = new Set(JSON.parse(guardados))
    } catch {
      favoritas.value = new Set()
    }
  }
})

const toggleFavorito = (id) => {
  if (favoritas.value.has(id)) {
    favoritas.value.delete(id)
  } else {
    favoritas.value.add(id)
  }
  favoritas.value = new Set(favoritas.value)
  localStorage.setItem('favoritasPeliculas', JSON.stringify(Array.from(favoritas.value)))
}

const cargarBusquedaTexto = async (termino) => {
  const { results } = await llamarApi(`/search/movie?query=${encodeURIComponent(termino)}`)
  return results
}
const cargarSoloGenero = async (idGenero) => {
  const { results } = await llamarApi(`/discover/movie?with_genres=${idGenero}`)
  return results
}
const cargarTextoYGenero = async (termino, idGenero) => {
  const base = await cargarBusquedaTexto(termino)
  return base.filter((p) => p.genre_ids.includes(+idGenero))
}

watch(
  () => [route.query.q, route.query.genero],
  async ([texto, genero]) => {
    try {
      if (texto && genero) {
        peliculas.value = await cargarTextoYGenero(texto, genero)
        mensaje.value = peliculas.value.length
          ? ''
          : 'No se encontraron películas con ese texto en este género'
      } else if (genero) {
        peliculas.value = await cargarSoloGenero(genero)
        mensaje.value = peliculas.value.length ? '' : 'No se encontraron películas en este género'
      } else if (texto) {
        peliculas.value = await cargarBusquedaTexto(texto)
        mensaje.value = peliculas.value.length ? '' : 'No se encontraron películas'
      } else {
        peliculas.value = []
        mensaje.value = ''
      }
    } catch (e) {
      console.error(e)
      mensaje.value = 'Error al buscar películas'
      peliculas.value = []
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="container my-4">
    <h1 class="fs-3 text-center mb-4">Resultados</h1>
      <p v-if="mensaje" class="text-center text-danger fs-5">
      {{ mensaje }}
    </p>
    <div class="row" v-if="peliculas.length">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        v-for="pelicula in peliculas"
        :key="pelicula.id"
      >
        <div class="card position-relative rounded-3 overflow-hidden" style="border: none">
          <router-link
            :to="`/detalle-pelicula/${pelicula.id}`"
            class="text-decoration-none text-dark"
          >
            <img
              :src="`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`"
              class="card-img-top"
              alt="Poster"
              style="object-fit: cover"
            />
          </router-link>
          <div class="barra-superior px-2">
            <i
              :class="['bi', favoritas.has(pelicula.id) ? 'bi-heart-fill text-danger' : 'bi-heart']"
              style="cursor: pointer"
              @click.prevent="toggleFavorito(pelicula.id)"
              title="Marcar como favorita"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
