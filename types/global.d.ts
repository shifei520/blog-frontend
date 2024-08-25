import { ComponentCustomProperties } from 'vue';
import ImgPreview from 'hevue-img-preview';

declare interface Window {
  particlesJS: any;
  TagCanvas: any;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $hevueImgPreview: any;
  }
}
