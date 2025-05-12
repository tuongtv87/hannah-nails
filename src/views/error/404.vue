<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="error-page">
    <div class="error-container">
      <h1 class="error-code">404</h1>
      <h2 class="error-title">Page Not Found</h2>
      <p class="error-message">
        The page you are looking for does not exist or has been moved.
      </p>
      <div class="error-actions">
        <n-button type="primary" @click="goHome">
          Back to Home
        </n-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.error-container {
  text-align: center;
  max-width: 500px;
  padding: 40px;
}

.error-code {
  font-size: 120px;
  color: var(--primary-color);
  margin: 0;
  line-height: 1;
}

.error-title {
  font-size: 30px;
  margin: 10px 0 20px;
}

.error-message {
  font-size: 16px;
  color: var(--text-color-3);
  margin-bottom: 30px;
}

.error-actions {
  margin-top: 20px;
}
</style> 