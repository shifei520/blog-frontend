<template>
  <q-card class="p-[20px] article-item">
    <h1 v-html="item.title" class="title"></h1>
    <p v-html="item.abstract" class="abstract mt-[10px]"></p>
    <span class="time mt-[10px]">{{ item.createTime }}</span>
  </q-card>
</template>
<script setup lang="ts" name="ArticleItem">
import type { ArticleSearchItem } from '@/apis/types/articles-index';
defineProps<{
  item: ArticleSearchItem;
}>();
</script>
<style lang="scss" scoped>
.article-item {
  cursor: pointer;

  .title {
    font-size: 18px;
    font-weight: 600;
  }

  .abstract {
    @include ellipse-lines(2);
  }

  .time {
    display: inline-block;
    color: #999;
  }

  &:nth-of-type(n + 2) {
    margin-top: 20px;
  }
}
</style>
