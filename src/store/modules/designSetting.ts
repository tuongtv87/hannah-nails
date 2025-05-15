import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface DesignSettingState {
  // Chế độ tối
  darkTheme: boolean
  // Theme cho toàn bộ ứng dụng
  appTheme: string
  // Theme cho menu bên
  navTheme: string
  // Theme cho header
  headerTheme: string
  // Hiển thị footer
  showFooter: boolean
  // Hiển thị breadcrumb
  showBreadCrumb: boolean
  // Hiển thị icon trong breadcrumb
  showBreadCrumbIcon: boolean
  // Hiển thị logo
  showLogo: boolean
  // Sử dụng sidebar dạng mix
  isMixSidebar: boolean
  // Sử dụng layout ngang
  isHorizontal: boolean
  // Fix header trong chế độ mix
  isMixHeaderFixed: boolean
}

export const useDesignSettingStore = defineStore('designSetting', () => {
  // State với giá trị mặc định
  const darkTheme = ref(false)
  const appTheme = ref('#2d8cf0')
  const navTheme = ref('#001529')
  const headerTheme = ref('#fff')
  const showFooter = ref(true)
  const showBreadCrumb = ref(true)
  const showBreadCrumbIcon = ref(false)
  const showLogo = ref(true)
  const isMixSidebar = ref(false)
  const isHorizontal = ref(false)
  const isMixHeaderFixed = ref(false)

  // Action để thay đổi chế độ tối
  function setDarkTheme(value: boolean) {
    darkTheme.value = value
    // Lưu vào localStorage
    localStorage.setItem('darkTheme', value ? '1' : '0')
  }

  // Action để thay đổi theme ứng dụng
  function setAppTheme(value: string) {
    appTheme.value = value
    // Lưu vào localStorage
    localStorage.setItem('appTheme', value)
  }

  // Action để thay đổi theme menu
  function setNavTheme(value: string) {
    navTheme.value = value
  }

  // Action để thay đổi theme header
  function setHeaderTheme(value: string) {
    headerTheme.value = value
  }

  // Lấy theme từ localStorage khi khởi tạo
  function initTheme() {
    // Khôi phục chế độ tối từ localStorage nếu có
    const savedDarkTheme = localStorage.getItem('darkTheme')
    if (savedDarkTheme !== null) {
      darkTheme.value = savedDarkTheme === '1'
    }

    // Khôi phục theme ứng dụng từ localStorage nếu có
    const savedAppTheme = localStorage.getItem('appTheme')
    if (savedAppTheme) {
      appTheme.value = savedAppTheme
    }
  }

  return {
    darkTheme,
    appTheme,
    navTheme,
    headerTheme,
    showFooter,
    showBreadCrumb,
    showBreadCrumbIcon,
    showLogo,
    isMixSidebar,
    isHorizontal,
    isMixHeaderFixed,
    
    setDarkTheme,
    setAppTheme,
    setNavTheme,
    setHeaderTheme,
    initTheme
  }
}) 