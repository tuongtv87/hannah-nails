import { app, BrowserWindow, Menu } from 'electron';
import path from 'node:path';
// Vì ta sử dụng ES modules, chúng ta cần dùng URL để có được đường dẫn tuyệt đối
import { fileURLToPath } from 'url';

// Lấy đường dẫn tuyệt đối của thư mục hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cấu trúc thư mục sau khi build:
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    -> Electron Main
// │ └─┬ preload
// │   └── index.js    -> Preload Script
// ├─┬ dist
// │ └── index.html    -> Renderer App (Vue app)
//
process.env.DIST_ELECTRON = path.join(__dirname, '..');
process.env.DIST = path.join(process.env.DIST_ELECTRON, '../dist');
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST;

// Đảm bảo các đường dẫn luôn tồn tại bằng cách gán giá trị mặc định
const DIST_PATH = process.env.DIST || path.join(__dirname, '../dist');
// Đường dẫn preload.js - đảm bảo dùng extension .js thay vì .mjs
const PRELOAD_PATH = path.join(__dirname, '../preload/preload.js');

// Đặt tên ứng dụng trên Windows
if (process.platform === 'win32') app.setName('Hannah Management');

let win: BrowserWindow | null;
// URL của Vite Dev Server, được cung cấp bởi vite-plugin-electron
const viteDevServerUrl = process.env.VITE_DEV_SERVER_URL;

function createWindow() {
  Menu.setApplicationMenu(null);
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: PRELOAD_PATH, // Sử dụng đường dẫn tuyệt đối
      nodeIntegration: false, // Tắt nodeIntegration để tăng cường bảo mật
      contextIsolation: true,  // Bật contextIsolation để tăng cường bảo mật
    },
  });

  console.log('Preload path:', PRELOAD_PATH);
  console.log('Dist path:', DIST_PATH);
  
  // Gửi message test tới Renderer-process khi load xong.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString());
  });

  if (viteDevServerUrl) {
    // Load URL từ Vite dev server nếu đang trong môi trường development
    win.loadURL(viteDevServerUrl);
    // Mở DevTools nếu đang development
    win.webContents.openDevTools();
  } else {
    // Load tệp index.html đã build nếu đang ở production
    win.loadFile(path.join(DIST_PATH, 'index.html'));
  }

  win.on('closed', () => {
    win = null;
  });
}

// Khởi tạo cửa sổ khi Electron đã sẵn sàng
app.whenReady().then(createWindow);

// Thoát ứng dụng khi tất cả cửa sổ đã đóng (trừ macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Tạo lại cửa sổ nếu không có cửa sổ nào mở và người dùng kích hoạt ứng dụng (macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}); 