<template>
  <div class="customer-container">
    <n-card title="Quản Lý Khách Hàng">
      <template #header-extra>
        <n-button type="primary">
          <template #icon>
            <n-icon>
              <component :is="icons.AddOutline" />
            </n-icon>
          </template>
          Thêm Khách Hàng
        </n-button>
      </template>
      
      <div class="search-bar">
        <n-input v-model:value="searchValue" placeholder="Tìm kiếm khách hàng..." clearable style="width: 300px">
          <template #prefix>
            <n-icon>
              <component :is="icons.SearchOutline" />
            </n-icon>
          </template>
        </n-input>
        
        <n-button @click="handleReset">
          <template #icon>
            <n-icon>
              <component :is="icons.RefreshOutline" />
            </n-icon>
          </template>
          Làm Mới
        </n-button>
      </div>
      
      <div class="table-container">
        <NewTable
          ref="tableRef"
          :columns="columns"
          :dataSource="displayData"
          :pagination="{ 
            page: pagination.page,
            pageSize: pagination.pageSize,
            pageSizes: pagination.pageSizes,
            itemCount: filteredData.length,
            showSizePicker: true,
            showQuickJumper: true
          }"
          @page-change="handlePageChange"
          @page-size-change="handlePageSizeChange"
        />
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { NewTable } from '@/components/NewTable'
import { useCustomersLogic } from './index'

const { 
  icons, 
  columns,
  filteredData,
  displayData,
  pagination,
  searchValue,
  handleReset,
  tableRef,
  handlePageChange,
  handlePageSizeChange
} = useCustomersLogic()
</script>

<style scoped>
.customer-container {
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  align-items: center;
}

.table-container {
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

:deep(.n-card) {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

:deep(.n-card-content) {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

:deep(.n-card__content) {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
}

:deep(.n-data-table) {
  flex: 1;
  max-height: 100%;
}

:deep(.n-data-table-wrapper) {
  max-height: 100%;
}
</style>
