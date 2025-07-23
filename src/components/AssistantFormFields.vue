<template>
  <div>
    <label>Extension: <input v-model="model.extension" /></label>
    <label>Engine:
      <select v-model="model.engine">
        <option value="ollama">Ollama</option>
        <option value="openai">OpenAI</option>
      </select>
    </label>
    <label>Model: <input v-model="model.model" /></label>
    <label>System Prompt:
      <textarea v-model="model.systemPrompt" rows="4" />
    </label>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({ model: Object })
</script>
