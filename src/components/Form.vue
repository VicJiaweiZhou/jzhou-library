<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">User Information Form</h2>

    <form @submit.prevent="submitForm">
      <div class="row">
        <!-- Username -->
        <div class="col-12 col-md-6 mb-3">
          <label class="form-label">Username</label>
          <input type="text" class="form-control" v-model="form.username" />
        </div>

        <!-- Password -->
        <div class="col-12 col-md-6 mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" v-model="form.password" />
        </div>

        <!-- Australian Resident -->
        <div class="col-12 col-md-6 mb-3">
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="resident"
              v-model="form.resident"
            />
            <label class="form-check-label" for="resident">
              Australian Resident?
            </label>
          </div>
        </div>

        <!-- Gender -->
        <div class="col-12 col-md-6 mb-3">
          <label class="form-label">Gender</label>
          <select class="form-select" v-model="form.gender">
            <option disabled value="">Select one</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <!-- Reason -->
        <div class="col-12 mb-3">
          <label class="form-label">Reason for joining</label>
          <textarea class="form-control" rows="3" v-model="form.reason"></textarea>
        </div>

        <!-- Buttons -->
        <div class="col-12 text-center">
          <button type="submit" class="btn btn-primary me-2">Submit</button>
          <button type="button" class="btn btn-secondary" @click="clearForm">
            Clear
          </button>
        </div>
      </div>
    </form>

    <!-- Info Card -->
    <div v-if="submitted" class="card mt-4 mx-auto" style="max-width: 400px">
      <div class="card-header bg-primary text-white">User Information</div>
      <div class="card-body">
        <p><strong>Username:</strong> {{ form.username }}</p>
        <p><strong>Password:</strong> {{ form.password }}</p>
        <p><strong>Australian Resident:</strong> {{ form.resident ? 'Yes' : 'No' }}</p>
        <p><strong>Gender:</strong> {{ form.gender }}</p>
        <p><strong>Reason:</strong> {{ form.reason }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        resident: false,
        gender: '',
        reason: '',
      },
      submitted: false,
    }
  },
  methods: {
    submitForm() {
      this.submitted = true
    },
    clearForm() {
      this.form = {
        username: '',
        password: '',
        resident: false,
        gender: '',
        reason: '',
      }
      this.submitted = false
    },
  },
}
</script>

<style scoped>
.card-header {
  font-weight: bold;
}
</style>
