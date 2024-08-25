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
    speed?: number;
  }>(),
  {
    name: '',
    className: '',
    bodymovin: false,
    looploop: false,
    speed: 1,
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

let directionMenu: any = 1;
onMounted(() => {
  if (props.bodymovin) {
    let iconSkipForward = document.querySelector(`.${bodymovinName.value}`);

    let animationSkipForward = lottie.loadAnimation({
      container: iconSkipForward!,
      renderer: 'svg',
      loop: props.looploop,
      autoplay: props.looploop,
      path: `src/assets/svg-icons/${props.name}-lottie.json`,
    });
    animationSkipForward.setSpeed(props.speed);

    iconSkipForward!.addEventListener('click', () => {
      animationSkipForward.setDirection(directionMenu);
      animationSkipForward.play();
      directionMenu = -directionMenu;
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
