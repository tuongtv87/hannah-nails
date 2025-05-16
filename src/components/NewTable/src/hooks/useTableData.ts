import type { PaginationProps } from '../types/pagination';
import type { NewTableProps } from '../types/table';
import { ref, computed, watchEffect } from 'vue';

export function useTableData(
  props: NewTableProps,
  _context: { 
    getPaginationInfo: () => PaginationProps | boolean, 
    setPagination: (info: Partial<PaginationProps>) => void 
  }
) {
  // Dữ liệu bảng
  const tableData = ref<any[]>([]);
  // Trạng thái loading
  const loading = ref(false);

  // Theo dõi data và cập nhật tableData
  watchEffect(() => {
    if (Array.isArray(props.data)) {
      tableData.value = props.data;
    }
  });

  // Lấy rowKey
  const getRowKey = computed(() => {
    if (typeof props.rowKey === 'function') {
      return props.rowKey;
    }
    if (typeof props.rowKey === 'string') {
      return (record: any) => record[props.rowKey as string];
    }
    // Mặc định sử dụng trường 'id' làm khóa
    return (record: any) => record.id;
  });

  // Fetch dữ liệu
  async function fetchData(_params?: any) {
    try {
      if (Array.isArray(props.data)) {
        setTableData(props.data);
        return { items: props.data, total: props.data.length };
      }
    } catch (error) {
      console.error('Failed to fetch table data:', error);
      tableData.value = [];
      return {
        items: [],
        total: 0,
      };
    } finally {
      loading.value = false;
    }
    return null;
  }

  // Tải lại dữ liệu
  async function reload(params?: any) {
    return await fetchData(params);
  }

  // Cập nhật dữ liệu trực tiếp
  function setTableData(data: any[]) {
    tableData.value = data;
  }

  return {
    tableData,
    loading,
    getRowKey,
    fetchData,
    reload,
    setTableData,
  };
} 