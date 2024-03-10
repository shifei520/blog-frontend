<template>
  <div class="comment-item">
    <div class="user-name">{{ nickname }}</div>
    <div class="comment-detail">
      {{ content }}
    </div>
    <div class="extra-info">
      <span class="tile">{{ createTime }}</span>
    </div>
  </div>
</template>
<script setup lang="ts" name="CommentItem">
withDefaults(
  defineProps<{
    content: string;
    createTime: string;
    nickname: string;
  }>(),
  {
    content: '',
    createTime: '',
    nickname: '',
  },
);
</script>
<style lang="scss" scoped>
.comment-item {
  padding: 10px;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 5px 5px 0 #00000026;

  .user-name {
    color: $primaryColor_2;
  }

  .comment-detail {
    margin-top: 8px;
  }

  .extra-info {
    margin-top: 12px;
    font-size: 14px;
    color: $infoColor-2;
  }
}
</style>
