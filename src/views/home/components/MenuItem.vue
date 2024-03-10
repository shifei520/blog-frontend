<template>
  <div class="menu-item">
    <span class="menu-title">{{ title }}</span>
  </div>
</template>
<script setup lang="ts" name="MenuItem">
defineProps<{
  title: string;
}>();
</script>
<style lang="scss" scoped>
.menu-item {
  padding: 10px 20px;
  cursor: pointer;
  background-color: rgb(255 255 255 / 10%);
  backdrop-filter: blur(3px);
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 100px;
  box-shadow: 2px 2px 2px rgb(0 0 0 / 10%);
  transition: all 0.3s;

  .menu-title {
    color: #f5f5f5;
    text-shadow: 0 0 2px rgb(0 0 0 / 10%);
  }

  &:hover {
    background-color: rgb(255 255 255 / 20%);
    border: 1px solid rgb(255 255 255 / 30%);
  }
}
</style>
