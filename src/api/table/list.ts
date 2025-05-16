import { Alova } from '@/utils/http/alova/index';

// Get table
export function getTableList(params) {
  return Alova.Get('/table/list', { params });
}
