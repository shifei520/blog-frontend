<template>
  <div class="documentation-page cneter-page-main">
    <!-- 粒子背景 -->
    <Particles />
    <main class="main hidden-scrollbar" ref="scrollTargetRef">
      <q-infinite-scroll
        @load="getArticleList"
        :offset="250"
        :scroll-target="scrollTargetRef"
        :disable="loadAll"
      >
        <q-timeline color="secondary" dark>
          <q-timeline-entry
            v-for="(item, index) in articleList"
            :key="index"
            :heading="item.heading"
            :title="item.title"
            :subtitle="item.createTime"
            :body="item.abstract"
            @click="skipToArticleDetail(item)"
          />
        </q-timeline>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </main>
  </div>
</template>
<script setup lang="ts" name="Documentation">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { ArticleItem as ArticleItemType } from '@/apis/types/articles-index';
import { documentedArticleListGet } from '@/apis/articles/index';
import Particles from '@/components/Particles/index.vue';
import dayjs from 'dayjs';

const queryParams = ref({
  pageNo: 1,
  pageSize: 10,
});
type TimelineArticle = Partial<ArticleItemType> & { heading?: boolean; abstract?: string };
const articleList = ref<TimelineArticle[]>([{ heading: true, abstract: dayjs().format('YYYY') }]);
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
  articleList.value = [
    ...articleList.value,
    ...data.data.list.reduce<TimelineArticle[]>((pre, cur) => {
      const preItem = pre[pre.length - 1];
      if (
        (preItem as any)?.createTime &&
        dayjs((preItem as any).createTime).format('YYYY') !== dayjs(cur.createTime).format('YYYY')
      ) {
        pre.push({ heading: true, abstract: dayjs(cur.createTime).format('YYYY') });
      }
      pre.push(cur);
      return pre;
    }, []),
  ];
};

const router = useRouter();
/** 跳转到文章详情 */
const skipToArticleDetail = (article: TimelineArticle) => {
  if (article.heading) return false;

  router.push('/article/detail/' + article.id);
};
</script>
<style lang="scss" scoped>
.documentation-page {
  box-sizing: border-box;
  height: 100%;
  padding-top: 58px;
  padding-bottom: 20px;

  .main {
    height: 100%;
    padding: 20px;
    overflow-y: auto;
    background-color: $primaryBgTransparent;
    border-radius: 6px;
  }

  :deep(.q-timeline) {
    .q-timeline__heading {
      font-size: 24px;
      font-weight: 700;
    }

    .q-timeline__title {
      font-weight: 600;
    }

    .q-timeline__entry {
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        color: #26a69a;
      }
    }
  }
}
</style>
