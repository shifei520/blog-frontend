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
    <q-infinite-scroll
      @load="getProjectList"
      :offset="250"
      :disable="loadAll"
      ref="infiniteScrollRef"
      scroll-target="body"
    >
      <div class="project-list">
        <ProjectItem v-for="item in projectList" :key="item.id" :item="item" />
      </div>
      <template v-slot:loading>
        <SFLoading />
      </template>
    </q-infinite-scroll>
  </div>
</template>
<script setup lang="ts" name="Content">
import { ref, watch } from 'vue';
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
  pageSize: 12,
});

const loadAll = ref(false);
const projectList = ref<ProjectItemType[]>([]);
const infiniteScrollRef = ref();
/** 获取项目列表 */
const getProjectList = async (index: number, done: () => void) => {
  if (!form.value.categoryId) return done();
  form.value.pageNo = index;

  const data = await projectListGet(form.value);
  if (data.code !== 200) return;

  if (form.value.pageNo * form.value.pageSize < data.data.totalCount) {
    done && done();
  } else {
    loadAll.value = true;
  }
  projectList.value = [
    ...projectList.value,
    ...data.data.list.map((item) => {
      return {
        ...item,
        coverImage: item.coverImage ? imgDomain + item.coverImage : '',
      };
    }),
  ];
};

/** 重置 */
const reset = () => {
  form.value = {
    name: '',
    description: '',
    categoryId: form.value.categoryId,
    pageNo: 1,
    tagIds: [],
    pageSize: 12,
  };
  loadAll.value = false;
  projectList.value = [];
  infiniteScrollRef.value.setIndex(0);
  infiniteScrollRef.value.poll();
};

/** 搜索 */
const search = () => {
  loadAll.value = false;
  projectList.value = [];
  infiniteScrollRef.value.setIndex(0);
  infiniteScrollRef.value.poll();
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
        pageSize: 12,
      };
      loadAll.value = false;
      projectList.value = [];
      infiniteScrollRef.value.setIndex(0);
      infiniteScrollRef.value.poll();
    }
  },
);
</script>
<style lang="scss" scoped>
.treasure-content {
  position: relative;
  padding: 20px;

  .project-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  .form-btns {
    flex-basis: 100%;
  }
}
</style>
