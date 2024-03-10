<template>
  <div class="article-suspended-panel">
    <label class="container" :class="{ 'like-active': liked }" @click="likeHandle">
      <div class="checkmark">
        <svg-icon name="like"></svg-icon>
      </div>
      <p class="like">Liked!</p>
      <div class="count">{{ likesCount }}</div>
    </label>
  </div>
</template>
<script setup lang="ts" name="SuspendedPanel">
const props = withDefaults(
  defineProps<{
    liked: boolean;
    likesCount: number;
  }>(),
  {
    liked: false,
    likesCount: 0,
  },
);
const emit = defineEmits(['on-like']);
/** 点赞 */
const likeHandle = () => {
  emit('on-like', !props.liked);
};
</script>
<style lang="scss" scoped>
.article-suspended-panel {
  position: fixed;
  top: 50%;
  margin-left: -56px;
  transform: translateY(-50%);
}

.container {
  position: relative;
  display: block;
  font-size: 24px;
  cursor: pointer;

  .checkmark {
    position: relative;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background-color: $primaryColor_2;
    border-radius: 50%;
    transition: 0.2s ease-in-out;

    .svg-icon {
      color: #fff;
      transition: 0.4s ease-in-out;
    }

    &:hover {
      background-color: $primaryColor;

      .svg-icon {
        color: #fff;
        transform: rotate(-8deg);
        transform-origin: bottom left;
      }
    }
  }

  .like {
    position: relative;
    top: -30px;
    z-index: -1;
    font-size: 12px;
    text-align: center;
  }

  .count {
    position: absolute;
    top: 0;
    left: 75%;
    z-index: 99;
    height: 17px;
    padding: 0 5px;
    font-size: 11px;
    line-height: 17px;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    background-color: #c2c8d1;
    border-radius: 9px;
  }

  &.like-active {
    .checkmark {
      background-color: limegreen;

      .svg-icon {
        color: #fff;
        transform: none;
        animation: 0.5s jump;
      }
    }

    .like {
      color: #fff;
      animation: 0.6s up;
    }
  }
}

@keyframes up {
  100% {
    transform: translateY(-38px);
  }
}

@keyframes jump {
  50% {
    transform: translateY(-8px) rotate(-8deg);
    transform-origin: center;
  }

  100% {
    transform: translateY(0);
    transform-origin: center;
  }
}
</style>
