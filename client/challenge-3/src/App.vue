<script setup>
import Navbar from "./components/Navbar.vue"
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="">
    <Navbar />
    <div class="mt-5">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
