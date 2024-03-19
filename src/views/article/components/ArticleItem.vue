<template>
  <div class="article-item">
    <div class="blog-header" v-if="item.coverImage">
      <img class="cover-img" v-lazy="imgDomain + item.coverImage" :alt="item.title" />
    </div>
    <div class="article-content">
      <h1 class="article-title">{{ item.title }}</h1>
      <p class="article-abstract">{{ item.abstract }}</p>
      <div class="article-tags">
        <ul>
          <li v-for="tag in item.tags" :key="tag.id">{{ tag.name }}</li>
        </ul>
      </div>
    </div>
    <div class="article-footer">
      <span class="published-date">{{ item.createTime }}</span>

      <div class="view-like">
        <svg-icon name="view" class="view"></svg-icon>
        <span class="ml-[4px] mr-[15px]">{{ item.views }}</span>
        <svg-icon name="like"></svg-icon>
        <span class="ml-[4px]">{{ item.likesCount }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="ArticleItem">
import loading from '@/assets/images/loading.gif';
defineProps<{
  item: {
    id: number;
    title: string;
    abstract: string;
    tags: any[];
    likesCount: number;
    views: number;
    coverImage: string;
    createTime: string;
  };
}>();
const imgDomain = import.meta.env.VITE_IMG_DOMAIN;
</script>
<style lang="scss" scoped>
.article-item {
  padding: 0 30px;
  overflow: hidden;
  background: #fff;
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 20%) 0 4px 2px -2px;

  .blog-header {
    height: 240px;
    margin: 0 -30px;

    .cover-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .cover-img[lazy='error'] {
      object-fit: contain;
    }
  }

  .article-content {
    .article-title {
      padding: 21px 0;
      font-size: 32px;
    }

    .article-abstract {
      color: #4d4d4d;
    }

    .article-tags {
      padding: 16px 0;

      > ul {
        display: flex;
        flex-wrap: wrap;

        > li {
          height: 24px;
          padding: 0 8px;
          font-size: 12px;
          line-height: 22px;
          color: #999;
          text-align: center;
          letter-spacing: 1px;
          white-space: nowrap;
          cursor: pointer;
          border: 1px solid #999;
          border-radius: 3px;
          transition: 0.25s ease;

          &:hover {
            color: $primaryBlue;
            border-color: $primaryBlue;
          }
        }
      }
    }
  }

  .article-footer {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    border-top: 1px solid #e6e6e6;

    .published-date {
      position: relative;
      height: 24px;
      padding: 0 8px;
      font-size: 12px;
      line-height: 24px;
      color: #999;
      text-align: center;
      letter-spacing: 1px;
      white-space: nowrap;
      border: 1px solid #999;
      border-radius: 3px;
    }

    .view-like {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #999;

      .svg-icon {
        font-size: 24px;
      }

      .view {
        font-size: 28px;
      }
    }
  }

  &:hover {
    @include shi-box-shadow;
  }

  &:nth-child(n + 2) {
    margin-top: 30px;
  }
}
</style>
