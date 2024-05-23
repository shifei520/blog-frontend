<template>
  <div class="treasure-content">
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
import { projectListGet } from '@/apis/treasure-box/index';
import { useTreasureStore } from '@/store/treasure';
import type { ProjectParamsGet, ProjectItem as ProjectItemType } from '@/apis/types/treasure';
import ProjectItem from './ProjectItem.vue';

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

watch(
  () => treasureStore.treasureMenuId,
  (id) => {
    console.log('watch', id);

    if (id) {
      form.value.categoryId = id;
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
}
</style>
