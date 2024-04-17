<script setup>

import { ref } from 'vue';
// récupérer le store utilisateur

import { useCurrentUserStore } from '@/stores/currentUser'
import { storeToRefs } from 'pinia'

const store = useCurrentUserStore()
const { currentUser, getUsersLength } = storeToRefs(store)
const { inscription, login, setCurrentUser, updateInfo } = store

// déclarer les variables username, password et email
const username = ref('')
const password = ref('')
const email = ref('')


// fonction pour soumettre le formulaire
async function submitForm(){
  await inscription(username.value, email.value, password.value)
}

// dans la fonction appeler la fonction createUser du store

</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Inscription now!</h1>
        <p class="py-6">Inscrivez vous pour accéder à notre plateforme</p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body" @submit.prevent="submitForm">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input
              type="username"
              placeholder="username"
              class="input input-bordered"
              v-model="username"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              class="input input-bordered"
              v-model="email"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              class="input input-bordered"
              v-model="password"
              required
            />
          </div>
          <div class="form-control mt-6">
            <router-link
              to="/login"
              >
              <button class="btn btn-primary" @click="submitForm(username, email, password)">Login</button>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
