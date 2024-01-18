


<script setup>
import { ref, onMounted } from 'vue'
import LeaveRequestsDisplay from '@/components/LeaveRequestsDisplay.vue'
import { db } from '@/js/firebase.js'
import { collection, onSnapshot } from 'firebase/firestore'

const leaveRequests = ref([])
async function getLeaveRequests() {
  onSnapshot(collection(db, 'leaveRequests'), (querySnapshot) => {
    try {
      let leaveRequestsSnapshot = []
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data())
        let leaveRequest = {
            id: doc.id,
            duration: doc.data().duration,
            leave_date: doc.data().leave_date,
            reason: doc.data().reason,
            owner: doc.data().owner,
        }
        leaveRequestsSnapshot.push(leaveRequest)
      })
      leaveRequests.value = leaveRequestsSnapshot
      console.log('Leave requests retrieved:', leaveRequests.value)
    } catch (error) {
      console.error('Error fetching leave requests:', error)
    }
  })
}

onMounted(async () => {
  await getLeaveRequests()
})
</script>

<template>
  <div id="home">
    <div class="home-header">
      <h1>LEAVE REQUESTS</h1>
    </div>
    <div>
      <LeaveRequestsDisplay :leaveRequests="leaveRequests" />
    </div>
  </div>
</template>

<style scoped>
#home {
  margin-top: 50px;
  padding: 0 10px;
}
.home-header {
  margin-bottom: 20px;
  text-align: center;
  align-items: center;
  color: #d3e2fc;
  justify-content: center;
}
</style>