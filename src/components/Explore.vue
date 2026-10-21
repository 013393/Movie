<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const movies = ref([])
const loading = ref(true)
const error = ref('')
function openMovie(movie) {
  router.push(`/movie/${movie.id}`)
}
async function fetchMovies() {
  const token = import.meta.env.VITE_TMDB_API_KEY

  try {
    if (!token) {
      throw new Error('រកមិនឃើញ TMDB Token ក្នុង .env')
    }

    const response = await fetch('https://api.themoviedb.org/3/trending/movie/day', {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    movies.value = data.results
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
onMounted(fetchMovies)
</script>
<template>
  <div class="explore">
    <h1>Explore Movies</h1>

    <p v-if="loading">កំពុងទាញភាពយន្ត...</p>
    <p v-else-if="error">{{ error }}</p>

    <div v-else class="movies">
      <div v-for="movie in movies" :key="movie.id" class="movie-card" @click="openMovie(movie)">
        <img
          v-if="movie.poster_path"
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
        />
        <div v-else class="no-poster">គ្មានរូបភាព</div>
        <div class="movie-info">
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.vote_average?.toFixed(1) || 'N/A' }} / 10</p>
          <p class="details">ចុចមើលព័ត៌មាន</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.explore {
  color: white;
}

h1 {
  color: orange;
  margin-bottom: 24px;
}

.movies {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
}

.movie-card {
  overflow: hidden;
  background: black;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: scale(1.04);
}

.movie-card img,
.no-poster {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  display: block;
}

.no-poster {
  display: grid;
  place-items: center;
  background: black;
  color: ghostwhite;
}

.movie-info {
  padding: 12px;
}

.movie-info h3 {
  font-size: 15px;
}

.movie-info p {
  color: white;
  font-size: 13px;
}

.movie-info .details {
  color: orange;
}
</style>
