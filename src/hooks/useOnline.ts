import { ref, onMounted, onUnmounted } from 'vue';

/**
 * @description Whether the user's network is available
 * */
export function useOnline() {
  const online = ref(true);

  const showStatus = (val) => {
    online.value = typeof val === 'boolean' ? val : val.target.online;
  };

  // Set the correct network status after the page loads
  navigator.onLine ? showStatus(true) : showStatus(false);

  onMounted(() => {
    // Start listening for changes in network status
    window.addEventListener('online', showStatus);
    window.addEventListener('offline', showStatus);
  });
  onUnmounted(() => {
    // Remove listeners for changes in network status
    window.removeEventListener('online', showStatus);
    window.removeEventListener('offline', showStatus);
  });

  return { online };
}
