<template>
  <div class="books-page">
    <main class="books-main cneter-page-main">
      <div class="books-list hidden-scrollbar">
        <BookItem v-for="item in bookList" :key="item.id" :item="item" @click="showDetail(item)" />
      </div>
    </main>
    <Transition
      enter-active-class="animate__animated animate__zoomInDown"
      leave-active-class="animate__animated  animate__zoomOut"
    >
      <BookDetail :item="currentBook" v-if="detailVisible" @on-close="detailVisible = false" />
    </Transition>
  </div>
</template>
<script setup lang="ts" name="Books">
import { ref } from 'vue';
import BookItem from './components/BookItem.vue';
import BookDetail from './components/BookDetail.vue';
import { bookListGet } from '@/apis/book/index';
import type { bookItem } from '@/apis/types/book';

const bookList = ref<bookItem[]>([]);
const getBookList = async () => {
  const data = await bookListGet();
  if (data.code !== 200) return;

  bookList.value = data.data;
};
getBookList();

const currentBook = ref<bookItem>();
const detailVisible = ref(false);
const showDetail = (item: bookItem) => {
  currentBook.value = item;
  detailVisible.value = true;
};
</script>
<style lang="scss" scoped>
.books-page {
  box-sizing: border-box;
  height: 100%;
  background: url('@/assets/images/books_bg.jpg') no-repeat center center/cover;

  .books-main {
    height: 100%;
    padding-top: 58px;
    padding-bottom: 20px;

    .books-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 300px;
      place-items: center flex-start;
      height: 100%;
      overflow: hidden auto;
    }
  }
}
</style>
