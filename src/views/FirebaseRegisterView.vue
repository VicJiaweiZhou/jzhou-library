<template>
  <div class="container py-4" style="max-width: 480px">
    <h2 class="mb-3">Create an Account</h2>

    <div class="mb-3">
      <label class="form-label">Email</label>
      <input v-model="email" type="email" class="form-control" placeholder="you@example.com" />
    </div>

    <div class="mb-3">
      <label class="form-label">Password</label>
      <input v-model="password" type="password" class="form-control" placeholder="At least 6 characters" />
    </div>

    <button class="btn btn-primary w-100" :disabled="loading" @click="register">
      <span v-if="!loading">Register</span>
      <span v-else>Registering...</span>
    </button>

    <p class="mt-3 text-success" v-if="okMsg">{{ okMsg }}</p>
    <p class="mt-3 text-danger" v-if="errMsg">{{ errMsg }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()
const auth = getAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const okMsg = ref('')
const errMsg = ref('')

const register = async () => {
  errMsg.value = ''
  okMsg.value = ''
  if (!email.value || !password.value) {
    errMsg.value = 'Please enter email and password.'
    return
  }
  loading.value = true
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    okMsg.value = 'Registration successful!'
    router.push('/FireLogin') 
  } catch (e) {
    errMsg.value = e.code || String(e)
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>
