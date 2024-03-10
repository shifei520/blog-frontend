import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import router from './router';
import { Quasar } from 'quasar';
import quasarLang from 'quasar/lang/zh-CN';
// Import Quasar icon libraries
import '@quasar/extras/material-icons/material-icons.css';
// Import Quasar css
import 'quasar/src/css/index.sass';
import 'virtual:svg-icons-register';
import 'virtual:uno.css';
import './assets/css/main.css';
import './assets/css/common.scss';
import 'animate.css';
import globalComponents from './components/index';
import globalDirectives from './directives/index';
// 提示信息组件
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
// 富文本编辑器的基础样式
import 'bytemd/dist/index.css';
import dayjs from 'dayjs';
import zhCn from 'dayjs/locale/zh-cn';
dayjs.locale(zhCn);
import { sm2Encrypt } from '@/utils/jsencrypt';
console.log(sm2Encrypt('shifei5201314'));

const app = createApp(App);

app.use(Quasar, {
  plugins: {},
  lang: quasarLang,
});
app.use(Toast, {
  transition: 'Vue-Toastification__fade',
  maxToasts: 20,
  newestOnTop: true,
  hideProgressBar: true,
  timeout: 3000,
});
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia).use(router).use(globalComponents).use(globalDirectives).mount('#app');
