<template>
  <q-layout view="hHh LpR fFf" class="bg-[#f9f9f9]">
    <q-header elevated class="bg-black text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <div class="left-logo" @click="skipMenu('/home')">
          <img class="logo" src="@/assets/images/logo.png" alt="" />
          <h2>时不待我</h2>
        </div>
        <q-btn
          class="ml-auto"
          color="white"
          text-color="black"
          label="推荐项目"
          @click="recommendHandle"
        />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <SideMenu :menuList="menuList" />
    </q-drawer>

    <q-page-container><Content /></q-page-container>
    <RecommendProjectDialog
      ref="recommendProjectDialogRef"
      :menuList="menuList"
      :tagList="tagList"
    />
  </q-layout>
</template>

<script setup lang="ts" name="TreasureBox">
import { ref, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import SideMenu from './components/SideMenu.vue';
import Content from './components/Content.vue';
import { menuListGet, tagListGet } from '@/apis/treasure-box/index';
import type { MenuItem, TagItem } from '@/apis/types/treasure';

const RecommendProjectDialog = defineAsyncComponent(
  () => import('./components/RecommendProject.vue'),
);

const router = useRouter();
const leftDrawerOpen = ref(false);

/** 切换侧边栏的显示隐藏 */
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const menuList = ref<MenuItem[]>([]);
/** 获取目录数据 */
const getMenuList = async () => {
  const data = await menuListGet();
  if (data.code !== 200) return;

  menuList.value = data.data;
};
getMenuList();

const tagList = ref<TagItem[]>([]);
/** 获取标签列表 */
const getTagList = async () => {
  const data = await tagListGet({ pageNo: -1, pageSize: -1 });
  if (data.code !== 200) return;

  tagList.value = data.data.list;
};
getTagList();

/** 跳转路由 */
const skipMenu = (path: string) => {
  router.push(path);
};

const recommendProjectDialogRef = ref();
/** 推荐项目 = */
const recommendHandle = () => {
  recommendProjectDialogRef.value?.openDialog();
};
</script>

<style scoped lang="scss">
.left-logo {
  display: flex;
  align-items: center;
  margin-left: 12px;
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;

  .logo {
    width: 28px;
    height: 28px;
    margin-right: 6px;
  }
}

:deep(.q-drawer) {
  .q-drawer__content {
    background-color: rgb(25 28 39);
  }
}
</style>
