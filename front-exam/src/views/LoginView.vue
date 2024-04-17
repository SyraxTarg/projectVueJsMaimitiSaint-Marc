<script setup>

import { ref } from 'vue';
// récupérer le store utilisateur

import { useCurrentUserStore } from '@/stores/currentUser'
import { storeToRefs } from 'pinia'

const store = useCurrentUserStore()
const { currentUser, getUsersLength } = storeToRefs(store)
const { inscription, login, setCurrentUser, updateInfo } = store

// déclarer les variables username, password et email
const password = ref('')
const email = ref('')


// fonction pour soumettre le formulaire
async function submitLogin(){
   await login(email.value, password.value)
}

</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
          exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body" @submit.prevent="submitLogin">
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
              to="/home"
              >
                 <button class="btn btn-primary" @click="submitLogin(email, password)">Login</button>
            </router-link>
            
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
