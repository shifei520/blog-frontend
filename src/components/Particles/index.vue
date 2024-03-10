<template>
  <div id="particles-js"></div>
</template>
<script setup lang="ts" name="Particles">
import 'particles.js';
import particlesJson from './particles.json';
import { onMounted } from 'vue';
onMounted(() => {
  window.particlesJS('particles-js', particlesJson);
});
</script>
<style lang="scss" scoped>
#particles-js {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background-color: #232741;
}
</style>
