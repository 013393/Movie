<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
async function signIn() {
  error.value = ''
  if (!email.value.trim() || !password.value) {
    error.value = 'សូមបញ្ចូលអ៊ីមែល និងពាក្យសម្ងាត់'
    return
  }
  loading.value = true
  try {
    const response = await fetch('http://localhost:3000/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value.trim(),
        password: password.value,
      }),
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'ចូលគណនីមិនបានទេ')
    }
    if (!data.token) {
      throw new Error('Backend មិនបានផ្ញើ Login Token មកទេ')
    }
    localStorage.setItem('movieslens_token', data.token)
    localStorage.setItem('movieslens_user', JSON.stringify(data.user))
    router.push('/')
  } catch (err) {
    error.value = err.message === 'Failed to fetch' ? 'មិនអាចភ្ជាប់ Backend បានទេ' : err.message
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <main class="signin-page">
    <section class="signin-card">
      <RouterLink to="/" class="logo"> MoviesLens</RouterLink>
      <h1>Sign In</h1>
      <p class="subtitle">សូមចូលគណនី MoviesLens របស់អ្នក</p>
      <form class="signin-form" @submit.prevent="signIn">
        <div class="form-group">
          <label for="email">អ៊ីមែល</label>
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            required
            placeholder="example@email.com"
          />
        </div>
        <div class="form-group">
          <label for="password">ពាក្យសម្ងាត់</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
            placeholder="បញ្ចូលពាក្យសម្ងាត់"
          />
        </div>
        <p v-if="error" class="error-message" role="alert">
          {{ error }}
        </p>
        <button type="submit" :disabled="loading">
          {{ loading ? 'កំពុងចូលគណនី...' : 'Sign In' }}
        </button>
      </form>
      <p class="signup-text">មិនទាន់មានគណនី?</p>
    </section>
  </main>
</template>
<style scoped>
.signin-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;
  background: black;
  color: white;
}

.signin-card {
  width: 100%;
  max-width: 440px;
  padding: 36px;
  border: 1px solid black;
  border-radius: 16px;
  background: rgba(207, 178, 178, 0.203);
  box-shadow: 0 20px 50px rgba(83, 80, 80, 0);
}

.logo {
  display: block;
  margin-bottom: 28px;
  color: coral;
  font-size: 32px;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
}
.signin-card h1 {
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 700;
}

.subtitle {
  margin: 0 0 28px;
  color: gray;
  font-size: 14px;
}

.signin-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.form-group label {
  color: gainsboro;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  min-height: 48px;
  padding: 12px 14px;
  border: 1px solid black;
  border-radius: 8px;
  outline: none;
  background: black;
  color: white;
  font-size: 15px;
  transition: border-color 0.2s;
}

.form-group input:focus {
  border-color: coral;
}

.form-group input::placeholder {
  color: gainsboro;
}

.signin-form button {
  width: 100%;
  min-height: 48px;
  border: none;
  border-radius: 8px;
  background: coral;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}

.signin-form button:hover {
  background: coral;
}

.signin-form button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.error-message {
  margin: 0;
  padding: 12px;
  border-radius: 8px;
  background: black;
  color: peru;
  font-size: 14px;
}

.signup-text {
  margin: 26px 0 0;
  color: gainsboro;
  font-size: 14px;
  text-align: center;
}

.signup-text a {
  color: orange;
  font-weight: 600;
  text-decoration: none;
}

.signup-text a:hover {
  color: orange;
}

@media (max-width: 480px) {
  .signin-page {
    padding: 24px 14px;
  }

  .signin-card {
    padding: 26px 20px;
  }

  .logo {
    font-size: 28px;
  }

  .signin-card h1 {
    font-size: 25px;
  }
}
</style>
