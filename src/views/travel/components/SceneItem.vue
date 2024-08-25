<template>
  <div
    class="card-wrap"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="cardRef"
    @click="handleClick(item)"
  >
    <div class="card" :style="cardStyle">
      <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
      <div class="card-info">
        <h2>{{ item.name }}</h2>
        <p>
          {{ item.description }}
          <q-resize-observer @resize="onResize" />
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="SceneItem">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { TravelSceneItem } from '@/apis/types/travel';
import { debounce } from '@/utils/utils';

const props = withDefaults(
  defineProps<{
    item: TravelSceneItem;
  }>(),
  {
    item: () => ({}) as TravelSceneItem,
  },
);

const cardRef = ref();
const rectInfo = ref({
  width: 0,
  height: 0,
});
onMounted(() => {
  rectInfo.value.width = cardRef.value?.offsetWidth;
  rectInfo.value.height = cardRef.value?.offsetHeight;
});

const mouseInfo = ref({
  mouseX: 0,
  mouseY: 0,
});
let mouseLeaveDelay: number;
const mousePX = computed(() => mouseInfo.value.mouseX / rectInfo.value.width);
const mousePY = computed(() => mouseInfo.value.mouseY / rectInfo.value.height);
const cardStyle = computed(() => {
  const rX = mousePX.value * 30;
  const rY = mousePY.value * -30;
  return {
    transform: `rotateY(${rX}deg) rotateX(${rY}deg)`,
  };
});
const cardBgTransform = computed(() => {
  const tX = mousePX.value * -40;
  const tY = mousePY.value * -40;
  return {
    transform: `translateX(${tX}px) translateY(${tY}px) scale(1.2)`,
  };
});
const cardBgImage = computed(() => {
  return {
    backgroundImage: `url(${props.item.coverImage})`,
  };
});

const handleMouseMove = (e: MouseEvent) => {
  mouseInfo.value.mouseX = e.pageX - cardRef.value.offsetLeft - rectInfo.value.width / 2;
  mouseInfo.value.mouseY = e.pageY - cardRef.value.offsetTop - rectInfo.value.height / 2;
};
const handleMouseEnter = () => {
  clearTimeout(mouseLeaveDelay);
};
const handleMouseLeave = () => {
  mouseLeaveDelay = setTimeout(() => {
    mouseInfo.value.mouseX = 0;
    mouseInfo.value.mouseY = 0;
  }, 1000);
};

const descEleHeight = ref('0');
const onResize = debounce((size: any) => {
  descEleHeight.value = size.height + 'px';
});

const router = useRouter();
/** 跳转到景点详情 */
const handleClick = (item: TravelSceneItem) => {
  const routeResolve = router.resolve({
    name: 'SceneImage',
    params: {
      id: item.id,
    },
    query: {
      name: item.name,
      description: item.description,
    },
  });
  window.open(routeResolve.fullPath, '_blank');
};
</script>
<style lang="scss" scoped>
$hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
$returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);

.card {
  position: relative;
  height: 320px;
  overflow: hidden;
  background-color: #333;
  border-radius: 10px;
  box-shadow:
    rgb(0 0 0 / 66%) 0 0 10px,
    inset #333 0 0 0 5px,
    inset rgb(255 255 255 / 50%) 0 0 0 6px;
  transition: 1s $returnEasing;
}

.card-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 20px;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0.5;
  transition:
    1s $returnEasing,
    opacity 5s 1s $returnEasing;
}

.card-info {
  position: absolute;
  bottom: 0;
  padding: 20px;
  color: #fff;
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  transform: translateY(v-bind('descEleHeight'));

  p {
    text-shadow: rgb(0 0 0) 0 2px 3px;
    opacity: 0;
    transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
}

.card-wrap {
  align-self: flex-start;
  cursor: pointer;
  transform: perspective(800px);
  transform-style: preserve-3d;

  &:hover {
    .card-info {
      transform: translateY(0);
    }

    .card-info p {
      opacity: 1;
    }

    .card-info,
    .card-info p {
      transition: 0.6s $hoverEasing;
    }

    .card-info::after {
      opacity: 1;
      transition: 5s $hoverEasing;
      transform: translateY(0);
    }

    .card-bg {
      opacity: 0.8;
      transition:
        0.6s $hoverEasing,
        opacity 5s $hoverEasing;
    }

    .card {
      box-shadow:
        rgb(255 255 255 / 20%) 0 0 40px 5px,
        rgb(255 255 255 / 100%) 0 0 0 1px,
        rgb(0 0 0 / 66%) 0 0 10px,
        inset #333 0 0 0 5px,
        inset white 0 0 0 6px;
      transition:
        0.6s $hoverEasing,
        box-shadow 2s $hoverEasing;
    }
  }
}

.card-info h2 {
  font-size: 36px;
  font-weight: 700;
  text-shadow: rgb(0 0 0 / 50%) 0 10px 10px;
}
</style>
