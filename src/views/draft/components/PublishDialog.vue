<template>
  <Dialog title="发布文章" v-model:visible="visible">
    <form class="mt-10">
      <div class="form-item">
        <span class="form-item-title leading-[32px] required">文章标题:</span>
        <div class="form-item-content">
          <SFInput width="100%" v-model="formData.title" placeholder="请输入文章标题" />
        </div>
      </div>
      <div class="form-item !mb-0">
        <span class="form-item-title leading-[28px] required">文章分类:</span>
        <div class="form-item-content">
          <div
            class="item"
            v-for="item in menuList"
            :key="item.id"
            :class="{ active: item.id === formData.categoryId }"
            @click="formData.categoryId = item.id"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="form-item">
        <span class="form-item-title leading-[32px] required">文章标签:</span>
        <div class="form-item-content">
          <SelectPageList
            multiple
            width="330px"
            language="zh-chs"
            :pagination="false"
            v-model="formData.tagIds"
            @fetch-data="fetchData"
            customTriggerClass="sf-multiple-select"
            placeholder="至少选择一个标签"
          />
        </div>
      </div>
      <div class="form-item">
        <span class="form-item-title leading-[32px] required">文章摘要:</span>
        <div class="form-item-content">
          <SFInput
            type="textarea"
            width="100%"
            show-word-limit
            maxlength="100"
            v-model="formData.abstract"
            placeholder="请输入文章摘要"
          />
        </div>
      </div>
      <div class="form-item">
        <span class="form-item-title leading-[32px]">文章封面:</span>
        <div class="form-item-content">
          <SFUpload
            tip="建议尺寸：192*128px (封面仅展示在首页信息流中)"
            :http-handle="httpHandle"
          />
        </div>
      </div>
    </form>
    <div class="btn-groups">
      <div class="cancel-btn mr-[20px]" @click="visible = false">取消</div>
      <div class="confirm-btn" @click="submit">确定</div>
    </div>
  </Dialog>
</template>
<script setup lang="ts" name="PublishDialog">
import { ref, watch } from 'vue';
import { SelectPageList } from 'v-selectpage';
import type { PageParameters, FetchDataCallback } from 'v-selectpage';
import Dialog from '@/components/Dialog/index.vue';
import { categoryListGet, tagListGet, uploadCoverImg, articleAdd } from '@/apis/articles/index';
import type { ArticleAddParams, CategoryItem, TagItem } from '@/apis/types/articles-index';
import SFUpload from '@/components/SFUpload/index.vue';
import { useToast } from 'vue-toastification';
import { validateForm } from '@/utils/utils';
import { useRouter } from 'vue-router';

const toast = useToast();
const props = defineProps<{
  content: string;
}>();

const visible = ref(false);

const menuList = ref<CategoryItem[]>([]);
/** 获取分类列表 */
const getCategoryList = async () => {
  const data = await categoryListGet();
  if (data.code !== 200) return;

  menuList.value = data.data;
};
getCategoryList();

const tagList = ref<TagItem[]>([]);
/** 获取分类列表 */
const getTagList = async () => {
  const data = await tagListGet();
  if (data.code !== 200) return;

  tagList.value = data.data;
};

const fetchData = async (data: PageParameters, callback: FetchDataCallback) => {
  await getTagList();
  callback(tagList.value, tagList.value.length);
};

/** 上传图片请求 */
const httpHandle = async (file: File) => {
  const fd = new FormData();
  fd.append('file', file);
  const data = await uploadCoverImg(fd);
  if (data.code !== 200) return;

  formData.value.coverImage = data.data;
  toast.success('上传成功');
};

const formData = ref<ArticleAddParams>({
  categoryId: 0,
  tagIds: [],
  abstract: '',
  coverImage: '',
  content: '',
  title: '',
});
const rules = {
  content: '请输入文章内容',
  title: '请输入文章标题',
  categoryId: '请选择文章分类',
  tagIds: '请选择文章标签',
  abstract: '请输入文章摘要',
};

watch(
  () => props.content,
  (val) => {
    formData.value.content = val;
  },
  { immediate: true },
);

const router = useRouter();
/** 提交表单 */
const submit = async () => {
  const valid = validateForm(formData.value, rules);
  if (!valid) return;

  const data = await articleAdd(formData.value);
  if (data.code !== 200) return;

  visible.value = false;
  toast.success('添加成功');
  router.push('/article');
};

const openDialog = () => {
  visible.value = true;
};

defineExpose({
  openDialog,
});
</script>
