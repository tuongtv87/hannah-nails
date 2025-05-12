<template>
  <div class="customers-container">
    <n-card title="Quản lý khách hàng" class="customers-card">
      <template #header-extra>
        <n-button type="primary" @click="openAddCustomerModal">
          <template #icon>
            <n-icon><AddOutline /></n-icon>
          </template>
          Thêm khách hàng
        </n-button>
      </template>

      <!-- Search and filters -->
      <div class="action-bar">
        <n-input
          v-model:value="searchValue"
          placeholder="Tìm kiếm khách hàng..."
          clearable
          @update:value="handleSearch"
          style="width: 300px"
        >
          <template #prefix>
            <n-icon><SearchOutline /></n-icon>
          </template>
        </n-input>

        <n-space>
          <n-select
            v-model:value="filterType"
            :options="filterOptions"
            placeholder="Lọc theo trạng thái"
            style="width: 180px"
          />
          <n-button @click="handleReset">
            <template #icon>
              <n-icon><RefreshOutline /></n-icon>
            </template>
            Đặt lại
          </n-button>
        </n-space>
      </div>

      <!-- Data table -->
      <n-data-table
        :columns="columns"
        :data="filteredData"
        :pagination="pagination"
        :bordered="false"
        :row-key="(row: CustomerData) => row.id || 0"
        :loading="loading"
      />

      <!-- Customer modal -->
      <n-modal v-model:show="showModal" preset="card" title="Thêm khách hàng mới" style="width: 600px">
        <n-form
          ref="formRef"
          :model="formModel"
          :rules="rules"
          label-placement="left"
          label-width="120px"
          require-mark-placement="right-hanging"
        >
          <n-form-item label="Họ và tên" path="name">
            <n-input v-model:value="formModel.name" placeholder="Nhập họ và tên" />
          </n-form-item>
          <n-form-item label="Số điện thoại" path="phone">
            <n-input v-model:value="formModel.phone" placeholder="Nhập số điện thoại" />
          </n-form-item>
          <n-form-item label="Email" path="email">
            <n-input v-model:value="formModel.email" placeholder="Nhập email" />
          </n-form-item>
          <n-form-item label="Ngày sinh" path="birthdate">
            <n-date-picker v-model:value="formModel.birthdate" type="date" clearable />
          </n-form-item>
          <n-form-item label="Ghi chú" path="notes">
            <n-input
              v-model:value="formModel.notes"
              type="textarea"
              placeholder="Nhập ghi chú về khách hàng"
            />
          </n-form-item>
          <n-form-item label="Trạng thái" path="status">
            <n-select
              v-model:value="formModel.status"
              :options="statusOptions"
              placeholder="Chọn trạng thái"
            />
          </n-form-item>
        </n-form>

        <template #footer>
          <n-space justify="end">
            <n-button @click="showModal = false">Hủy</n-button>
            <n-button type="primary" @click="handleSubmit">Lưu</n-button>
          </n-space>
        </template>
      </n-modal>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, h, reactive, computed } from 'vue'
import { useMessage } from 'naive-ui'
import { SearchOutline, RefreshOutline, AddOutline, CreateOutline, TrashOutline } from '@vicons/ionicons5'
import type { DataTableColumns, FormInst } from 'naive-ui'

const message = useMessage()
const searchValue = ref('')
const filterType = ref(null)
const showModal = ref(false)
const loading = ref(false)
const formRef = ref<FormInst | null>(null)

// Customers data
const customers = ref([
  {
    id: 1,
    name: 'Nguyễn Thị Hương',
    phone: '0912345678',
    email: 'huong.nguyen@example.com',
    birthdate: 946659600000, // 2000-01-01
    visits: 12,
    lastVisit: 1693526400000, // 2023-09-01
    status: 'active',
    notes: 'Khách hàng thường xuyên, thích màu hồng nhạt'
  },
  {
    id: 2,
    name: 'Trần Văn Minh',
    phone: '0987654321',
    email: 'minh.tran@example.com',
    birthdate: 915148800000, // 1999-01-01
    visits: 5,
    lastVisit: 1691107200000, // 2023-08-04
    status: 'active',
    notes: 'Thường đến vào cuối tuần'
  },
  {
    id: 3,
    name: 'Lê Thị Mai',
    phone: '0976543210',
    email: 'mai.le@example.com',
    birthdate: 883612800000, // 1998-01-01
    visits: 8,
    lastVisit: 1688601600000, // 2023-07-06
    status: 'inactive',
    notes: 'Thích dịch vụ nail art và đắp gel'
  },
  {
    id: 4,
    name: 'Phạm Đức Anh',
    phone: '0903456789',
    email: 'anh.pham@example.com',
    birthdate: 852076800000, // 1997-01-01
    visits: 3,
    lastVisit: 1685923200000, // 2023-06-05
    status: 'active',
    notes: 'Khách hàng nam, thường làm móng chân'
  },
  {
    id: 5,
    name: 'Hoàng Thị Thanh',
    phone: '0934567890',
    email: 'thanh.hoang@example.com',
    birthdate: 820454400000, // 1996-01-01
    visits: 15,
    lastVisit: 1693008000000, // 2023-08-26
    status: 'active',
    notes: 'VIP, thích dịch vụ cao cấp'
  }
])

// Filter options
const filterOptions = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đang hoạt động', value: 'active' },
  { label: 'Không hoạt động', value: 'inactive' }
]

// Status options for form
const statusOptions = [
  { label: 'Đang hoạt động', value: 'active' },
  { label: 'Không hoạt động', value: 'inactive' }
]

// Form model
interface CustomerData {
  id?: number;
  name: string;
  phone: string;
  email: string;
  birthdate: number | null;
  visits?: number;
  lastVisit?: number | null;
  status: string;
  notes: string;
}

const formModel = reactive<CustomerData>({
  name: '',
  phone: '',
  email: '',
  birthdate: null,
  notes: '',
  status: 'active'
})

// Form rules
const rules = {
  name: {
    required: true,
    message: 'Vui lòng nhập họ và tên',
    trigger: 'blur'
  },
  phone: {
    required: true,
    message: 'Vui lòng nhập số điện thoại',
    trigger: 'blur'
  }
}

// Format date
const formatDate = (timestamp: number | null | undefined) => {
  if (!timestamp) return 'N/A'
  const date = new Date(timestamp)
  return date.toLocaleDateString('vi-VN')
}

// Table columns
const createColumns = (): DataTableColumns<CustomerData> => {
  return [
    {
      title: 'Họ và tên',
      key: 'name',
      sorter: 'default'
    },
    {
      title: 'Số điện thoại',
      key: 'phone'
    },
    {
      title: 'Email',
      key: 'email'
    },
    {
      title: 'Ngày sinh',
      key: 'birthdate',
      render(row) {
        return formatDate(row.birthdate)
      }
    },
    {
      title: 'Lần cuối đến',
      key: 'lastVisit',
      render(row) {
        return formatDate(row.lastVisit)
      },
      sorter: 'default'
    },
    {
      title: 'Số lần đến',
      key: 'visits',
      sorter: 'default'
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render(row) {
        return h(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center'
            }
          },
          {
            default: () => [
              h(
                'div',
                {
                  style: {
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: row.status === 'active' ? '#18a058' : '#d03050',
                    marginRight: '8px'
                  }
                }
              ),
              row.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'
            ]
          }
        )
      }
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render(row) {
        return h(
          'div',
          {
            style: {
              display: 'flex',
              gap: '8px'
            }
          },
          {
            default: () => [
              h(
                'div',
                {
                  style: {
                    cursor: 'pointer',
                    color: 'var(--primary-color)'
                  },
                  onClick: () => handleEdit(row)
                },
                [
                  h(
                    'n-icon',
                    { size: 18 },
                    { default: () => h(CreateOutline) }
                  ),
                  ' Sửa'
                ]
              ),
              h(
                'div',
                {
                  style: {
                    cursor: 'pointer',
                    color: 'var(--error-color)'
                  },
                  onClick: () => handleDelete(row)
                },
                [
                  h(
                    'n-icon',
                    { size: 18 },
                    { default: () => h(TrashOutline) }
                  ),
                  ' Xóa'
                ]
              )
            ]
          }
        )
      }
    }
  ]
}

const columns = createColumns()

// Pagination
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 30, 50],
  onChange: (page: number) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  }
})

// Filtered data based on search and filter
const filteredData = computed(() => {
  let result = customers.value
  
  // Apply search filter
  if (searchValue.value) {
    const searchLower = searchValue.value.toLowerCase()
    result = result.filter(
      item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.phone.includes(searchValue.value) ||
        item.email.toLowerCase().includes(searchLower)
    )
  }
  
  // Apply status filter
  if (filterType.value && filterType.value !== 'all') {
    result = result.filter(item => item.status === filterType.value)
  }
  
  return result
})

// Reset filters
const handleReset = () => {
  searchValue.value = ''
  filterType.value = null
}

// Search handler
const handleSearch = () => {
  // Already handled by computed property
}

// Open add customer modal
const openAddCustomerModal = () => {
  Object.assign(formModel, {
    name: '',
    phone: '',
    email: '',
    birthdate: null,
    notes: '',
    status: 'active'
  })
  showModal.value = true
}

// Edit customer
const handleEdit = (row: CustomerData) => {
  Object.assign(formModel, { ...row })
  showModal.value = true
}

// Delete customer
const handleDelete = (row: CustomerData) => {
  // In a real application, show a confirmation dialog before deleting
  if (row.id) {
    customers.value = customers.value.filter(item => item.id !== row.id)
    message.success('Đã xóa khách hàng thành công')
  }
}

// Submit form
const handleSubmit = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      loading.value = true
      // Simulate API call
      setTimeout(() => {
        if ('id' in formModel && formModel.id) {
          // Update existing customer
          const index = customers.value.findIndex(c => c.id === formModel.id)
          if (index !== -1) {
            customers.value[index] = { ...formModel } as any
          }
          message.success('Cập nhật khách hàng thành công')
        } else {
          // Add new customer
          const newCustomer: CustomerData = {
            ...formModel,
            id: customers.value.length + 1,
            visits: 0,
            lastVisit: null
          }
          customers.value.push(newCustomer as any)
          message.success('Thêm khách hàng thành công')
        }
        showModal.value = false
        loading.value = false
      }, 1000)
    }
  })
}
</script>

<style scoped>
.customers-container {
  padding: 16px;
}

.customers-card {
  margin-bottom: 24px;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  align-items: center;
}
</style> 