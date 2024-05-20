<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="sf-dialog hidden-scrollbar" v-bind="$attrs" v-show="innerVisible">
        <div class="sf-dialog-header">
          <span class="sf-dialog-title">{{ title }}</span>
          <svg-icon
            name="close"
            class-name="sf-dialog-close"
            @click="innerVisible = false"
          ></svg-icon>
        </div>
        <div class="sf-dialog-content">
          <slot />
        </div>
      </div>
    </Transition>

    <div class="sf-dialog-mask" v-show="innerVisible"></div>
  </Teleport>
</template>
<script setup lang="ts" name="SFDialog">
import { computed, watchEffect } from 'vue';

const emit = defineEmits(['update:visible', 'on-close']);
const props = defineProps<{
  title: string;
  visible: boolean;
}>();

const innerVisible = computed({
  get() {
    return props.visible;
  },
  set(val: boolean) {
    emit('update:visible', val);
  },
});

watchEffect(() => {
  if (!props.visible) {
    emit('on-close');
  }
});
</script>
<style lang="scss" scoped>
.sf-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 2001;
  min-width: 200px;
  max-width: 95vw;
  max-height: 95vh;
  padding: 16px;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 4px;
  box-shadow:
    0 12px 32px 4px rgb(0 0 0 / 4%),
    0 8px 20px rgb(0 0 0 / 8%);
  transform: translate(-50%, -50%);

  .sf-dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .sf-dialog-title {
      font-size: 18px;
    }

    .sf-dialog-close {
      cursor: pointer;
    }
  }

  .sf-dialog-content {
    min-height: 100px;
  }
}

.sf-dialog-mask {
  position: fixed;
  inset: 0;
  background-color: rgba(0 0 0 / 50%);
}

.fade-enter-from,
.fade-leave-to {
  transform: translate(-50%, -65%);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
