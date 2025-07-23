<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <!-- Loading State -->
    <div v-if="!store.current" class="text-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading assistant details...</p>
    </div>

    <div v-else>
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <router-link
            to="/assistants"
            class="p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </router-link>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ store.current.name || `Assistant ${store.current.extension}` }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              Extension {{ store.current.extension }} • {{ store.current.engine }} • {{ store.current.model }}
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <span
            :class="[
              'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
              store.current.status === 'active'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : store.current.status === 'inactive'
                ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            ]"
          >
            {{ store.current.status || 'draft' }}
          </span>
          <router-link
            :to="`/assistants/${store.current._id}/edit`"
            class="btn-primary"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Assistant
          </router-link>
        </div>
      </div>

      <!-- Assistant Information Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Basic Information -->
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clip-rule="evenodd" />
            </svg>
            Basic Information
          </h2>
          <div class="space-y-3">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Name</p>
              <p class="text-sm text-gray-900 dark:text-white">{{ store.current.name || 'Not set' }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Extension</p>
              <p class="text-sm text-gray-900 dark:text-white">{{ store.current.extension }}</p>
            </div>
            <div v-if="store.current.description">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Description</p>
              <p class="text-sm text-gray-900 dark:text-white">{{ store.current.description }}</p>
            </div>
            <div v-if="store.current.phoneNumber">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</p>
              <p class="text-sm text-gray-900 dark:text-white">{{ store.current.phoneNumber }}</p>
            </div>
          </div>
        </div>

        <!-- AI Configuration -->
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            AI Configuration
          </h2>
          <div class="space-y-3">
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">AI Engine</p>
              <p class="text-sm text-gray-900 dark:text-white capitalize">{{ store.current.engine }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Model</p>
              <p class="text-sm text-gray-900 dark:text-white">{{ store.current.model }}</p>
            </div>
            <div v-if="store.current.voiceId">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Voice ID</p>
              <p class="text-sm text-gray-900 dark:text-white">{{ store.current.voiceId }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Temperature</p>
              <p class="text-sm text-gray-900 dark:text-white">{{ store.current.temperature ?? 0.7 }}</p>
            </div>
          </div>
        </div>

        <!-- SIP Configuration -->
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            SIP Configuration
          </h2>
          <div v-if="hasSipConfig" class="space-y-3">
            <div v-if="store.current.sipHost">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">SIP Host</p>
              <p class="text-sm text-gray-900 dark:text-white">{{ store.current.sipHost }}</p>
            </div>
            <div v-if="store.current.sipPort">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">SIP Port</p>
              <p class="text-sm text-gray-900 dark:text-white">{{ store.current.sipPort }}</p>
            </div>
            <div v-if="store.current.sipUsername">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">SIP Username</p>
              <p class="text-sm text-gray-900 dark:text-white">{{ store.current.sipUsername }}</p>
            </div>
          </div>
          <div v-else class="text-center py-4">
            <svg class="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">No SIP configuration</p>
          </div>
        </div>
      </div>

      <!-- System Prompt -->
      <div v-if="store.current.systemPrompt" class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
          System Prompt
        </h2>
        <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <p class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ store.current.systemPrompt }}</p>
        </div>
      </div>

      <!-- Greetings and Messages -->
      <div v-if="store.current.initialGreeting || store.current.fallbackMessage" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-if="store.current.initialGreeting" class="card p-6">
          <h3 class="text-md font-semibold text-gray-900 dark:text-white mb-3">Initial Greeting</h3>
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <p class="text-sm text-gray-800 dark:text-gray-200">{{ store.current.initialGreeting }}</p>
          </div>
        </div>
        
        <div v-if="store.current.fallbackMessage" class="card p-6">
          <h3 class="text-md font-semibold text-gray-900 dark:text-white mb-3">Fallback Message</h3>
          <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <p class="text-sm text-gray-800 dark:text-gray-200">{{ store.current.fallbackMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Call Logs Section -->
      <CallLog :assistant-id="route.params.id" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAssistantStore } from '../store/assistants'
import CallLog from '../components/CallLog.vue'

const store = useAssistantStore()
const route = useRoute()

const hasSipConfig = computed(() => {
  return !!(store.current?.sipHost || store.current?.sipPort || store.current?.sipUsername)
})

onMounted(async () => {
  if (route.params.id) {
    await store.fetchById(route.params.id)
  }
})
</script>