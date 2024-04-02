<template>
  <div class="statistics-article-page">
    <div class="header">
      <div class="statistics-title">
        <span>{{ headerTitle }}（{{ total }}）</span>
      </div>
    </div>
    <main class="statistics-main cneter-page-main">
      <q-infinite-scroll
        @load="getArticleList"
        :disable="loadAll"
        :offset="250"
        ref="infiniteScrollRef"
      >
        <TransitionGroup enter-active-class="animated animate__fadeInLeft">
          <ArticleItem
            v-for="item in articleList"
            :key="item.id"
            :item="item"
            @click="skipToDetail(item.id)"
          />
        </TransitionGroup>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <SFDotLoading></SFDotLoading>
          </div>
        </template>
      </q-infinite-scroll>
    </main>
  </div>
</template>

<script setup lang="ts" name="StatisticsArticle">
import { computed, nextTick, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type {
  ArticleItem as ArticleItemType,
  ArticleListGetParams,
} from '@/apis/types/articles-index';
import ArticleItem from '@/views/article/components/ArticleItem.vue';
import { articleListGet } from '@/apis/articles/index';

const router = useRouter();
const route = useRoute();

const articleList = ref<ArticleItemType[]>([]);

/** 跳转到文章详情页面 */
const skipToDetail = (id: number) => {
  router.push('/article/detail/' + id);
};

const loadAll = ref(false);
const queryForm = ref<ArticleListGetParams>({
  pageNo: 1,
  pageSize: 10,
  tagId: Number(route.query?.tagId || null),
  publishDate: route.query?.publishDate as string,
});
const total = ref(0);

const headerTitle = computed(() => {
  let label = '';
  let title = route.query.title;
  if (queryForm.value.publishDate) {
    label = '时间';
    title = queryForm.value.publishDate;
  } else if (queryForm.value.tagId) {
    label = '标签';
  }

  return `${label}: ${title}`;
});

/** 获取文章列表 */
const getArticleList = async (index: number, done: any) => {
  queryForm.value.pageNo = index;

  const data = await articleListGet(queryForm.value);
  if (data.code !== 200) return;

  total.value = data.data.totalCount;
  if (queryForm.value.pageNo * queryForm.value.pageSize < data.data.totalCount) {
    done && done();
  } else {
    loadAll.value = true;
  }
  articleList.value = [...articleList.value, ...data.data.list];
};

const infiniteScrollRef = ref();
watch(
  () => route.query,
  (val: any) => {
    articleList.value = [];
    loadAll.value = false;
    queryForm.value.tagId = val?.tagId;
    queryForm.value.publishDate = val?.publishDate;
    nextTick(() => {
      infiniteScrollRef.value.setIndex(0);
      infiniteScrollRef.value.trigger();
    });
  },
  { deep: true },
);
</script>

<style scoped lang="scss">
.statistics-article-page {
  min-height: 100vh;
  padding-bottom: 20px;
  background-color: #f5f5f5;

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 300px;
    background: url('@/assets/images/statistics_bg.jpeg') no-repeat center center/cover;

    .statistics-title {
      padding: 12px 20px;
      font-size: 32px;
      color: #fff;
      background-color: rgb(0 191 255 / 0%);
      backdrop-filter: blur(5px);
      border: 2px rgb(255 255 255 / 40%) solid;
      border-right: 2px rgb(40 40 40 / 35%) solid;
      border-bottom: 2px rgb(40 40 40 / 35%) solid;
      border-radius: 4px;
      box-shadow: rgb(0 0 0 / 30%) 2px 8px 8px;
    }
  }

  .statistics-main {
    margin-top: 20px;
  }
}
</style>
