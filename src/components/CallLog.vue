<template>
  <div class="card p-6 mt-8">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
      <svg class="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
      Call History
    </h3>
    
    <div v-if="store.calls.length === 0" class="text-center py-8">
      <svg class="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">No calls found for this assistant</p>
    </div>
    
    <div v-else class="space-y-3">
      <div 
        v-for="call in store.calls" 
        :key="call._id"
        class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
      >
        <div class="flex-1">
          <div class="flex items-center space-x-4">
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <svg class="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              {{ new Date(call.startedAt).toLocaleDateString() }}
            </div>
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <svg class="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              {{ new Date(call.startedAt).toLocaleTimeString() }}
            </div>
            <div v-if="call.duration" class="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <svg class="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
              {{ call.duration }}s
            </div>
          </div>
        </div>
        <button
          @click="viewTranscripts(call._id)"
          class="btn-secondary text-sm"
        >
          View Transcript
        </button>
      </div>
    </div>

    <!-- Transcript Modal/Section -->
    <div v-if="store.transcripts.length > 0" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-md font-medium text-gray-900 dark:text-white">Call Transcript</h4>
        <button
          @click="downloadTranscript"
          class="btn-secondary text-sm"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download
        </button>
      </div>
      <div class="space-y-3 max-h-96 overflow-y-auto">
        <div 
          v-for="transcript in store.transcripts" 
          :key="transcript._id"
          class="flex items-start space-x-3 p-3 rounded-lg"
          :class="transcript.role === 'user' 
            ? 'bg-blue-50 dark:bg-blue-900/20' 
            : 'bg-green-50 dark:bg-green-900/20'"
        >
          <div class="flex-shrink-0">
            <span 
              :class="[
                'inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium',
                transcript.role === 'user' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                  : 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
              ]"
            >
              {{ transcript.role === 'user' ? 'U' : 'A' }}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white">
              {{ transcript.role === 'user' ? 'Caller' : 'Assistant' }}
            </p>
            <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">
              {{ transcript.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCallStore } from '../store/call'
import { watch, onMounted } from 'vue'

const props = defineProps({ assistantId: String })
const store = useCallStore()

async function load() {
  if (props.assistantId) {
    await store.fetchCalls(props.assistantId)
  }
}

async function viewTranscripts(callId) {
  await store.fetchTranscripts(callId)
}

function downloadTranscript() {
  const lines = store.transcripts.map(t => 
    `[${t.role.toUpperCase()}] ${t.text}`
  ).join('\n')
  
  const blob = new Blob([lines], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `call-transcript-${new Date().toISOString().split('T')[0]}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

watch(() => props.assistantId, load)
onMounted(load)
</script>