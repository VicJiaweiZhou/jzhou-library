<template>
  <div class="container py-4" style="max-width: 480px">
    <h2 class="mb-3">Sign In</h2>

    <div class="mb-3">
      <label class="form-label">Email</label>
      <input v-model="email" type="email" class="form-control" placeholder="you@example.com" />
    </div>

    <div class="mb-3">
      <label class="form-label">Password</label>
      <input v-model="password" type="password" class="form-control" placeholder="Enter password" />
    </div>

    <button class="btn btn-success w-100" :disabled="loading" @click="signin">
      <span v-if="!loading">Sign In</span>
      <span v-else>Signing in...</span>
    </button>

    <p class="mt-3 text-success" v-if="okMsg">{{ okMsg }}</p>
    <p class="mt-3 text-danger" v-if="errMsg">{{ errMsg }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()
const auth = getAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const okMsg = ref('')
const errMsg = ref('')

const signin = async () => {
  errMsg.value = ''
  okMsg.value = ''
  if (!email.value || !password.value) {
    errMsg.value = 'Please enter email and password.'
    return
  }
  loading.value = true
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    okMsg.value = `Login successful! Current user: ${userCredential.user.email}`
    console.log('Current User:', auth.currentUser)
    router.push('/') 
  } catch (e) {
    errMsg.value = e.code || String(e)
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>
