<template>
  <SFDialog title="推荐项目" v-model:visible="visible" @on-close="onReset">
    <div class="content">
      <q-form @submit="onSubmit" class="q-gutter-md" ref="formRef">
        <q-input
          v-model="form.name"
          label="项目名称"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || '项目名称不能为空']"
        />
        <q-input v-model="form.description" label="项目描述" type="textarea" />
        <q-select
          :model-value="categoryName"
          :options="menuList"
          label="项目分类"
          option-label="name"
          option-value="id"
        >
          <template v-slot:option="{ opt }">
            <q-tree
              :nodes="[opt]"
              node-key="id"
              label-key="name"
              v-model:selected="form.categoryId"
              no-selection-unset
            >
            </q-tree>
          </template>
        </q-select>
        <q-select
          v-model="form.tagIds"
          :options="options"
          label="项目标签"
          use-input
          @filter="filterFn"
          multiple
          option-value="id"
          option-label="name"
          emit-value
          map-options
        />
        <q-input
          v-model="form.remark"
          label="备注"
          type="textarea"
          hint="如果分类或标签不符合，您可以在此说明"
        />
        <q-input
          v-model="form.projecUrl"
          label="项目主页或代码仓库地址"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || '地址不能为空']"
        />
        <q-input
          v-model="form.email"
          label="您的邮箱"
          hint="项目审核通过后向该邮箱发送通知"
          lazy-rules
          :rules="[(val) => !val || validateEmail(val) || '邮箱格式不正确']"
        />
        <div>
          <q-btn label="提交" type="submit" color="primary" />
          <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" @click="onReset" />
        </div>
      </q-form>
    </div>
  </SFDialog>
</template>
<script setup lang="ts" name="RecommendProject">
import { computed, ref } from 'vue';
import SFDialog from '@/components/SFDialog/index.vue';
import type { MenuItem, TagItem } from '@/apis/types/treasure';
import { findTreeItem, validateEmail } from '@/utils/utils';
import { recommedProject } from '@/apis/treasure-box/index';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = withDefaults(
  defineProps<{
    menuList: MenuItem[];
    tagList: TagItem[];
  }>(),
  {
    menuList: () => [],
    tagList: () => [],
  },
);

const options = ref<TagItem[]>(props.tagList);
const filterFn = (val: string, update: any) => {
  if (val === '') {
    update(() => {
      options.value = props.tagList;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = props.tagList.filter((v) => v.name.toLowerCase().indexOf(needle) > -1);
  });
};

const form = ref({
  name: '',
  description: '',
  categoryId: null,
  tagIds: null,
  remark: '',
  projecUrl: '',
  email: '',
});
/** 分类名称 */
const categoryName = computed(() => {
  if (!form.value.categoryId) return '';
  const item = findTreeItem(props.menuList, form.value.categoryId);
  return item ? item.name : '';
});

const onSubmit = async () => {
  const data = await recommedProject(form.value);
  if (data.code !== 200) return;

  toast.success('提交成功');
  visible.value = false;
};

const formRef = ref();
const onReset = () => {
  form.value = {
    name: '',
    description: '',
    categoryId: null,
    tagIds: null,
    remark: '',
    projecUrl: '',
    email: '',
  };
  formRef.value?.reset();
};

const visible = ref(false);

/** 打开弹出框 */
const openDialog = () => {
  visible.value = true;
};

defineExpose({
  openDialog,
});
</script>
<style lang="scss" scoped>
.content {
  width: 800px;
}
</style>
