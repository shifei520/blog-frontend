<template>
  <div class="code-container">
    <Viewer v-if="isView" :value="modelValue" :plugins="plugins" />
    <Editor
      v-else
      :value="modelValue"
      @change="handleChange"
      :plugins="plugins"
      :locale="zhHans"
      :uploadImages="uploadImage"
    />
  </div>
</template>
<script setup lang="ts" name="MarkDownEditor">
import { shallowRef, toValue } from 'vue';
// @ts-ignore
import { Editor, Viewer } from '@bytemd/vue-next';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import breaks from '@bytemd/plugin-breaks';
import frontmatter from '@bytemd/plugin-frontmatter';
import gemoji from '@bytemd/plugin-gemoji';
import math from '@bytemd/plugin-math';
import mermaid from '@bytemd/plugin-mermaid';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import themes from 'juejin-markdown-themes';
import 'highlight.js/styles/default.css';
import 'katex/dist/katex.css';
import zhHans from 'bytemd/locales/zh_Hans.json';
import byteCode from './byteCode';
import type { BytemdEditorContext } from 'bytemd';
import { uploadCoverImg } from '@/apis/articles/index';

const props = withDefaults(
  defineProps<{
    modelValue: string;
    isView: boolean;
  }>(),
  {
    isView: false,
  },
);
const emit = defineEmits(['update:modelValue', 'menu-list']);

const headElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const highlightThemes: any = {};
const modules = import.meta.glob('/node_modules/highlight.js/styles/*.min.css', {
  as: 'raw',
  eager: true,
});
for (let path in modules) {
  const name = path
    .replace(/(\.\/|\.min\.css)$/i, '')
    .replace('/node_modules/highlight.js/styles/', '');
  const theme = modules[path];
  highlightThemes[name] = { style: theme };
}

const menuList = shallowRef([]);

let $docTree: any = null;
let $frontmatter: any = null;

const themeItems = Object.keys(themes).map((key) => {
  return {
    title: key,
    handler: {
      type: 'action',
      click({ editor }: BytemdEditorContext) {
        if (!!$docTree.children.length && $docTree.children[0].type === 'yaml') {
          $frontmatter = $docTree.children[0];
        } else {
          $frontmatter = undefined;
        }

        if ($frontmatter) {
          const matched = $frontmatter.value.match(/theme:\s*(\S*)/i);

          if (matched) {
            editor.setValue(editor.getValue().replace(matched[0], `theme: ${key}`));
          } else {
            editor.setValue(
              editor.getValue().replace($frontmatter.value, `theme: ${key}\n${$frontmatter.value}`),
            );
          }
        } else {
          editor.setValue(`---\ntheme: ${key}\n---\n` + editor.getValue());
        }
      },
    },
  };
});

const highlightThemesItems = Object.keys(highlightThemes).map((key) => {
  return {
    title: key,
    handler: {
      type: 'action',
      click({ editor }: BytemdEditorContext) {
        if (!!$docTree.children.length && $docTree.children[0].type === 'yaml') {
          $frontmatter = $docTree.children[0];
        } else {
          $frontmatter = undefined;
        }

        if ($frontmatter) {
          const matched = $frontmatter.value.match(/highlight:\s*(\S*)/i);

          if (matched) {
            editor.setValue(editor.getValue().replace(matched[0], `highlight: ${key}`));
          } else {
            editor.setValue(
              editor
                .getValue()
                .replace($frontmatter.value, `${$frontmatter.value}\nhighlight: ${key}`),
            );
          }
        } else {
          editor.setValue(`---\nhighlight: ${key}\n---\n` + editor.getValue());
        }
      },
    },
  };
});

const plugins = [
  gfm({
    locale: {
      strike: '删除线',
      task: '任务列表',
      table: '表格',
    },
  }),
  math({
    locale: {
      inline: '行内公式',
      block: '块级公式',
    },
  }),
  mermaid({
    locale: {
      mermaid: 'Mermaid 图表',
      flowchart: '流程图',
      sequence: '时序图',
      class: '类图',
      state: '状态图',
      er: '关系图',
      uj: '旅程图',
      gantt: '甘特图',
      pie: '饼图',
      mindmap: '思维导图',
      timeline: '时间轴',
    },
  }),
  highlight(),
  breaks(),
  frontmatter(),
  gemoji(),
  mediumZoom(),
  {
    viewerEffect({ file }: any) {
      file = toValue(file);

      const $style = document.createElement('style');
      $style.innerHTML = themes[file?.frontmatter?.theme]?.style ?? themes.juejin.style;
      document.head.appendChild($style);

      const $styleCode = document.createElement('style');
      $styleCode.innerHTML =
        highlightThemes[file?.frontmatter?.highlight]?.style ?? highlightThemes.vs2015.style;
      document.head.appendChild($styleCode);

      return () => {
        $style.remove();
        $styleCode.remove();
      };
    },
    actions: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g><rect width="48" height="48" fill="white" fill-opacity="0.01" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" stroke="none" fill-rule="evenodd"></rect><g transform="translate(6.000000, 8.000000)"><path d="M30,11 L6,11" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" stroke="#333" fill="none" fill-rule="evenodd"></path><path d="M36,1 L0,1" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" stroke="#333" fill="none" fill-rule="evenodd"></path><path d="M36,21 L0,21" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" stroke="#333" fill="none" fill-rule="evenodd"></path><path d="M30,31 L6,31" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" stroke="#333" fill="none" fill-rule="evenodd"></path></g></g></svg>',
        handler: {
          type: 'dropdown',
          actions: [
            {
              title: '左对齐',
              handler: {
                type: 'action',
                click({ editor }: BytemdEditorContext) {
                  const selectText = editor.getSelection();
                  editor.replaceSelection('<p align="left">' + selectText + '</p>\n');
                },
              },
            },
            {
              title: '居中对齐',
              handler: {
                type: 'action',
                click({ editor }: BytemdEditorContext) {
                  const selectText = editor.getSelection();
                  editor.replaceSelection('<p align="center">' + selectText + '</p>\n');
                },
              },
            },
            {
              title: '右对齐',
              handler: {
                type: 'action',
                click({ editor }: BytemdEditorContext) {
                  const selectText = editor.getSelection();
                  editor.replaceSelection('<p align="right">' + selectText + '</p>\n');
                },
              },
            },
          ],
        },
      },
      {
        icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2H2.66667C2.29848 2 2 2.29848 2 2.66667V6C2 6.36819 2.29848 6.66667 2.66667 6.66667H6C6.36819 6.66667 6.66667 6.36819 6.66667 6V2.66667C6.66667 2.29848 6.36819 2 6 2Z" stroke="#1D2129" stroke-width="1.33" stroke-linejoin="round"></path><path d="M6 9.3335H2.66667C2.29848 9.3335 2 9.63197 2 10.0002V13.3335C2 13.7017 2.29848 14.0002 2.66667 14.0002H6C6.36819 14.0002 6.66667 13.7017 6.66667 13.3335V10.0002C6.66667 9.63197 6.36819 9.3335 6 9.3335Z" stroke="#1D2129" stroke-width="1.33" stroke-linejoin="round"></path><path d="M13.3334 2H10C9.63185 2 9.33337 2.29848 9.33337 2.66667V6C9.33337 6.36819 9.63185 6.66667 10 6.66667H13.3334C13.7016 6.66667 14 6.36819 14 6V2.66667C14 2.29848 13.7016 2 13.3334 2Z" stroke="#1D2129" stroke-width="1.33" stroke-linejoin="round"></path><path d="M13.3334 9.3335H10C9.63185 9.3335 9.33337 9.63197 9.33337 10.0002V13.3335C9.33337 13.7017 9.63185 14.0002 10 14.0002H13.3334C13.7016 14.0002 14 13.7017 14 13.3335V10.0002C14 9.63197 13.7016 9.3335 13.3334 9.3335Z" stroke="#1D2129" stroke-width="1.33" stroke-linejoin="round"></path></svg>',
        title: 'Markdown 主题',
        handler: {
          type: 'dropdown',
          actions: themeItems,
        },
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"></rect><path d="M6 44L6 25H12V17H36V25H42V44H6Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"></path><path d="M17 17V8L31 4V17" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        title: '代码高亮样式',
        handler: {
          type: 'dropdown',
          actions: highlightThemesItems,
        },
      },
    ],
    remark(processor: any) {
      return processor.use(() => (tree: any) => {
        menuList.value = tree.children.filter(
          (item: any) => item.type === 'heading' && item.children.length,
        );

        emit('menu-list', menuList.value);
        $docTree = tree;
      });
    },
  },
  byteCode(),
  {
    rehype(processor: any) {
      return processor.use(() => (tree: any) => {
        const heads = tree.children.filter(
          (item: any) =>
            item.type === 'element' && headElements.includes(item.tagName.toLocaleLowerCase()),
        );

        for (let i = 0; i < heads.length; i++) {
          heads[i].properties['data-id'] = 'heading-' + i;
        }
      });
    },
  },
];

const handleChange = (val: string) => {
  emit('update:modelValue', val);
};

const imgDomain = import.meta.env.VITE_PUBLIC_PATH;
/** 上传图片请求 */
const httpHandle = async (file: File) => {
  const fd = new FormData();
  fd.append('file', file);
  const data = await uploadCoverImg(fd);

  return {
    title: file.name,
    url: imgDomain + data.data,
  };
};

const uploadImage = async (files: File[]) => {
  const result = await Promise.all(files.map((file) => httpHandle(file)));

  return result;
};
</script>
<style lang="scss">
.code-container {
  box-sizing: border-box;

  .markdown-body {
    max-width: unset !important;
  }
}
</style>
