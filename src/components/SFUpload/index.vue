<template>
  <label
    class="custum-file-upload"
    :class="[shape === 'circle' ? 'circle' : 'rect']"
    for="file"
    :style="{ backgroundImage: `conic-gradient(#67C23A ${progress}%,#ebebeb 0%)` }"
  >
    <img class="preview-img" v-if="imgInfo" :src="domain + imgInfo" alt="" />
    <div v-else class="icon">
      <svg-icon name="upload"></svg-icon>
    </div>
    <input type="file" id="file" @change="onUploadChange" accept="image/*" />
  </label>
  <p class="tip">{{ tip }}</p>
</template>
<script setup lang="ts" name="SFUpload">
import { ref, computed } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const emit = defineEmits(['update:modelValue']);
const props = withDefaults(
  defineProps<{
    tip: string;
    progress: number;
    httpHandle: (file: File) => Promise<void>;
    shape: 'rect' | 'circle';
    modelValue: string;
    domain: string;
  }>(),
  {
    progress: 0,
    shape: 'rect',
    modelValue: '',
    domain: import.meta.env.VITE_PUBLIC_PATH,
  },
);

const commonImageSuffix = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
const imgInfo = computed({
  get() {
    return props.modelValue;
  },
  set(val: string) {
    emit('update:modelValue', val);
  },
});

const onUploadChange = async (e: any) => {
  imgInfo.value = '';
  const files: FileList = e.target.files;
  if (files && files.length) {
    const { type } = files[0];
    const typeArr = type.split('/');
    if (typeArr[0] !== 'image') {
      toast.warning('请上传正确格式的图片！' + commonImageSuffix.join(','));
      return;
    }
    await props.httpHandle(files[0]);
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
  overflow: hidden;
  cursor: pointer;
  background-color: rgb(255 255 255 / 100%);
  border-radius: 10px;
  box-shadow: 0 48px 35px -48px rgb(0 0 0 / 10%);

  &.rect {
    width: 192px;
    height: 128px;
  }

  &.circle {
    width: 128px;
    height: 128px;
  }

  .preview-img {
    position: absolute;
    inset: 2px;
    z-index: 1;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-radius: 10px;
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
