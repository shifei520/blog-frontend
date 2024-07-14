<template>
  <div
    class="nav-bar"
    :class="{ visible: navBarVisible }"
    :style="{ backgroundColor: lastScrollTop === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.8)' }"
  >
    <div class="left-logo" @click="skipMenu('/home')">
      <img class="logo" src="@/assets/images/logo.png" alt="" />
      <h2>时不待我</h2>
    </div>

    <SearchInput v-model="keyword" @search="searchArticle" />
    <svg-icon name="menu" class="menu-icon" @click="openDrawerMenu"></svg-icon>
    <ul class="right-menu">
      <li class="search-item"></li>
      <li
        class="menu-item"
        v-for="item in menuList"
        :key="item.code"
        @click="skipMenu(item.path, item.blank)"
      >
        <svg-icon :name="item.icon"></svg-icon>
        <span class="ml-[3px]">{{ item.title }}</span>
      </li>
      <li class="menu-item">
        <Dropdown
          trigger="hover"
          :border="false"
          customContainerClass="sf-dropdown-container"
          align="right"
        >
          <template #trigger>
            <span class="user-name">{{ userName ? '您好，' + userName : '未登陆' }}</span>
          </template>
          <div class="login-dropdown">
            <div class="login-item" v-if="userName" @click="skipMenu('/profile')">个人中心</div>
            <div class="login-item" v-if="userName" @click="logout">退出登陆</div>
            <div class="login-item" v-else @click="login">登陆</div>
          </div>
        </Dropdown>
      </li>
    </ul>

    <!-- 移动端的菜单抽屉组件 -->
    <MenuDrawer v-model="drawerVisible">
      <div class="user-header">
        <span>{{ userName ? '您好，' + userName : '未登陆' }}</span>
      </div>
      <ul class="mobile-menu">
        <li
          class="mobile-menu-item"
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
    </MenuDrawer>
  </div>
</template>
<script setup lang="ts" name="NavBar">
import { computed, defineAsyncComponent, onBeforeMount, onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { Dropdown } from 'v-dropdown';
import { useRouter, useRoute } from 'vue-router';
import { userStore } from '@/store/user';
import SearchInput from './SearchInput.vue';

const MenuDrawer = defineAsyncComponent(() => import('./MenuDrawer.vue'));

const toast = useToast();
const router = useRouter();

const store = userStore();
const userName = computed(() => {
  return store.userInfo?.nickname || store.userInfo?.username;
});

/** 退出登陆 */
const logout = () => {
  store.clearInfo();
  toast.success('退出成功');
};
/** 登陆 */
const login = () => {
  store.clearInfo();
  router.push('/login');
};

const menuList = ref([
  {
    title: '首页',
    path: '/home',
    code: 'home',
    icon: 'home',
    blank: false,
  },
  {
    title: '文章',
    path: '/article',
    code: 'article',
    icon: 'article',
    blank: false,
  },
  {
    title: '阅读',
    path: '/books',
    code: 'books',
    icon: 'book-open',
    blank: false,
  },
  {
    title: '百宝箱',
    path: '/treasure-box',
    code: 'treasureBox',
    icon: 'treasure-box',
    blank: true,
  },
]);

/** 跳转路由 */
const skipMenu = (path: string, blank = false) => {
  drawerVisible.value = false;
  if (blank) {
    const routeLocation = router.resolve(path);
    window.open(routeLocation.fullPath, '_blank');
  } else {
    router.push(path);
  }
};

const lastScrollTop = ref(0);
const navBarVisible = ref(true);
let timer: number = 0;
/** 根据滚动的方向进行导航栏显示隐藏 */
const scrollHandle = () => {
  const scrollTop = document.documentElement.scrollTop;

  if (scrollTop - lastScrollTop.value > 0) {
    navBarVisible.value = false;
  } else {
    navBarVisible.value = true;

    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      navBarVisible.value = false;
    }, 1500);
  }
  lastScrollTop.value = scrollTop;

  if (lastScrollTop.value <= 0) {
    timer && clearTimeout(timer);
    navBarVisible.value = true;
  }
};
onMounted(() => {
  window.addEventListener('scroll', scrollHandle);
});

onBeforeMount(() => {
  window.removeEventListener('scroll', scrollHandle);
});

const route = useRoute();
const keyword = ref('');
/** 搜索文章 */
const searchArticle = () => {
  if (!keyword.value) return;

  router.push('/article/search?keyword=' + keyword.value);
};

onMounted(() => {
  if (route.query.keyword) {
    keyword.value = route.query.keyword as string;
  }
});

const drawerVisible = ref(false);
const openDrawerMenu = () => {
  drawerVisible.value = true;
};
</script>
<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  top: -58px;
  right: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 58px;
  padding: 0 20px;
  font-size: 18px;
  color: #fff;
  transition: all 0.6s;

  .left-logo {
    display: flex;
    align-items: center;
    margin-right: auto;
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;

    .logo {
      width: 28px;
      height: 28px;
      margin-right: 6px;
    }
  }

  .menu-icon {
    display: none;
    margin-left: 10px;
    cursor: pointer;
  }

  .user-header {
    min-height: 30px;
    padding: 4px 10px;
    color: $primaryColor;
    text-align: center;
  }

  .mobile-menu {
    padding: 15px;
    color: $primaryColor;

    .mobile-menu-item {
      height: 30px;
      line-height: 30px;
      text-align: left;
      cursor: pointer;

      .svg-icon {
        margin-right: 10px;
      }

      &:hover {
        color: $primaryBlue;
      }
    }
  }

  .right-menu {
    display: flex;
    column-gap: 20px;

    .menu-item {
      position: relative;
      font-weight: 500;
      line-height: 40px;
      cursor: pointer;
      transition: all 200ms linear;

      &::after {
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        content: '';
        background-color: $primaryBlue;
        opacity: 0;
        transition: all 200ms linear;
      }

      &:hover {
        color: $primaryBlue;

        &::after {
          bottom: 0;
          opacity: 1;
        }
      }
    }

    .search-item {
      display: flex;
      align-items: center;
    }
  }

  &.visible {
    top: 0;
  }
}

.user-name {
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.login-dropdown {
  background-color: #fcfaff;

  .login-item {
    padding: 3px 15px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      color: #fff;
      background-color: $middleBule;
    }
  }
}
</style>
