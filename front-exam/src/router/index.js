import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import InscriptionView from '../views/InscriptionView.vue'
import HomeView from '../views/HomeView.vue'
import WelcomeView from '../views/WelcomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import NotesView from '@/views/NotesView.vue'

import { useCurrentUserStore } from '@/stores/currentUser.js'
import { storeToRefs } from 'pinia'

function myMiddleware(to, from, next) {
  const store = useCurrentUserStore()
  const { token } = storeToRefs(store)

  let isAuthenticated = false
  if (token.value !== null) {
    isAuthenticated = true
  }

  if (!isAuthenticated) {
    next('/login')
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: InscriptionView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter: myMiddleware
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      beforeEnter: myMiddleware
    },
    {
      path: '/notes',
      name: 'notes',
      component: NotesView,
      beforeEnter: myMiddleware
    }
  ]
})

export default router
