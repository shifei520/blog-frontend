<template>
  <div class="timeline-item" :data-text="item.createTime" @click="skipToArticleDetail">
    <div class="timeline-content">
      <img class="timeline-img" v-if="item.coverImage" :src="imgDomain + item.coverImage" />
      <h2 class="timeline-content-title">{{ item.title }}</h2>
      <p class="timeline-content-desc">
        {{ item.abstract }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts" name="TimeLineItem">
import { useRouter } from 'vue-router';
import type { ArticleItem as ArticleItemType } from '@/apis/types/articles-index';
const props = withDefaults(
  defineProps<{
    item: ArticleItemType;
    imgDomain: string;
  }>(),
  {},
);

const router = useRouter();
/** 跳转到文章详情 */
const skipToArticleDetail = () => {
  router.push('/article/detail/' + props.item.id);
};
</script>
<style lang="scss" scoped>
.timeline-item {
  position: relative;
  box-sizing: border-box;
  display: flex;
  width: calc(50% - 40px);
  padding: 40px 0;
  cursor: pointer;
  filter: blur(2px);
  opacity: 0.3;
  transition: 0.5s;
  transform: translateY(-80px);

  &::before {
    position: absolute;
    top: 70%;
    right: calc(-100% - 56px);
    width: 100%;
    padding-left: 15px;
    margin-top: -5px;
    font-family: 'Pathway Gothic One', sans-serif;
    font-size: 13px;
    color: rgba(#fff, 0.5);
    letter-spacing: 3px;
    content: attr(data-text);
    border-left: 2px solid rgba(#fff, 0.5);
    opacity: 0;
  }

  &:nth-child(even) {
    align-self: flex-end;

    &::before {
      right: auto;
      left: calc(-100% - 56px);
      padding-right: 15px;
      padding-left: 0;
      text-align: right;
      border-right: 2px solid rgba(#fff, 0.5);
      border-left: none;
    }
  }

  &--active {
    filter: blur(0);
    opacity: 1;
    transform: translateY(0);

    &::before {
      top: 50%;
      opacity: 1;
      transition: 0.3s all 0.2s;
    }

    .timeline-content-title {
      margin: -50px 0 20px;
    }
  }

  .timeline-content {
    &-title {
      box-sizing: border-box;
      padding: 0 10px;
      margin: -10px 0 0;
      font-size: 40px;
      font-weight: normal;
      color: #fff;
      word-break: break-all;
      transition: 0.4s;
    }

    &-desc {
      box-sizing: border-box;
      margin: 0;
      font-size: 15px;
      font-weight: normal;
      line-height: 25px;
      color: rgba(#fff, 0.7);
    }
  }

  .timeline-img {
    max-width: 100%;
    box-shadow: 0 10px 15px rgb(0 0 0 / 40%);
  }

  @include responsive {
    align-self: baseline !important;
    width: 100%;
    padding: 0 30px 150px 80px;

    &::before {
      top: 50px;
      left: 10px !important;
      width: 60px;
      padding: 0 !important;
      text-align: center !important;
      border: none !important;
      writing-mode: vertical-lr;
    }

    &:last-child {
      padding-bottom: 40px;
    }
  }
}
</style>
