<template>
  <div class="overview">
    <p>
      <span>文章总数：</span><span>{{ blogInfo.articleCount }}</span>
    </p>
    <p>
      <span>用户注册量：</span><span>{{ blogInfo.userCount }}</span>
    </p>
  </div>
</template>
<script setup lang="ts" name="Overview">
import { ref } from 'vue';
import { statisticsBlog } from '@/apis/home/index';

const blogInfo = ref({
  articleCount: 0,
  userCount: 0,
});
/** 统计网站的访问数和文章数 */
const getBlogInfo = async () => {
  const data = await statisticsBlog();
  if (data.code !== 200) return;

  blogInfo.value = data.data;
};
getBlogInfo();
</script>
<style lang="scss" scoped>
.overview {
  color: #f5f5f5;
}
</style>
