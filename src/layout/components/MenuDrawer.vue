<template>
  <div class="drawer-container" :class="{ expend: modelValue }">
    <!-- 遮罩层 -->
    <div class="overlay" @click.stop="closeHandle"></div>
    <div class="menu-drawer hidden-scrollbar">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts" name="MenuDrawer">
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
  }>(),
  {
    modelValue: false,
  },
);
const emit = defineEmits(['update:modelValue']);

/** 关闭 */
const closeHandle = () => {
  emit('update:modelValue', false);
};
</script>
<style lang="scss" scoped>
.drawer-container {
  position: relative;

  .overlay {
    position: fixed;
    inset: 0;
    z-index: 99;
    display: none;
    background: black;
    opacity: 0;
    transition: 0.3s ease-in-out;
  }

  .menu-drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    width: 60vw;
    max-width: 330px;
    background-color: #fff;
    transition: 0.3s ease-in-out;
    transform: translateX(105%);
  }

  &.expend {
    .menu-drawer {
      box-shadow: 6px 0 25px rgb(0 0 0 / 15%);
      transform: translateX(0%);
    }

    .overlay {
      display: block;
      opacity: 0.5;
    }
  }
}
</style>
