<template>
  <div class="profile-information">
    <div class="nav-text">个人资料</div>
    <form class="mt-10 sf-form">
      <div class="form-item">
        <span class="form-item-title leading-[32px]">头像:</span>
        <div class="form-item-content">
          <SFUpload
            :http-handle="httpHandle"
            :progress="progress"
            shape="circle"
            v-model="formData.avator"
          />
        </div>
      </div>
      <div class="form-item">
        <span class="form-item-title leading-[32px]">昵称:</span>
        <div class="form-item-content">
          <SFInput width="100%" v-model="formData.nickname" />
        </div>
      </div>
      <div class="form-item">
        <span class="form-item-title leading-[32px]">邮箱:</span>
        <div class="form-item-content">
          <SFInput width="100%" v-model="formData.email" />
        </div>
      </div>
      <div class="form-item">
        <span class="form-item-title leading-[32px]"></span>
        <div class="form-item-content">
          <div class="btn-groups !text-left">
            <div class="confirm-btn" @click="submit">保存修改</div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts" name="PersonalInfo">
import { userStore } from '@/store/user';
import { onMounted, ref } from 'vue';
import type { AxiosProgressEvent } from 'axios';
import { useToast } from 'vue-toastification';
import { updateInfo } from '@/apis/login/index';
import { validateForm } from '@/utils/utils';
import { uploadAvator } from '@/apis/profile';
import SFUpload from '@/components/SFUpload/index.vue';

const toast = useToast();
const store = userStore();

onMounted(async () => {
  if (!store.userInfo?.username) {
    await store.getUserInfo();
  }

  formData.value.email = store.userInfo!.email;
  formData.value.nickname = store.userInfo!.nickname;
  formData.value.avator = store.userInfo!.avator;
});

const formData = ref({
  email: '',
  nickname: '',
  avator: '',
});

const rules = {
  email: '邮箱不能为空',
};

const progress = ref(0);
/** 上传图片请求 */
const httpHandle = async (file: File) => {
  progress.value = 0;

  const data = await uploadAvator(file, onUploadProgress);

  formData.value.avator = data + '?timestamp=' + Date.now();
  toast.success('上传成功');
};

/** 上传进度 */
const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
  if (!progressEvent.progress) return;

  progress.value = +(progressEvent.progress * 100).toFixed(2);
};

const submit = async () => {
  const valid = validateForm(formData.value, rules);
  if (!valid) return;

  const data = await updateInfo(formData.value);
  if (data.code !== 200) return;

  toast.success('修改成功');
  store.getUserInfo();
};
</script>
<style lang="scss" scoped>
.profile-information {
  .nav-text {
    padding: 0 0 16px;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    color: var(--juejin-font-1);
    border-bottom: 1px solid $infoColor;
  }
}
</style>
