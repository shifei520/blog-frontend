<template>
  <div class="project-item" @click="skip">
    <img v-if="item.coverImage" :src="item.coverImage" alt="" class="project-img" />
    <div class="text">
      <h6 class="project-title">{{ item.name }}</h6>
      <p class="project-description">{{ item.description }}</p>
      <div class="tags-group">
        <span v-for="tag in item.tags" :key="tag.id">#{{ tag.name }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="ProjectItem">
import type { ProjectItem } from '@/apis/types/treasure';
const props = withDefaults(
  defineProps<{
    item: ProjectItem;
  }>(),
  {},
);

/** 跳转到项目详情 */
const skip = () => {
  window.open(props.item.projecUrl, '_blank');
};
</script>
<style lang="scss" scoped>
.project-item {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px -5px rgb(158 158 158 / 20%);

  .project-img {
    width: 100%;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.2);
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    padding: 15px;

    .project-title {
      font-family: monospace, serif;
      font-size: 24px;
      font-weight: 600;
      line-height: 1;
    }

    .project-description {
      margin-top: 10px;
      font-size: 16px;
    }

    .tags-group {
      margin-top: auto;
      font-size: 14px;
      color: #909090;

      > span {
        display: inline-block;

        &:nth-child(n + 2) {
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
