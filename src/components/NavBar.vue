<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import { auth } from '@/js/firebase'
import { signOut } from 'firebase/auth'
import router from '@/router/index.js'

const isLoggedIn = ref(false)

onMounted(() => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

function userSignOut() {
  signOut(auth)
    .then(() => {
      console.log('Signed Out')
      router.push('/')
    })
    .catch((error) => {
      console.log('Cannot Sign Out !!!')
      console.log(error)
    })
}
</script>

<template>
  <div class="navbar">
    <nav class="navbar-menu">
      <div class="navbar-menu-left">
        <span class="menu-logo">
          <h1>SWE HR</h1>
        </span>
        <span class="menu-item" :class="{ 'current-page': $route.path === '/' }">
          <RouterLink to="/">Home</RouterLink>
        </span>

        <span
          class="menu-item"
          v-if="!isLoggedIn"
          :class="{ 'current-page': $route.path === '/login' }"
        >
          <RouterLink to="/login">Login</RouterLink>
        </span>

        <span
          class="menu-item"
          v-if="!isLoggedIn"
          :class="{ 'current-page': $route.path === '/register' }"
        >
          <RouterLink to="/register">Register</RouterLink>
        </span>

        <span
          class="menu-item"
          v-if="isLoggedIn"
          :class="{ 'current-page': $route.path === '/request' }"
        >
          <RouterLink to="/request">Request</RouterLink>
        </span>
      </div>

      <div class="navbar-menu-right">
        <span class="menu-item" v-if="isLoggedIn">
          <button @click.prevent="userSignOut" class="sign-out-button">Sign Out</button>
        </span>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
  background-color: #061b2b;
}
.navbar-menu {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  .menu-logo {
    margin-right: 20px;
    color: #ffcb2b;
  }
  .menu-item {
    margin: 10px;
    color: #d3e2fc;
  }
  .menu-item a {
    text-decoration: none;
    color: #d3e2fc;
  }
  .menu-item a:visited {
    color: #d3e2fc;
  }

  .menu-item:hover {
    background-color: #092a43;
    color: #94a5bc;
  }
}
.navbar-menu-left {
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar-menu-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide-enter {
  transform: scaleY(0);
}
.slide-leave-to {
  transform: scaleY(0);
}

.sign-out-button {
  color: #d3e2fc;
  background: none;
  border: none;
  cursor: pointer;
}

.sign-out-button:hover {
  background-color: #092a43;
  color: #94a5bc;
}

.current-page {
  box-shadow: inset 0px -1px 0px #afcbfb;
}
</style>
