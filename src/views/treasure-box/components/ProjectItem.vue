<template>
  <div class="project-item" :class="{ 'show-img': item.coverImage }" @click="skip">
    <div class="text">
      <h6 class="project-title">{{ item.name }}</h6>
      <p class="project-description">{{ item.description }}</p>
      <div class="tags-group">
        <span v-for="tag in item.tags" :key="tag.id">#{{ tag.name }}</span>
      </div>
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
  height: 180px;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px -5px rgb(158 158 158 / 20%);

  .project-img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    transition: all 0.8s cubic-bezier(0.66, 0.08, 0.19, 0.97);
  }

  .text {
    position: absolute;
    inset: 15px;
    z-index: 2;
    display: flex;
    flex-direction: column;

    .project-title {
      font-size: 24px;
      font-weight: 600;
      opacity: 1;
      transition: all 0.75s cubic-bezier(0.38, 0.26, 0.05, 1.07);
      transition-delay: 0.2s;
    }

    .project-description {
      font-size: 16px;
      opacity: 1;
      transition: all 0.75s cubic-bezier(0.38, 0.26, 0.05, 1.07);
      transition-delay: 0.4s;

      @include ellipse-lines(4);
    }

    .tags-group {
      margin-top: auto;
      font-size: 14px;
      color: #909090;
      opacity: 1;
      transition: all 0.75s cubic-bezier(0.38, 0.26, 0.05, 1.07);
      transition-delay: 0.6s;

      > span {
        display: inline-block;

        &:nth-child(n + 2) {
          margin-left: 4px;
        }
      }
    }
  }

  &::before,
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 50%;
    content: '';
    background: #fff;
    transition: all 0.5s cubic-bezier(0.66, 0.08, 0.19, 0.97);
    transform: scaleX(1);
    transform-origin: left;
  }

  &::after {
    top: 50%;
    transition-delay: 0.15s;
  }

  &:hover {
    &::before,
    &::after {
      transform: scaleX(0);
    }

    .text {
      .project-title,
      .project-description,
      .tags-group {
        color: #fff;
        opacity: 0;
        transform: translateY(10px);
      }
    }

    .project-img {
      transform: scale(1.1);
    }
  }
}
</style>
