import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './index.css'

// Import stores
import { useAssistantStore } from './store/assistants';
import { useTranscriptStore } from './store/transcript';
import { useThemeStore } from './store/theme';

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

// Initialize theme
const themeStore = useThemeStore();
themeStore.initializeTheme();

// After mounting, open WS and dispatch updates
const assistantStore = useAssistantStore();
const transcriptStore = useTranscriptStore();

const wsUrl = import.meta.env.VITE_WEBSOCKET_URL + '/ws';
// const ws = new WebSocket(wsUrl);

// ws.addEventListener('open', () => {
//   console.log('✅ WS connected to', wsUrl);
// });
// ws.addEventListener('message', ({ data }) => {
//   const msg = JSON.parse(data);
//   if (msg.type === 'assistant') {
//     // On any assistant change, refetch the list
//     assistantStore.fetchAll();
//   }
//   if (msg.type === 'transcript') {
//     // Push new transcript into store
//     transcriptStore.add(msg.transcript);
//   }
// });