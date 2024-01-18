<script setup>
import { onMounted } from 'vue'
import LeaveRequestItem from '@/components/LeaveRequestItem.vue'

defineProps({
  leaveRequests: {
    required: true
  }
})

onMounted(async () => {
  console.log('Connecting to Firebase')
})
</script>

<template>
  <div class="box">
    <div class="leaveRequests">
      <LeaveRequestItem
        v-for="leaveRequest in leaveRequests"
        :key="leaveRequest.id"
        :leaveRequest="leaveRequest"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
main {
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.box {
  padding: 20px;
}
.leaveRequests {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}
</style>
