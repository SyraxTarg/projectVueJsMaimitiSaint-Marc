<script setup>
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { useCurrentUserStore } from '@/stores/currentUser.js'
import { storeToRefs } from 'pinia'

const router = useRouter()
const store = useCurrentUserStore()
const { user, token } = storeToRefs(store)
const logout = () => {
  store.logout()
  if (token.value === null) {
    router.push({ name: 'welcome' })
  }
}
</script>

<template>
  <div class="navbar bg-neutral text-neutral-content">
    <div class="flex-1">
      <RouterLink to="/">Mon Site</RouterLink>
    </div>
    <div class="flex-none">
      <ul v-if="token === null" class="menu menu-horizontal px-1">
        <li><RouterLink to="/">Acceuil</RouterLink></li>
        <li><RouterLink to="/login">Login</RouterLink></li>
        <li><RouterLink to="/inscription">Inscription</RouterLink></li>
      </ul>
      <ul v-else class="menu menu-horizontal px-1">
        <li><RouterLink to="/">Acceuil</RouterLink></li>
        <li><RouterLink to="/notes">Notes</RouterLink></li>
        <li><RouterLink to="/profile">Profile</RouterLink></li>
        <li>
          <a
            @click="logout"
            href="#"
            class="router-link-active router-link-exact-active"
            aria-current="page"
            >Logout</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
