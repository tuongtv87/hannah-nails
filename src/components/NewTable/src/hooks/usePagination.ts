import type { PaginationProps } from '../types/pagination';
import type { NewTableProps } from '../types/table';
import { computed, unref, ref, watchEffect } from 'vue';
import { DEFAULT_PAGE_SIZE, PAGE_SIZES } from '../constant';

export function usePagination(props: NewTableProps) {
  const paginationConfig = ref<PaginationProps>({});
  const showPagination = ref(true);

  // Theo dõi thay đổi pagination props
  watchEffect(() => {
    if (typeof props.pagination === 'object') {
      paginationConfig.value = {
        ...unref(paginationConfig),
        ...(props.pagination || {}),
      };
    } else if (props.pagination === false) {
      showPagination.value = false;
    }
  });

  // Thông tin phân trang được tính toán
  const getPaginationInfo = computed((): PaginationProps | boolean => {
    if (!unref(showPagination) || props.pagination === false) {
      return false;
    }

    // Cấu hình mặc định
    const defaultPagination: PaginationProps = {
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      pageSizes: PAGE_SIZES,
      showSizePicker: true,
      showQuickJumper: true,
      prefix: (pagingInfo) => `Tổng ${pagingInfo.itemCount || 0} mục`,
    };

    // Gộp cấu hình
    return {
      ...defaultPagination,
      ...(typeof props.pagination === 'object' ? props.pagination : {}),
      ...unref(paginationConfig),
    };
  });

  // Cập nhật cấu hình phân trang
  function setPagination(info: Partial<PaginationProps>) {
    const paginationInfo = unref(getPaginationInfo);
    paginationConfig.value = {
      ...(typeof paginationInfo !== 'boolean' ? paginationInfo : {}),
      ...info,
    };
  }

  return { 
    getPaginationInfo, 
    setPagination,
    showPagination,
    setShowPagination: (show: boolean) => {
      showPagination.value = show;
    }
  };
} 