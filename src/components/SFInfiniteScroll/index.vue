<template>
  <div class="sf-infinite-scroll hidden-scrollbar" ref="scrollRef">
    <slot></slot>
    <div class="is-more" ref="moreRef"></div>
  </div>
</template>
<script setup lang="ts" name="SFInfiniteScroll">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    offset?: number;
    initialLoad?: boolean;
    disable: boolean;
  }>(),
  {
    offset: 10,
    initialLoad: false,
    disable: false,
  },
);
const emit = defineEmits(['load']);

const isInitialLoad = ref(props.initialLoad);

const scrollRef = ref();
const moreRef = ref();
let observer: IntersectionObserver;
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const { isIntersecting } = entries[0];
      if (isIntersecting && isInitialLoad.value && !props.disable) {
        emit('load');
      }
      isInitialLoad.value = true;
    },
    {
      root: scrollRef.value,
      rootMargin: props.offset + 'px',
    },
  );
  observer.observe(moreRef.value);
});
onBeforeUnmount(() => {
  observer?.disconnect();
});

/** 返回滚动台顶部 */
const backToTop = () => {
  scrollRef.value.scrollTo(0, 0);
};

defineExpose({
  backToTop,
});
</script>
<style lang="scss" scoped>
.sf-infinite-scroll {
  height: 100%;
  overflow-y: auto;
}
</style>
