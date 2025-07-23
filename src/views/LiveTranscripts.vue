<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Live Transcripts</h1>
        <p class="text-gray-600 dark:text-gray-400">Monitor real-time conversations from all assistants</p>
      </div>
      <div class="flex items-center space-x-2">
        <div class="flex items-center">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">Live</span>
        </div>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ transcripts.length }} transcript{{ transcripts.length !== 1 ? 's' : '' }}
        </span>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="transcripts.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No live transcripts</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Transcripts will appear here when calls are active. Make sure your assistants are configured and WebSocket connection is working.
      </p>
      <div class="mt-6">
        <router-link 
          to="/assistants" 
          class="btn-primary"
        >
          Manage Assistants
        </router-link>
      </div>
    </div>

    <!-- Transcripts List -->
    <div v-else class="space-y-4">
      <div 
        v-for="transcript in transcripts" 
        :key="transcript._id"
        class="card p-4 border-l-4 border-l-primary-500"
      >
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center space-x-3">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400">
              Ext {{ transcript.extension }}
            </span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">
              {{ formatTime(transcript.timestamp) }}
            </span>
          </div>
          <div class="flex items-center">
            <span 
              :class="[
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                transcript.role === 'user' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              ]"
            >
              <svg 
                v-if="transcript.role === 'user'" 
                class="w-3 h-3 mr-1" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
              <svg 
                v-else 
                class="w-3 h-3 mr-1" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              {{ transcript.role === 'user' ? 'Caller' : 'Assistant' }}
            </span>
          </div>
        </div>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          {{ transcript.text }}
        </p>
      </div>
    </div>

    <!-- Auto-scroll indicator -->
    <div v-if="transcripts.length > 0" class="text-center">
      <p class="text-xs text-gray-500 dark:text-gray-400">
        New transcripts will appear automatically • Last updated: {{ formatTime(Date.now()) }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTranscriptStore } from '../store/transcript'

const transcriptStore = useTranscriptStore()
const transcripts = computed(() => transcriptStore.list.slice().reverse()) // Show newest first

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })
}
</script>