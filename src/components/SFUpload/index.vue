<template>
  <label
    class="custum-file-upload"
    for="file"
    :style="{ backgroundImage: `conic-gradient(#67C23A ${progress}%,#ebebeb 0%)` }"
  >
    <img class="preview-img" v-if="imgInfo" :src="imgInfo" alt="" />
    <div v-else class="icon">
      <svg-icon name="upload"></svg-icon>
    </div>
    <input type="file" id="file" @change="onUploadChange" />
  </label>
  <p class="tip">{{ tip }}</p>
</template>
<script setup lang="ts" name="SFUpload">
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = withDefaults(
  defineProps<{
    tip: string;
    progress: number;
    httpHandle: (file: File) => Promise<void>;
  }>(),
  {
    progress: 0,
  },
);
const imgInfo = ref('');
const onUploadChange = async (e: any) => {
  imgInfo.value = '';
  const files: FileList = e.target.files;
  if (files && files.length) {
    const { type } = files[0];
    const typeArr = type.split('/');
    if (typeArr[0] !== 'image') {
      toast.warning('请上传正确格式的图片！');
      return;
    }
    await props.httpHandle(files[0]);

    const reader = new FileReader();
    reader.onload = function (e: any) {
      const buffer = e.target.result;
      const blob = new Blob([buffer]);
      const url = URL.createObjectURL(blob);
      imgInfo.value = url;
    };
    reader.readAsArrayBuffer(files[0]);
  }
};
</script>
<style lang="scss" scoped>
.custum-file-upload {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  align-items: center;
  justify-content: center;
  width: 192px;
  height: 128px;
  overflow: hidden;
  cursor: pointer;
  background-color: rgb(255 255 255 / 100%);
  border-radius: 10px;
  box-shadow: 0 48px 35px -48px rgb(0 0 0 / 10%);

  .preview-img {
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  .icon {
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    > svg {
      font-size: 40px;
      color: rgba(75 85 99 / 50%);
    }
  }

  > input {
    display: none;
  }

  &::before {
    position: absolute;
    inset: 2px;
    content: '';
    background-color: rgb(255 255 255 / 100%);
    border-radius: 10px;
  }
}

.tip {
  margin-top: 10px;
  font-size: 12px;
  color: $infoColor-2;
}
</style>
