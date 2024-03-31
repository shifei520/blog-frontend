<template>
  <div>
    <div class="world-cloud-canvas-wrapper">
      <canvas id="world-cloud-canvas" :width="canvasWidth" :height="canvasWidth"></canvas>
      <q-resize-observer @resize="onResize" />
    </div>
    <div style="display: none" id="weight-tags"></div>
  </div>
</template>
<script setup lang="ts" name="WordCloud">
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { tagListGet } from '@/apis/articles/index';
import type { TagItem } from '@/apis/types/articles-index';
import { debounce } from '@/utils/utils';

const router = useRouter();
const wordArr = ref<TagItem[]>([]);

/** 获取所有的标签 */
const getTagList = async () => {
  const data = await tagListGet();
  if (data.code !== 200) return;

  wordArr.value = data.data;
};
getTagList();

const createTagListDom = () => {
  let res = [...wordArr.value];
  let fragment = new DocumentFragment();
  for (let i = 0; i < res.length; i++) {
    let a = document.createElement('a');
    // 字符串长度大于10就要换行
    if (res[i].name.length > 10) {
      let charArr = res[i].name.split('');
      charArr.splice(10, 0, '<br>');
      res[i].name = charArr.join('');
    }
    a.innerHTML = res[i].name;
    a.href = 'javascript:void(0)';
    a.onclick = function () {
      router.push({
        path: '/article/statistics',
        query: {
          tagId: res[i].id,
          title: res[i].name,
        },
      });
    };
    // 如果是要加重展示就 设置属性为 huge 或large, 否则就设置属性为 medium 或small
    if (res[i].name.length < 3) {
      let readomValue = Math.random();
      a.className = readomValue > 0.5 ? 'huge' : 'large';
    } else {
      let readomValue = Math.random();
      a.className = readomValue > 0.5 ? 'medium' : 'small';
    }
    fragment.append(a);
  }
  // 更新 tagContainer中的 tag元素
  let tagsContainer = document.querySelector('#weight-tags');
  tagsContainer!.innerHTML = '';
  tagsContainer!.append(fragment);
};

const startWorldCloud = (updateFlag?: boolean) => {
  createTagListDom();
  let o = {
    maxSpeed: 0.01, // 添加最大的运动速度
    minSpeed: 0.01, // 添加最小的运动速度这样就可以保证一直运动，不会停止
    textHeight: 25,
    outlineMethod: 'colour', // tag hover 之后的 轮廓效果
    fadeIn: 800,
    outlineColour: '#fff456aa',
    outlineOffset: 0,
    depth: 0.97,
    minBrightness: 0.1,
    wheelZoom: false,
    reverse: true, // 运动方向与鼠标移动方向相反
    shadowBlur: 1,
    shuffleTags: true,
    shadowOffset: [1, 1],
    // stretchX: 1.7, // Stretch or compress the cloud horizontally. 水平拉伸词云
    initial: [0.1, 0.1], // 给词云添加一个初始的运动方向
    textFont: null, // 字体设置为 null 就会继承 每个 tag的a 标签的字体
    textColour: null, // 字体颜色设置为 null 就会继承 每个 tag的a 标签的字体颜色
    weight: true, // weight 打开，就可以根据默认的字体的大小作为权重，对tag 的样式进行调整
    weightMode: 'size', // 样式调整的方式
    weightSize: 0.5, // 调整 tag 字体的大小，加个 权重
  };
  try {
    // 如果不是更新，说明是第一次渲染，就启动 tagcanvas, 否则就代表更新
    if (!updateFlag) {
      window.TagCanvas.Start('world-cloud-canvas', 'weight-tags', o);
    } else {
      window.TagCanvas.Update('world-cloud-canvas');
    }
  } catch (e) {}
};

onMounted(() => {
  startWorldCloud();
});
watch(
  () => wordArr.value.length,
  (len: number) => {
    if (len > 0) {
      startWorldCloud(true);
    }
  },
);

const canvasWidth = ref(200);
const onResize = debounce((size: any) => {
  canvasWidth.value = size.width;
  startWorldCloud(true);
});
</script>
<style lang="scss">
.world-cloud-canvas-wrapper {
  width: 200px;
  max-width: 200px;
  height: 200px;
  max-height: 200px;
}

#weight-tags {
  font-size: 12px;

  .huge {
    font-size: 30px;
    color: #f5576caa;
  }

  .large {
    font-size: 25px;
    color: #38f9d7aa;
  }

  .medium {
    font-size: 20px;
    color: #a18cd1aa;
  }

  .small {
    font-size: 15px;
    color: #a18cd1aa;
  }
}
</style>
