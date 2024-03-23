<template>
  <button class="back-top-btn" @click="backToTop">
    <svg-icon name="arrow-up"></svg-icon>
    <p class="text">Back to Top</p>
  </button>
</template>
<script setup lang="ts" name="BackTop">
const backToTop = () => {
  window.scrollTo(0, 0);
};
</script>
<style lang="scss" scoped>
.back-top-btn {
  position: fixed;
  right: 20px;
  bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  color: #fff;
  cursor: pointer;
  background-color: #838996;
  border-radius: 50%;

  .text {
    position: absolute;
    bottom: -18px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    font-size: 12px;
    opacity: 0;
    transition-duration: 0.7s;
  }

  &:hover {
    .text {
      opacity: 1;
      transition-duration: 0.7s;
    }

    .svg-icon {
      animation: slide-in-bottom 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }
  }
}

@keyframes slide-in-bottom {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
