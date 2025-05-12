<script setup lang="ts">
import { ref } from 'vue'

// Sample data for appointments
const upcomingAppointments = ref([
  {
    customer: 'Jane Smith',
    service: 'Manicure + Gel Polish',
    time: '10:00 AM',
    status: 'Confirmed',
    color: '#f37b1c'
  },
  {
    customer: 'Emily Johnson',
    service: 'Full Set Acrylic',
    time: '11:30 AM',
    status: 'Pending',
    color: '#18a058'
  },
  {
    customer: 'Sarah Williams',
    service: 'Nail Art + Gel Polish',
    time: '1:45 PM',
    status: 'Confirmed',
    color: '#2080f0'
  },
  {
    customer: 'Michael Brown',
    service: 'Pedicure',
    time: '3:00 PM',
    status: 'Confirmed',
    color: '#8a2be2'
  }
])

// Sample data for notifications
const notifications = ref([
  {
    title: 'New Customer',
    message: 'Sarah Williams just registered',
    time: '10 minutes ago'
  },
  {
    title: 'Appointment Cancelled',
    message: 'John Davis cancelled his 5 PM appointment',
    time: '1 hour ago'
  },
  {
    title: 'Low Stock Alert',
    message: 'Gel polish in "Ruby Red" is running low',
    time: '3 hours ago'
  }
])
</script>

<template>
  <div class="dashboard-container">
    <n-grid :cols="24" :x-gap="16" :y-gap="16">
      <!-- Welcome Card -->
      <n-grid-item :span="24">
        <n-card>
          <template #header>
            <div class="welcome-header">
              <h2>Welcome to Hannah Nails</h2>
              <n-tag type="success">Professional Salon Management</n-tag>
            </div>
          </template>
          <div class="welcome-message">
            <p>This system helps you manage your nail salon business efficiently.</p>
            <p>Use the sidebar to navigate to different features.</p>
          </div>
        </n-card>
      </n-grid-item>

      <!-- Stats Cards -->
      <n-grid-item :span="6">
        <n-card title="Customers">
          <div class="stat-card">
            <span class="stat-value">148</span>
            <span class="stat-label">Total Customers</span>
          </div>
        </n-card>
      </n-grid-item>

      <n-grid-item :span="6">
        <n-card title="Appointments">
          <div class="stat-card">
            <span class="stat-value">12</span>
            <span class="stat-label">Today's Appointments</span>
          </div>
        </n-card>
      </n-grid-item>

      <n-grid-item :span="6">
        <n-card title="Services">
          <div class="stat-card">
            <span class="stat-value">36</span>
            <span class="stat-label">Available Services</span>
          </div>
        </n-card>
      </n-grid-item>

      <n-grid-item :span="6">
        <n-card title="Staff">
          <div class="stat-card">
            <span class="stat-value">8</span>
            <span class="stat-label">Active Staff</span>
          </div>
        </n-card>
      </n-grid-item>

      <!-- Upcoming Appointments -->
      <n-grid-item :span="16">
        <n-card title="Upcoming Appointments">
          <n-list>
            <n-list-item v-for="(appointment, index) in upcomingAppointments" :key="index">
              <n-thing :title="appointment.customer" :description="appointment.service">
                <template #avatar>
                  <n-avatar
                    round
                    :style="{
                      backgroundColor: appointment.color
                    }"
                  >
                    {{ appointment.customer.charAt(0) }}
                  </n-avatar>
                </template>
                <template #header-extra>
                  <n-tag :type="appointment.status === 'Confirmed' ? 'success' : 'warning'">
                    {{ appointment.status }}
                  </n-tag>
                </template>
                <template #description>
                  <span class="appointment-time">{{ appointment.time }}</span>
                  <span> - {{ appointment.service }}</span>
                </template>
              </n-thing>
            </n-list-item>
          </n-list>
        </n-card>
      </n-grid-item>

      <!-- Notifications -->
      <n-grid-item :span="8">
        <n-card title="Notifications">
          <n-list>
            <n-list-item v-for="(notification, index) in notifications" :key="index">
              <n-thing :title="notification.title">
                <template #description>
                  <span>{{ notification.message }}</span>
                  <div class="notification-time">{{ notification.time }}</div>
                </template>
              </n-thing>
            </n-list-item>
          </n-list>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 16px;
}

.welcome-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.welcome-header h2 {
  margin: 0;
  font-size: 20px;
}

.welcome-message {
  color: var(--text-color);
}

.welcome-message p {
  margin: 8px 0;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: var(--primary-color);
}

.stat-label {
  margin-top: 8px;
  font-size: 14px;
  color: var(--text-color);
}

.appointment-time {
  font-weight: bold;
}

.notification-time {
  font-size: 12px;
  color: var(--text-color-3);
  margin-top: 4px;
}
</style> 