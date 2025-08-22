<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">User Information Form</h2>

    <form @submit.prevent="submitForm">
      <div class="row">
        <!-- Username -->
        <div class="col-12 col-md-6 mb-3">
          <label class="form-label" for="username">Username</label>
          <input
            id="username"
            type="text"
            class="form-control"
            v-model.trim="form.username"
            @blur="validateName(true)"
            @input="validateName(false)"
          />
          <div v-if="errors.username" class="text-danger mt-1">
            {{ errors.username }}
          </div>
        </div>

        <!-- Password -->
        <div class="col-12 col-md-6 mb-3">
          <label class="form-label" for="password">Password</label>
          <input
            id="password"
            type="password"
            class="form-control"
            v-model="form.password"
            @blur="validatePassword(true)"
            @input="validatePassword(false)"
          />
          <div v-if="errors.password" class="text-danger mt-1">
            {{ errors.password }}
          </div>
        </div>

        <!-- Australian Resident -->
        <div class="col-12 col-md-6 mb-3">
          <div class="form-check">
            <input
              id="resident"
              type="checkbox"
              class="form-check-input"
              v-model="form.resident"
              @change="validateResident(true)"
            />
            <label class="form-check-label" for="resident">Australian Resident?</label>
          </div>
          <div v-if="errors.resident" class="text-danger mt-1">
            {{ errors.resident }}
          </div>
        </div>

        <!-- Gender -->
        <div class="col-12 col-md-6 mb-3">
          <label class="form-label" for="gender">Gender</label>
          <select
            id="gender"
            class="form-select"
            v-model="form.gender"
            @change="validateGender(true)"
            @blur="validateGender(true)"
          >
            <option disabled value="">Select one</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <div v-if="errors.gender" class="text-danger mt-1">
            {{ errors.gender }}
          </div>
        </div>

        <!-- Reason -->
        <div class="col-12 mb-3">
          <label class="form-label" for="reason">Reason for joining</label>
          <textarea
            id="reason"
            class="form-control"
            rows="3"
            v-model.trim="form.reason"
            @blur="validateReason(true)"
            @input="validateReason(false)"
          ></textarea>
          <div v-if="errors.reason" class="text-danger mt-1">
            {{ errors.reason }}
          </div>
        </div>

        <!-- Buttons -->
        <div class="col-12 text-center">
          <button type="submit" class="btn btn-primary me-2">Submit</button>
          <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
        </div>
      </div>
    </form>

    <!-- Optional: keep the info card -->
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

    <!-- PrimeVue DataTable -->
    <DataTable :value="rows" class="mt-4" tableStyle="min-width: 40rem">
      <Column field="username" header="Username" />
      <Column field="password" header="Password" />
      <Column header="Australian Resident">
        <template #body="{ data }">{{ data.resident ? 'true' : 'false' }}</template>
      </Column>
      <Column field="gender" header="Gender" />
      <Column field="reason" header="Reason" />
    </DataTable>
  </div>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

export default {
  components: { DataTable, Column },
  data() {
    return {
      form: {
        username: '',
        password: '',
        resident: false,
        gender: '',
        reason: '',
      },
      errors: {
        username: null,
        password: null,
        resident: null,
        gender: null,
        reason: null,
      },
      submitted: false,
      rows: [], // DataTable data
    }
  },
  methods: {
    // 1) Username ≥ 3 chars
    validateName(blur) {
      const name = (this.form.username || '').trim()
      if (name.length < 3) {
        if (blur) this.errors.username = 'Name must be at least 3 characters'
      } else {
        this.errors.username = null
      }
    },

    // 2) Password policy
    validatePassword(blur) {
      const pwd = this.form.password || ''
      const minLength = 8
      const hasUpper = /[A-Z]/.test(pwd)
      const hasLower = /[a-z]/.test(pwd)
      const hasNumber = /\d/.test(pwd)
      const hasSpecial = /[!@#$%^&*()_+\-[\]{};:"',.<>/?\\|]/.test(pwd)

      if (pwd.length < minLength) {
        if (blur) this.errors.password = `Password must be at least ${minLength} characters long.`
      } else if (!hasUpper) {
        if (blur) this.errors.password = 'Password must contain at least one uppercase letter.'
      } else if (!hasLower) {
        if (blur) this.errors.password = 'Password must contain at least one lowercase letter.'
      } else if (!hasNumber) {
        if (blur) this.errors.password = 'Password must contain at least one number.'
      } else if (!hasSpecial) {
        if (blur) this.errors.password = 'Password must contain at least one special character.'
      } else {
        this.errors.password = null
      }
    },

    // 3) Resident must be checked
    validateResident(blur) {
      if (!this.form.resident) {
        if (blur) this.errors.resident = 'Please confirm residency (tick the checkbox).'
      } else {
        this.errors.resident = null
      }
    },

    // 4) Gender must be selected
    validateGender(blur) {
      if (!this.form.gender) {
        if (blur) this.errors.gender = 'Please select a gender.'
      } else {
        this.errors.gender = null
      }
    },

    // 5) Reason min length
    validateReason(blur) {
      const r = (this.form.reason || '').trim()
      if (r.length < 10) {
        if (blur) this.errors.reason = 'Reason must be at least 10 characters.'
      } else {
        this.errors.reason = null
      }
    },

    submitForm() {
      // trigger all validators
      this.validateName(true)
      this.validatePassword(true)
      this.validateResident(true)
      this.validateGender(true)
      this.validateReason(true)

      const noErrors = Object.values(this.errors).every(v => !v)
      if (!noErrors) {
        this.submitted = false
        return
      }

      // show card and append to table
      this.submitted = true
      this.rows.push({ ...this.form })
    },

    clearForm() {
      this.form = {
        username: '',
        password: '',
        resident: false,
        gender: '',
        reason: '',
      }
      this.errors = {
        username: null,
        password: null,
        resident: null,
        gender: null,
        reason: null,
      }
      this.submitted = false
    },
  },
}
</script>

<style scoped>
.card-header { font-weight: bold; }
.text-danger { font-size: 0.9rem; }
</style>
