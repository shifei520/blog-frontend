<template>
  <div class="travel-page">
    <div class="travel-container cneter-page-main hidden-scrollbar">
      <SFInfiniteScroll ref="scrollRef" @load="getImageList" :disable="loadAll">
        <section class="hero p-x">
          <div class="container">
            <h1>{{ route.query.name }}</h1>
            <p>
              {{ route.query.description === 'null' ? route.query.name : route.query.description }}
            </p>
          </div>
        </section>
        <section class="tiltgrid">
          <div class="tiltgrid-container">
            <div v-for="item in imageList" :key="item.id" @click="previewImage(item.url)">
              <img v-lazy="item.url" alt="" class="img-zoomable" />
            </div>
          </div>
        </section>
      </SFInfiniteScroll>
    </div>
  </div>
</template>
<script setup lang="ts" name="SceneImage">
import { onMounted, ref, getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router';
import SFInfiniteScroll from '@/components/SFInfiniteScroll/index.vue';
import { imageBySceneId } from '@/apis/travel/index';
import type { TravelImageItem, ImageListGetParams } from '@/apis/types/travel';

const route = useRoute();

const imgDomain = import.meta.env.VITE_PUBLIC_PATH;
const imageList = ref<TravelImageItem[]>([]);
const queryForm = ref<ImageListGetParams>({
  pageNo: 1,
  pageSize: 20,
  sceneId: Number(route.params?.id),
});

const loadAll = ref(false);
/** 获取列表 */
const getImageList = async (flag = false) => {
  if (flag === true) {
    queryForm.value.pageNo = 1;
    imageList.value = [];
  }
  const data = await imageBySceneId(queryForm.value);
  if (data.code !== 200) return;

  if (queryForm.value.pageNo * queryForm.value.pageSize < data.data.totalCount) {
    queryForm.value.pageNo += 1;
  } else {
    loadAll.value = true;
  }
  imageList.value = [
    ...imageList.value,
    ...data.data.list.map((item) => ({ ...item, url: `${imgDomain}${item.url}` })),
  ];
};
getImageList(true);

const { $hevueImgPreview } = getCurrentInstance()?.appContext.app.config.globalProperties as any;
const previewImage = (url: string) => {
  $hevueImgPreview(url);
};

const scrollRef = ref();
function isElementInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight)
  );
}

function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
const tiltDegree = 7;
function updateScrollPos(heroGrid: HTMLElement, hero: HTMLElement) {
  const scrollPos = scrollRef.value.current.scrollTop;
  const rect = heroGrid.getBoundingClientRect();
  const scrollPercent = (scrollPos * 100) / rect.height;

  let mappedValue = mapRange(scrollPercent, 0, 100, tiltDegree * -1, tiltDegree);
  heroGrid.style.setProperty('--scroll-tilt', `${mappedValue}`);
  let heroOpacity = mapRange(scrollPercent, 0, 10, 1, 0);
  let heroScale = mapRange(scrollPercent, 0, 10, 1, 0);
  let heroTransformY = mapRange(scrollPercent, 0, 10, 0, -100);
  let heroBlur = mapRange(scrollPercent, 0, 10, 0, 20);
  hero.style.opacity = heroOpacity + '';
  hero.style.filter = `blur(${heroBlur}px)`;
  hero.style.transform = `translateY(${heroTransformY}px)`;
}

function handleScroll(heroGrid: HTMLElement, hero: HTMLElement) {
  if (heroGrid && isElementInViewport(heroGrid)) {
    updateScrollPos(heroGrid, hero);
  }
}
let scrollHandler;

onMounted(() => {
  const heroGrid = document.querySelector('.tiltgrid') as HTMLElement;
  const hero = document.querySelector('.hero') as HTMLElement;

  scrollHandler = () => handleScroll(heroGrid, hero);
  scrollRef.value?.current?.addEventListener('scroll', scrollHandler);

  handleScroll(heroGrid, hero);
});
</script>
<style lang="scss" scoped>
.travel-page {
  box-sizing: border-box;
  height: 100%;
  background: url('@/assets/images/books_bg.jpg') no-repeat center center/cover;

  .travel-container {
    height: 100%;
    padding-top: 58px;
    padding-bottom: 20px;
    overflow-y: auto;

    img {
      display: block;
      max-width: 100%;
      height: auto;
    }

    .container {
      max-width: 1000px;
      margin: 0 auto;
    }

    .tiltgrid {
      overflow: hidden;

      @media screen and (min-width: 720px) {
        margin-inline: clamp(1rem, 0.5714rem + 1.9048vw, 2rem);
      }

      &-container {
        --skew-y: calc(var(--scroll-tilt, -7) * 1deg);
        --easing: cubic-bezier(1, 0.45, 0.7, 1.05);

        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: clamp(0.25rem, -0.0714rem + 1.4286vw, 1rem);
        transition: gap 0.3s ease;
        transform: skewY(var(--skew-y)) scale(1.05);

        @media screen and (min-width: 720px) {
          grid-template-columns: repeat(4, 1fr);
        }

        img {
          min-width: 100%;
          aspect-ratio: 16 / 9;
          pointer-events: none;
          filter: saturate(1);
          transition:
            scale 0.8s,
            filter 0.6s;
          transform: skewY(calc(var(--skew-y) * -1));
          scale: 1.4;
          object-fit: cover;
          object-position: 50% 50%;
        }

        &:hover {
          img {
            transition: scale 0.8s;
          }
        }

        & > div {
          overflow: hidden;
          clip-path: polygon(0 0, 100% 0%, 100% 0, 0 0);
          opacity: 0;
          animation: tiltslide 1s forwards;

          @for $i from 1 through 128 {
            &:nth-child(#{$i}) {
              animation-duration: 0.7s;
              animation-delay: #{0.05 * $i}s;
            }
          }

          &:hover {
            img {
              filter: saturate(1);
              transition:
                scale 0.8s,
                filter 0.6s;
              scale: 1.5;
            }
          }
        }
      }
    }

    @keyframes tiltslide {
      from {
        clip-path: polygon(0 0, 100% 0%, 100% 0, 0 0);
        filter: saturate(0);
        opacity: 0;
      }

      to {
        clip-path: polygon(0 0, 100% 1%, 100% 100%, 0% 100%);
        filter: saturate(1);
        opacity: 1;
      }
    }

    .p-x {
      padding-inline: 1.5em;
    }

    .hero {
      position: sticky;
      top: 0;
      padding-top: clamp(6rem, 4.2857rem + 7.619vw, 10rem);
      padding-bottom: clamp(2rem, 1.1429rem + 3.8095vw, 4rem);
      transform-origin: 50% 0%;

      .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;

        > * {
          margin: 0;
        }

        h1 {
          font-size: clamp(1.5rem, 0.8571rem + 2.8571vw, 3rem);
          line-height: 1.2;
        }

        p {
          margin-top: 0.5em;
          font-size: clamp(0.875rem, 0.7143rem + 0.7143vw, 1.25rem);
          color: #666;
        }
      }
    }

    .bottom {
      min-height: 200vh;
      padding-block: clamp(2rem, 1.5714rem + 1.9048vw, 3rem);

      .container {
        text-align: center;
      }
    }
  }
}
</style>
