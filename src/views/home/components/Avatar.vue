<template>
  <div class="avator">
    <div class="card" v-for="item in linkBtns" :key="item.icon" @click="skipToPage(item)">
      <svg-icon :name="item.icon" :style="{ color: item.color }"></svg-icon>
    </div>
    <div class="avatar-img"></div>
    <div class="avator-back"></div>
  </div>
</template>
<script setup lang="ts" name="Avatar">
import { useRouter } from 'vue-router';
import { validateLink } from '@/utils/utils';

const router = useRouter();

interface LinkItem {
  label?: string;
  icon?: string;
  color?: string;
  link?: string;
}

// 链接按钮列表
const linkBtns: LinkItem[] = [
  {
    label: 'GitHub',
    icon: 'github',
    link: 'https://github.com/shifei520',
  },
  {
    label: 'Gitee',
    icon: 'gitee',
    color: '#c71d23',
    link: 'https://gitee.com/shifei_shifei',
  },
  {
    label: 'Codepen',
    icon: 'codepen',
    link: 'https://codepen.io/features/pro',
  },
  {
    label: '掘金',
    icon: 'juejin',
    color: '#1e80ff',
    link: 'https://juejin.cn/user/3378163624713032',
  },
  {
    label: '朋友圈',
    icon: 'circle-friends',
    link: '/friends',
  },
  {},
  {},
  {},
  {},
];

const skipToPage = (item: LinkItem) => {
  if (!item.link) return;

  if (validateLink(item.link)) {
    window.open(item.link, '_blank');
  } else {
    router.push(item.link);
  }
};
</script>
<style lang="scss" scoped>
.avator {
  position: relative;
  z-index: -1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 14em;

  .card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: lightgrey;
    background: rgb(255 255 255 / 59.6%);
    backdrop-filter: blur(5px);
    border: 1px solid transparent;
    border-top-left-radius: 10px;
    transition:
      0.3s ease,
      0.15s background-color,
      0.15s background-image ease-in-out;

    &:nth-child(2),
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(8) {
      border-radius: 0;
    }

    &:nth-child(3) {
      border-top-left-radius: 0;
      border-top-right-radius: 10px;
    }

    &:nth-child(7) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 10px;
    }

    &:nth-child(9) {
      border-top-left-radius: 0;
      border-bottom-right-radius: 10px;
    }
  }

  .avator-back {
    position: absolute;
    z-index: -2;
    width: 11em;
    height: 11em;
    background: linear-gradient(270deg, #03a9f4, #cc39a4, #ffb5d2);
    border-radius: 10px;
    box-shadow: inset 0 0 180px 5px #fff;
    transition:
      opacity 1s,
      border-radius 0.3s;
    transform: rotate(90deg);
  }

  .svg-icon {
    opacity: 0;
  }

  .avatar-img {
    position: absolute;
    z-index: 3;
    width: 11em;
    height: 11em;
    background: url('@/assets/images/avatar.jpeg') no-repeat center center/cover;
    border-radius: 10px;
    transition: 0.4s ease-in-out;
  }

  &:hover {
    width: 14em;
    cursor: pointer;

    .svg-icon {
      font-size: 24px;
      opacity: 1;
      transition: 0.2s ease-in-out;
    }

    .avator-back {
      border-radius: 30px;
      opacity: 0;
    }

    .avatar-img {
      z-index: -3;
      opacity: 0;
    }

    .card {
      --hover-edge-radius: 100%;
      --hover-edge-offset: 10%;

      margin: 0.2em;
      background: rgb(255 255 255 / 20%);
      border: 1px solid rgb(255 255 255 / 30%);
      border-radius: 10px;
      box-shadow: 0 4px 30px rgb(0 0 0 / 10%);
    }
  }

  .card:nth-child(n):hover .svg-icon {
    color: #f5f5f5 !important;
  }

  .card:nth-child(5):hover {
    background-color: rgb(51 204 0);
  }
}
</style>
