<template>
  <div class="sub-menu">
    <div
      class="menu-item"
      v-for="item in menuList"
      :key="item.id"
      :class="{ active: activeMenu === item.id }"
      @click="handleMenu(item)"
    >
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>
<script setup lang="ts" name="SubMenu">
import { ref } from 'vue';
import type { CategoryItem } from '@/apis/types/articles-index';

const emit = defineEmits(['category-change']);
defineProps<{
  menuList: CategoryItem[];
}>();

const activeMenu = ref(-1);
const handleMenu = (item: CategoryItem) => {
  activeMenu.value = item.id;

  emit('category-change', item.id);
};
</script>
<style lang="scss" scoped>
.sub-menu {
  .menu-item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s;

    &:hover {
      background-color: $primaryBgTransparent;
    }

    &.active {
      background-color: $primaryBg;
    }
  }
}
</style>
