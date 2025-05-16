<template>
  <div class="new-table-container">
    <!-- Tiêu đề bảng nếu có -->
    <div v-if="title" class="new-table-title">{{ title }}</div>
    
    <!-- Bảng dữ liệu -->
    <n-data-table
      ref="tableRef"
      v-bind="getBindValues"
      :loading="loading"
      :pagination="paginationConfig"
      @update:page="onPageChange"
      @update:page-size="onPageSizeChange"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data"></slot>
      </template>
    </n-data-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, unref, onMounted, nextTick } from 'vue';
import { usePagination } from './hooks/usePagination';
import { useTableData } from './hooks/useTableData';
import type { NewTableProps } from './types/table';

// Props của component
const props = defineProps<NewTableProps>();

// Events
const emit = defineEmits(['update:page', 'update:page-size', 'fetch-success', 'fetch-error']);

// Tham chiếu đến bảng
const tableRef = ref<any>(null);

// Xử lý phân trang
const { 
  getPaginationInfo, 
  setPagination
} = usePagination(props);

// Xử lý dữ liệu bảng
const { 
  tableData, 
  loading, 
  getRowKey, 
  fetchData, 
  reload, 
  setTableData 
} = useTableData(props, { 
  getPaginationInfo: () => unref(getPaginationInfo), 
  setPagination 
});

// Cấu hình phân trang - trả về trực tiếp từ hook
const paginationConfig = computed(() => {
  return unref(getPaginationInfo);
});

// Giá trị binding cho bảng
const getBindValues = computed(() => {
  return {
    size: 'medium',
    bordered: false,
    remote: true,
    ...props.tableProps,
    rowKey: unref(getRowKey),
    columns: props.columns,
    data: tableData.value,
  };
});

// Sự kiện khi thay đổi trang
function onPageChange(page: number) {
  setPagination({ page });
  emit('update:page', page);
  reload({ page });
}

// Sự kiện khi thay đổi kích thước trang
function onPageSizeChange(pageSize: number) {
  setPagination({ page: 1, pageSize });
  emit('update:page-size', pageSize);
  reload({ page: 1, pageSize });
}

// Phương thức expose
const tableAction = {
  reload,
  setTableData,
  setPagination,
  fetchData,
};

// Khởi tạo khi component được mount
onMounted(async () => {
  await nextTick();
  await fetchData();
});

// Expose API cho component cha
defineExpose(tableAction);
</script>

<style lang="less" scoped>
.new-table-container {
  width: 100%;
  max-height: 90vh;
  
  .new-table-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  :deep(.n-data-table) {
    max-height: calc(90vh - 60px);
  }

  :deep(.n-data-table-wrapper) {
    max-height: calc(90vh - 60px);
    overflow-y: auto;
  }
}
</style> 