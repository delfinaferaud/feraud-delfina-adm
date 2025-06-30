<script setup>
import usePelicula from '../composables/usePelicula'

const { peliculaNull } = usePelicula()
</script>

<template>
  <div class="container my-4" v-if="peliculaNull">
    <div class="row">
      <div class="col-12 col-md-4 mb-3">
        <img
          :src="`https://image.tmdb.org/t/p/w500${peliculaNull.poster_path}`"
          :alt="peliculaNull.title"
          class="img-fluid rounded-3 shadow"
        />
      </div>
      <div class="col-12 col-md-8">
        <h1 class="mb-3">{{ peliculaNull.title }}</h1>
        
        <p>
          <strong>Release date:</strong> {{ peliculaNull.release_date }}
        </p>
        <p>
          <strong>Runtime:</strong> {{ peliculaNull.runtime }} minutes
        </p>

        <p class="lead">
          {{ peliculaNull.overview }}
        </p>

        <div>
          <button class="btn btn-danger">
            <i class="bi bi-heart-fill me-2"></i> Add to favorites
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center my-5">
    <div class="spinner-border text-primary" role="status"></div>
    <p class="mt-3">Loading...</p>
  </div>
</template>
