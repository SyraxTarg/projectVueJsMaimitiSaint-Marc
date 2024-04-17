<script setup>
import { RouterView } from 'vue-router'
import NavBarComponent from '@/components/NavBarComponent.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <NavBarComponent/>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
