const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjlhMTc5YjNlNTk2ZmNjMTJiNGUwYzVhN2NlMjk2MyIsIm5iZiI6MTc4OTk3Mzk5MS40Nywic3ViIjoiNmFiMGQ1ZTc5NWZiNTYwNzA1ZjY2YjFhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.CZ0d82-_9vt6U2m5fLEhApci7kns0Lojt9E5fZ8c3Yw'
const BASE_URL = 'https://api.themoviedb.org/3'
export async function getPopularMovies(page = 1) {
  const response = await fetch(`${BASE_URL}/movie/popular?language=en-US&page=${page}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  return response.json()
}
