<template>
  <div class="detail-article-page cneter-page-main hidden-scrollbar">
    <!-- 粒子背景 -->
    <Particles />
    <div>
      <!-- 文章详情 -->
      <section class="article-container">
        <h1 class="title">{{ articleDetailInfo?.title }}</h1>
        <div class="article-meta-info">
          <span class="mr-[20px]">{{ articleDetailInfo?.createTime }}</span>
          <svg-icon name="view"></svg-icon>
          <span class="ml-[4px] mr-[15px]">{{ articleDetailInfo?.views }}</span>
          <Suspense>
            <MarkDownEditor
              :isView="true"
              v-model="articleDetailInfo.content"
              @menu-list="getMenuList"
            />
            <template #fallback>
              <SFLoading />
            </template>
          </Suspense>
          <div class="labels">
            <span class="label-title">标签：</span>
            <LabelItem :name="articleDetailInfo?.category?.name" />
            <LabelItem
              class="cursor-pointer"
              v-for="tag in articleDetailInfo?.tags"
              :key="tag.id"
              v-bind="tag"
              @click="skipPage(tag)"
            />
          </div>
        </div>
      </section>
      <!-- 评论列表 -->
      <section class="comment-container">
        <div class="comment-total">评论：{{ commentTotal }}</div>
        <PublishComment :articleId="articleId" @on-success="getCommentList(true)" />
        <div class="comment-list" v-if="commentList.length">
          <CommentItem v-for="item in commentList" v-bind="item" :key="item.id" />
        </div>
        <div class="no-data" v-else>
          <img src="~@/assets/images/no_data_bg.png" alt="" />
        </div>
        <PaginationBar
          class="mt-[10px]"
          align="center"
          :total-row="commentTotal"
          :border="true"
          :page-size-menu="false"
          language="cn"
          @change="commentPageChange"
        />
      </section>
    </div>
    <!-- 侧边目录 -->
    <aside class="article-menu hidden-scrollbar">
      <div class="title">
        <span class="title-left">目录</span>
      </div>
      <ul>
        <li
          v-for="(menu, index) in menuList"
          :class="['menu-item-' + menu.depth, currentMenuIndex === index ? 'active' : '']"
          :key="index"
          @click="scrollViewer(index)"
          class="menu-item"
        >
          <a :href="'#heading-' + index"
            ><span>{{ menu.children[0].value }}</span></a
          >
        </li>
      </ul>
    </aside>
    <!-- 返回顶部的按钮 -->
    <BackTop />
    <SuspendedPanel
      :liked="liked"
      :likesCount="articleDetailInfo?.likesCount"
      @on-like="linkUnlike"
    />
  </div>
</template>
<script setup lang="ts" name="DetailArticle">
import { ref, defineAsyncComponent, shallowRef, onMounted, nextTick, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Particles from '@/components/Particles/index.vue';
import { detailArticleById, addView, isLikedGet } from '@/apis/articles/index';
import { commentListGet, likeAndUnlike } from '@/apis/articles/comment';
import type { ArticleItem as ArticleItemType, TagItem } from '@/apis/types/articles-index';
import type { CommentItem as CommentItemType } from '@/apis/types/article-comment';
import { PaginationBar } from 'v-page';
import type { PageInfo } from 'v-page';
import LabelItem from '@/views/home/components/LabelItem.vue';
import { throttle } from '@/utils/utils';
import PublishComment from './components/PublishComment.vue';
import CommentItem from './components/CommentItem.vue';
import SuspendedPanel from './components/SuspendedPanel.vue';
import BackTop from './components/BackTop.vue';
import { userStore } from '@/store/user';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
const MarkDownEditor = defineAsyncComponent(() => import('@/components/MarkDownEditor/index.vue'));

const router = useRouter();
const route = useRoute();
const articleId = ref(Number(route.params?.id));
const articleDetailInfo = ref<ArticleItemType>({
  id: 0,
  title: '',
  abstract: '',
  content: '',
  likesCount: 0,
  views: 0,
  coverImage: '',
  createTime: '',
  updateTime: '',
  tags: [],
  category: {
    id: 0,
    name: '',
  },
});
/** 页面初始化时浏览量+1 */
const addPageView = async () => {
  await addView(articleId.value);
};
/** 获取文章详情 */
const getDetailArticle = async () => {
  await addPageView();
  const data = await detailArticleById(articleId.value);
  if (data.code !== 200) return;

  articleDetailInfo.value = data.data;
};
getDetailArticle();

const menuList = shallowRef();
/** 获取文章路径 */
const getMenuList = (val: any[]) => {
  menuList.value = val;

  nextTick(getTitleElement);
};

/** 根据目录进行滚动 */
const scrollViewer = (index: number | string) => {
  const anchor = document.querySelector(`[data-id=heading-${index}]`);
  anchor?.scrollIntoView({ behavior: 'smooth' });
};

onMounted(() => {
  const hash = location.hash;
  if (hash) {
    const index = hash.split('-')[1];
    scrollViewer(index);
  }
});

const currentMenuIndex = ref(0);
const nodeList = shallowRef<HTMLElement[]>([]);
const isScrolling = ref(false);
/**
 * 获取标题元素数组
 */
const getTitleElement = () => {
  nodeList.value = menuList.value.map((menu: any, index: number) =>
    document.querySelector(`[data-id=heading-${index}]`),
  );

  for (let i = 0; i < nodeList.value.length; i++) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting && isScrolling.value) {
          currentMenuIndex.value = i;
        }
      });
    });
    observer.observe(nodeList.value[i]);
  }
};
/** 激活右侧对应的导航条 */
const activeNavNode = () => {
  isScrolling.value = true;
  if (!nodeList.value.length) {
    getTitleElement();
  }

  for (let i = 0; i < nodeList.value.length; i++) {
    const rect = nodeList.value[i].getBoundingClientRect();
    if (rect.top >= 0 && rect.top <= 100) {
      currentMenuIndex.value = i;
    }
  }
};
const throttleActiveNavNode = throttle(activeNavNode);
window.addEventListener('scroll', throttleActiveNavNode);

onBeforeUnmount(() => {
  window.removeEventListener('scroll', throttleActiveNavNode);
});

const commentFormData = ref({
  pageNo: 1,
  pageSize: 10,
});
const commentList = ref<CommentItemType[]>([]);
const commentTotal = ref(0);
/** 获取文章的评论 */
const getCommentList = async (flag = false) => {
  if (flag === true) {
    commentFormData.value.pageNo = 1;
  }

  const data = await commentListGet({ ...commentFormData.value, articleId: articleId.value });
  if (data.code !== 200) return;

  commentList.value = data.data.list.map((item) => {
    return {
      ...item,
      createTime: dayjs(item.createTime).fromNow(),
    };
  });
  commentTotal.value = data.data.totalCount;
};

/** 页数改变时重新请求评论数据 */
const commentPageChange = (data: PageInfo) => {
  commentFormData.value.pageNo = data.pageNumber;
  commentFormData.value.pageSize = data.pageSize;

  getCommentList();
};

const liked = ref(false);
/** 点赞和取消点赞 */
const linkUnlike = async (val: boolean) => {
  liked.value = val;
  const data = await likeAndUnlike(articleId.value);
  if (data.code !== 200) return;

  val ? articleDetailInfo.value!.likesCount++ : articleDetailInfo.value!.likesCount--;
};

const store = userStore();
/** 判断用户是否已经点赞 */
const isLiked = async () => {
  // 没有token信息就不请求
  if (!store.token) return;

  const data = await isLikedGet(articleId.value);
  if (data.code !== 200) return;

  liked.value = data.data;
};
isLiked();

/** 跳转标签 */
const skipPage = (tag: TagItem) => {
  router.push({
    path: '/article/statistics',
    query: {
      tagId: tag.id,
      title: tag.name,
    },
  });
};
</script>
<style lang="scss" scoped>
.detail-article-page {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 300px;
  column-gap: 20px;
  padding-top: 58px;
  padding-bottom: 20px;

  .article-container {
    box-sizing: border-box;
    padding: 30px;
    background-color: $primaryBg;
    border-radius: 6px;

    .title {
      font-size: 30px;
      font-weight: 600;
      line-height: 1.31;
    }

    .article-meta-info {
      margin-top: 10px;
      font-size: 14px;
      color: $infoColor-2;
    }

    .labels {
      display: flex;
      gap: 12px;
      margin-top: 10px;

      .label-title {
        line-height: 24px;
      }
    }
  }

  .comment-container {
    box-sizing: border-box;
    padding: 30px;
    margin-top: 20px;
    background-color: $primaryBg;
    border-radius: 6px;

    .comment-list {
      margin-top: 20px;
    }

    .no-data {
      margin-top: 20px;
      text-align: center;

      > img {
        max-width: 100%;
      }
    }
  }

  .article-menu {
    position: sticky;
    top: 58px;
    box-sizing: border-box;
    align-self: flex-start;
    max-height: calc(100vh - 70px);
    padding: 0 20px 20px 0;
    overflow-y: auto;
    background-color: $primaryBg;
    border-radius: 6px;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      margin-left: 20px;
      border-bottom: 1px solid $infoColor;

      .title-left {
        font-weight: 500;
      }
    }

    .menu-item {
      margin-top: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: all 0.3s;

      &:hover {
        color: $middleBule;
      }

      &.active {
        color: $middleBule;
      }
    }

    @for $i from 0 through 6 {
      .menu-item-#{$i} {
        margin-left: $i * 15px;
        /* stylelint-disable-next-line scss/no-global-function-names */
        color: lighten($primaryColor, $i * 10%);
      }
    }
  }
}
</style>
