<template>
  <div class="container py-4" style="max-width: 480px">
    <h2 class="mb-3">Sign In</h2>

    <!-- Email input -->
    <div class="mb-3">
      <label class="form-label">Email</label>
      <input v-model="email" type="email" class="form-control" placeholder="you@example.com" />
    </div>

    <!-- Password input -->
    <div class="mb-3">
      <label class="form-label">Password</label>
      <input v-model="password" type="password" class="form-control" placeholder="Enter password" />
    </div>

    <!-- Sign in button -->
    <button class="btn btn-success w-100" :disabled="loading" @click="signin">
      <span v-if="!loading">Sign In</span>
      <span v-else>Signing in...</span>
    </button>

    <!-- Success and error messages -->
    <p class="mt-3 text-success" v-if="okMsg">{{ okMsg }}</p>
    <p class="mt-3 text-danger" v-if="errMsg">{{ errMsg }}</p>

    <!-- User info after login -->
    <div v-if="currentUser" class="mt-4">
      <h5>Welcome: {{ currentUser.email }}</h5>
      <p><strong>Role:</strong> {{ userRole }}</p>
      <button class="btn btn-outline-danger w-100" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'

// ✅ import from your cloud firebase.js
import { auth, db } from '@/lib/firebase'

const router = useRouter()

// Form states
const email = ref('')
const password = ref('')
const loading = ref(false)
const okMsg = ref('')
const errMsg = ref('')

// User states
const currentUser = ref(null)
const userRole = ref('')

// Sign in function
const signin = async () => {
  errMsg.value = ''
  okMsg.value = ''
  if (!email.value || !password.value) {
    errMsg.value = 'Please enter email and password.'
    return
  }
  loading.value = true
  try {
    // Authenticate user with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    currentUser.value = userCredential.user

    // Fetch user role from Firestore
    const docSnap = await getDoc(doc(db, 'users', currentUser.value.uid))
    if (docSnap.exists()) {
      userRole.value = docSnap.data().role
    }

    okMsg.value = `Login successful! Current user: ${userCredential.user.email}`
    console.log('Current User:', auth.currentUser?.email, 'Role:', userRole.value)

    router.push('/') // Redirect to home
  } catch (e) {
    errMsg.value = e.code || String(e)
    console.error(e)
  } finally {
    loading.value = false
  }
}

// Listen to authentication state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser.value = user
    const docSnap = await getDoc(doc(db, 'users', user.uid))
    if (docSnap.exists()) {
      userRole.value = docSnap.data().role
    }
    console.log('Current User:', user.email, 'Role:', userRole.value)
  } else {
    currentUser.value = null
    userRole.value = ''
    console.log(' User is logged out, auth.currentUser =', auth.currentUser)
  }
})

// Logout function
const logout = async () => {
  try {
    await signOut(auth) // 
    console.log('✅ Logout successful')
    console.log('User after logout:', auth.currentUser) 
    currentUser.value = null
    userRole.value = ''
  } catch (e) {
    console.error('Logout error:', e)
  }
}
</script>
