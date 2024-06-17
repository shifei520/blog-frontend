<template>
  <div class="documentation-page cneter-page-main">
    <!-- 粒子背景 -->
    <Particles />
    <main
      class="main-container hidden-scrollbar"
      ref="scrollTargetRef"
      :style="{ 'background-image': bgImage }"
    >
      <div class="timeline-container">
        <div class="timeline-header">
          <h2 class="timeline-header__title">文章归档</h2>
          <h3 class="timeline-header__subtitle">按日期分类</h3>
        </div>
        <q-infinite-scroll
          @load="getArticleList"
          :offset="250"
          :scroll-target="scrollTargetRef"
          :disable="loadAll"
        >
          <div class="timeline">
            <TimeLineItem
              ref="timeLineItemRefs"
              v-for="item in articleList"
              :key="item.id"
              :item="item"
              :imgDomain="imgDomain"
            />
          </div>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts" name="Documentation">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import type { ArticleItem as ArticleItemType } from '@/apis/types/articles-index';
import { documentedArticleListGet } from '@/apis/articles/index';
import Particles from '@/components/Particles/index.vue';
import TimeLineItem from './components/TimeLineItem.vue';

const imgDomain = import.meta.env.VITE_PUBLIC_PATH;
const queryParams = ref({
  pageNo: 1,
  pageSize: 10,
});
const articleList = ref<ArticleItemType[]>([]);
const scrollTargetRef = ref();
const loadAll = ref(false);
/** 加载更多 */
const getArticleList = async (index: number, done: any) => {
  queryParams.value.pageNo = index;

  const data = await documentedArticleListGet(queryParams.value);
  if (data.code !== 200) return;

  if (queryParams.value.pageNo * queryParams.value.pageSize < data.data.totalCount) {
    done();
  } else {
    loadAll.value = true;
  }
  articleList.value = [...articleList.value, ...data.data.list];
  if (queryParams.value.pageNo === 1 && data.data.list.length) {
    nextTick(() => {
      const timelineEle = document.querySelectorAll('.timeline-item')[0] as HTMLElement;
      // 设置当前展示文章的选中效果
      setBgAndClass(timelineEle, 0);
    });
  }
};

const setBgAndClass = (item: HTMLElement, i: number) => {
  if (articleList.value[i].coverImage) {
    bgImage.value = `url(${imgDomain + articleList.value[i].coverImage})`;
  } else {
    bgImage.value = '';
  }
  item.classList.add('timeline-item--active');
};

const bgImage = ref('');
const scrollHandle = () => {
  let max, min;
  const pos = scrollTargetRef.value?.scrollTop;

  const timeLineItemEles = document.querySelectorAll('.timeline-item') as unknown as HTMLElement[];

  for (let i = 0, len = timeLineItemEles.length; i < len; i++) {
    const item = timeLineItemEles[i];
    const itemTop = item.offsetTop;
    const itemHeight = item.offsetHeight;
    min = itemTop;
    max = itemTop + itemHeight;

    if (i === len - 2 && pos > min + itemHeight / 2) {
      // 遍历移除活动类名
      for (let j = 0; j < len; j++) {
        timeLineItemEles[j].classList.remove('timeline-item--active');
      }
      // 如果最后一个文章的文章有背景，则给父容器设置背景
      setBgAndClass(timeLineItemEles[len - 1], len - 1);
    } else if (pos <= max - 40 && pos >= min) {
      // 遍历移除活动类名
      for (let j = 0; j < len; j++) {
        timeLineItemEles[j].classList.remove('timeline-item--active');
      }
      // 设置当前展示文章的选中效果
      setBgAndClass(item, i);
    }
  }
};

onMounted(() => {
  scrollTargetRef.value?.addEventListener('scroll', scrollHandle);
});
onBeforeUnmount(() => {
  scrollTargetRef.value?.removeEventListener('scroll', scrollHandle);
});
</script>
<style lang="scss" scoped>
.documentation-page {
  box-sizing: border-box;
  height: 100%;
  padding-top: 58px;
  padding-bottom: 20px;

  .main-container {
    height: 100%;
    overflow-y: auto;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    border-radius: 6px;
    transition: 0.3s ease 0s;
  }

  .timeline-container {
    position: relative;
    width: 100%;
    padding: 80px 0;
    background-attachment: fixed;
    background-size: cover;
    transition: 0.3s ease 0s;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      content: '';
      background: rgb(99 99 99 / 80%);
    }

    .timeline-header {
      position: relative;
      width: 100%;
      margin-bottom: 80px;
      text-align: center;

      &__title {
        margin: 0;
        font-size: 46px;
        font-weight: normal;
        color: #fff;
      }

      &__subtitle {
        margin: 10px 0 0;
        font-family: 'Pathway Gothic One', sans-serif;
        font-size: 16px;
        font-weight: normal;
        color: rgb(255 255 255 / 50%);
        letter-spacing: 5px;
      }
    }

    .timeline {
      position: relative;
      display: flex;
      flex-flow: column wrap;
      max-width: 700px;
      margin: 0 auto;

      &::before {
        position: absolute;
        left: 50%;
        width: 2px;
        height: 100%;
        margin-left: -1px;
        content: '';
        background: rgb(255 255 255 / 7%);

        @include responsive {
          left: 40px;
        }
      }
    }
  }
}
</style>
