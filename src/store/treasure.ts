import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTreasureStore = defineStore('treasure', () => {
  const treasureMenuId = ref<number | null>(null);
  const setTreasureMenuId = (val: number) => {
    treasureMenuId.value = val;
  };

  return {
    treasureMenuId,
    setTreasureMenuId,
  };
});
