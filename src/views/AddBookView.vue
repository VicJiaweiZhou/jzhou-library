<template>
  <div class="container py-4" style="max-width: 480px">
    <h2 class="mb-3">Add Book</h2>

    <form @submit.prevent="addBook">
      <!-- ISBN -->
      <div class="mb-3">
        <label class="form-label">ISBN</label>
        <input
          v-model.number="isbn"
          type="number"
          class="form-control"
          placeholder="Enter ISBN"
          required
        />
      </div>

      <!-- Name -->
      <div class="mb-3">
        <label class="form-label">Book Name</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          placeholder="Enter book name"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary w-100">
        Add Book
      </button>
    </form>

    <!-- feedback -->
    <p class="mt-3 text-success" v-if="okMsg">{{ okMsg }}</p>
    <p class="mt-3 text-danger" v-if="errMsg">{{ errMsg }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { db } from '../firebase/init'
import { collection, addDoc } from 'firebase/firestore'

// state
const isbn = ref(null)
const name = ref('')
const okMsg = ref('')
const errMsg = ref('')

// async function to add book
const addBook = async () => {
  okMsg.value = ''
  errMsg.value = ''
  try {
    await addDoc(collection(db, 'books'), {
      isbn: Number(isbn.value), // 确保是 number
      name: name.value
    })
    okMsg.value = '✅ Book added successfully!'
    // reset form
    isbn.value = null
    name.value = ''
  } catch (e) {
    errMsg.value = '❌ Error: ' + e.message
    console.error(e)
  }
}
</script>
