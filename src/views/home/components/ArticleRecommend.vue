<template>
  <div class="recommend-articles">
    <q-intersection
      v-for="(item, index) in articleList"
      once
      :key="item.id"
      :transition="transitionName(index)"
      :transition-duration="500"
      @click="skipToDetail(item.id)"
      :data-id="item.id"
    >
      <div class="item-card">
        <div class="bg-image" v-lazy:background-image="item.coverImage"></div>
        <div class="article-item">
          <div class="article-info">
            <h5 class="title">{{ item.title }}</h5>
            <p class="desc">
              {{ item.abstract }}
            </p>
          </div>
        </div>
      </div>
    </q-intersection>
  </div>
</template>
<script setup lang="ts" name="ArticleRecommend">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { recommendArticleList } from '@/apis/articles/index';
import type { ArticleItem as ArticleItemType } from '@/apis/types/articles-index';
import defaultImg from '@/assets/images/test-cover.jpeg';

const imgDomain = import.meta.env.VITE_IMG_DOMAIN;

const articleList = ref<(ArticleItemType & { isShow: boolean })[]>([]);

/** 获取文章推荐列表 */
const getRecommendArticleList = async () => {
  const data = await recommendArticleList();
  if (data.code !== 200) return;

  articleList.value = data.data.map((article) => {
    return {
      ...article,
      coverImage: article.coverImage ? imgDomain + article.coverImage : defaultImg,
      isShow: false,
    };
  });
};
getRecommendArticleList();

const transitionName = (index: number) => {
  if (index === 0 || index === 3) {
    return 'slide-right';
  }
  if (index === 2 || index === 5) {
    return 'slide-left';
  }

  return 'scale';
};

const router = useRouter();
/** 跳转到文章详情页面 */
const skipToDetail = (id: number) => {
  router.push('/article/detail/' + id);
};
</script>
<style lang="scss" scoped>
.recommend-articles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 20px;

  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 10px;
    transition:
      transform 0.25s,
      filter 0.2s;
  }

  .bg-image[lazy='error'] {
    background-size: contain !important;
  }

  .item-card {
    position: relative;
    height: 250px;
    overflow: hidden;
    cursor: pointer;
    background-color: #1e1e1e;
    border-radius: 10px;
    box-shadow: 2px 2px 4px rgb(0 0 0 / 25%);
    transition: transform 0.25s 0.25s;

    &:hover {
      transform: translateY(-5px);

      .bg-image {
        filter: brightness(0.5);
        transform: scale(1.05);
      }
    }
  }

  .article-item {
    position: relative;
    z-index: 2;
    height: 100%;
    background: linear-gradient(to top, rgb(57 73 171 / 40%), transparent, rgb(0 0 0 / 40%));
    border-radius: 10px;
  }

  .article-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 20px;
    background-image: linear-gradient(
      deg,
      transparent,
      rgb(91 122 116 / 20%) 60%,
      rgb(138 168 166 / 60%) 90%,
      transparent 100%
    );

    .title {
      font-size: 2em;
      color: #f5f5f5;

      @include ellipse-lines(2);
    }

    .desc {
      font-size: 0.9em;
      color: #c8c8c8;
    }
  }
}
</style>
