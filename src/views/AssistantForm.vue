<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ isEdit ? 'Edit Assistant' : 'Create New Assistant' }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ isEdit ? 'Update your AI assistant configuration' : 'Set up a new AI assistant with custom settings' }}
        </p>
      </div>
      <router-link
        :to="isEdit ? `/assistants/${route.params.id}` : '/assistants'"
        class="p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </router-link>
    </div>

    <!-- Error Alert -->
    <div v-if="errorMessage" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800 dark:text-red-400">Error</h3>
          <div class="mt-2 text-sm text-red-700 dark:text-red-300">
            <p>{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="onSubmit" class="space-y-8">
      <!-- Basic Information -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <svg class="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clip-rule="evenodd" />
          </svg>
          Basic Information
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="form-label">Assistant Name</label>
            <input
              v-model="form.name"
              type="text"
              class="form-input"
              placeholder="e.g., Customer Support Bot"
              required
            />
            <p class="form-help">A friendly name for your assistant that helps identify its purpose</p>
          </div>

          <div>
            <label class="form-label">Extension Number</label>
            <input
              v-model="form.extension"
              type="number"
              class="form-input"
              :readonly="isEdit"
              :class="{ 'bg-gray-50 dark:bg-gray-700 cursor-not-allowed': isEdit }"
              required
            />
            <p class="form-help">
              {{ isEdit ? 'Extension cannot be changed after creation' : 'Unique phone extension for this assistant' }}
            </p>
          </div>

          <div class="md:col-span-2">
            <label class="form-label">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="form-textarea"
              placeholder="Describe what this assistant does and its purpose..."
            ></textarea>
            <p class="form-help">Optional description to help you remember this assistant's role and purpose</p>
          </div>

          <div>
            <label class="form-label">Status</label>
            <select v-model="form.status" class="form-select" required>
              <option value="">Select status...</option>
              <option value="active">Active - Ready to handle calls</option>
              <option value="inactive">Inactive - Temporarily disabled</option>
              <option value="draft">Draft - Still being configured</option>
            </select>
            <p class="form-help">Current operational status of this assistant</p>
          </div>
        </div>
      </div>

      <!-- AI Configuration -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <svg class="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          AI Configuration
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="form-label">AI Engine</label>
            <select v-model="form.engine" class="form-select" required>
              <option value="ollama">Ollama - Local AI models</option>
              <option value="openai">OpenAI - Cloud-based models</option>
            </select>
            <p class="form-help">Choose between local Ollama models or OpenAI's cloud services</p>
          </div>

          <div>
            <label class="form-label">AI Model</label>
            <select v-model="form.model" class="form-select" required>
              <option disabled value="">{{ modelOptions.length ? 'Select a model...' : 'Loading models...' }}</option>
              <option v-for="model in modelOptions" :key="model" :value="model">
                {{ model }}
              </option>
            </select>
            <p class="form-help">The specific AI model that will power your assistant's responses</p>
          </div>

          <div>
            <label class="form-label">Voice ID</label>
            <input
              v-model="form.voiceId"
              type="text"
              class="form-input"
              placeholder="e.g., alloy, echo, fable, onyx, nova, shimmer"
            />
            <p class="form-help">Voice identifier for text-to-speech (depends on your TTS provider)</p>
          </div>

          <div>
            <label class="form-label">Response Temperature</label>
            <input
              v-model.number="form.temperature"
              type="number"
              min="0"
              max="2"
              step="0.1"
              class="form-input"
              placeholder="0.7"
            />
            <p class="form-help">Controls randomness: 0.0 (focused) to 2.0 (creative). Default: 0.7</p>
          </div>

          <div class="md:col-span-2">
            <label class="form-label">System Prompt</label>
            <textarea
              v-model="form.systemPrompt"
              rows="4"
              class="form-textarea"
              placeholder="You are a helpful customer service assistant. Be polite, professional, and concise..."
              required
            ></textarea>
            <p class="form-help">Instructions that define your assistant's behavior, personality, and response style</p>
          </div>

          <div class="md:col-span-2">
            <label class="form-label">Initial Greeting</label>
            <textarea
              v-model="form.initialGreeting"
              rows="2"
              class="form-textarea"
              placeholder="Hello! Thank you for calling. How can I help you today?"
            ></textarea>
            <p class="form-help">The first message your assistant will say when someone calls</p>
          </div>

          <div class="md:col-span-2">
            <label class="form-label">Fallback Message</label>
            <textarea
              v-model="form.fallbackMessage"
              rows="2"
              class="form-textarea"
              placeholder="I'm sorry, I didn't understand that. Could you please rephrase your question?"
            ></textarea>
            <p class="form-help">Message used when the assistant doesn't understand or can't help</p>
          </div>
        </div>
      </div>

      <!-- SIP Configuration -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <svg class="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            SIP Trunk Configuration
          </h2>
          <label class="flex items-center">
            <input type="checkbox" v-model="form.hasTrunk" class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600" />
            <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Enable SIP trunk</span>
          </label>
        </div>

        <div v-if="!form.hasTrunk" class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">SIP trunk disabled</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Enable the checkbox above to configure SIP trunk settings for external phone connectivity
          </p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="form-label">Phone Number (DID)</label>
            <input
              v-model="form.phoneNumber"
              type="text"
              class="form-input"
              placeholder="+1 (555) 123-4567"
            />
            <p class="form-help">The public phone number that will route to this assistant</p>
          </div>

          <div>
            <label class="form-label">SIP Host</label>
            <input
              v-model="form.sipHost"
              type="text"
              class="form-input"
              placeholder="sip.provider.com"
            />
            <p class="form-help">Hostname or IP address of your SIP provider</p>
          </div>

          <div>
            <label class="form-label">SIP Port</label>
            <input
              v-model.number="form.sipPort"
              type="number"
              class="form-input"
              placeholder="5060"
            />
            <p class="form-help">Port number for SIP connections (typically 5060 or 5061)</p>
          </div>

          <div>
            <label class="form-label">SIP Username</label>
            <input
              v-model="form.sipUsername"
              type="text"
              class="form-input"
              placeholder="username"
            />
            <p class="form-help">Authentication username provided by your SIP provider</p>
          </div>

          <div class="md:col-span-2">
            <label class="form-label">SIP Password</label>
            <input
              v-model="form.sipPassword"
              type="password"
              class="form-input"
              placeholder="Enter password..."
            />
            <p class="form-help">Authentication password for your SIP account (stored securely)</p>
          </div>
        </div>
      </div>

      <!-- Advanced Settings -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <svg class="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
          </svg>
          Advanced Settings
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="form-label">Max Response Length</label>
            <input
              v-model.number="form.maxTokens"
              type="number"
              min="50"
              max="4000"
              class="form-input"
              placeholder="500"
            />
            <p class="form-help">Maximum number of tokens in assistant responses (affects response length)</p>
          </div>

          <div>
            <label class="form-label">Response Timeout (seconds)</label>
            <input
              v-model.number="form.timeout"
              type="number"
              min="5"
              max="60"
              class="form-input"
              placeholder="30"
            />
            <p class="form-help">Maximum time to wait for AI response before timeout</p>
          </div>

          <div class="md:col-span-2">
            <label class="flex items-center">
              <input type="checkbox" v-model="form.enableLogging" class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600" />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Enable conversation logging</span>
            </label>
            <p class="form-help mt-1">Store conversation transcripts for analysis and improvement (ensure compliance with privacy laws)</p>
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div class="order-2 sm:order-1">
          <button
            v-if="isEdit"
            type="button"
            @click="onDelete"
            class="btn-danger"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete Assistant
          </button>
        </div>
        <div class="flex space-x-3 order-1 sm:order-2">
          <router-link :to="isEdit ? `/assistants/${route.params.id}` : '/assistants'" class="btn-secondary">
            Cancel
          </router-link>
          <button type="submit" class="btn-primary">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ isEdit ? 'Update Assistant' : 'Create Assistant' }}
          </button>
        </div>
      </div>
    </form>

  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useAssistantStore } from '../store/assistants'

const store = useAssistantStore()
const route = useRoute()
const router = useRouter()

const isEdit = computed(() => !!route.params.id)
const errorMessage = ref('')
const modelOptions = ref([])

const form = reactive({
  name: '',
  extension: '',
  description: '',
  status: 'draft',
  engine: 'ollama',
  model: '',
  voiceId: '',
  temperature: 0.7,
  systemPrompt: '',
  initialGreeting: '',
  fallbackMessage: '',
  hasTrunk: false,
  phoneNumber: '',
  sipHost: '',
  sipPort: 5060,
  sipUsername: '',
  sipPassword: '',
  maxTokens: 500,
  timeout: 30,
  enableLogging: true,
})

// Compute next free extension on new
async function fillNextExtension() {
  await store.fetchAll()
  const used = store.list
    .map(a => parseInt(a.extension, 10))
    .filter(n => !isNaN(n))
  const next = (used.length ? Math.max(...used) : 1000) + 1
  form.extension = String(next)
}

// Load models for selected engine
async function loadModels() {
  modelOptions.value = []
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/models?engine=${form.engine}`
    )
    modelOptions.value = res.data
    if (!modelOptions.value.includes(form.model)) {
      form.model = ''
    }
  } catch (err) {
    console.error('Failed to load models:', err)
  }
}
watch(() => form.engine, loadModels)

onMounted(async () => {
  await loadModels()

  if (isEdit.value) {
    await store.fetchById(route.params.id)
    Object.assign(form, {
      ...store.current,
      // Set default values for new fields if they don't exist
      name: store.current.name || '',
      description: store.current.description || '',
      status: store.current.status || 'draft',
      voiceId: store.current.voiceId || '',
      temperature: store.current.temperature ?? 0.7,
      initialGreeting: store.current.initialGreeting || '',
      fallbackMessage: store.current.fallbackMessage || '',
      maxTokens: store.current.maxTokens || 500,
      timeout: store.current.timeout || 30,
      enableLogging: store.current.enableLogging ?? true,
    })
    // if any SIP field present, enable the trunk block
    form.hasTrunk = !!(form.sipHost || form.sipUsername || form.sipPassword)
  } else {
    await fillNextExtension()
  }
})

async function onSubmit() {
  errorMessage.value = ''
  try {
    const payload = { ...form }
    if (!form.hasTrunk) {
      // remove optional fields
      delete payload.phoneNumber
      delete payload.sipHost
      delete payload.sipPort
      delete payload.sipUsername
      delete payload.sipPassword
    }
    delete payload.hasTrunk // This is just a UI helper
    
    if (isEdit.value) {
      await store.update(route.params.id, payload)
    } else {
      await store.create(payload)
    }
    router.push('/assistants')
  } catch (err) {
    errorMessage.value =
      err.response?.data?.error || err.message || 'Unexpected error'
  }
}

async function onDelete() {
  if (!confirm('Are you sure you want to delete this assistant? This action cannot be undone.')) return
  errorMessage.value = ''
  try {
    await store.remove(route.params.id)
    router.push('/assistants')
  } catch (err) {
    errorMessage.value =
      err.response?.data?.error || err.message || 'Could not delete'
  }
}
</script>