import { Alova } from '@/utils/http/alova/index';

/**
 * @description: Get user information
 */
export function getUserInfo() {
  return Alova.Get<InResult>('/admin_info', {
    meta: {
      isReturnNativeResponse: true,
    },
  });
}

/**
 * @description: User login
 */
export function login(params) {
  return Alova.Post<InResult>(
    '/login',
    {
      params,
    },
    {
      meta: {
        isReturnNativeResponse: true,
      },
    }
  );
}

/**
 * @description: User change password
 */
export function changePassword(params, uid) {
  return Alova.Post(`/user/u${uid}/changepw`, { params });
}

/**
 * @description: User logout
 */
export function logout(params) {
  return Alova.Post('/login/logout', {
    params,
  });
}
