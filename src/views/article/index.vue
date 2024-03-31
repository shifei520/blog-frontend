<template>
  <div class="article-page cneter-page-main">
    <!-- 背景 -->
    <div class="article-bg"></div>
    <div class="article-box">
      <!-- <div class="filter-btn">筛选</div> -->
      <div class="article-list hidden-scrollbar" ref="scrollTargetRef">
        <q-infinite-scroll
          @load="getArticleList"
          :offset="250"
          :scroll-target="scrollTargetRef"
          :disable="loadAll"
          ref="infiniteScrollRef"
        >
          <TransitionGroup enter-active-class="animated animate__fadeInLeft">
            <ArticleItem
              v-for="item in articleList"
              :key="item.id"
              :item="item"
              @click="skipToDetail(item.id)"
            />
          </TransitionGroup>
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <SFDotLoading></SFDotLoading>
            </div>
          </template>
        </q-infinite-scroll>
      </div>
    </div>
    <div class="aside-menu">
      <DocumentationButton @click="skipToDocumentation" class="mb-[10px] w-full" />
      <SubMenu @category-change="categoryChange" :menuList="menuList" />
    </div>
    <FloatButton @back-to-top="backToTop" @show-category="showCategory" />
  </div>
</template>
<script setup lang="ts" name="Article">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import ArticleItem from './components/ArticleItem.vue';
import SubMenu from './components/SubMenu.vue';
import { articleListGet, categoryListGet } from '@/apis/articles/index';
import type {
  ArticleItem as ArticleItemType,
  ArticleListGetParams,
  CategoryItem,
} from '@/apis/types/articles-index';
import DocumentationButton from './components/DocumentationButton.vue';
import FloatButton from './components/FloatButton.vue';
import DocumentationIcon from '@/assets/images/documentation_icon.png';
import CategoryIcon from '@/assets/images/category_icon.png';

const articleList = ref<ArticleItemType[]>([]);
const queryForm = ref<ArticleListGetParams>({
  pageNo: 1,
  pageSize: 10,
  categoryId: -1,
});
const loadAll = ref(false);
const scrollTargetRef = ref();
const infiniteScrollRef = ref();

/** 获取文章列表 */
const getArticleList = async (index: number, done: any) => {
  queryForm.value.pageNo = index;

  const data = await articleListGet(queryForm.value);
  if (data.code !== 200) return;

  if (queryForm.value.pageNo * queryForm.value.pageSize < data.data.totalCount) {
    done && done();
  } else {
    loadAll.value = true;
  }
  articleList.value = [...articleList.value, ...data.data.list];
};

/** 文章分类改变 */
const categoryChange = (id: number) => {
  queryForm.value.categoryId = id;
  articleList.value = [];
  loadAll.value = false;
  infiniteScrollRef.value.setIndex(0);
  infiniteScrollRef.value.poll();
};

const menuList = ref<CategoryItem[]>([]);
/** 获取分类列表 */
const getCategoryList = async () => {
  const data = await categoryListGet();
  if (data.code !== 200) return;

  menuList.value = [{ id: -1, name: '所有' }, ...data.data];
};
getCategoryList();

const router = useRouter();
/** 跳转到文章详情页面 */
const skipToDetail = (id: number) => {
  router.push('/article/detail/' + id);
};

/** 跳转到文章归档页面 */
const skipToDocumentation = () => {
  router.push('/documentation');
};

/** 返回滚动台顶部 */
const backToTop = () => {
  scrollTargetRef.value.scrollTo(0, 0);
};

const $q = useQuasar();
/** 展示分类组件 */
const showCategory = () => {
  $q.bottomSheet({
    message: '分类',
    actions: [
      {
        label: '文章归档',
        img: DocumentationIcon,
        id: 'document',
      },
      {},
      ...menuList.value.map((item) => {
        return {
          id: item.id,
          label: item.name,
          img: CategoryIcon,
        };
      }),
    ],
  })
    .onOk((action) => {
      if (action.id === 'document') {
        skipToDocumentation();
      } else {
        categoryChange(action.id);
      }
    })
    .onCancel(() => {
      // console.log('Dismissed')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};
</script>
<style lang="scss" scoped>
.article-page {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 250px;
  column-gap: 20px;
  height: 100%;
  padding-top: 58px;
  padding-bottom: 20px;
  overflow: hidden;

  .article-bg {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 200%;
    content: '';
    background: #1b2030 url('@/assets/images/article_bg.jpeg') 50% 0 no-repeat;
    background-attachment: fixed;
    background-size: 100%;
    transition: all 0.4s ease-in-out;
    transform: translateZ(0);
    animation: grow 360s linear 10ms infinite;
    backface-visibility: hidden;
  }

  @keyframes grow {
    0% {
      transform: scale(1) translateY(0);
    }

    50% {
      transform: scale(1.2) translateY(-400px);
    }
  }

  .article-box {
    .filter-btn {
      display: flex;
      align-items: center;
      height: 30px;
      border-bottom: 1px solid $infoColor;
    }

    .article-list {
      height: calc(100vh - 78px);
      overflow-y: auto;
    }
  }

  .aside-menu {
    align-self: flex-start;
    padding: 20px;
    background-color: $primaryBgTransparent;
    border-radius: 6px;
  }
}
</style>
