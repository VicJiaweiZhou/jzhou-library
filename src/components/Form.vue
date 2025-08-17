<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">User Information Form</h2>

    <form @submit.prevent="handleSubmit" @reset.prevent="handleReset">
      <div class="row">
        <div class="col-md-6 col-12 mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" class="form-control" id="username" v-model="form.username" required>
        </div>

        <div class="col-md-6 col-12 mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="form.password" required>
        </div>

        <div class="col-md-6 col-12 mb-3">
          <div class="form-check mt-4">
            <input class="form-check-input" type="checkbox" id="resident" v-model="form.isResident">
            <label class="form-check-label" for="resident">Australian Resident?</label>
          </div>
        </div>

        <div class="col-md-6 col-12 mb-3">
          <label for="gender" class="form-label">Gender</label>
          <select class="form-select" id="gender" v-model="form.gender" required>
            <option value="" disabled>Select one</option>
            <option>male</option>
            <option>female</option>
            <option>other</option>
          </select>
        </div>

        <div class="col-12 mb-3">
          <label for="reason" class="form-label">Reason for joining</label>
          <textarea class="form-control" id="reason" rows="3" v-model="form.reason"></textarea>
        </div>
      </div>

      <div class="d-flex justify-content-center gap-3">
        <button type="submit" class="btn btn-primary">Submit</button>
        <button type="reset" class="btn btn-secondary">Clear</button>
      </div>
    </form>

    <!-- 卡片区域 -->
    <div class="row mt-5">
      <div
        class="col-lg-4 col-md-6 col-12 mb-4"
        v-for="(user, index) in submittedUsers"
        :key="index"
      >
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white text-center">
            User Information
          </div>
          <div class="card-body">
            <p><strong>Username:</strong> {{ user.username }}</p>
            <p><strong>Password:</strong> {{ user.password }}</p>
            <p><strong>Australian Resident:</strong> {{ user.isResident ? 'Yes' : 'No' }}</p>
            <p><strong>Gender:</strong> {{ user.gender }}</p>
            <p><strong>Reason:</strong> {{ user.reason || 'N/A' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  username: '',
  password: '',
  isResident: false,
  gender: '',
  reason: '',
})

const submittedUsers = ref([])

const handleSubmit = () => {
  submittedUsers.value.push({ ...form })
  handleReset()
}

const handleReset = () => {
  form.username = ''
  form.password = ''
  form.isResident = false
  form.gender = ''
  form.reason = ''
}
</script>
