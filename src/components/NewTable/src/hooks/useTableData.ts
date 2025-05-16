import type { PaginationProps } from '../types/pagination';
import type { NewTableProps } from '../types/table';
import { ref, unref, computed, watchEffect } from 'vue';
import { API_SETTING } from '../constant';

export function useTableData(
  props: NewTableProps,
  { getPaginationInfo, setPagination }: { 
    getPaginationInfo: () => PaginationProps | boolean, 
    setPagination: (info: Partial<PaginationProps>) => void 
  }
) {
  // Dữ liệu bảng
  const tableData = ref<any[]>([]);
  // Trạng thái loading
  const loading = ref(false);

  // Theo dõi dataSource và cập nhật tableData
  watchEffect(() => {
    if (Array.isArray(props.dataSource)) {
      tableData.value = props.dataSource;
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

  // Fetch dữ liệu từ API
  async function fetchData(params?: any) {
    // Nếu dataSource là function, gọi API để lấy dữ liệu
    if (typeof props.dataSource === 'function') {
      try {
        loading.value = true;
        
        // Chuẩn bị tham số phân trang
        const pageField = API_SETTING.pageField;
        const sizeField = API_SETTING.sizeField;
        const totalField = API_SETTING.totalField;
        const listField = API_SETTING.listField;
        const countField = API_SETTING.countField;
        
        let pageParams = {};
        const paginationInfo = getPaginationInfo();
        
        if (typeof paginationInfo === 'object') {
          const { page = 1, pageSize = 10 } = paginationInfo;
          pageParams = {
            [pageField]: (params && params[pageField]) || page,
            [sizeField]: pageSize,
          };
        }
        
        // Gọi API với tham số
        const apiParams = {
          ...pageParams,
          ...params,
        };
        
        const res = await props.dataSource(apiParams);
        
        // Xử lý kết quả API
        const total = res[countField] || 0;
        const currentPage = res[pageField] || 1;
        const totalPages = res[totalField] || 1;
        const results = res[listField] || [];
        
        // Cập nhật dữ liệu bảng
        tableData.value = results;
        
        // Cập nhật thông tin phân trang
        setPagination({
          page: currentPage,
          pageCount: totalPages,
          itemCount: total,
        });
        
        return {
          items: results,
          total,
          currentPage,
          totalPages,
        };
      } catch (error) {
        console.error('Failed to fetch table data:', error);
        tableData.value = [];
        setPagination({
          pageCount: 0,
          itemCount: 0,
        });
        return {
          items: [],
          total: 0,
          currentPage: 1,
          totalPages: 0,
        };
      } finally {
        loading.value = false;
      }
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