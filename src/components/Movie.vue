<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getPopularMovies } from '../api'
const router = useRouter()
const movies = ref([])
const loading = ref(true)
const error = ref('')
onMounted(async () => {
  try {
    const data = await getPopularMovies()
    movies.value = data.results || []
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
<template>
  <main class="movies-page">
    <h1 class="page-title">Popular Movies</h1>
    <p v-if="loading" class="loading">កំពុងទាញយកភាពយន្ត...</p>
    <p v-else-if="error" class="error">
      {{ error }}
    </p>
    <div v-else class="movies-grid">
      <article
        v-for="movie in movies"
        :key="movie.id"
        class="movie-card"
        @click="router.push(`/movie/${movie.id}`)"
      >
        <img
          v-if="movie.poster_path"
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
          class="movie-poster"
        />
        <div v-else class="no-poster">No Image</div>
        <h2 class="movie-title">
          {{ movie.title }}
        </h2>
      </article>
    </div>
  </main>
</template>
<style scoped>
.movies-page {
  min-height: 100vh;
  padding: 24px;
  color: white;
  background: black;
  box-sizing: border-box;
}

.page-title {
  margin: 0 0 24px;
  color: orangered;
  font-size: 30px;
  font-weight: 700;
}

.loading,
.error {
  margin-top: 24px;
  font-size: 16px;
}

.error {
  color: crimson;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 20px;
}

.movie-card {
  min-width: 0;
  cursor: pointer;
}

.movie-poster {
  display: block;
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.movie-card:hover .movie-poster {
  transform: scale(1.05);
}

.movie-title {
  margin: 10px 0 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
}

.no-poster {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 2 / 3;
  color: #9ca3af;
  background: #262626;
  border-radius: 8px;
}

@media (max-width: 1024px) {
  .movies-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .movies-page {
    padding: 16px;
  }

  .page-title {
    font-size: 26px;
  }

  .movies-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .movie-title {
    font-size: 14px;
  }
}
</style>
