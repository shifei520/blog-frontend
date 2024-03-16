<template>
  <div class="tag-manager">
    <q-btn
      :ripple="{ center: true }"
      color="primary"
      label="新增标签"
      no-caps
      @click="addEditDialog(null)"
    />
    <div class="tag-list">
      <LabelItem
        class="profile-tag-item"
        v-for="item in tagList"
        :key="item.id"
        v-bind="item"
        @click="addEditDialog(item)"
      />
    </div>
    <Dialog :title="dialogTitle" v-model:visible="visible" @on-close="closeHandle">
      <q-form @submit="onSubmit" @reset="onReset" class="mt-[15px]">
        <q-input
          dense
          outlined
          v-model="formData.name"
          label="标签名称"
          lazy-rules
          :error="false"
          :rules="[(val) => (val && val.length > 0) || '请输入标签名称']"
        />
        <q-input dense outlined v-model="formData.color" label="文字颜色">
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-color v-model="formData.color" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input dense outlined v-model="formData.bgColor" label="背景颜色" class="mt-[20px]">
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-color v-model="formData.bgColor" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <div class="mt-[20px] text-right">
          <q-btn label="取消" type="reset" color="primary" size="sm" class="mr-[6px]" />
          <q-btn label="确认" type="submit" color="primary" size="sm" />
        </div>
      </q-form>
    </Dialog>
  </div>
</template>
<script setup lang="ts" name="TagManager">
import { computed, ref } from 'vue';
import { tagListGet } from '@/apis/articles/index';
import type { TagItem } from '@/apis/types/articles-index';
import { addTag, editTag } from '@/apis/profile/index';
import type { EditTag } from '@/apis/types/profile-index';
import LabelItem from '@/views/home/components/LabelItem.vue';
import Dialog from '@/components/Dialog/index.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const tagList = ref<TagItem[]>([]);
/** 获取所有的标签 */
const getTagList = async () => {
  const data = await tagListGet();
  if (data.code !== 200) return;

  tagList.value = data.data;
};
getTagList();

const visible = ref(false);
const formData = ref<EditTag>({
  id: null,
  name: '',
  bgColor: '',
  color: '',
});
const dialogTitle = computed(() => {
  return formData.value.id ? '修改标签' : '添加标签';
});
/** 添加或者编辑标签 */
const addEditDialog = (tag: TagItem | null) => {
  if (tag) {
    Object.assign(formData.value, tag);
  }
  visible.value = true;
};

const closeHandle = () => {
  formData.value = {
    id: null,
    name: '',
    bgColor: '',
    color: '',
  };
};

/** 提交代码 */
const onSubmit = async () => {
  let data;
  if (formData.value.id) {
    data = await editTag(formData.value);
  } else {
    data = await addTag(formData.value);
  }
  if (data.code !== 200) return;

  toast.success(formData.value.id ? '修改成功' : '添加成功');
  visible.value = false;
  getTagList();
};

const onReset = () => {
  visible.value = false;
};
</script>
<style lang="scss" scoped>
.tag-list {
  display: flex;
  gap: 10px;
  margin-top: 20px;

  .profile-tag-item {
    padding: 6px 14px;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
