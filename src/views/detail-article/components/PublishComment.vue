<template>
  <div class="publish-comment">
    <h1 class="comment-title">发表评论</h1>
    <textarea
      placeholder="请输入内容（自动过滤敏感词，请文明评论）"
      class="textarea"
      v-model="content"
    ></textarea>
    <V3Emoji fix-pos="downleft" size="small" @click-emoji="clickEmoji">
      <button class="emote">
        <svg-icon name="emote"></svg-icon>
      </button>
    </V3Emoji>

    <span class="col-span-3"></span>
    <button class="publish-btn" @click="publish">
      <svg-icon name="publish"></svg-icon>
    </button>
  </div>
</template>
<script setup lang="ts" name="PublishComment">
import { ref } from 'vue';
import { POSITION, useToast } from 'vue-toastification';
import { publishComment } from '@/apis/articles/comment';
import V3Emoji from 'vue3-emoji';
import 'vue3-emoji/dist/style.css';

const toast = useToast();
const props = defineProps(['articleId']);
const emit = defineEmits(['on-success']);

const content = ref('');
const loading = ref(false);

/** 发布评论 */
const publish = async () => {
  if (loading.value) return;

  if (!content.value)
    return toast.error('评论内容不能为空', {
      position: POSITION.TOP_CENTER,
    });

  const params = {
    articleId: props.articleId,
    content: content.value,
  };

  loading.value = true;

  try {
    const data = await publishComment(params);
    if (data.code !== 200) return;

    toast.success('评论成功');
    content.value = '';
    emit('on-success');
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

/** 选择表情 */
const clickEmoji = (val: any) => {
  content.value += val;
};
</script>
<style lang="scss" scoped>
.publish-comment {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
  background-color: #fff;

  .comment-title {
    grid-column: span 6 / span 6;
    font-size: 20px;
    font-weight: 700;
    color: $primaryColor_2;
    text-align: center;
  }

  .textarea {
    grid-column: span 6 / span 6;
    height: 100px;
    padding: 8px;
    color: rgb(71 85 105);
    resize: none;
    background-color: rgb(241 245 249);
    border-color: rgb(226 232 240);
    border-width: 1px;
    border-radius: 8px;
    outline: 2px solid transparent;
    outline-offset: 2px;
    transition-duration: 300ms;

    &::placeholder {
      color: rgb(71 85 105);
      opacity: 0.5;
    }

    &:focus {
      border-color: rgb(71 85 105);
    }
  }

  .emote,
  .publish-btn {
    display: flex;
    grid-column: span 1 / span 1;
    align-items: center;
    justify-content: center;
    padding: 8px;
    color: rgb(71 85 105);
    cursor: pointer;
    background-color: rgb(241 245 249);
    border: none;
    border-radius: 8px;
    transition-duration: 300ms;

    .svg-icon {
      font-size: 20px;
    }

    &:focus {
      color: rgb(191 219 254);
      background-color: rgb(96 165 250);
    }
  }

  /* stylelint-disable-next-line no-descending-specificity */
  .publish-btn {
    grid-column: span 2 / span 2;
  }
}
</style>
