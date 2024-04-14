import { fileURLToPath, URL } from 'node:url';
import UnoCSS from 'unocss/vite';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
// 开启gzip压缩
import { compression } from 'vite-plugin-compression2';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const localIconPath = path.join(process.cwd(), 'src/assets/svg-icons');
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      quasar({
        sassVariables: 'src/assets/css/quasar-variables.scss',
      }),
      UnoCSS(),
      createSvgIconsPlugin({
        iconDirs: [localIconPath],
        symbolId: 'icon-[name]',
        inject: 'body-last',
        customDomId: '__SVG_ICON_LOCAL__',
      }),
      compression(),
      ViteImageOptimizer({
        png: {
          quality: 70,
        },
        jpeg: {
          quality: 70,
        },
        jpg: {
          quality: 70,
        },
      }),
    ],
    server: {
      port: 8080,
      proxy: {
        [env.VITE_PREFIX_API]: {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '\\api'),
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/css/global.scss";',
        },
      },
    },
  };
});
