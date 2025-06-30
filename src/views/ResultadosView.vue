<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useFavoritas from '../composables/useFavoritas.js'
import { buscarPorTexto, buscarPorGenero, buscarTextoYGenero } from '../utils/buscarPeliculas.js'

const route = useRoute()

const peliculas = ref([])
const mensaje = ref('')
const { favoritas, toggle } = useFavoritas()

watch(
  () => [route.query.q, route.query.genero],
  async ([texto, genero]) => {
    try {
      if (texto && genero) {
        peliculas.value = await buscarTextoYGenero(texto, genero)
        mensaje.value = peliculas.value.length
          ? ''
          : 'No results found'
      } else if (genero) {
        peliculas.value = await buscarPorGenero(genero)
        mensaje.value = peliculas.value.length ? '' : 'No results found for the genre selected'
      } else if (texto) {
        peliculas.value = await buscarPorTexto(texto)
        mensaje.value = peliculas.value.length ? '' : 'No movies found matching your search'
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
    <h1 class="fs-3 text-center mb-4">
  Results
  <span v-if="route.query.q">for "{{ route.query.q }}"</span>
  <span v-if="route.query.genero && !route.query.q">for selected genre</span>
</h1>
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
              @click.prevent="toggle(pelicula.id)"
              title="Marcar como favorita"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
