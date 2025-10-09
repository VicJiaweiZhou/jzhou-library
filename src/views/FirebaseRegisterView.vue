<template>
  <div class="container py-4" style="max-width: 480px">
    <h2 class="mb-3">Register</h2>

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

    <!-- Role selection -->
    <div class="mb-3">
      <label class="form-label">Role</label>
      <select v-model="role" class="form-select">
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
    </div>

    <!-- Register button -->
    <button class="btn btn-primary w-100" :disabled="loading" @click="register">
      <span v-if="!loading">Register</span>
      <span v-else>Registering...</span>
    </button>

    <!-- Success and error messages -->
    <p class="mt-3 text-success" v-if="okMsg">{{ okMsg }}</p>
    <p class="mt-3 text-danger" v-if="errMsg">{{ errMsg }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'

// import from cloud firebase.js
import { auth, db } from '@/lib/firebase'

const email = ref('')
const password = ref('')
const role = ref('student') // default role
const loading = ref(false)
const okMsg = ref('')
const errMsg = ref('')

// Register function
const register = async () => {
  errMsg.value = ''
  okMsg.value = ''
  if (!email.value || !password.value) {
    errMsg.value = 'Please enter email and password.'
    return
  }
  loading.value = true
  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    // Save role in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: role.value
    })

    okMsg.value = `Registration successful! User: ${user.email}, Role: ${role.value}`
    console.log('New user registered:', user.email, 'Role:', role.value)
  } catch (e) {
    errMsg.value = e.code || String(e)
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>
