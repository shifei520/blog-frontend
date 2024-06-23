<template>
  <div class="fancy">
    <span class="top-key"></span>
    <span class="text">推荐项目</span>
    <span class="bottom-key-1"></span>
    <span class="bottom-key-2"></span>
  </div>
</template>
<script setup lang="ts" name="RecommendBtn"></script>
<style lang="scss" scoped>
.fancy {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 34px;
  padding: 1.25em 2em;
  font-size: 13px;
  color: #fff;
  letter-spacing: 2px;
  cursor: pointer;
  background-color: transparent;
  border: 2px solid #fff;
  transition: all 0.3s ease-in-out;

  &::before {
    position: absolute;
    top: 50%;
    left: 1.5em;
    width: 1.5625rem;
    height: 2px;
    content: ' ';
    background: #fff;
    transition:
      background 0.3s linear,
      width 0.3s linear;
    transform: translateY(-50%);
    transform-origin: center;
  }

  .text {
    padding-left: 2rem;
    color: #fff;
    transition: all 0.3s ease-in-out;
  }

  .top-key {
    position: absolute;
    top: -2px;
    left: 0.625rem;
    width: 1.5625rem;
    height: 2px;
    background: #000;
    transition:
      width 0.5s ease-out,
      left 0.3s ease-out;
  }

  .bottom-key-1 {
    position: absolute;
    right: 1.875rem;
    bottom: -2px;
    width: 1.5625rem;
    height: 2px;
    background: #000;
    transition:
      width 0.5s ease-out,
      right 0.3s ease-out;
  }

  .bottom-key-2 {
    position: absolute;
    right: 0.625rem;
    bottom: -2px;
    width: 0.625rem;
    height: 2px;
    background: #000;
    transition:
      width 0.5s ease-out,
      right 0.3s ease-out;
  }

  &:hover {
    background: #fff;

    .text {
      padding-left: 1.5em;
      color: #000;
    }

    .top-key {
      left: -2px;
      width: 0;
    }

    .bottom-key-1,
    .bottom-key-2 {
      right: 0;
      width: 0;
    }

    &::before {
      width: 0.9375rem;
      background: #000;
    }
  }
}
</style>
