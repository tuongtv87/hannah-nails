import { Alova } from '@/utils/http/alova/index';

/**
 * @description: Role list
 */
export function getRoleList(params) {
  return Alova.Get('/role/list', { params });
}
