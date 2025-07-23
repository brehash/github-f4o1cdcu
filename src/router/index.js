import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AssistantList from '../views/AssistantList.vue'
import AssistantForm from '../views/AssistantForm.vue'
import LiveTranscripts from '../views/LiveTranscripts.vue'
import CallLogs from '../views/CallLogs.vue'

const routes = [
  { path: '/',         name: 'Dashboard',    component: Dashboard },
  { path: '/assistants',       name: 'List',    component: AssistantList },
  { path: '/assistants/new',   name: 'Create',  component: AssistantForm },
  { path: '/assistants/:id',   name: 'Edit',    component: AssistantForm, props: true },
  { path: '/calls',           name: 'Calls',   component: CallLogs },
  { path: '/transcripts',     name: 'Transcripts',  component: LiveTranscripts },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
