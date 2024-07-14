<template>
  <div class="cube book-item">
    <div class="cube front face" :style="{ 'border-color': item.borderColor }"></div>
    <div class="cube back face" :style="{ 'border-color': item.borderColor }"></div>
    <div class="cube right face"></div>
    <div class="cube left face" :style="{ 'border-color': item.borderColor }"></div>
    <div
      class="cube top face"
      :style="{ 'background-image': `url(${imgDomain + item.coverImage})` }"
    ></div>
    <div class="cube bottom face"></div>
    <div class="cube shadow"></div>
  </div>
</template>
<script setup lang="ts" name="BookItem">
import type { bookItem } from '@/apis/types/book';

withDefaults(
  defineProps<{
    item: bookItem;
  }>(),
  {},
);
const imgDomain = import.meta.env.VITE_PUBLIC_PATH;
</script>
<style lang="scss" scoped>
@mixin cuboid($x, $y, $z) {
  &.front {
    @include cube-face($x, $y, $z);
  }

  &.back {
    @include cube-back($x, $y, $z);
  }

  &.right {
    @include cube-right($x, $y, $z);
  }

  &.left {
    @include cube-left($x, $y, $z);
  }

  &.bottom {
    @include cube-bottom($x, $y, $z);
  }

  &.top {
    @include cube-top($x, $y, $z);
  }
}

@mixin cube-face($x, $y, $z) {
  width: $x;
  height: $y;
  transform: rotateX(-90deg) translateZ(-($y - ($z * 2)));
  transform-origin: bottom left;
}

@mixin cube-back($x, $y, $z) {
  width: $x;
  height: $y;
  transform: rotateX(-90deg) rotateY(180deg) translateX(-$x) translateY(-$y);
  transform-origin: top left;
}

@mixin cube-right($x, $y, $z) {
  width: $z * 2;
  height: $y;
  transform: rotateY(90deg) rotateZ(-90deg) translateZ($x) translateX(-$z * 2) translateY(-$y);
  transform-origin: top left;
}

@mixin cube-left($x, $y, $z) {
  width: $z * 2;
  height: $y;
  transform: rotateY(-90deg) rotateZ(90deg) translateY(-$y);
  transform-origin: top left;
}

@mixin cube-top($x, $y, $z) {
  width: $x;
  height: $z * 2;
  transform: translateZ($y);
  transform-origin: top left;
}

@mixin cube-bottom($x, $y, $z) {
  width: $x;
  height: $z * 2;
  transform: rotateY(180deg) translateX(-$x);
  transform-origin: top left;
}

$cube-h: 24px;
$cube-w: 200px;
$cube-z: 64px;

.book-item {
  cursor: pointer;
}

.face {
  position: absolute;
}

.cube {
  @include cuboid($cube-w, $cube-h, $cube-z);

  width: $cube-w;
  height: $cube-h;
  transform: perspective(9999px) rotateX(53deg) rotateZ(-60deg);
  transform-style: preserve-3d;

  &.front,
  &.back,
  &.right,
  &.left,
  &.top,
  &.bottom {
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  &.left {
    --b: 0.5;

    background: repeating-linear-gradient(to bottom, #eee 20%, #bbb 30%);
    border-right: none;
    border-bottom: calc(var(--b) * 1vmin) solid;
    border-left: calc(var(--b) * 1vmin) solid;
  }

  &.front,
  &.back {
    --b: 0.6;

    background: repeating-linear-gradient(to bottom, #eee 20%, #bbb 40%);
    border-bottom: calc(var(--b) * 1vmin) solid;
  }

  &.back {
    background: black;
  }

  .top {
    width: calc($cube-w / 1.54);
    height: calc($cube-h * 8.45);
    background-size: 100% 100%;
    border-radius: 1px;
    transform: rotate(90deg) translateZ($cube-h) translateY(-100%);
  }
}
</style>
