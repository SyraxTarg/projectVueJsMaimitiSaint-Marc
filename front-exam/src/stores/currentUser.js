import { defineStore } from 'pinia'
import router from '@/router'

export const useCurrentUserStore = defineStore('currentUser', {
  state: () => ({
    user: {},
    token: null
  }),

  getters: {
    getCurrentUser: (state) => {
      return state
    },
    getCurrentUsername: (state) => {
      return state.user.username
    },
    getCurrentUserId: (state) => {
      return state.user.id
    }
  },

  actions: {
    inscription(username, email, password) {
      console.log(username)
      fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": username,
            "email": email,
            "password": password
        })
      })
        .then((res) => console.log("user cree"))
        .catch((err) => {
          console.error(err)
        })
      console.log(username + " enregistre")
    },
    login(email, password) {
      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          this.setCurrentUser(data)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    setCurrentUser(data) {
      this.user = data.user
      this.token = data.token
    },
    updateInfo(username, email, bio) {
      // exemple de requete avec le token
      fetch('http://localhost:3000/users/' + this.user.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token
        },
        body: JSON.stringify({
          "bio": bio,
          "username": username,
          "email": email,
        })
      })
        .then((res) => res.json())
        .then((data) => {
          this.user = data.user
        })
        .catch((err) => {
          console.error(err)
        })
    },
    logout() {
      this.user = {}
      this.token = null
    }
  },

  persist: true
})
