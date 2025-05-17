<template>
  <div class="staff-page">
    <n-space vertical size="large">
      <!-- Staff Cards Section -->
      <n-card title="Staff List" class="staff-list-container">
        <n-grid :cols="5" :x-gap="12" :y-gap="12" responsive="screen">
          <n-grid-item v-for="staff in staffList" :key="staff.id">
            <staff-card 
              :staff="staff" 
              @select-staff="handleSelectStaff"
            />
          </n-grid-item>
        </n-grid>
      </n-card>
    </n-space>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  NCard, 
  NGrid, 
  NGridItem, 
  NSpace, 
  useMessage 
} from 'naive-ui'
import StaffCard from './components/StaffCard.vue'
import staffList from './staff'

const message = useMessage()
const selectedStaff = ref<any>(null) // Store selected staff

// Handle staff selection from staff card
const handleSelectStaff = (staff) => {
  selectedStaff.value = staff;
  message.success(`Selected ${staff.name}`);
}

</script>

<style>
.staff-page {
  padding: 16px;
}

.staff-list-container {
  margin-bottom: 20px;
}
</style>
