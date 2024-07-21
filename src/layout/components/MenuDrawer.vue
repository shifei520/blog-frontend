<template>
  <SFDrawer v-model="drawerVisible">
    <div class="menu-container">
      <div class="header-bg"></div>
      <div class="user-header">
        <div class="avator-container">
          <div class="avator">
            <img v-if="store.userInfo?.avator" :src="imgDomain + store.userInfo?.avator" alt="" />
          </div>
        </div>
        <span class="nickname">{{ userName ? '您好，' + userName : '未登陆' }}</span>
      </div>
      <ul class="mobile-menu">
        <li
          class="mobile-menu-item"
          :class="{ 'menu-active': isActiveMenu(item.path) }"
          v-for="item in menuList"
          :key="item.code"
          @click="skipMenu(item.path, item.blank)"
        >
          <svg-icon :name="item.icon"></svg-icon>
          <span class="ml-[3px]">{{ item.title }}</span>
        </li>
        <li class="mobile-menu-item" v-if="userName" @click="skipMenu('/profile')">
          <svg-icon name="user"></svg-icon>
          <span>个人中心</span>
        </li>
        <li class="mobile-menu-item" v-if="userName" @click="logout">
          <svg-icon name="logout"></svg-icon>
          <span>退出登陆</span>
        </li>
        <li class="mobile-menu-item" v-else @click="login">
          <svg-icon name="logout"></svg-icon>
          <span>登录</span>
        </li>
      </ul>
    </div>
  </SFDrawer>
</template>
<script setup lang="ts" name="MenuDrawer">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import SFDrawer from '@/components/SFDrawer/index.vue';
import { userStore } from '@/store/user';
import type { MenuItem } from '@/layout/types';

const props = withDefaults(
  defineProps<{
    menuList: MenuItem[];
  }>(),
  {
    menuList: () => [],
  },
);
const emit = defineEmits(['on-skip', 'on-logout', 'on-login']);

const imgDomain = import.meta.env.VITE_PUBLIC_PATH;
const store = userStore();
const userName = computed(() => {
  return store.userInfo?.nickname || store.userInfo?.username;
});

/** 跳转路由 */
const skipMenu = (path: string, blank = false) => {
  drawerVisible.value = false;
  emit('on-skip', path, blank);
};

const logout = () => {
  emit('on-logout');
};

const login = () => {
  emit('on-login');
};

const route = useRoute();
const isActiveMenu = (path: string) => {
  return route.path.startsWith(path);
};

const drawerVisible = ref(false);
const openDrawer = () => {
  drawerVisible.value = true;
};
defineExpose({
  openDrawer,
});
</script>
<style lang="scss" scoped>
.menu-container {
  position: relative;
  overflow: hidden;

  .header-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 150%;
    height: 150px;
    background: linear-gradient(133.69deg, rgb(125 150 214 / 100%) 0%, rgb(66 105 215 / 100%) 100%);
    border-radius: 33px;
    box-shadow: 0 5px 30px rgb(98 140 255 / 28%);
    transform: rotate(-11deg);
    transform-origin: left bottom;
  }

  .user-header {
    position: relative;
    display: flex;
    height: 150px;

    .avator-container {
      box-sizing: border-box;
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      padding: 6px;
      margin: 20px 11px;
      background: rgb(255 255 255 / 9%);
      border-radius: 50%;

      .avator {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: rgb(176 197 255);
        border-radius: 50%;

        > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    .nickname {
      align-self: center;
      font-size: 16px;
      word-break: break-all;
    }
  }

  .mobile-menu {
    padding: 15px 15px 15px 0;
    color: $primaryColor;

    .mobile-menu-item {
      height: 30px;
      padding-left: 20px;
      font-size: 14px;
      line-height: 30px;
      text-align: left;
      cursor: pointer;
      border-left: 2px solid transparent;
      transition: all 0.3s;

      .svg-icon {
        margin-right: 10px;
        font-size: 17px;
      }

      &:hover {
        color: rgb(37 116 246);
        border-left: 2px solid rgb(37 116 246);
      }

      &.menu-active {
        color: rgb(37 116 246);
        border-left: 2px solid rgb(37 116 246);
      }
    }
  }
}
</style>
