<script setup>
const props = defineProps({
  leaveRequest: {
    type: Object,
    required: true
  }
})
</script>

<script>
export default {
  data: () => ({
    show: false
  })
}
</script>

<template>
  <div class="leaveRequest">
    <div class="request__body">
      <h6 class="request__date">
        <img src="/icon-clock.svg" alt="clock" />
        {{ props.leaveRequest.leave_date }}
      </h6>
    </div>
    <div class="line"></div>
    <div class="request__owner">
      <p>
        <span>Requested by </span>
        <span class="name">{{ props.leaveRequest.owner.name }}</span>
        <span> for </span>
        <span class="name">{{ props.leaveRequest.duration }}</span>
        <span> days </span>
      </p>
    </div>
    <div class="line"></div>
    <p class="request__reason">{{ props.leaveRequest.reason }}</p>
  </div>
</template>

<style lang="scss" scoped>
.leaveRequest {
  --shadow-color: rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  width: 100%;
  max-width: 500px;
  color: #94a5bc;
  background-color: #0d2037;
  border-radius: 1rem;
  box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.418);
  padding: 1.5rem;
}

.request__reason {
  color: #99a8c2;
  font-size: 18px;
  font-weight: 300;
  line-height: 25px;
  margin-top: 16px;
}

.request__body {
  display: flex;
  justify-content: space-between;
  .request__date {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #8bacd9;
    font-weight: 100;
    font-size: 30px;
  }
}
.request__owner {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  font-size: 20px;

  span {
    font-weight: 300;
    &.name {
      color: white;
      &:hover {
        color: #d3e2fc;
        cursor: pointer;
      }
    }
  }
}

.line {
  height: 1px;
  width: 100%;
  background: #172b3c;
}
</style>
