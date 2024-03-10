<template>
  <label class="custum-file-upload" for="file">
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

const props = defineProps<{
  tip: string;
  httpHandle: (file: File) => Promise<void>;
}>();
const imgInfo = ref('');
const onUploadChange = async (e: any) => {
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
      // console.log(buffer);
      const url = URL.createObjectURL(blob);
      imgInfo.value = url;
    };
    reader.readAsArrayBuffer(files[0]);
  }
};
</script>
<style lang="scss" scoped>
.custum-file-upload {
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
  border: 2px dashed #cacaca;
  border-radius: 10px;
  box-shadow: 0 48px 35px -48px rgb(0 0 0 / 10%);

  .preview-img {
    width: 100%;
    height: 100%;
  }

  .icon {
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
}

.tip {
  margin-top: 10px;
  font-size: 12px;
  color: $infoColor-2;
}
</style>
