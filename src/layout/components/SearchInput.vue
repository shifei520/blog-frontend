<template>
  <div class="search-main" ref="searchEl" :class="{ show: state.show }">
    <Transition name="search">
      <div class="header-search" :class="{ 'search-anim': state.show }" v-if="state.show">
        <input
          type="text"
          :value="modelValue"
          placeholder="搜索"
          @input="updateValue"
          ref="inputEl"
        />
      </div>
    </Transition>
    <svg-icon name="search" @click="clickIcon" class="header-search-icon"></svg-icon>
  </div>
</template>
<script setup lang="ts" name="SearchInput">
import { ref, defineProps, defineEmits, onMounted, onBeforeUnmount, reactive } from 'vue';

const props = defineProps({
  modelValue: String,
});

const emits = defineEmits(['update:modelValue', 'input', 'search']);

const state = reactive({
  show: false,
});

const inputEl = ref();
const searchEl = ref();

onMounted(() => {
  window.addEventListener('click', clickOther);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', clickOther);
});

const clickIcon = () => {
  if (state.show) {
    emits('search', props.modelValue);
  }
  state.show = !state.show;
};

const updateValue = (e: any) => {
  emits('input');
  emits('update:modelValue', e.target.value);
};

const clickOther = (event: any) => {
  const e = event || window.event;
  if (searchEl.value && !searchEl.value.contains(e.target)) {
    state.show = false;
  }
};
</script>
<style lang="scss" scoped>
.search-main {
  position: relative;
  display: flex;
  align-items: center;
  width: 36px;
  height: 30px;
  transition: 0.5s;

  .header-search {
    position: absolute;
    right: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 30px;
    height: 30px;
    padding: 0 15px;
    border-radius: 15px;
    transition: 0.5s;
    transform-origin: right;
    animation: search-anim-leave 0.8s forwards;

    input {
      width: calc(100% - 30px);
      height: 100%;
      color: #fff;
      background: transparent;
      border: none;
      outline: none;

      &::placeholder {
        color: #fff;
      }
    }
  }

  .search-anim {
    animation: search-anim-show 0.5s forwards;
  }

  .header-search-icon {
    position: absolute;
    right: 8px;
    cursor: pointer;
  }
}

.show {
  width: 200px;
}

.search-enter-active,
.search-leave-active {
  width: 200px;
}

.search-enter,
.search-leave-to {
  width: 30px;
}

@keyframes search-anim-show {
  from {
    width: 30px;
    border: 1px solid #fff;
  }

  to {
    width: 200px;
    border: 1px solid #fff;
  }
}

@keyframes search-anim-leave {
  0% {
    width: 200px;
    border: 1px solid #fff;
  }

  62.5% {
    width: 30px;
    border: 1px solid #fff;
  }

  100% {
    border-color: #fff;
  }
}
</style>
