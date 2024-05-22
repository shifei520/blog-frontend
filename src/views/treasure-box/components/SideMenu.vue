<template>
  <div class="menu-box">
    <ul class="menu-box-menu">
      <li
        class="menu-box-item"
        v-for="item in menuList"
        :key="item.id"
        :class="{ 'sub-menu': item.children && item.children.length }"
        @click="openMenu(item)"
      >
        <input hidden type="radio" :id="item.id + ''" name="firstLevel" />
        <label :for="item.id + ''">
          <div class="item-content">
            <span class="menu-icon" v-html="item.icon"></span>
            <span class="menu-title">{{ item.name }}</span>
          </div>
        </label>

        <div class="sub-menu-list">
          <ul>
            <li
              :class="['menu-box-item', currentMenu === sub.id ? 'active-menu' : '']"
              v-for="sub in item.children"
              :key="sub.id"
              @click.stop="openMenu(sub)"
            >
              <div class="item-content">
                <span class="menu-title">{{ sub.name }}</span>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts" name="SideMenu">
import { nextTick, ref, watch } from 'vue';
import type { MenuItem } from '@/apis/types/treasure';
import { useTreasureStore } from '@/store/treasure';

const treasureStore = useTreasureStore();

const props = withDefaults(
  defineProps<{
    menuList: MenuItem[];
  }>(),
  {
    menuList: () => [],
  },
);

const currentMenu = ref(0);
const openMenu = (item: MenuItem) => {
  currentMenu.value = item.id;
  treasureStore.setTreasureMenuId(item.id);
};

watch(
  () => props.menuList,
  (list) => {
    if (list && list.length) {
      const menu = list[0];

      if (menu.children && menu.children.length) {
        currentMenu.value = menu.children[0].id;
        treasureStore.setTreasureMenuId(menu.children[0].id);
      } else {
        currentMenu.value = menu.id;
        treasureStore.setTreasureMenuId(menu.id);
      }

      nextTick(() => {
        const input = document.getElementById(menu.id + '') as HTMLInputElement;
        input.checked = true;
      });
    }
  },
);
</script>

<style scoped lang="scss">
.menu-box {
  color: #7d84ab;

  .menu-box-menu {
    .menu-box-item {
      position: relative;
      transition: all 0.3s;

      :deep(.menu-icon) {
        display: flex;
        align-items: center;
        width: 35px;
        min-width: 35px;
        height: 35px;
        font-size: 1.2rem;
        line-height: 35px;
        text-align: center;
        transition: color 0.3s;

        svg {
          width: 16px;
          height: 16px;
          fill: #7d84ab;
        }
      }

      .item-content {
        display: flex;
        align-items: center;
        height: 50px;
        padding: 0 20px;
        cursor: pointer;

        &:hover {
          color: #dee2ec;

          :deep(.menu-icon) svg {
            fill: #dee2ec;
          }
        }
      }

      &.sub-menu {
        > label .item-content::after {
          width: 5px;
          height: 5px;
          content: '';
          border-right: 2px solid currentcolor;
          border-bottom: 2px solid currentcolor;
          transition: transform 0.3s;
          transform: rotate(-45deg);
        }
      }

      > label {
        display: block;
        width: 100%;
      }

      .sub-menu-list {
        display: grid;
        grid-template-rows: 0fr;
        overflow: hidden;
        transition: 0.3s;

        > ul {
          min-height: 0;
        }
      }

      > input:checked {
        + label {
          color: #dee2ec;

          /* stylelint-disable-next-line no-descending-specificity */
          :deep(.menu-icon) svg {
            fill: #dee2ec;
          }
        }

        ~ .sub-menu-list {
          grid-template-rows: 1fr;
        }
      }

      &.active-menu {
        color: #dee2ec;
      }
    }

    .menu-title {
      flex-grow: 1;
      overflow: hidden;
      font-size: 0.9em;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: color 0.3s;
    }
  }
}
</style>
