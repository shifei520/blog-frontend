<template>
  <div class="article-statistics">
    <div
      class="article-item"
      v-for="(item, index) in articleStatisticsList"
      :key="index"
      @click="skipPage(item)"
    >
      <div class="article-document-bg"></div>
      <div class="article-card-content">
        <div class="article-card-content-header">
          <span class="article-card-year">{{ item.year }}</span>
          <span class="article-card-month">{{ item.month }}</span>
        </div>
        <p class="article-count">
          <i class="count">{{ item.count }}</i
          >篇
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="ArticleStatistics">
import { ref } from 'vue';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import { statisticsArticleList } from '@/apis/articles/index';

interface StatisticsItem {
  month: string;
  year: string;
  yearMonth: string;
  count: number;
}
const articleStatisticsList = ref<StatisticsItem[]>([]);
/** 按照年月进行文章统计 */
const getArticleStatisticsList = async () => {
  const data = await statisticsArticleList();
  if (data.code !== 200) return;

  articleStatisticsList.value = data.data.map((item) => {
    const yearMonth = item.yearMonth.split('-');
    return {
      month: dayjs(item.yearMonth).format('MMMM'),
      year: yearMonth[0],
      count: item.articleCount,
      yearMonth: item.yearMonth,
    };
  });
};
getArticleStatisticsList();

const router = useRouter();
/** 跳转时间统计 */
const skipPage = (item: StatisticsItem) => {
  router.push({
    path: '/article/statistics',
    query: {
      publishDate: item.yearMonth,
    },
  });
};
</script>
<style lang="scss" scoped>
.article-statistics {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 15px;
  margin-top: 20px;

  .article-item {
    position: relative;
    height: 140px;
    padding: 20px;
    overflow: hidden;
    cursor: pointer;
    background-color: #1e1e1e;
    border-radius: 10px;
    box-shadow: 2px 2px 4px rgb(0 0 0 / 25%);
    transition: transform 0.25s;

    .article-document-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycGxhbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')
        no-repeat center center / cover;
      filter: grayscale(100%);
      border-radius: 10px;
      opacity: 0.5;
      transition: filter 0.25s;
    }

    &:hover {
      transform: translateY(-5px);

      .article-document-bg {
        filter: grayscale(25%);
      }
    }
  }

  .article-card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    .article-card-content-header {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .article-card-year {
        font-size: 0.8em;
        color: #42a5f5;
        text-transform: uppercase;
      }

      .article-card-month {
        font-size: 1.25em;
        color: #f5f5f5;
      }
    }

    .article-count {
      color: #f5f5f5;

      .count {
        margin-right: 4px;
        font-size: 24px;
        font-weight: 600;
      }
    }
  }
}
</style>
