<template>
  <div class="layout h-full">
    <NavBar />
    <div class="layout-main h-full">
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animated animate__fadeIn"
          leave-active-class="animated animate__fadeOut"
          :duration="{ enter: 800, leave: 500 }"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script setup lang="ts" name="Layout">
import NavBar from './components/NavBar.vue';
</script>
