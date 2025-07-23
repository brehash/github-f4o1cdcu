<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Call Logs</h1>
        <p class="text-gray-600 dark:text-gray-400">View and manage call history across all assistants</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="card p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="form-label">Filter by Assistant</label>
          <select 
            v-model="selectedAssistant" 
            @change="filterCalls"
            class="form-select"
          >
            <option value="">All Assistants</option>
            <option v-for="assistant in assistants" :key="assistant._id" :value="assistant._id">
              Ext {{ assistant.extension }} - {{ assistant.name || `Assistant ${assistant.extension}` }}
            </option>
          </select>
        </div>
        <div>
          <label class="form-label">Date From</label>
          <input 
            v-model="dateFrom" 
            @change="filterCalls"
            type="date" 
            class="form-input"
          />
        </div>
        <div>
          <label class="form-label">Date To</label>
          <input 
            v-model="dateTo" 
            @change="filterCalls"
            type="date" 
            class="form-input"
          />
        </div>
      </div>
    </div>

    <!-- Call Logs List -->
    <div v-if="callStore.calls.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No call logs found</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {{ selectedAssistant ? 'No calls found for the selected assistant.' : 'No calls have been made yet.' }}
      </p>
    </div>

    <div v-else class="space-y-4">
      <div 
        v-for="call in callStore.calls" 
        :key="call._id"
        class="card p-6"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-4">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400">
              Ext {{ call.extension }}
            </span>
            <div class="text-sm text-gray-600 dark:text-gray-300">
              <strong>Started:</strong> {{ new Date(call.startedAt).toLocaleString() }}
            </div>
          </div>
          <button
            @click="viewTranscripts(call._id)"
            class="btn-primary"
          >
            View Transcript
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span class="font-medium text-gray-900 dark:text-white">Duration:</span>
            <span class="ml-1 text-gray-600 dark:text-gray-300">
              {{ call.duration ? `${call.duration} seconds` : 'N/A' }}
            </span>
          </div>
          <div>
            <span class="font-medium text-gray-900 dark:text-white">Status:</span>
            <span class="ml-1 text-gray-600 dark:text-gray-300">
              {{ call.status || 'Completed' }}
            </span>
          </div>
          <div>
            <span class="font-medium text-gray-900 dark:text-white">Call ID:</span>
            <span class="ml-1 text-gray-600 dark:text-gray-300 font-mono text-xs">
              {{ call._id }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Transcript Modal -->
    <div v-if="callStore.transcripts.length > 0" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeTranscripts">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white dark:bg-gray-800" @click.stop>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Call Transcript</h3>
          <div class="flex space-x-2">
            <button
              @click="downloadTranscript"
              class="btn-secondary"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
            <button
              @click="closeTranscripts"
              class="btn-secondary"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div class="max-h-96 overflow-y-auto space-y-3">
          <div 
            v-for="transcript in callStore.transcripts" 
            :key="transcript._id"
            class="flex items-start space-x-3 p-4 rounded-lg"
            :class="transcript.role === 'user' 
              ? 'bg-blue-50 dark:bg-blue-900/20' 
              : 'bg-green-50 dark:bg-green-900/20'"
          >
            <div class="flex-shrink-0">
              <div 
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                  transcript.role === 'user' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                    : 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
                ]"
              >
                {{ transcript.role === 'user' ? 'U' : 'A' }}
              </div>
            </div>
            <div class="flex-1">
              <div class="flex items-center space-x-2 mb-1">
                <span class="font-medium text-gray-900 dark:text-white">
                  {{ transcript.role === 'user' ? 'Caller' : 'Assistant' }}
                </span>
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  {{ new Date(transcript.timestamp).toLocaleTimeString() }}
                </span>
              </div>
              <p class="text-gray-700 dark:text-gray-300">{{ transcript.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCallStore } from '../store/call'
import { useAssistantStore } from '../store/assistants'

const callStore = useCallStore()
const assistantStore = useAssistantStore()

const selectedAssistant = ref('')
const dateFrom = ref('')
const dateTo = ref('')
const assistants = assistantStore.list

onMounted(async () => {
  await assistantStore.fetchAll()
  await callStore.fetchCalls()
})

async function filterCalls() {
  await callStore.fetchCalls(selectedAssistant.value)
}

async function viewTranscripts(callId) {
  await callStore.fetchTranscripts(callId)
}

function closeTranscripts() {
  callStore.transcripts = []
}

function downloadTranscript() {
  const lines = callStore.transcripts.map(t => `[${t.role.toUpperCase()}] ${t.text}`).join('\n')
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
</script>