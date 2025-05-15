import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { setupNaive } from '@/plugins';

// Setup Pinia
const pinia = createPinia()
const app = createApp(App);

app.use(pinia)
app.use(router)
app.use(setupNaive)

// Global error handler
app.config.errorHandler = (err, _vm, info) => {
  console.error('Global error:', err)
  console.error('Error info:', info)
}

// Mount app
app.mount('#app')
