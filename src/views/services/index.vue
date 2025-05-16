<template>
  <div class="services-container">
    <n-card title="Service Management" class="services-card">
      <template #header-extra>
        <n-button type="primary" @click="openAddServiceModal">
          <template #icon>
            <n-icon><AddOutline /></n-icon>
          </template>
          Add Service
        </n-button>
      </template>

      <!-- Search and filters -->
      <div class="action-bar">
        <n-input
          v-model:value="searchValue"
          placeholder="Search services..."
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
            placeholder="Filter by category"
            style="width: 180px"
          />
          <n-button @click="handleReset">
            <template #icon>
              <n-icon><RefreshOutline /></n-icon>
            </template>
            Reset
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
      <n-modal v-model:show="showModal" preset="card" :title="modalMode === 'add' ? 'Add New Service' : 'Edit Service'" style="width: 600px">
        <n-form
          ref="formRef"
          :model="formModel"
          :rules="rules"
          label-placement="left"
          label-width="120px"
          require-mark-placement="right-hanging"
        >
          <n-form-item label="Service Name" path="name">
            <n-input v-model:value="formModel.name" placeholder="Enter service name" />
          </n-form-item>
          <n-form-item label="Category" path="category">
            <n-select
              v-model:value="formModel.category"
              :options="categoryOptions"
              placeholder="Select category"
            />
          </n-form-item>
          <n-form-item label="Price" path="price">
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
          <n-form-item label="Duration" path="duration">
            <n-input-number
              v-model:value="formModel.duration"
              :min="5"
              :step="5"
              style="width: 100%"
            >
              <template #suffix>minutes</template>
            </n-input-number>
          </n-form-item>
          <n-form-item label="Description" path="description">
            <n-input
              v-model:value="formModel.description"
              type="textarea"
              placeholder="Enter service description"
            />
          </n-form-item>
          <n-form-item label="Status" path="active">
            <n-switch v-model:value="formModel.active">
              <template #checked>Active</template>
              <template #unchecked>Inactive</template>
            </n-switch>
          </n-form-item>
        </n-form>

        <template #footer>
          <n-space justify="end">
            <n-button @click="showModal = false">Cancel</n-button>
            <n-button type="primary" @click="handleSubmit">Save</n-button>
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
    name: 'Basic Manicure',
    description: 'Basic manicure service includes cutting, filing, cuticle care and single color polish.',
    category: 'manicure',
    price: 25,
    duration: 30,
    active: true
  },
  {
    id: 2,
    name: 'Basic Pedicure',
    description: 'Basic pedicure service includes cleaning, cutting, filing, cuticle care and toenail polish.',
    category: 'pedicure',
    price: 35,
    duration: 45,
    active: true
  },
  {
    id: 3,
    name: 'Gel Polish',
    description: 'Long-lasting gel polish with many colors to choose from, lasts 2-3 weeks.',
    category: 'polish',
    price: 30,
    duration: 45,
    active: true
  },
  {
    id: 4,
    name: 'Simple Nail Art',
    description: 'Simple nail decorations with small patterns, glitter or rhinestones.',
    category: 'art',
    price: 15,
    duration: 20,
    active: true
  },
  {
    id: 5,
    name: 'Acrylic Overlay',
    description: 'Acrylic overlay to add length and protect natural nails.',
    category: 'extension',
    price: 50,
    duration: 90,
    active: true
  },
  {
    id: 6,
    name: 'Gel Extension',
    description: 'UV gel extension to add length and protect natural nails, more durable than acrylic.',
    category: 'extension',
    price: 55,
    duration: 90,
    active: true
  },
  {
    id: 7,
    name: 'Artistic Nail Design',
    description: 'Complex artistic nail designs with custom patterns.',
    category: 'art',
    price: 45,
    duration: 60,
    active: false
  },
  {
    id: 8,
    name: 'Gel/Acrylic Removal',
    description: 'Safe removal of gel or acrylic without damaging natural nails.',
    category: 'removal',
    price: 20,
    duration: 30,
    active: true
  }
])

// Category options
const categoryOptions = [
  { label: 'All', value: null },
  { label: 'Manicure', value: 'manicure' },
  { label: 'Pedicure', value: 'pedicure' },
  { label: 'Gel/Regular Polish', value: 'polish' },
  { label: 'Nail Art', value: 'art' },
  { label: 'Extensions', value: 'extension' },
  { label: 'Removal', value: 'removal' }
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
    message: 'Please enter service name',
    trigger: 'blur'
  },
  category: {
    required: true,
    message: 'Please select a category',
    trigger: 'change'
  },
  price: {
    required: true,
    type: 'number',
    message: 'Please enter price',
    trigger: ['blur', 'change']
  },
  duration: {
    required: true,
    type: 'number',
    message: 'Please enter duration',
    trigger: ['blur', 'change']
  }
}

// Format currency
const formatCurrency = (amount: number) => {
  return `$${amount.toFixed(2)}`
}

// Format duration
const formatDuration = (minutes: number) => {
  return `${minutes} minutes`
}

// Table columns
const columns = computed<DataTableColumns<ServiceData>>(() => [
  {
    title: 'Service Name',
    key: 'name',
    sorter: 'default'
  },
  {
    title: 'Category',
    key: 'category',
    render(row) {
      const category = categoryOptions.find(cat => cat.value === row.category)
      return category ? category.label : row.category
    },
    sorter: 'default'
  },
  {
    title: 'Price',
    key: 'price',
    render(row) {
      return formatCurrency(row.price)
    },
    sorter: (a, b) => a.price - b.price
  },
  {
    title: 'Duration',
    key: 'duration',
    render(row) {
      return formatDuration(row.duration)
    },
    sorter: (a, b) => a.duration - b.duration
  },
  {
    title: 'Status',
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
            row.active ? 'Active' : 'Inactive'
          ]
        }
      )
    },
    sorter: (a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1)
  },
  {
    title: 'Actions',
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
                ' Edit'
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
                ' Delete'
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
  message.success('Service deleted successfully')
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
          message.success('Service updated successfully')
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
          message.success('Service added successfully')
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