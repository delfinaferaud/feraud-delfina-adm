<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '../composables/useApi'
import useFavoritas from '../composables/useFavoritas'

const { llamarApi } = useApi()
const { favoritas, toggle } = useFavoritas()

const peliculasFavoritas = ref([])

onMounted(async () => {
  await cargarPeliculasFavoritas()
})

const cargarPeliculasFavoritas = async () => {
  peliculasFavoritas.value = []

  for (const id of favoritas.value) {
    try {
      const pelicula = await llamarApi(`/movie/${id}`)
      peliculasFavoritas.value.push(pelicula)
    } catch (error) {
      console.error(`Error cargando película ${id}:`, error)
    }
  }
}

const toggleFavorita = async (id) => {
  toggle(id)
  await cargarPeliculasFavoritas()
}
</script>

<template>
  <div class="container my-4">
    <h1 class="fs-3 text-center mb-4">My favorite movies</h1>

    <div v-if="peliculasFavoritas.length === 0" class="text-center">
      <p>You haven’t marked any movies as favorites yet</p>
    </div>

    <div class="row" v-else>
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        v-for="pelicula in peliculasFavoritas"
        :key="pelicula.id"
      >
        <div class="card position-relative rounded-3" style="overflow: hidden; border: none">
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
              :class="[
                'bi',
                favoritas.has(pelicula.id) ? 'bi-heart-fill text-danger' : 'bi-heart'
              ]"
              style="cursor: pointer;"
              @click.prevent="toggleFavorita(pelicula.id)"
              title="Eliminar"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
