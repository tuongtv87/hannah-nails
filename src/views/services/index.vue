<template>
  <div class="services-container">
    <n-card title="Quản lý dịch vụ" class="services-card">
      <template #header-extra>
        <n-button type="primary" @click="openAddServiceModal">
          <template #icon>
            <n-icon><AddOutline /></n-icon>
          </template>
          Thêm dịch vụ
        </n-button>
      </template>

      <!-- Search and filters -->
      <div class="action-bar">
        <n-input
          v-model:value="searchValue"
          placeholder="Tìm kiếm dịch vụ..."
          clearable
          style="width: 300px"
        >
          <template #prefix>
            <n-icon><SearchOutline /></n-icon>
          </template>
        </n-input>

        <n-space>
          <n-select
            v-model:value="filterCategory"
            :options="categoryOptions"
            placeholder="Lọc theo danh mục"
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
        :data="filteredServices"
        :pagination="pagination"
        :bordered="false"
        :row-key="(row: ServiceData) => row.id"
        :loading="loading"
      />

      <!-- Service modal -->
      <n-modal v-model:show="showModal" preset="card" :title="modalMode === 'add' ? 'Thêm dịch vụ mới' : 'Chỉnh sửa dịch vụ'" style="width: 600px">
        <n-form
          ref="formRef"
          :model="formModel"
          :rules="rules"
          label-placement="left"
          label-width="120px"
          require-mark-placement="right-hanging"
        >
          <n-form-item label="Tên dịch vụ" path="name">
            <n-input v-model:value="formModel.name" placeholder="Nhập tên dịch vụ" />
          </n-form-item>
          <n-form-item label="Danh mục" path="category">
            <n-select
              v-model:value="formModel.category"
              :options="categoryOptions"
              placeholder="Chọn danh mục"
            />
          </n-form-item>
          <n-form-item label="Giá tiền" path="price">
            <n-input-number
              v-model:value="formModel.price"
              :min="0"
              :precision="2"
              :step="10"
              style="width: 100%"
            >
              <template #prefix>$</template>
            </n-input-number>
          </n-form-item>
          <n-form-item label="Thời gian" path="duration">
            <n-input-number
              v-model:value="formModel.duration"
              :min="5"
              :step="5"
              style="width: 100%"
            >
              <template #suffix>phút</template>
            </n-input-number>
          </n-form-item>
          <n-form-item label="Mô tả" path="description">
            <n-input
              v-model:value="formModel.description"
              type="textarea"
              placeholder="Nhập mô tả về dịch vụ"
            />
          </n-form-item>
          <n-form-item label="Trạng thái" path="active">
            <n-switch v-model:value="formModel.active">
              <template #checked>Đang hoạt động</template>
              <template #unchecked>Ngưng hoạt động</template>
            </n-switch>
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

interface ServiceData {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  active: boolean;
}

// Form model with _id for editing
interface ServiceFormData {
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number;
  active: boolean;
  _id?: number;
}

const message = useMessage()
const searchValue = ref('')
const filterCategory = ref(null)
const showModal = ref(false)
const loading = ref(false)
const modalMode = ref<'add' | 'edit'>('add')
const formRef = ref<FormInst | null>(null)

// Services data
const services = ref<ServiceData[]>([
  {
    id: 1,
    name: 'Manicure Cơ Bản',
    description: 'Dịch vụ manicure cơ bản bao gồm cắt, giũa, đẩy da và sơn một màu.',
    category: 'manicure',
    price: 25,
    duration: 30,
    active: true
  },
  {
    id: 2,
    name: 'Pedicure Cơ Bản',
    description: 'Dịch vụ pedicure cơ bản bao gồm làm sạch, cắt giũa, đẩy da và sơn móng chân.',
    category: 'pedicure',
    price: 35,
    duration: 45,
    active: true
  },
  {
    id: 3,
    name: 'Sơn Gel',
    description: 'Sơn gel bền lâu với nhiều màu sắc để lựa chọn, giữ từ 2-3 tuần.',
    category: 'polish',
    price: 30,
    duration: 45,
    active: true
  },
  {
    id: 4,
    name: 'Nail Art Đơn Giản',
    description: 'Trang trí móng đơn giản với các họa tiết nhỏ, kim tuyến hoặc dán đá.',
    category: 'art',
    price: 15,
    duration: 20,
    active: true
  },
  {
    id: 5,
    name: 'Đắp Bột Acrylic',
    description: 'Đắp bột acrylic để tạo độ dài và bảo vệ móng tự nhiên.',
    category: 'extension',
    price: 50,
    duration: 90,
    active: true
  },
  {
    id: 6,
    name: 'Đắp Gel',
    description: 'Đắp gel UV để tạo độ dài và bảo vệ móng tự nhiên, bền hơn acrylic.',
    category: 'extension',
    price: 55,
    duration: 90,
    active: true
  },
  {
    id: 7,
    name: 'Vẽ Móng Nghệ Thuật',
    description: 'Vẽ móng nghệ thuật phức tạp với các họa tiết theo yêu cầu.',
    category: 'art',
    price: 45,
    duration: 60,
    active: false
  },
  {
    id: 8,
    name: 'Tẩy Gel/Acrylic',
    description: 'Tẩy bỏ gel hoặc acrylic an toàn không làm hư hại móng.',
    category: 'removal',
    price: 20,
    duration: 30,
    active: true
  }
])

// Category options
const categoryOptions = [
  { label: 'Tất cả', value: null },
  { label: 'Manicure', value: 'manicure' },
  { label: 'Pedicure', value: 'pedicure' },
  { label: 'Sơn Gel/Sơn Thường', value: 'polish' },
  { label: 'Nail Art', value: 'art' },
  { label: 'Đắp Móng', value: 'extension' },
  { label: 'Tẩy Móng', value: 'removal' }
]

// Form model
const formModel = reactive<ServiceFormData>({
  name: '',
  description: '',
  category: '',
  price: 0,
  duration: 30,
  active: true
})

// Form rules
const rules = {
  name: {
    required: true,
    message: 'Vui lòng nhập tên dịch vụ',
    trigger: 'blur'
  },
  category: {
    required: true,
    message: 'Vui lòng chọn danh mục',
    trigger: 'change'
  },
  price: {
    required: true,
    type: 'number',
    message: 'Vui lòng nhập giá tiền',
    trigger: ['blur', 'change']
  },
  duration: {
    required: true,
    type: 'number',
    message: 'Vui lòng nhập thời gian',
    trigger: ['blur', 'change']
  }
}

// Format currency
const formatCurrency = (amount: number) => {
  return `$${amount.toFixed(2)}`
}

// Format duration
const formatDuration = (minutes: number) => {
  return `${minutes} phút`
}

// Table columns
const columns = computed<DataTableColumns<ServiceData>>(() => [
  {
    title: 'Tên dịch vụ',
    key: 'name',
    sorter: 'default'
  },
  {
    title: 'Danh mục',
    key: 'category',
    render(row) {
      const category = categoryOptions.find(cat => cat.value === row.category)
      return category ? category.label : row.category
    },
    sorter: 'default'
  },
  {
    title: 'Giá tiền',
    key: 'price',
    render(row) {
      return formatCurrency(row.price)
    },
    sorter: (a, b) => a.price - b.price
  },
  {
    title: 'Thời gian',
    key: 'duration',
    render(row) {
      return formatDuration(row.duration)
    },
    sorter: (a, b) => a.duration - b.duration
  },
  {
    title: 'Trạng thái',
    key: 'active',
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
                  backgroundColor: row.active ? '#18a058' : '#d03050',
                  marginRight: '8px'
                }
              }
            ),
            row.active ? 'Đang hoạt động' : 'Ngưng hoạt động'
          ]
        }
      )
    },
    sorter: (a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1)
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
])

// Pagination
const pagination = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 30],
  onChange: (page: number) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  }
})

// Filtered services based on search and category
const filteredServices = computed(() => {
  let result = services.value
  
  // Apply search filter
  if (searchValue.value) {
    const searchLower = searchValue.value.toLowerCase()
    result = result.filter(
      item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
    )
  }
  
  // Apply category filter
  if (filterCategory.value) {
    result = result.filter(item => item.category === filterCategory.value)
  }
  
  return result
})

// Reset filters
const handleReset = () => {
  searchValue.value = ''
  filterCategory.value = null
}

// Open add service modal
const openAddServiceModal = () => {
  modalMode.value = 'add'
  Object.assign(formModel, {
    name: '',
    description: '',
    category: '',
    price: 0,
    duration: 30,
    active: true
  })
  showModal.value = true
}

// Edit service
const handleEdit = (row: ServiceData) => {
  modalMode.value = 'edit'
  Object.assign(formModel, { 
    name: row.name,
    description: row.description,
    category: row.category,
    price: row.price,
    duration: row.duration,
    active: row.active,
    _id: row.id
  })
  showModal.value = true
}

// Delete service
const handleDelete = (row: ServiceData) => {
  services.value = services.value.filter(item => item.id !== row.id)
  message.success('Đã xóa dịch vụ thành công')
}

// Submit form
const handleSubmit = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      loading.value = true
      // Simulate API call
      setTimeout(() => {
        if (modalMode.value === 'edit' && formModel._id !== undefined) {
          // Update existing service
          const index = services.value.findIndex(s => s.id === formModel._id)
          if (index !== -1) {
            services.value[index] = {
              id: formModel._id,
              name: formModel.name,
              description: formModel.description,
              category: formModel.category,
              price: formModel.price,
              duration: formModel.duration,
              active: formModel.active
            }
          }
          message.success('Cập nhật dịch vụ thành công')
        } else {
          // Add new service
          const newService: ServiceData = {
            id: Math.max(0, ...services.value.map(s => s.id)) + 1,
            name: formModel.name,
            description: formModel.description,
            category: formModel.category,
            price: formModel.price,
            duration: formModel.duration,
            active: formModel.active
          }
          services.value.push(newService)
          message.success('Thêm dịch vụ thành công')
        }
        showModal.value = false
        loading.value = false
      }, 1000)
    }
  })
}
</script>

<style scoped>
.services-container {
  padding: 16px;
}

.services-card {
  margin-bottom: 24px;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  align-items: center;
}
</style> 