import { defineStore } from 'pinia'
import { useCurrentUserStore } from '@/stores/currentUser.js'
import { storeToRefs } from 'pinia'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: []
  }),

  getters: {
    getNotes: (state) => {
      return state.notes
    }
  },

  actions: {
    getAllNotes(userId) {
      const store = useCurrentUserStore()
      const { token, user } = storeToRefs(store)
      // const id = userId.value
    
      fetch(`http://localhost:3000/users/${user.value.id}/notes`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch notes')
        }
        return res.json()
      }).then ((data) => {
        this.notes = data
      })
      .catch((err) => {
        console.error(err)
      })
    },
    
    createNote(note) {
      const store = useCurrentUserStore()
      const { token, user } = storeToRefs(store)

      fetch('http://localhost:3000/users/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify({
            "userId": user.value.id,
            "title": note.title,
            "content": note.content
        })
      })
        .then((res) => console.log("note cree"))
        .catch((err) => {
          console.error(err)
        })
      console.log(note.title + " enregistre")
    },
    updateNote(id, title, content) {
      const store = useCurrentUserStore()
      const { token, user } = storeToRefs(store)

      // exemple de requete avec le token
      fetch(`http://localhost:3000/users/${user.value.id}/notes/${id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify({
          "title": title,
          "content": content,
        })
      })
        .then((res) => res.json())
        .then((data) => {
          this.note = data.note
        })
        .catch((err) => {
          console.error(err)
        })
    },
    deleteNote(id) {
      const store = useCurrentUserStore()
      const { token, user } = storeToRefs(store)

      fetch(`http://localhost:3000/users/${user.value.id}/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`
        }
      })
        .then((res) => console.log("note effacee"))
        .catch((err) => {
          console.error(err)
        })
    }
  },

  persist: true
})
