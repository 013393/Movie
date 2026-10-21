<script setup>
import { ref } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
const router = useRouter()
const route = useRoute()
const searchQuery = ref('')
const menuOpen = ref(false)
function searchMovies() {
  const query = searchQuery.value.trim()
  if (query) {
    router.push({
      path: '/search',
      query: { q: query },
    })

    menuOpen.value = false
  }
}
</script>
<template>
  <nav class="navbar">
    <div class="navbar-container">
      <RouterLink to="/" class="logo"> MoviesLens </RouterLink>
      <div class="nav-links">
        <RouterLink to="/" :class="{ active: route.path === '/' }"> Home </RouterLink>
        <RouterLink to="/movies" active-class="active"> Movies </RouterLink>
        <RouterLink to="/trending" active-class="active"> Trending </RouterLink>
      </div>
      <form class="search-form desktop-search" @submit.prevent="searchMovies">
        <input v-model="searchQuery" type="search" placeholder="Search movies..." />
        <button type="submit" aria-label="Search movies">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
      </form>
      <RouterLink to="/signin" class="signin-btn"> Sign In </RouterLink>
      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-label="Toggle navigation menu"
        @click="menuOpen = !menuOpen"
      >
        <svg
          v-if="!menuOpen"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="m18 6-12 12M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div v-if="menuOpen" class="mobile-menu">
      <RouterLink to="/" :class="{ active: route.path === '/' }" @click="menuOpen = false">
        Home
      </RouterLink>
      <RouterLink to="/movies" active-class="active" @click="menuOpen = false"> Movies </RouterLink>
      <RouterLink to="/trending" active-class="active" @click="menuOpen = false">
        Trending
      </RouterLink>
      <form class="search-form mobile-search" @submit.prevent="searchMovies">
        <input v-model="searchQuery" type="search" placeholder="Search movies..." />
        <button type="submit">Search</button>
      </form>
      <RouterLink to="/signin" class="mobile-signin" @click="menuOpen = false">
        Sign In
      </RouterLink>
    </div>
  </nav>
</template>
<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  color: white;
  background: black;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px black;
  backdrop-filter: blur(12px);
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.logo {
  flex-shrink: 0;
  color: orangered;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -1px;
  text-decoration: none;
  transition: color 0.2s;
}

.logo:hover {
  color: coral;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-links a,
.mobile-menu > a:not(.mobile-signin) {
  color: gainsboro;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.active,
.mobile-menu a:hover,
.mobile-menu a.active {
  color: orangered;
}
.search-form {
  display: flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
}
.desktop-search {
  flex: 1;
  max-width: 320px;
  border-radius: 30px;
  padding: 0 14px;
  transition: border-color 0.2s;
}

.desktop-search:focus-within {
  border-color: orange;
}
.search-form input {
  width: 100%;
  min-width: 0;
  padding: 10px 0;
  color: #fff;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
}
.search-form input::placeholder {
  color: gray;
}
.search-form button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: gray;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}
.search-form button:hover {
  color: chocolate;
}
.signin-btn,
.mobile-signin {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 11px 20px;
  color: white;
  background: coral;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s;
}

.signin-btn:hover,
.mobile-signin:hover {
  background: chocolate;
}

.menu-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: white;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  cursor: pointer;
}

.mobile-menu {
  display: none;
}

@media (max-width: 767px) {
  .navbar-container {
    padding: 14px 16px;
    gap: 12px;
  }

  .logo {
    font-size: 25px;
  }

  .nav-links,
  .desktop-search,
  .signin-btn {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background: black;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .mobile-menu > a:not(.mobile-signin) {
    display: block;
    text-decoration: none;
  }

  .mobile-search {
    gap: 10px;
    padding: 0 12px;
    border-radius: 8px;
  }

  .mobile-search button {
    color: orange;
  }

  .mobile-signin {
    width: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 12px 16px;
  }
}
</style>
