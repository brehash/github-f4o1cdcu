import { defineStore } from 'pinia'
import axios from 'axios'

export const useAssistantStore = defineStore('assistant', {
  state: () => ({
    list: [],
    current: null,
  }),
  actions: {
    async fetchAll() {
      this.list = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/assistants`).then(r => r.data)
    },
    async fetchById(id) {
      this.current = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/assistants/${id}`).then(r => r.data)
    },
    async create(data) {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/assistants`, data)
    },
    async update(id, data) {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/assistants/${id}`, data)
    },
    async remove(id) {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/assistants/${id}`)
    }
  }
})
