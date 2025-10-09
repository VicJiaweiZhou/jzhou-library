<template>
  <div class="bg-light border-bottom">
    <header class="container d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <!-- 首页 -->
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">
            Home
          </router-link>
        </li>

        <!-- 关于页 -->
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">
            About
          </router-link>
        </li>

        <!-- Firebase 登录 -->
        <li class="nav-item">
          <router-link to="/Login" class="nav-link" active-class="active">
            Login
          </router-link>
        </li>

        <!-- Firebase 注册 -->
        <li class="nav-item">
          <router-link to="/Register" class="nav-link" active-class="active">
            Register
          </router-link>
        </li>

        <li class="nav-item">
          
          <router-link class="nav-link" to="/addbook">Add Book</router-link>

        </li>

        <li class="nav-item">
          <router-link to="/GetBookCount" class="nav-link" active-class="active">
            Get Book Count
          </router-link>
        </li>




        <!-- Firebase 登出（只在已登录时显示） -->
        <li class="nav-item" v-if="currentUser">
          <button class="btn btn-link nav-link" @click="logout">
            Logout ({{ currentUser.email }})
          </button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const auth = getAuth()
const router = useRouter()


const currentUser = ref(null)


onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user
  })
})


const logout = async () => {
  try {
    await signOut(auth)
    currentUser.value = null
    router.push('/Login')
  } catch (e) {
    console.error('Logout error:', e)
  }
}
</script>

<style scoped>
.nav-link.active {
  font-weight: 600;
  text-decoration: underline;
}
</style>
