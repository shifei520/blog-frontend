<template>
  <div class="float-button">
    <button class="action-btn" @click="showCategory">
      <svg-icon name="category"></svg-icon>
      <p class="text">分类</p>
    </button>
    <button class="action-btn" @click="backToTop">
      <svg-icon name="arrow-up"></svg-icon>
      <p class="text">Back to Top</p>
    </button>
  </div>
</template>
<script setup lang="ts" name="FloatButton">
const emit = defineEmits(['back-to-top', 'show-category']);

/** 返回滚动台顶部 */
const backToTop = () => {
  emit('back-to-top');
};

/** 展示分类组件 */
const showCategory = () => {
  emit('show-category');
};
</script>
<style lang="scss" scoped>
.float-button {
  position: fixed;
  right: 20px;
  bottom: 40px;
  display: none;

  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
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

    &:nth-child(n + 2) {
      margin-top: 12px;
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
