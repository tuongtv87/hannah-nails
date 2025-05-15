import { ref, onMounted, onUnmounted } from 'vue'
import { debounce } from '@/utils/domUtils'

/**
 * Hook xử lý sự kiện thay đổi kích thước cửa sổ
 * @param fn Hàm xử lý khi cửa sổ thay đổi kích thước
 * @param wait Thời gian chờ trước khi gọi fn
 * @param immediate Có gọi fn ngay lập tức không
 */
export function useWindowSizeFn(fn: () => void, wait = 150, immediate = true) {
  const handler = debounce(fn, wait)
  const registered = ref(false)

  /**
   * Đăng ký sự kiện resize
   */
  function register() {
    if (registered.value) return

    window.addEventListener('resize', handler)
    registered.value = true

    if (immediate) {
      fn()
    }
  }

  /**
   * Hủy đăng ký sự kiện resize
   */
  function unregister() {
    if (!registered.value) return

    window.removeEventListener('resize', handler)
    registered.value = false
  }

  // Tự động đăng ký khi component được mount
  onMounted(() => {
    register()
  })

  // Tự động hủy đăng ký khi component bị hủy
  onUnmounted(() => {
    unregister()
  })

  return { register, unregister }
}
