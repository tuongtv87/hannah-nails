import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import {
  create,
  NButton,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NLayoutSider,
  NMenu,
  NInput,
  NSelect,
  NCard,
  NList,
  NListItem,
  NThing,
  NTag,
  NBreadcrumb,
  NBreadcrumbItem,
  NIcon,
  NAvatar,
  NDropdown,
  NTooltip,
  NSpace,
  NModal,
  NForm,
  NFormItem,
  NDataTable,
  NDatePicker,
  NGrid,
  NGridItem,
  NInputNumber,
  NSwitch
} from 'naive-ui'

// Create root app
const app = createApp(App)

// Setup Naive UI
const naive = create({
  components: [
    NButton,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NLayoutSider,
    NMenu,
    NInput,
    NSelect,
    NCard,
    NList,
    NListItem,
    NThing,
    NTag,
    NBreadcrumb,
    NBreadcrumbItem,
    NIcon,
    NAvatar,
    NDropdown,
    NTooltip,
    NSpace,
    NModal,
    NForm,
    NFormItem,
    NDataTable,
    NDatePicker,
    NGrid,
    NGridItem,
    NInputNumber,
    NSwitch
  ]
})
app.use(naive)

// Setup Pinia
const pinia = createPinia()
app.use(pinia)

// Setup Router
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('./views/dashboard/index.vue'),
          meta: {
            title: 'Dashboard'
          }
        },
        {
          path: 'customers',
          name: 'Customers',
          component: () => import('./views/customers/index.vue'),
          meta: {
            title: 'Customers'
          }
        },
        {
          path: 'services',
          name: 'Services',
          component: () => import('./views/services/index.vue'),
          meta: {
            title: 'Services'
          }
        }
      ]
    }
  ]
})

app.use(router)

// Global error handler
app.config.errorHandler = (err, _vm, info) => {
  console.error('Global error:', err)
  console.error('Error info:', info)
}

// Mount app
app.mount('#app')
