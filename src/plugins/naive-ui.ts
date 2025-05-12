import type { App } from 'vue'
import {
  create,
  NButton,
  NCard,
  NConfigProvider,
  NDialogProvider,
  NDropdown,
  NForm,
  NFormItem,
  NInput,
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NLayoutSider,
  NMenu,
  NMessageProvider,
  NSpace,
  NSwitch,
  NIcon,
  NDivider,
  NBreadcrumb,
  NBreadcrumbItem,
  NTag,
  NAvatar,
  NTooltip,
  useMessage,
  useDialog
} from 'naive-ui'

// Define global types for window.$message and window.$dialog
declare global {
  interface Window {
    $message: ReturnType<typeof useMessage>
    $dialog: ReturnType<typeof useDialog>
  }
}

// Create NaiveUI instance with components
const naive = create({
  components: [
    NButton,
    NCard,
    NConfigProvider,
    NDialogProvider,
    NDropdown,
    NForm,
    NFormItem,
    NInput,
    NLayout,
    NLayoutContent,
    NLayoutFooter,
    NLayoutHeader,
    NLayoutSider,
    NMenu,
    NMessageProvider,
    NSpace,
    NSwitch,
    NIcon,
    NDivider,
    NBreadcrumb,
    NBreadcrumbItem,
    NTag,
    NAvatar,
    NTooltip
  ]
})

export function setupNaiveUI(app: App) {
  app.use(naive)
  
  // Setup message and dialog after app is mounted
  app.config.globalProperties.$message = useMessage()
  app.config.globalProperties.$dialog = useDialog()
  
  // Setup global message and dialog for window
  window.$message = app.config.globalProperties.$message
  window.$dialog = app.config.globalProperties.$dialog
} 