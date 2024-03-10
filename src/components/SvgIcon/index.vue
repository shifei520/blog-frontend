<template>
  <div v-if="bodymovin" :class="bodymovinName"></div>
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts" name="SvgIcon">
import { computed, onMounted } from 'vue';
import lottie from 'lottie-web';

const props = withDefaults(
  defineProps<{
    name: string;
    className?: string;
    bodymovin?: boolean;
    looploop?: boolean;
  }>(),
  {
    name: '',
    className: '',
    bodymovin: false,
    looploop: false,
  },
);

const iconName = computed(() => `#icon-${props.name}`);
const bodymovinName = computed(() => `bodymovin-${props.name}`);
const svgClass = computed(() => {
  if (props.className) {
    return 'svg-icon ' + props.className;
  } else {
    return 'svg-icon';
  }
});

onMounted(() => {
  if (props.bodymovin) {
    let iconSkipForward = document.querySelector(`.${bodymovinName.value}`);
    const jsonFileMap = import.meta.glob('@/assets/svg-icons/*.json', { eager: true });
    let animationData = null;
    for (let key in jsonFileMap) {
      animationData = (jsonFileMap[key] as any).default;
    }

    let animationSkipForward = lottie.loadAnimation({
      container: iconSkipForward!,
      renderer: 'svg',
      loop: props.looploop,
      autoplay: props.looploop,
      animationData,
    });

    iconSkipForward!.addEventListener('click', function () {
      animationSkipForward.playSegments([0, 60], true);
    });
  }
});
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentcolor;
}
</style>
