import { defineStore } from 'pinia';
import axios from 'axios';

export const useCallStore = defineStore('call', {
  state: () => ({
    calls: [],
    transcripts: [],
  }),
  actions: {
    async fetchCalls(assistantId) {
      const params = assistantId ? { assistantId } : {};
      this.calls = await axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/calls`, { params })
        .then(r => r.data);
    },
    async fetchTranscripts(callId) {
      this.transcripts = await axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/transcripts`, { params: { callId } })
        .then(r => r.data);
    }
  }
});
