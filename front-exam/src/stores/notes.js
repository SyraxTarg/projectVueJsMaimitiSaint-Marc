import { defineStore } from 'pinia'
import { useCurrentUserStore } from '@/stores/currentUser.js'
import { storeToRefs } from 'pinia'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: []
  }),

  getters: {},

  actions: {
    getAllNotes() {
      const store = useCurrentUserStore()
      const { token, user } = storeToRefs(store)

      // ici on fait une requête GET pour récupérer toutes les notes de l'utilisateur
    },
    createNote(note) {
      const store = useCurrentUserStore()
      const { token, user } = storeToRefs(store)

      // ici on fait une requête POST pour créer une nouvelle note
    },
    updateNote(note) {
      const store = useCurrentUserStore()
      const { token } = storeToRefs(store)

      // ici on fait une requête PATCH pour mettre à jour une note
    },
    deleteNote(note) {
      const store = useCurrentUserStore()
      const { token } = storeToRefs(store)

      // ici on fait une requête DELETE pour supprimer une note
    }
  },

  persist: true
})
