import { contextBridge, ipcRenderer } from 'electron'

// Đối tượng API để phơi bày ra cửa sổ renderer
const electronAPI = {
  // Gửi message từ renderer đến main process
  send: (channel: string, data: any) => {
    // Whitelist các channel mà renderer được phép gửi đến
    const validChannels = ['toMain']
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },
  // Nhận message từ main process
  receive: (channel: string, func: (...args: any[]) => void) => {
    // Whitelist các channel mà renderer được phép nhận
    const validChannels = ['fromMain', 'main-process-message']
    if (validChannels.includes(channel)) {
      // Xóa bỏ event listener cũ để tránh đăng ký nhiều lần
      ipcRenderer.removeAllListeners(channel)
      // Thêm mới event listener
      ipcRenderer.on(channel, (_event, ...args) => func(...args))
    }
  },
  // Bạn có thể thêm các phương thức khác ở đây
}

// Phơi bày API ra window.electronAPI
contextBridge.exposeInMainWorld('electronAPI', electronAPI)

// Thêm thông tin về phiên bản
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  electron: () => process.versions.electron,
  // Bạn có thể thêm các thông tin khác ở đây
})

// Thêm thông tin môi trường
contextBridge.exposeInMainWorld('env', {
  nodeEnv: process.env.NODE_ENV,
  appName: process.env.APP_NAME,
  appVersion: process.env.APP_VERSION,
}) 