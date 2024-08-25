<template>
  <aside :class="['nav', isExpended ? null : 'fold-nav']">
    <div class="nav-header">
      <svg-icon name="menu" @click="isExpended = !isExpended" bodymovin :speed="3"></svg-icon>
    </div>
    <ul class="nav-list">
      <li
        v-for="item in list"
        :key="item.id"
        :class="['nav-list-item', current === item.id ? 'active-nav' : '']"
        @click="navClickHandle(item.id)"
      >
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </aside>
</template>
<script setup lang="ts" name="AsideMenu">
import { ref, watch } from 'vue';
import type { TravelCityItem } from '@/apis/types/travel';

const props = withDefaults(
  defineProps<{
    list: TravelCityItem[];
  }>(),
  {
    list: () => [],
  },
);
const emit = defineEmits(['on-change']);

const isExpended = ref(true);
const current = ref();
const navClickHandle = (id: number) => {
  current.value = id;
  emit('on-change', id);
};

watch(
  () => props.list,
  (list: TravelCityItem[]) => {
    if (list && list.length) {
      navClickHandle(list[0].id);
    }
  },
  { immediate: true, deep: true },
);
</script>
<style lang="scss" scoped>
@mixin activeItem {
  color: #fff;
  border-left-color: rgb(37 116 246);
}

.nav {
  position: relative;
  align-self: flex-start;
  margin-top: 20px;
  border-radius: 6px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 250px;
    height: 100%;
    content: '';
    background-color: rgb(20 21 26 / 60%);
    border-radius: 6px;
    transition: all 0.5s;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 250px;
    height: 100%;
    content: '';
    background: url('@/assets/images/travel_menu_bg.svg') bottom center no-repeat;
    background-color: rgb(20 21 26 / 60%);
    background-size: cover;
    border-radius: 6px;
    box-shadow: 6px 7px 28px 0 rgb(16 16 16 / 30%);
    transition: all 0.5s 0.2s;
  }

  .nav-header {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    width: 250px;
    height: 70px;
    padding-left: 20px;

    .bodymovin-menu {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }

  .nav-list {
    position: relative;
    z-index: 1;
    width: 250px;

    .nav-list-item {
      height: 40px;
      padding-left: 15px;
      line-height: 40px;
      color: rgb(255 255 255 / 60%);
      cursor: pointer;
      border-left: 4px solid transparent;
      transition: all 0.3s;

      &.active-nav {
        @include activeItem;
      }

      &:hover {
        @include activeItem;
      }
    }
  }

  &.fold-nav {
    &::before {
      width: 0;
      height: 0;
    }

    &::after {
      width: 0;
      height: 0;
    }

    .nav-header {
      width: 50px;
    }

    .nav-list {
      width: 0;
      visibility: hidden;
      opacity: 0;
    }
  }
}
</style>
