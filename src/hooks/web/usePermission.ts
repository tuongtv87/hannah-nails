import { useUserStore } from '@/store/modules/user';

/**
 * Hook để kiểm tra quyền truy cập của người dùng
 */
export function usePermission() {
  const userStore = useUserStore();

  /**
   * Kiểm tra xem người dùng có quyền truy cập không
   * @param {string | string[]} permission - Mã quyền truy cập cần kiểm tra
   * @param {boolean} requireAll - Có yêu cầu tất cả quyền hay không (chỉ áp dụng khi permission là mảng)
   * @returns {boolean} - Trả về true nếu có quyền, ngược lại false
   */
  function hasPermission(permission: string | string[], requireAll = false): boolean {
    if (!permission || (Array.isArray(permission) && permission.length === 0)) {
      return true;
    }

    // Nếu là Super Admin thì luôn có quyền
    if (userStore.userInfo?.role === 'super_admin') {
      return true;
    }

    const userPermissions = userStore.userInfo?.permissions || [];

    // Kiểm tra quyền
    if (Array.isArray(permission)) {
      if (requireAll) {
        return permission.every(item => userPermissions.includes(item));
      }
      return permission.some(item => userPermissions.includes(item));
    }

    return userPermissions.includes(permission);
  }

  /**
   * Kiểm tra xem người dùng có vai trò không
   * @param {string | string[]} role - Vai trò cần kiểm tra
   * @param {boolean} requireAll - Có yêu cầu tất cả vai trò hay không (chỉ áp dụng khi role là mảng)
   * @returns {boolean} - Trả về true nếu có vai trò, ngược lại false
   */
  function hasRole(role: string | string[], requireAll = false): boolean {
    if (!role || (Array.isArray(role) && role.length === 0)) {
      return true;
    }

    const userRole = userStore.userInfo?.role || '';

    // Kiểm tra vai trò
    if (Array.isArray(role)) {
      if (requireAll) {
        return role.every(item => item === userRole);
      }
      return role.some(item => item === userRole);
    }

    return role === userRole;
  }

  return {
    hasPermission,
    hasRole
  };
}
