<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { NButton, NDatePicker, NForm, NFormItemGi, NGrid, NInput, NInputNumber, NModal, NSelect, NSpace, NCheckbox } from 'naive-ui'

interface BookingForm {
  title: string
  content: string
  date: number | null
  time: number | null
  guestName: string
  phone: string
  email: string
  status: string
  participants: number
  services: string[]
  staffId: string | null
  mergeWithPrevious: boolean
}

interface Props {
  visible: boolean
  type?: ModalType
  modalData?: any
}

const {
  visible,
  type = 'add',
  modalData = null,
} = defineProps<Props>()

const emit = defineEmits<Emits>()

const defaultFormModal: BookingForm = {
  title: '',
  content: '',
  date: null,
  time: null,
  guestName: '',
  phone: '',
  email: '',
  status: 'Pending',
  participants: 1,
  services: [],
  staffId: null,
  mergeWithPrevious: false
}

const formModel = ref({ ...defaultFormModal })

interface Emits {
  (e: 'update:visible', visible: boolean): void
  (e: 'submit', formData: BookingForm): void
}

const modalVisible = computed({
  get() {
    return visible
  },
  set(visible) {
    closeModal(visible)
  },
})

function closeModal(visible = false) {
  emit('update:visible', visible)
}

type ModalType = 'add' | 'edit'

const title = computed(() => {
  const titles: Record<ModalType, string> = {
    add: 'Thêm lịch hẹn',
    edit: 'Chỉnh sửa lịch hẹn',
  }
  return titles[type]
})

const statusOptions = [
  { label: 'Đang chờ', value: 'Pending' },
  { label: 'Đã xác nhận', value: 'Confirmed' },
  { label: 'Đã hoàn thành', value: 'Completed' },
  { label: 'Đã hủy', value: 'Cancelled' }
]

const serviceOptions = [
  { label: 'Làm móng', value: 'Nails' },
  { label: 'Làm tóc', value: 'Hair' },
  { label: 'Spa', value: 'Spa' },
  { label: 'Massage', value: 'Massage' },
  { label: 'Trang điểm', value: 'Makeup' }
]

const staffOptions = [
  { label: 'Nhân viên 1', value: 'staff1' },
  { label: 'Nhân viên 2', value: 'staff2' },
  { label: 'Nhân viên 3', value: 'staff3' },
  { label: 'Nhân viên 4', value: 'staff4' }
]

function generateTimeOptions() {
  const startTime = new Date();
  startTime.setHours(9, 0, 0, 0);
  
  const endTime = new Date();
  endTime.setHours(17, 30, 0, 0);
  
  const interval = 15; // minutes
  const options = [];
  
  let currentTime = new Date(startTime);
  
  while (currentTime <= endTime) {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
    const timeValue = currentTime.getTime();
    const timeLabel = `${formattedHours}:${formattedMinutes}`;
    
    options.push({
      label: timeLabel,
      value: timeValue
    });
    
    currentTime = new Date(currentTime.getTime() + interval * 60000);
  }
  
  return options;
}

const timeOptions = generateTimeOptions();

function UpdateFormModelByModalType() {
  const handlers = {
    add: () => {
      formModel.value = { ...defaultFormModal }
    },
    edit: () => {
      if (modalData)
        formModel.value = { ...modalData }
    },
  }
  handlers[type]()
}

function submitForm() {
  emit('submit', formModel.value)
  closeModal()
}

watch(
  () => visible,
  (newValue) => {
    if (newValue)
      UpdateFormModelByModalType()
  },
)
</script>

<template>
  <n-modal
    v-model:show="modalVisible"
    :mask-closable="false"
    preset="card"
    :title="title"
    class="w-700px"
    :segmented="{
      content: true,
      action: true,
    }"
  >
    <n-form label-placement="left" :model="formModel" label-align="left" :label-width="100">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-gi :span="24" label="Tiêu đề" path="title">
          <n-input v-model:value="formModel.title" placeholder="Nhập tiêu đề lịch hẹn" />
        </n-form-item-gi>
        
        <n-form-item-gi :span="12" label="Ngày hẹn" path="date">
          <n-date-picker v-model:value="formModel.date" type="date" clearable style="width: 100%" />
        </n-form-item-gi>
        
        <n-form-item-gi :span="12" label="Giờ hẹn" path="time">
          <n-select v-model:value="formModel.time" :options="timeOptions" filterable clearable style="width: 100%" />
        </n-form-item-gi>
        
        <n-form-item-gi :span="12" label="Tên khách" path="guestName">
          <n-input v-model:value="formModel.guestName" placeholder="Nhập tên khách hàng" />
        </n-form-item-gi>
        
        <n-form-item-gi :span="12" label="Số điện thoại" path="phone">
          <n-input v-model:value="formModel.phone" placeholder="Nhập số điện thoại" />
        </n-form-item-gi>
        
        <n-form-item-gi :span="12" label="Email" path="email">
          <n-input v-model:value="formModel.email" placeholder="Nhập email" />
        </n-form-item-gi>
        
        <n-form-item-gi :span="12" label="Trạng thái" path="status">
          <n-select v-model:value="formModel.status" :options="statusOptions" />
        </n-form-item-gi>
        
        <n-form-item-gi :span="12" label="Nhân viên" path="staffId">
          <n-select v-model:value="formModel.staffId" :options="staffOptions" placeholder="Chọn nhân viên" />
        </n-form-item-gi>
        
        <n-form-item-gi :span="12" label="Số người" path="participants">
          <n-input-number v-model:value="formModel.participants" :min="1" />
        </n-form-item-gi>
        
        <n-form-item-gi :span="12" label="Dịch vụ" path="services">
          <n-select v-model:value="formModel.services" :options="serviceOptions" multiple />
        </n-form-item-gi>
        
        <n-form-item-gi :span="24" label="Ghi chú" path="content">
          <n-input 
            v-model:value="formModel.content" 
            type="textarea" 
            placeholder="Nhập ghi chú về lịch hẹn"
            :autosize="{
              minRows: 3,
              maxRows: 5
            }" 
          />
        </n-form-item-gi>
        
        <n-form-item-gi :span="24">
          <n-checkbox v-model:checked="formModel.mergeWithPrevious">
            Gộp với lịch hẹn trước đó
          </n-checkbox>
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <template #action>
      <n-space justify="center">
        <n-button @click="closeModal()">
          Hủy
        </n-button>
        <n-button type="primary" @click="submitForm">
          Lưu lịch hẹn
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped></style>
