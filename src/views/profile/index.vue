<template>
  <div class="profile-page hidden-scrollbar">
    <div class="header"></div>
    <main class="profile-main cneter-page-main">
      <!-- 导航列表 -->
      <div class="nav-link">
        <div
          class="profile-menu-item"
          :class="{ active: currentActice === item.comp }"
          v-for="item in asideMenuList"
          :key="item.comp"
          @click="menuChange(item.comp)"
        >
          {{ item.name }}
        </div>
      </div>
      <aside class="profile-menu">
        <div class="avator" v-if="userInfo?.avator">
          <img :src="imgDomain + userInfo.avator" alt="" />
        </div>
        <div class="profile-nickname">{{ userInfo?.nickname }}</div>
        <button class="write-article-btn" @click="skipToDraft">
          <div class="svg-wrapper">
            <svg-icon name="send-article"></svg-icon>
          </div>

          <span class="btn-text">写文章</span>
        </button>
      </aside>
      <section class="profile-container">
        <component :is="asideMenus[currentActice]"></component>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts" name="Profile">
import { useRouter } from 'vue-router';
import { defineAsyncComponent, ref } from 'vue';
import { userStore } from '@/store/user';
import { storeToRefs } from 'pinia';
const PersonalInfo = defineAsyncComponent(() => import('./component/PersonalInfo.vue'));
const TagManager = defineAsyncComponent(() => import('./component/TagManager.vue'));

const imgDomain = import.meta.env.VITE_PUBLIC_PATH;
const { userInfo } = storeToRefs(userStore());
const router = useRouter();

const asideMenus: Record<string, any> = {
  PersonalInfo: PersonalInfo,
  TagManager: TagManager,
};

const asideMenuList = ref([
  {
    name: '个人资料',
    comp: 'PersonalInfo',
  },
  {
    name: '标签管理',
    comp: 'TagManager',
  },
]);

const currentActice = ref('PersonalInfo');
const menuChange = (comp: string) => {
  currentActice.value = comp;
};

/** 跳转到文章发布页面 */
const skipToDraft = () => {
  router.push('/draft');
};
</script>
<style lang="scss" scoped>
.profile-page {
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;

  .header {
    width: 100%;
    height: 300px;
    background: url('@/assets/images/profile_bg.jpg') no-repeat center center/cover;
  }

  .profile-main {
    position: relative;
    display: grid;
    grid-template-columns: 250px 1fr;
    column-gap: 20px;

    .profile-menu {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background-color: $primaryBgTransparent;
      border-radius: 6px;

      .profile-nickname {
        font-weight: 600;
        text-align: center;
      }

      .avator {
        width: 128px;
        height: 128px;
        transform: translateY(-50%);

        > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }
    }

    @keyframes fly {
      from {
        transform: translateY(0.1em);
      }

      to {
        transform: translateY(-0.1em);
      }
    }

    .write-article-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 40px;
      margin-top: 20px;
      overflow: hidden;
      font-size: 20px;
      color: #fff;
      cursor: pointer;
      background: royalblue;
      border-radius: 16px;
      transition: all 0.2s;

      .svg-icon {
        display: block;
        transition: transform 0.3s ease-in-out;
        transform-origin: center center;
      }

      .btn-text {
        margin-left: 6px;
      }

      &:hover {
        .svg-icon {
          transform: translateX(1.5em) rotate(45deg) scale(1.1);
        }

        .svg-wrapper {
          animation: fly 0.6s ease-in-out infinite alternate;
        }

        .btn-text {
          transition: all 0.3s ease-in-out;
          transform: translateX(300%);
        }
      }
    }

    .profile-container {
      padding: 20px;
      background-color: $primaryBgTransparent;
      border-radius: 6px;
    }

    .nav-link {
      position: absolute;
      right: 0;
      bottom: calc(100% + 2px);
      display: flex;
      column-gap: 20px;
    }

    .profile-menu-item {
      position: relative;
      display: inline-block;
      height: 40px;
      padding: 0 10px;
      font-weight: 600;
      line-height: 40px;
      color: #f5f5f5;
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

      &.active {
        color: $primaryBlue;

        &::after {
          bottom: 0;
          opacity: 1;
        }
      }
    }
  }
}
</style>
