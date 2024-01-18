// TODO: // - add warning that requests cannot be deleted // - add request upload form which
redirects to home after success

<script setup>
import { ref, computed } from 'vue';
import { auth } from '@/js/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/js/firebase.js'
import router from '@/router/index.js'

const duration = ref('')
const reason = ref('')
const leave_date = ref('')

async function submitRequest() {
  try {
    const user = auth.currentUser
    const userLeaveRequestsRef = collection(db, 'leaveRequests')

    const docRef = await addDoc(userLeaveRequestsRef, {
      duration: duration.value,
      leave_date: leave_date.value,
      reason: reason.value,
      owner: {
        id: user.uid,
        name: user.displayName,
        email: user.email
      }
    })
    console.log('Document written with ID: ', docRef.id)
    router.push('/')
  } catch (error) {
    console.error('Error submitting request:', error)
  }
}
const isSubmitDisabled = computed(() => {
  return !reason.value || !duration.value || !leave_date.value
})
</script>

<template>
  <div class="request">
    <div class="request__text">REQUEST LEAVE</div>

    <form @submit.prevent="submitRequest">
      <div class="request__field">
        <input
          v-model="reason"
          id="reason"
          type="text"
          placeholder="Explain why you need the leave..."
        />
      </div>

      <div class="request__field">
        <input
          v-model="duration"
          id="duration"
          type="number"
          placeholder="Enter duration in days..."
          min="1"
        />
      </div>

      <div class="request__field">
        <input v-model="leave_date" id="leave_date" type="date" placeholder="Select date..." />
      </div>

      <button type="submit" :disabled="isSubmitDisabled">Submit</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.request {
  --shadow-color: rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 370px;
  color: #94a5bc;
  background-color: #0d2037;
  border-radius: 1rem;
  box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.418);
  padding: 1.5rem;
}
.request__text {
  font-size: 40px;
  color: #7dacf9;
  font-weight: 600;
  letter-spacing: 2px;
}
form {
  .request__field {
    margin-top: 20px;
    display: flex;
    width: 320px;
    .request__box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      width: 60px;
      color: #94a5bc;
      border: 1px solid #485c73;
      border-radius: 5px 0 0 5px;
      border-right: none;
      background: #021524;
      .icon {
        max-width: 30px;
        max-height: 30px;
      }
    }

    label {
      margin: 0 10px;
    }
  }
}
input,
form button {
  height: 50px;
  width: 100%;
  outline: none;
  font-size: 19px;
  color: #99a8c2;
  padding: 0 15px;
  border-radius: 0 5px 5px 0;
  border: 1px solid #485c73;
  caret-color: white;
  background: #051726;
}
form button {
  border-radius: 5px;
}
input:focus {
  color: #7dacf9;
  background: #0f2137;
  border: 1px solid #7dacf9;
}
button {
  margin-top: 20px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
}
button:hover {
  color: #d3e2fc;
  border: 1px solid #7dacf9;
  background: #0f2137;
}
</style>
