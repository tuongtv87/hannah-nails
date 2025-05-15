import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface UserInfo {
  id: string
  username: string
  email: string
  avatar?: string
  role: string
  permissions: string[]
  fullName?: string
}

export const useUserStore = defineStore('user', () => {
  // State
  const token = ref<string | null>(localStorage.getItem('token'))
  const userInfo = ref<UserInfo | null>(null)
  const isLoggedIn = ref(!!token.value)
  const permissions = ref<string[]>([])

  // Actions
  function setToken(newToken: string | null) {
    token.value = newToken
    isLoggedIn.value = !!newToken
    
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  function setUserInfo(info: UserInfo | null) {
    userInfo.value = info
    if (info?.permissions) {
      permissions.value = info.permissions
    }
  }

  function login(tokenValue: string, user: UserInfo) {
    setToken(tokenValue)
    setUserInfo(user)
    return true
  }

  function logout() {
    setToken(null)
    setUserInfo(null)
    permissions.value = []
  }

  function hasPermission(permissionKey: string): boolean {
    return permissions.value.includes(permissionKey)
  }

  function hasRole(role: string): boolean {
    return userInfo.value?.role === role
  }

  return {
    // State
    token,
    userInfo,
    isLoggedIn,
    permissions,
    
    // Getters
    hasPermission,
    hasRole,
    
    // Actions
    setToken,
    setUserInfo,
    login,
    logout
  }
}) 