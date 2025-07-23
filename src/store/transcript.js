// admin/src/store/transcript.js
import { defineStore } from 'pinia';

export const useTranscriptStore = defineStore('transcript', {
  state: () => ({
    list: [],
  }),
  actions: {
    add(transcript) {
      this.list.push(transcript);
    }
  }
});
