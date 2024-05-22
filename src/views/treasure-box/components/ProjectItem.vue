<template>
  <div class="project-item" :class="{ 'show-img': item.coverImage }" @click="skip">
    <h6 class="project-title">{{ item.name }}</h6>
    <p class="project-description">{{ item.description }}</p>
    <div class="tags-group">
      <span v-for="tag in item.tags" :key="tag.id">#{{ tag.name }}</span>
    </div>
    <img v-if="item.coverImage" :src="item.coverImage" alt="" class="project-img" />
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
  display: flex;
  flex-direction: column;
  height: 180px;
  padding: 15px;
  overflow: hidden;
  color: #fff;
  cursor: pointer;
  background:
    linear-gradient(to bottom, rgb(255 255 255 / 15%) 0%, rgb(0 0 0 / 15%) 100%),
    radial-gradient(at top center, rgb(255 255 255 / 40%) 0%, rgb(0 0 0 / 40%) 120%) #989898;
  background-blend-mode: multiply, multiply;
  border-radius: 4px;
  box-shadow:
    0 3px 1px -2px rgb(0 0 0 / 20%),
    0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);

  .project-title {
    font-size: 24px;
  }

  .project-description {
    font-size: 16px;

    @include ellipse-lines(4);
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

  .project-img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    transition: transform 0.5s;
    transform: translateX(-100%);
  }

  &.show-img {
    &:hover .project-img {
      transform: translateX(0);
    }
  }
}
</style>
