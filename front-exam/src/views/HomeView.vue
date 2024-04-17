<script setup>
import { ref } from 'vue';
// récupérer le store utilisateur

import { useCurrentUserStore } from '@/stores/currentUser'
import { storeToRefs } from 'pinia'

const store = useCurrentUserStore()
const { currentUser, getUsersLength, getCurrentUsername } = storeToRefs(store)
console.log(getCurrentUsername.value)

</script>

<template>
  <div class="min-h-screen bg-base-200">
    <div class="flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">COUCOU {{ getCurrentUsername }}</h1>
      </div>
    </div>
  </div>
</template>
