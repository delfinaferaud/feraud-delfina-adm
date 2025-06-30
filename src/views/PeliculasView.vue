<script setup>
import usePelicula from '../composables/usePelicula'
import { ref, onMounted } from 'vue'

const { peliculas } = usePelicula()
const favoritas = ref(new Set())

onMounted(() => {
  const guardados = localStorage.getItem('favoritasPeliculas')
  if (guardados) {
    try {
      favoritas.value = new Set(JSON.parse(guardados))
    } catch (e) {
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

defineProps({
  titulo: {
    type: String,
  },
})
</script>

<template>
  <div class="container my-4">
    <h1 class="fs-2 text-center mb-4">{{ titulo }}</h1>
    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        v-for="pelicula in peliculas"
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
