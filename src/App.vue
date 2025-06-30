<script setup>
import { RouterView } from 'vue-router'
import usePelicula from './composables/usePelicula'

const { search, peliculas, generos, mensaje, buscarPelicula, buscarPorGenero, filtroGenero } = usePelicula()
</script>

<template>
  <header>
    <nav class="navbar sticky-top navbar-expand-md text-center" data-bs-theme="dark">
      <div class="container">
        <div class="navbar-brand div-title d-flex justify-content-center align-items-center">
          <router-link to="/" class="text-decoration-none px-3 fs-1 fw-bold">Poroapp</router-link>
        </div>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#barraNavegacion"
          aria-controls="barraNavegacion"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="barraNavegacion">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/favoritas" class="nav-link">Favorites</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <main>
    <div class="d-flex align-items-center my-3 gap-2 justify-content-center">
      <input
        type="text"
        class="form-control w-auto"
        placeholder="Search..."
        v-model="search"
        @keyup.enter="buscarPelicula(search)"
      />
      <select v-model="filtroGenero" class="form-select w-auto" @change="buscarPorGenero">
        <option value="">Select a genre</option>
        <option v-for="genero in generos" :key="genero.id" :value="genero.id">
          {{ genero.name }}
        </option>
      </select>
    </div>
    <RouterView :peliculas="peliculas" :mensaje="mensaje"/>
  </main>
</template>
