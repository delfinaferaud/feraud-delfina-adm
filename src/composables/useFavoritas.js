import { ref, onMounted } from 'vue'

export default function useFavoritas(storageKey = 'favoritasPeliculas') {
  const favoritas = ref(new Set())

  onMounted(() => {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return
    try {
      favoritas.value = new Set(JSON.parse(raw))
    } catch {
      favoritas.value = new Set()
    }
  })

  const persist = () => {
    localStorage.setItem(storageKey, JSON.stringify([...favoritas.value]))
  }

  const toggle = (id) => {
    favoritas.value.has(id) ? favoritas.value.delete(id) : favoritas.value.add(id)

    favoritas.value = new Set(favoritas.value)
    persist()
  }

  const isFavorita = (id) => favoritas.value.has(id)

  return {
    favoritas,
    toggle,
    isFavorita,
  }
}
