<template>
  <n-card class="staff-card" hoverable @click="handleClick">
    <template #header>
      <div class="staff-header">
        <n-avatar 
          :size="48" 
          :src="staff.avatar" 
          :fallback-src="defaultAvatar"
          round
        />
        <div class="staff-name">{{ staff.name }}</div>
      </div>
    </template>
    
    <div class="staff-info">
      <n-space vertical size="small">
        <div class="info-row">
          <n-icon><mail-outlined /></n-icon>
          <div class="info-text">{{ staff.email }}</div>
        </div>
        <div class="info-row">
          <n-icon><phone-outlined /></n-icon>
          <div class="info-text">{{ staff.phone }}</div>
        </div>
      </n-space>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  NCard, 
  NAvatar, 
  NButton, 
  NSpace,
  NIcon,
} from 'naive-ui'
import { MailOutlined, PhoneOutlined } from '@vicons/antd'

// Định nghĩa interface Staff nếu chưa có
interface Staff {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
}

const props = defineProps<{
  staff: Staff;
}>();

const emit = defineEmits(['select-staff']);

// URL avatar mặc định nếu ảnh không tải được
const defaultAvatar = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';

// Hàm xử lý khi click vào card
const handleClick = () => {
  // Có thể thêm hành động khi click vào card ở đây
  console.log('Staff card clicked:', props.staff);
};

// Hàm xử lý khi chọn nhân viên
const onSelectStaff = () => {
  emit('select-staff', props.staff);
};
</script>

<style scoped>
.staff-card {
  height: 100%;
  min-height: 180px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.staff-card:hover {
  transform: translateY(-5px);
}

.staff-header {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.staff-name {
  font-weight: bold;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  word-break: break-word;
}

.staff-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
  width: 100%;
}

.info-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  width: 100%;
}

.info-text {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
  flex: 1;
}

@media (max-width: 768px) {
  .staff-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .info-row {
    flex-direction: column;
  }
}
</style> 