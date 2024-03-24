<template>
  <div class="search-article-page">
    <main class="profile-main cneter-page-main">
      <div class="article-list hidden-scrollbar" ref="scrollTargetRef">
        <q-card class="p-[20px]" v-if="firstReq">
          <q-item-section>
            <q-skeleton type="text" width="40%" />
            <q-skeleton class="mt-[10px]" />
            <q-skeleton class="mt-[5px]" square />
            <q-skeleton class="mt-[10px]" type="QBadge" />
          </q-item-section>
        </q-card>
        <q-infinite-scroll
          @load="searchArticle"
          :offset="250"
          :scroll-target="scrollTargetRef"
          :disable="loadAll"
          ref="infiniteScrollRef"
        >
          <TransitionGroup enter-active-class="animated animate__fadeInLeft">
            <ArticleItem
              v-for="item in resultLit"
              :key="item.id"
              :item="item"
              @click="skipToDetail(item.id)"
            />
          </TransitionGroup>
        </q-infinite-scroll>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts" name="SearchArticle">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { articleListSearch } from '@/apis/articles/index';
import type { ArticleSearchItem } from '@/apis/types/articles-index';
import ArticleItem from './components/ArticleItem.vue';

const route = useRoute();
const router = useRouter();

const firstReq = ref(true); // 判断是否是第一次请求，第一次请求时渲染骨架屏
const queryParams = ref({
  keyword: route.query.keyword as string,
  pageNo: 1,
  pageSize: 5,
});
const resultLit = ref<ArticleSearchItem[]>([]);
const scrollTargetRef = ref();
const loadAll = ref(false);
const searchArticle = async (index: number, done: any) => {
  queryParams.value.pageNo = index;

  const data = await articleListSearch(queryParams.value);
  if (data.code !== 200) return;

  if (queryParams.value.pageNo * queryParams.value.pageSize < data.data.totalCount) {
    done && done();
  } else {
    loadAll.value = true;
  }
  resultLit.value = [...resultLit.value, ...data.data.list];
  firstReq.value = false;
};

/** 跳转到文章详情页面 */
const skipToDetail = (id: number) => {
  router.push('/article/detail/' + id);
};

const infiniteScrollRef = ref();
watch(
  () => route.query.keyword,
  (val: any) => {
    queryParams.value.keyword = val;
    firstReq.value = true;
    resultLit.value = [];
    loadAll.value = false;
    infiniteScrollRef.value.setIndex(0);
    infiniteScrollRef.value.poll();
  },
);
</script>
<style lang="scss" scoped>
.search-article-page {
  box-sizing: border-box;
  height: 100%;
  background: url('@/assets/images/search_bg.jpg') no-repeat center center/cover;

  .profile-main {
    height: 100%;
    padding-top: 58px;
    padding-bottom: 20px;

    .article-list {
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
