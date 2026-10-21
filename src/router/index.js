import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Explore from '../components/Explore.vue'
import MovieDetail from '../components/MovieDetail.vue'
import Search from '../components/search.vue'
import SignIn from '../components/Sign in.vue'
import Movies from '../components/Movie.vue'
import Trending from '../components/Trending.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/explore',
      name: 'explore',
      component: Explore,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: MovieDetail,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies,
    },
    {
      path: '/trending',
      name: 'trending',
      component: Trending,
    },
  ],
})

export default router
