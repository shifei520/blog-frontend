<template>
  <div class="treasure-content">
    <form class="sf-form inline mb-[10px]">
      <div class="form-item">
        <span class="form-item-title leading-[32px]">项目名称:</span>
        <div class="form-item-content">
          <SFInput width="100%" v-model="form.name" placeholder="请输入项目名称" />
        </div>
      </div>
      <div class="form-item">
        <span class="form-item-title leading-[32px]">项目描述:</span>
        <div class="form-item-content">
          <SFInput width="100%" v-model="form.description" placeholder="请输入项目描述" />
        </div>
      </div>
      <div class="form-item">
        <span class="form-item-title leading-[32px]">标签:</span>
        <div class="form-item-content">
          <SelectPageList
            multiple
            language="zh-chs"
            :pagination="false"
            v-model="form.tagIds"
            @fetch-data="fetchTagData"
            customTriggerClass="sf-multiple-select"
            placeholder="至少选择一个标签"
          />
        </div>
      </div>
      <div class="btn-groups">
        <div class="cancel-btn mx-[10px]" @click="reset">重置</div>
        <div class="confirm-btn" @click="search">搜索</div>
      </div>
    </form>

    <v3-waterfall
      v-if="projectList.length"
      ref="waterfallRef"
      :list="projectList"
      :isLoading="loading"
      :isOver="loadAll"
      @scrollReachBottom="getProjectList"
      :gap="10"
      :distanceToScroll="100"
    >
      <template v-slot:default="{ item }">
        <ProjectItem :key="item.id" :item="item" />
      </template>
      <template v-slot:loading>
        <SFLoading />
      </template>
    </v3-waterfall>
  </div>
</template>
<script setup lang="ts" name="Content">
import { nextTick, ref, watch } from 'vue';
import { SelectPageList } from 'v-selectpage';
import type { PageParameters, FetchDataCallback } from 'v-selectpage';
import { projectListGet } from '@/apis/treasure-box/index';
import { useTreasureStore } from '@/store/treasure';
import type {
  ProjectParamsGet,
  ProjectItem as ProjectItemType,
  MenuItem,
  TagItem,
} from '@/apis/types/treasure';
import ProjectItem from './ProjectItem.vue';

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

const treasureStore = useTreasureStore();
const imgDomain = import.meta.env.VITE_PUBLIC_PATH;
const form = ref<ProjectParamsGet>({
  name: '',
  description: '',
  categoryId: null,
  pageNo: 1,
  tagIds: [],
  pageSize: 30,
});

const loadAll = ref(true);
const loading = ref(false);
const projectList = ref<ProjectItemType[]>([]);
/** 获取项目列表 */
const getProjectList = async (flag = false) => {
  if (!form.value.categoryId) return;

  if (flag === true) {
    form.value.pageNo = 1;
  }
  try {
    loading.value = true;

    const data = await projectListGet(form.value);
    if (data.code !== 200) return;

    if (form.value.pageNo * form.value.pageSize < data.data.totalCount) {
      form.value.pageNo += 1;
    } else {
      loadAll.value = true;
    }
    projectList.value = projectList.value.concat(
      data.data.list.map((item) => {
        return {
          ...item,
          coverImage: item.coverImage ? imgDomain + item.coverImage : '',
        };
      }),
    );
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

/** 重置 */
const reset = () => {
  form.value = {
    name: '',
    description: '',
    categoryId: form.value.categoryId,
    pageNo: 1,
    tagIds: [],
    pageSize: 30,
  };
  loadAll.value = false;
  projectList.value = [];
  getProjectList(true);
};

/** 搜索 */
const search = () => {
  loadAll.value = false;
  projectList.value = [];
  getProjectList(true);
};

/** 延迟一段时间 */
const delay = (duration = 200) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};
const fetchTagData = async (data: PageParameters, callback: FetchDataCallback) => {
  while (!props.tagList.length) {
    await delay();
  }
  callback(
    props.tagList.filter((tag) => tag.name.includes(data.search)),
    props.tagList.length,
  );
};

const waterfallRef = ref();
watch(
  () => treasureStore.treasureMenuId,
  (id) => {
    if (id) {
      form.value = {
        name: '',
        description: '',
        categoryId: id,
        pageNo: 1,
        tagIds: [],
        pageSize: 30,
      };
      loadAll.value = false;
      projectList.value = [];
      getProjectList(true);
    }
  },
);
</script>
<style lang="scss" scoped>
.treasure-content {
  padding: 20px;
}
</style>
