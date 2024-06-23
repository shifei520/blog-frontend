<template>
  <div class="header-search">
    <div class="search-item">
      <span class="title" :class="{ filtering: form.name }">{{ form.name || '项目名称' }}</span>
      <q-popup-edit v-model="form.name" auto-save v-slot="scope" :cover="false" fit>
        <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
      </q-popup-edit>
    </div>
    <q-separator vertical />
    <div class="search-item">
      <span class="title" :class="{ filtering: form.description }">{{
        form.description || '项目描述'
      }}</span>
      <q-popup-edit v-model="form.description" auto-save v-slot="scope" :cover="false" fit>
        <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
      </q-popup-edit>
    </div>
    <q-separator vertical />
    <div class="search-item">
      <span class="title" :class="{ filtering: categoryName }">{{
        categoryName || '项目分类'
      }}</span>
      <q-popup-edit v-model="form.categoryId" auto-save :cover="false" fit>
        <q-tree
          :nodes="menuList"
          node-key="id"
          label-key="name"
          v-model:selected="form.categoryId"
          no-selection-unset
        >
        </q-tree>
      </q-popup-edit>
    </div>
    <q-separator vertical />
    <div class="search-item">
      <span class="title" :class="{ filtering: tagsName }">{{ tagsName || '标签' }}</span>
      <q-popup-edit v-model="form.tagIds" auto-save :cover="false" fit>
        <q-virtual-scroll style="max-height: 300px" :items="tagList" separator v-slot="{ item }">
          <q-item tag="label" v-ripple :key="item.id">
            <q-item-section avatar>
              <q-checkbox v-model="form.tagIds" :val="item.id" size="sm" color="cyan" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-virtual-scroll>
      </q-popup-edit>
    </div>
    <q-separator vertical />
    <div class="btn-item" @click="searchHandle">
      <svg-icon name="search"></svg-icon>
    </div>
    <!-- 展示结果弹框 -->
    <Transition
      enter-active-class="animate__animated animate__slideInDown"
      leave-active-class="animate__animated animate__slideOutUp"
    >
      <div
        class="result-dialog"
        :style="{ height: totalCount > 12 ? '50vh' : 'auto' }"
        v-if="dialogVisible"
      >
        <SFInfiniteScroll ref="scrollTargetRef" @load="getProjectList" :disable="loadAll">
          <q-item clickable v-ripple v-for="item in projectList" :key="item.id" @click="skip(item)">
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
              <q-item-label caption>{{ item.description }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              {{ item.tags.map((tag) => tag.name).join(';') }}
            </q-item-section>
          </q-item>
        </SFInfiniteScroll>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts" name="HeaderSearch">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import type { MenuItem, TagItem, ProjectParamsGet, ProjectItem } from '@/apis/types/treasure';
import { useClickOutSide } from '@/utils/hooks';
import { projectListGet } from '@/apis/treasure-box/index';
import SFInfiniteScroll from '@/components/SFInfiniteScroll/index.vue';

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

/** 获取当前分类选中节点的name值 */
const recursionTree = (menuList: MenuItem[], id: number | null) => {
  let name = '';
  if (!id) return name;

  for (let i = 0; i < menuList.length; i++) {
    const menu = menuList[i];
    if (menu.id === id) {
      name = menu.name;
      break;
    } else if (menu.children && menu.children.length) {
      name = recursionTree(menu.children, id);
      if (name) {
        break;
      }
    }
  }

  return name;
};

const categoryName = computed(() => {
  return recursionTree(props.menuList, form.value.categoryId);
});

const tagsName = computed(() => {
  if (!form.value.tagIds || !form.value.tagIds.length) return '';

  return form.value.tagIds
    .map((tagId) => {
      const tag = props.tagList.find((tag) => tag.id === tagId);
      return tag?.name;
    })
    .join(';');
});

const form = ref<ProjectParamsGet>({
  name: '',
  description: '',
  categoryId: null,
  tagIds: [],
  pageNo: 1,
  pageSize: 12,
});

const dialogVisible = ref(false);
/** 提交搜索 */
const searchHandle = () => {
  dialogVisible.value = true;
  loadAll.value = false;
  getProjectList(true);
};

const loadAll = ref(false);
const totalCount = ref(0);
const projectList = ref<ProjectItem[]>([]);
/** 获取项目列表 */
const getProjectList = async (flag = false) => {
  if (flag === true) {
    form.value.pageNo = 1;
    totalCount.value = 0;
    projectList.value = [];
  }

  const data = await projectListGet(form.value);
  if (data.code !== 200) return;

  totalCount.value = data.data.totalCount;
  if (form.value.pageNo * form.value.pageSize < data.data.totalCount) {
    form.value.pageNo += 1;
  } else {
    loadAll.value = true;
  }
  projectList.value = [...projectList.value, ...data.data.list];
};
/** 跳转到项目详情 */
const skip = (item: ProjectItem) => {
  window.open(item.projecUrl, '_blank');
};

let clearEvent: any;
watch(
  () => dialogVisible.value,
  (visible: boolean) => {
    if (visible) {
      nextTick(() => {
        const { stop } = useClickOutSide(
          document.querySelector('.result-dialog') as HTMLDivElement,
          (isOutSide: boolean) => {
            if (isOutSide) {
              dialogVisible.value = false;
            }
          },
        );
        clearEvent = stop;
      });
    } else {
      clearEvent && clearEvent();
    }
  },
);

onBeforeUnmount(() => {
  clearEvent && clearEvent();
});
</script>
<style lang="scss" scoped>
.header-search {
  position: relative;
  display: flex;
  width: 60%;
  max-width: 100%;
  height: 40px;
  color: $primaryColor;
  background-color: #fff;
  border-radius: 4px;
  box-shadow:
    0 1px 3px #0003,
    0 1px 1px #00000024,
    0 2px 1px -1px #0000001f;

  .search-item {
    display: flex;
    flex: 1;
    flex-shrink: 0;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
      background-color: #ebebeb;
    }

    &:nth-of-type(1) {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    .title {
      color: $infoColor-2;

      @include ellipse-lines;

      &.filtering {
        font-weight: 600;
        color: $primaryColor;
      }
    }
  }

  .btn-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    cursor: pointer;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .result-dialog {
    position: absolute;
    top: 44px;
    z-index: 999;
    width: 100%;
    padding: 15px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 8px 11px 5px rgb(143 143 143 / 71%);
  }
}
</style>
