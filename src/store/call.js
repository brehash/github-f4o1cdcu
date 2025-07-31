import { defineStore } from 'pinia';
import axios from 'axios';

export const useCallStore = defineStore('call', {
  state: () => ({
    calls: [],
    transcripts: [],
  }),
  actions: {
    async fetchCalls(assistantId) {
      if (!assistantId) return;
      this.calls = await axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/assistants/${assistantId}/calls`)
        .then(r => r.data);
    },
    async fetchTranscripts(callId) {
      if (!callId) return;
      this.transcripts = await axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/calls/${callId}/transcriptions`)
        .then(r => r.data);
    }
  }
});
