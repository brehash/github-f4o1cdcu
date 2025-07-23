<template>
  <div>
    <h2>Assistants</h2>
    <AssistantTable :assistants="assistantStore.list"
                    @delete="assistantStore.remove"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AssistantTable from '../components/AssistantTable.vue'
import { useAssistantStore } from '../store/assistant'

const assistantStore = useAssistantStore()

onMounted(() => {
  assistantStore.fetchAll()
})
</script>
