<template>
  <div class="draft-page">
    <div class="draft-header">
      <button class="btn" @click="publishHandle">发布</button>
    </div>
    <Suspense>
      <MarkDownEditor class="custom-editor" v-model="content" />
      <template #fallback>
        <div class="loading-container">
          <SFLoading />
        </div>
      </template>
    </Suspense>
    <PublishDialog ref="publishDialogRef" :content="content" />
  </div>
</template>
<script setup lang="ts" name="Draft">
import { defineAsyncComponent, ref } from 'vue';
const MarkDownEditor = defineAsyncComponent(() => import('@/components/MarkDownEditor/index.vue'));
const PublishDialog = defineAsyncComponent(() => import('./components/PublishDialog.vue'));

const publishDialogRef = ref();
/** 打开发布文章弹框 */
const publishHandle = () => {
  publishDialogRef?.value.openDialog();
};

const content = ref('');
</script>
<style lang="scss" scoped>
.draft-page {
  .draft-header {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 20px;

    .btn {
      position: relative;
      width: 60px;
      height: 32px;
      overflow: hidden;
      font-weight: bold;
      color: purple;
      text-decoration: none;
      cursor: pointer;
      background: transparent;
      border: 2px solid purple;
      border-radius: 4px;
      transition: all 1s;

      &::before {
        position: absolute;
        top: 0;
        left: -40px;
        z-index: -1;
        width: 0%;
        height: 100%;
        content: '';
        background-color: purple;
        transition: all 1s;
        transform: skewX(45deg);
      }

      &:hover {
        color: #fff;

        &::before {
          width: 160%;
        }
      }
    }
  }

  :deep(.custom-editor) {
    width: 100vw;
    padding: 0 20px 20px;

    .bytemd {
      height: calc(100vh - 80px);
    }
  }

  .loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: calc(100vh - 80px);
  }
}
</style>
