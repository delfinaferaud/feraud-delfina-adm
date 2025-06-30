<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '../composables/useApi'

const { llamarApi } = useApi()

const peliculasFavoritas = ref([])
const idsFavoritas = ref(new Set())

onMounted(async () => {
  const guardados = localStorage.getItem('favoritasPeliculas')
  if (guardados) {
    try {
      idsFavoritas.value = new Set(JSON.parse(guardados))
      await cargarPeliculasFavoritas()
    } catch (e) {
      idsFavoritas.value = new Set()
    }
  }
})

const cargarPeliculasFavoritas = async () => {
  peliculasFavoritas.value = []
  for (const id of idsFavoritas.value) {
    try {
      const pelicula = await llamarApi(`/movie/${id}`)
      peliculasFavoritas.value.push(pelicula)
    } catch (error) {
      console.error(`Error cargando película ${id}:`, error)
    }
  }
}

const toggleFavorita = (id) => {
  if (idsFavoritas.value.has(id)) {
    idsFavoritas.value.delete(id)
  } else {
    idsFavoritas.value.add(id)
  }
  localStorage.setItem('favoritasPeliculas', JSON.stringify(Array.from(idsFavoritas.value)))
  cargarPeliculasFavoritas()
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
                idsFavoritas.has(pelicula.id) ? 'bi-heart-fill text-danger' : 'bi-heart'
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
