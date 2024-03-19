import { fileURLToPath, URL } from 'node:url';
import UnoCSS from 'unocss/vite';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
// 开启gzip压缩
import { compression } from 'vite-plugin-compression2';
// 图片压缩
import viteImagemin from 'vite-plugin-imagemin';

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
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 20,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
      }),
    ],
    server: {
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
