import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/PeliculasView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: Inicio,
      props: {titulo: 'Popular movies'}
    },
    {
      path: '/detalle-pelicula/:id',
      name: 'detalle-pelicula',
      component: () => import('../views/DetallePeliculaView.vue')
    },
    {
      path: '/favoritas',
      name: 'favoritas',
      component: () => import('../views/FavoritasView.vue')
    },
    {
      path: '/resultados',
      name: 'resultados',
      component: () => import('../views/ResultadosView.vue')
    }
  ],
  
})

export default router
