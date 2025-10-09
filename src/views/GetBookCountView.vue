<template>
  <div class="container">
    <h1>Book Counter</h1>
    <button @click="getBookCount">Get Book Count</button>
    <p v-if="count !== null">Total number of books: {{ count }}</p>
    <p v-else-if="error">Error loading count.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GetBookCountView",
  data() {
    return {
      count: null,
      error: false
    };
  },
  methods: {
    async getBookCount() {
      try {
        const res = await axios.get(
          "https://us-central1-week7-jiawei-96676.cloudfunctions.net/getBookCount"
        );
        this.count = res.data.total;
        this.error = false;
      } catch (e) {
        console.error(e);
        this.error = true;
      }
    }
  }
};
</script>

<style scoped>
.container {
  text-align: center;
  padding: 40px;
}
button {
  margin-top: 20px;
  background-color: #3c79e6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #2e5bbf;
}
</style>
