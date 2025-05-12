import type { MessageApi } from 'naive-ui'

declare global {
  interface Window {
    $toggleTheme: () => void;
    $message: MessageApi;
  }
}

export {}; 