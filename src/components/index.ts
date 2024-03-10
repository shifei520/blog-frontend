import type { App } from 'vue';
import SvgIcon from './SvgIcon/index.vue';
import SFInput from './SFInput/index.vue';

export default {
  install(app: App) {
    app.component('SvgIcon', SvgIcon);
    app.component('SFInput', SFInput);
  },
};
