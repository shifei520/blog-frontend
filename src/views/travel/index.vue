<template>
  <div class="travel-page">
    <div class="travel-container cneter-page-main">
      <AsideMenu :list="cityList" @on-change="cityChangeHandle" />
      <main class="scene-list hidden-scrollbar">
        <SceneItem v-for="item in sceneList" :item="item" :key="item.id" />
      </main>
    </div>
  </div>
</template>
<script setup lang="ts" name="Travel">
import { ref } from 'vue';
import AsideMenu from './components/AsideMenu.vue';
import SceneItem from './components/SceneItem.vue';
import { travelCityGet, travelSceneByCityId } from '@/apis/travel/index';
import type { TravelCityItem, TravelSceneItem } from '@/apis/types/travel';

const imgDomain = import.meta.env.VITE_PUBLIC_PATH;

const cityList = ref<TravelCityItem[]>([]);
/** 获取城市列表 */
const getTravelCity = async () => {
  const data = await travelCityGet();
  if (data.code !== 200) return;

  cityList.value = data.data;
};
getTravelCity();

const sceneList = ref<TravelSceneItem[]>([]);
/** 城市改变获取城市下的景点列表 */
const cityChangeHandle = async (cityId: number) => {
  const data = await travelSceneByCityId({ cityId });
  if (data.code !== 200) return;

  sceneList.value = data.data.map((item) => {
    return {
      ...item,
      coverImage: item.coverImage ? `${imgDomain}${item.coverImage}` : '',
    };
  });
};
</script>
<style lang="scss" scoped>
.travel-page {
  box-sizing: border-box;
  height: 100%;
  background: url('@/assets/images/books_bg.jpg') no-repeat center center/cover;

  .travel-container {
    display: grid;
    grid-template-columns: auto 1fr;
    height: 100%;
    padding-top: 58px;
    padding-bottom: 20px;

    .scene-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
      align-content: flex-start;
      padding: 20px;
      overflow: hidden auto;
      transition: all 0.5s 0.8s;
    }
  }
}
</style>
