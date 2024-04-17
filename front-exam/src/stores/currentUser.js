import { defineStore } from 'pinia'
import router from '@/router'

export const useCurrentUserStore = defineStore('currentUser', {
  state: () => ({
    user: {},
    token: null
  }),

  getters: {},

  actions: {
    inscription(username, email, password) {
      // ici on fait une requête POST pour créer un nouvel utilisateur
    },
    login(email, password) {
      // ici on fait une requête POST pour se connecter
    },
    setCurrentUser(data) {
      this.user = data.user
      this.token = data.token
    },
    updateInfo(data) {
      // exemple de requete avec le token
      fetch('http://localhost:3000/users/' + this.user.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token
        },
        body: JSON.stringify({
          // ici on envoie les données à mettre à jour
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
