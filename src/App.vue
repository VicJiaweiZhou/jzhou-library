<!-- src/App.vue -->
<script setup>
import JSON from "./components/JSON.vue";
import JSONLab from './components/JSON.vue'
import Form from "./components/Form.vue";
</script>

<!-- <template>
  <!-- <JSON /> -->
  <!-- <JSONLab /> -->
  <!-- <Form />
</template> --> -->

<template>
  <div>
    <BHeader />
    <main class="container py-3">
      <router-view />
    </main>
  </div>
</template>

<script>
import BHeader from './components/BHeader.vue'
export default { components: { BHeader } }
</script>

<style scoped>
/* shared page spacing can live here */
</style>
