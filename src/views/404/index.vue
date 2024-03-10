<template>
  <div class="page">
    <div class="content">
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>I tried to catch some fog, but i mist</p>
      <a @click="backHome">返回首页</a>
    </div>
    <img class="page-bg" src="@/assets/images/404_bg.jpg" :style="{ transform: translate }" />
  </div>
</template>
<script setup lang="ts" name="PageNotFound">
import { onBeforeUnmount, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const backHome = () => {
  router.push('/');
};

const translate = ref('');
let lFollowX = 0;
let lFollowY = 0;
let x = 0;
let y = 0;
let friction = 1 / 30;

let stop: any;
function animate() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;

  translate.value = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

  stop = window.requestAnimationFrame(animate);
}
animate();

const mousemoveHandle = (e: MouseEvent) => {
  let lMouseX = Math.max(-100, Math.min(100, window.innerWidth / 2 - e.clientX));
  let lMouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - e.clientY));
  lFollowX = (20 * lMouseX) / 100;
  lFollowY = (10 * lMouseY) / 100;
};
window.addEventListener('mousemove', mousemoveHandle);

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', mousemoveHandle);
  window.cancelAnimationFrame(stop);
});
</script>
<style lang="scss" scoped>
.page {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  .content {
    padding-bottom: 60px;
    color: #cdd4de;
    text-align: center;
    user-select: none;

    h1 {
      margin-bottom: -10px;
      font-size: 165px;
      font-weight: 900;
      line-height: 1;
      opacity: 0.6;
    }

    h2 {
      margin-bottom: 6px;
      font-size: 34px;
      font-weight: 700;
      opacity: 0.9;
    }

    p {
      margin-bottom: 140px;
      font-size: 14px;
      font-weight: 300;
      opacity: 0.7;
    }

    a {
      display: inline-block;
      padding: 8px 14px;
      font-size: 12px;
      font-weight: 300;
      text-transform: uppercase;
      cursor: pointer;
      border: 1px solid #cdd4de;
      border-radius: 4px;
      opacity: 0.4;
    }
  }

  .page-bg {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
}
</style>
