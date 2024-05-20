<template>
  <div class="home-page hidden-scrollbar">
    <section class="first-page">
      <img
        class="home-bg"
        src="@/assets/images/home_bg.png"
        alt=""
        :style="{ transform: `translateY(-${bgTranslateY}px)` }"
      />
      <div class="menu-info-container">
        <!-- 时间和天气信息 -->
        <div class="app-info">
          <div class="time">{{ nowDate }}</div>
          <Weather class="ml-[15px]" />
        </div>
        <!-- 菜单列表 -->
        <div class="scrollable-component">
          <MenuItem
            v-for="item in menuList"
            :key="item.code"
            :title="item.title"
            @click="skipMenu(item.path, item.blank)"
          />
        </div>
      </div>
      <svg-icon name="down-arrow" className="down-arrow" @click="scrollPage"></svg-icon>
    </section>
    <main class="main-content cneter-page-main">
      <!-- 古诗词/名言警句 -->
      <div class="verse">
        <p>{{ poetryInfo?.content }}</p>
        <p class="verse-author">—— {{ poetryInfo?.author }} {{ poetryInfo?.title }}</p>
      </div>
      <!-- 自我介绍 -->
      <section class="about-section">
        <div class="menu-section-title">
          <svg-icon name="users"></svg-icon>
          <span class="title-text">关于我</span>
        </div>
        <div class="about-me media-about-me">
          <!-- 头像 -->
          <Avatar />
          <!-- 词云 -->
          <WordCloud class="word-cloud" />
          <p class="self-introduction">
            余者甚庸人也，喜好唯在翰墨游访。复有弗均之心，逐懒惰之时，惴恐于心怀愆犯；趋勤恪之际，则犹视己虽竭力，其何能复轨彰也。心怀极刻矛盾，螺旋漩涡，恒纠困忧。余愿身自肃、勇于、进取且丰实，善胜此间生也。诸君共勉！
          </p>
        </div>
      </section>

      <!-- 文章推荐 -->
      <section class="recommend-articles-section">
        <div class="menu-section-title">
          <svg-icon name="users"></svg-icon>
          <span class="title-text">文章推荐</span>
        </div>
        <ArticleRecommend />
      </section>

      <section class="article-statistics-section">
        <div class="menu-section-title">
          <svg-icon name="users"></svg-icon>
          <span class="title-text">近期发布文章统计</span>
        </div>
        <ArticleStatistics />
      </section>

      <!-- 文章总数和访客量 -->
      <section>
        <Overview />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import MenuItem from './components/MenuItem.vue';
import WordCloud from './components/WordCloud.vue';
import { useRouter } from 'vue-router';
import Avatar from './components/Avatar.vue';
import ArticleRecommend from './components/ArticleRecommend.vue';
import ArticleStatistics from './components/ArticleStatistics.vue';
import Overview from './components/Overview.vue';
import Weather from './components/Weather.vue';
import { poetryDetail } from '@/apis/home/index';
import type { PoetryItem } from '@/apis/types/home';

const threshold = ref(0);
const bgTranslateY = ref(0);
let lastScrollY = 0;
// 根据滚动条动态移动背景图片
const imgParallax = (e: any) => {
  const scrollTop = e.target.scrollingElement.scrollTop;

  if (scrollTop - lastScrollY > 0) {
    // 向下滚动
    if (bgTranslateY.value < threshold.value) {
      bgTranslateY.value += 1;
    }
  } else {
    // 向上滚动

    if (bgTranslateY.value > 0) {
      bgTranslateY.value -= 1;
    }
  }
  lastScrollY = scrollTop;
};
onMounted(() => {
  const bgHeight = document.querySelector('.home-bg')?.getBoundingClientRect().height || 0;
  const clientHeight = window.innerHeight;
  threshold.value = bgHeight - clientHeight;

  window.addEventListener('scroll', imgParallax);
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', imgParallax);
});

const nowDate = ref('');

// 更新系统时间
let timer = 0;
onMounted(() => {
  nowDate.value = dayjs().format('hh:mm');
  timer = setInterval(() => {
    nowDate.value = dayjs().format('hh:mm');
  }, 1000);
});
onBeforeUnmount(() => {
  clearInterval(timer);
});

const menuList = [
  {
    title: '文章',
    path: '/article',
    code: 'article',
    blank: false,
  },
  {
    title: '百宝箱',
    path: '/treasure-box',
    code: 'treasureBox',
    blank: true,
  },
];
const router = useRouter();
/** 跳转路由 */
const skipMenu = (path: string, blank = false) => {
  if (blank) {
    const routeLocation = router.resolve(path);
    window.open(routeLocation.fullPath, '_blank');
  } else {
    router.push(path);
  }
};

/** 翻页滚动 */
const scrollPage = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth',
  });
};

const poetryInfo = ref<PoetryItem>();
/** 获取诗词详情 */
const getPoetryDetail = async () => {
  const data = await poetryDetail();
  if (data.code !== 200) return;

  poetryInfo.value = data.data;
};
getPoetryDetail();
</script>

<style lang="scss" scoped>
.home-page {
  .first-page {
    position: relative;
    width: 100%;
    height: 100vh;

    .menu-info-container {
      position: absolute;
      top: 30%;
      padding: 30px;
    }

    .app-info {
      display: flex;
      align-items: flex-end;

      .time {
        height: 80px;
        font-size: 96px;
        line-height: 80px;
        color: #f5f5f5;
        text-shadow: 2px 2px 2px rgb(0 0 0 / 10%);
      }
    }

    .scrollable-component {
      display: flex;
      gap: 10px;
      padding-bottom: 5px;
      margin-top: 20px;
    }

    .down-arrow {
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -20px;
      font-size: 40px;
      font-weight: 700;
      color: #fff;
      cursor: pointer;
      animation: shake infinite 2s ease-in-out;
    }

    @keyframes shake {
      50% {
        transform: translateY(-15px);
      }
    }
  }

  .home-bg {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: calc(100vh + 300px);
    will-change: transform;
  }

  .main-content {
    padding: 30px;

    > section {
      margin-top: 50px;
    }

    .verse {
      padding: 16px;
      margin-top: 20px;
      color: #f5f5f5;
      background-color: rgb(255 255 255 / 10%);
      backdrop-filter: blur(3px);
      border: 1px solid rgb(255 255 255 / 20%);
      border-radius: 10px;
      box-shadow: 2px 2px 4px rgb(0 0 0 / 25%);

      .verse-author {
        text-align: right;
      }
    }

    .menu-section-title {
      color: #f5f5f5;

      .svg-icon {
        font-size: 24px;
      }

      .title-text {
        margin-left: 4px;
        font-size: 20px;
        color: rgb(255 255 255 / 80%);
      }
    }

    .about-me {
      display: flex;
      align-items: center;
      height: 220px;
      padding: 0 10px;
      margin-top: 20px;
      background-color: rgb(255 255 255 / 10%);
      backdrop-filter: blur(3px);
      border: 1px solid rgb(255 255 255 / 20%);
      border-radius: 10px;
      box-shadow: 2px 2px 4px rgb(0 0 0 / 25%);

      .self-introduction {
        flex: 1;
        padding: 20px;
        line-height: 2;
        color: #f5f5f5;
        letter-spacing: 4px;
        writing-mode: vertical-rl;
      }
    }
  }
}
</style>
