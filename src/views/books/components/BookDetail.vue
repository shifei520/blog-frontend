<template>
  <div class="scene" @click="closeHandle">
    <div class="book-wrap">
      <div class="left-side">
        <div class="book-cover-left"></div>
        <div class="layer1">
          <div class="page-left"></div>
        </div>
        <div class="layer2">
          <div class="page-left"></div>
        </div>
        <div class="layer3">
          <div class="page-left"></div>
        </div>
        <div class="layer4">
          <div class="page-left"></div>
        </div>
        <div class="layer-text">
          <div class="page-left-2">
            <div class="corner"></div>
            <div class="corner2"></div>
            <div class="corner-fold"></div>
            <div class="page-text w-richtext">
              <h3>
                <strong>{{ item.title }}</strong>
              </h3>
              <h6>
                BY <span class="text-[#c02c38]">{{ item.author }}</span>
              </h6>
              <!-- 书籍介绍 -->
              <div v-html="item.bookIntro" class="intro-detail"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="center"></div>
      <div class="right-side">
        <div class="book-cover-right"></div>
        <div class="layer1">
          <div class="page-right"></div>
        </div>
        <div class="layer2 right">
          <div class="page-right"></div>
        </div>
        <div class="layer3 right">
          <div class="page-right"></div>
        </div>
        <div class="layer4 right">
          <div class="page-right"></div>
        </div>
        <div class="layer-text right">
          <div class="page-right-2">
            <div class="page-text w-richtext">
              <h3><strong>读书感悟</strong></h3>
              <div v-html="item.evaluate" class="intro-detail"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="BookDetail">
import type { bookItem } from '@/apis/types/book';

withDefaults(
  defineProps<{
    item: bookItem;
  }>(),
  {},
);
const emit = defineEmits(['on-close']);
const closeHandle = () => {
  emit('on-close');
};
</script>
<style lang="scss" scoped>
.w-richtext::before,
.w-richtext::after {
  display: table;
  content: ' ';
}

.w-richtext::after {
  clear: both;
}

.w-richtext[contenteditable='true']::before,
.w-richtext[contenteditable='true']::after {
  white-space: initial;
}

/* ----------------------- */

p {
  margin-top: 0;
  margin-bottom: 10px;
}

a {
  text-decoration: underline;
}

.scene {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  perspective: 4000px;
  perspective-origin: 50% 0%;
}

.book-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  width: 57vw;
  height: 50vh;
  padding-right: 1%;
  padding-left: 1%;
  margin-top: 8vw;
  margin-bottom: 8vw;
  transition: transform 2000ms cubic-bezier(0.165, 0.84, 0.44, 1);
  transform: translate3d(0, 5%, -264px) rotateX(27deg) rotateY(0deg) rotateZ(-10deg);
  perspective: 4000px;
  perspective-origin: 50% 50%;
  transform-style: preserve-3d;
}

.book-wrap:hover {
  transform: translate3d(0, 5%, -264px) rotateX(13deg) rotateY(0deg) rotateZ(-3deg);
}

.book-cover-left {
  flex: 1;
  background-color: #2e1800;
  border-top-left-radius: 4%;
  border-bottom-left-radius: 4%;
  box-shadow:
    inset 4px -4px 4px 1px #635648,
    inset 7px -7px 4px 0 #221b14;
  transform: translate3d(0, 0, -1px);
  perspective: 4000px;
  transform-style: preserve-3d;
}

.book-cover-right {
  flex: 1;
  background-color: #2e1800;
  border-top-right-radius: 4%;
  border-bottom-right-radius: 4%;
  box-shadow:
    inset -4px -4px 4px 1px #635648,
    inset -7px -7px 4px 0 #221b14;
}

.layer1 {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: flex-start;
  margin: 20px 10px 10px;
  transform: translate3d(0, 0, 5px);
  transform-style: preserve-3d;
}

.page-left {
  flex: 1;
  background-color: #fff;
  border-top-left-radius: 1%;
  border-bottom-left-radius: 1%;
  box-shadow:
    inset 0 0 26px 2px #d8cccc,
    -1px 1px 13px 0 rgb(34 27 20 / 81%);
}

.layer-text {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: flex-start;
  width: 97%;
  margin: 20px 10px 18px;
  transform: translate3d(0, 0, 32px);
  backface-visibility: hidden;
  perspective: 4000px;
  perspective-origin: 50% 50%;
  transform-style: preserve-3d;
}

.layer-text.right {
  transform: translate3d(-37px, 0, 32px);
  transform-style: preserve-3d;
}

.page-left-2 {
  position: relative;
  flex: 1;
  background-color: #fff;
  border-top-left-radius: 18%;
  border-bottom-left-radius: 1%;
  box-shadow:
    inset 0 0 7px 4px hsl(0deg 13% 82% / 43%),
    -1px 1px 13px 0 rgb(34 27 20 / 49%);
  transition: transform 650ms cubic-bezier(0.165, 0.84, 0.44, 1);
  transform: rotateX(0deg) rotateY(17deg) rotateZ(0deg);
  transform-origin: 100% 50%;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.page-left-2:hover {
  transform: rotateX(0deg) rotateY(7deg) rotateZ(0deg);
}

.left-side {
  position: relative;
  display: flex;
  width: 49%;
  backface-visibility: hidden;
  perspective: 4000px;
  perspective-origin: 0% 50%;
  transform: rotateX(0deg) rotateY(20deg) rotateZ(0deg);
  transform-origin: 100% 50%;
  transform-style: preserve-3d;
}

.right-side {
  position: relative;
  display: flex;
  width: 49%;
  perspective: 4000px;
  perspective-origin: 0% 50%;
  transform: rotateX(0deg) rotateY(-1deg) rotateZ(0deg);
  transform-style: preserve-3d;
}

.center {
  width: 3%;
  background-image: radial-gradient(circle farthest-corner at 56% -8%, #fff 8%, transparent 0),
    radial-gradient(circle farthest-corner at 50% 108%, #fff 8%, transparent 0),
    linear-gradient(
      90deg,
      #635648,
      #2e1800 21%,
      #635648 30%,
      #2e1800 48%,
      #635648 68%,
      #2e1800 79%,
      #635648
    );
}

.corner-fold {
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  background-image: linear-gradient(135deg, transparent 47%, #f0f0f0 48%, #fff 55%, #f6f6f6);
  border-right: 1px solid hsl(0deg 13% 82% / 55%);
  border-bottom: 1px solid hsl(0deg 13% 82% / 55%);
  box-shadow: 6px 6px 9px -4px hsl(0deg 13% 82% / 53%);
}

.corner {
  position: absolute;
  top: 27px;
  left: 0;
  width: 5vw;
  height: 5vw;
  background-image: linear-gradient(135deg, #fff 30%, transparent);
  box-shadow: inset 13px 0 17px -12px hsl(0deg 13% 82% / 43%);
}

.corner2 {
  position: absolute;
  top: 0;
  left: 28px;
  width: 5vw;
  height: 5vw;
  background-image: linear-gradient(135deg, #fff 31%, transparent);
  box-shadow: inset 0 13px 17px -12px hsl(0deg 13% 82% / 43%);
}

.page-text {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
  padding: 25px 0;
  margin: 0 auto;
  font-family: Georgia, Times, 'Times New Roman', serif;

  h3 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
    font-size: 24px;
    font-style: italic;
    font-weight: bold;
    line-height: 30px;
  }

  h6 {
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: 'PT Sans', sans-serif;
    font-size: 12px;
    line-height: 18px;
  }

  p {
    margin-bottom: 0;
    font-size: 0.85vw;
    line-height: 1.5;
  }

  .intro-detail {
    flex: 1;
    overflow-y: auto;
  }
}

.layer2 {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: flex-start;
  margin: 20px 10px 13px;
  transform: translate3d(2px, 0, 10px);
  transform-style: preserve-3d;
}

.layer2.right {
  transform: translate3d(-5px, 0, 10px);
  transform-style: preserve-3d;
}

.layer3 {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: flex-start;
  margin: 20px 10px 13px;
  transform: translate3d(4px, 0, 20px);
  transform-style: preserve-3d;
}

.layer3.right {
  transform: translate3d(-10px, 0, 20px);
  transform-style: preserve-3d;
}

.layer4 {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: flex-start;
  margin: 20px 10px 15px;
  transform: translate3d(6px, 0, 30px);
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  transform-style: preserve-3d;
}

.layer4.right {
  transform: translate3d(-15px, 0, 30px);
  transform-style: preserve-3d;
}

.page-right-2 {
  position: relative;
  flex: 1;
  background-color: #fff;
  border-top-right-radius: 1%;
  border-bottom-right-radius: 1%;
  box-shadow:
    inset 0 0 7px 4px hsl(0deg 13% 82% / 43%),
    1px 1px 13px 0 rgb(34 27 20 / 49%);
  transition: transform 850ms ease;
  transform: rotateX(0deg) rotateY(-3deg) rotateZ(0deg);
  transform-origin: 0% 50%;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.page-right-2:hover {
  transform: rotateX(0deg) rotateY(-17deg) rotateZ(0deg);
}

.page-right {
  flex: 1;
  background-color: #fff;
  border-top-right-radius: 1%;
  border-bottom-right-radius: 1%;
  box-shadow:
    inset 0 0 26px 2px #d8cccc,
    1px 1px 13px 0 rgb(34 27 20 / 81%);
}

@media (max-width: 991px) {
  .book-wrap {
    width: 62vw;
  }

  .page-left-2 {
    border-top-left-radius: 20%;
  }

  .page-text h3 {
    margin-top: 2vw;
    margin-bottom: 1vw;
    font-size: 3vw;
  }

  .page-text h6 {
    margin-top: 1vw;
    margin-bottom: 1vw;
    font-size: 1vw;
  }

  .page-right-2 {
    padding-left: 9%;
  }
}

@media (max-width: 767px) {
  .book-wrap {
    width: 80vw;
    margin-bottom: 2vw;
  }

  .layer-text {
    width: 94%;
    transform: translate3d(0, 0, 20px);
  }

  .layer-text.right {
    justify-content: flex-end;
    transform: translate3d(-34px, 0, 24px);
  }

  .page-left-2 {
    border-top-left-radius: 23%;
    transform: rotateX(0deg) rotateY(17deg) rotateZ(0deg) translate(9px, 0);
  }

  .corner-fold,
  .corner,
  .corner2 {
    display: none;
  }

  .page-text {
    margin-top: 2vw;
  }

  .page-text h3 {
    margin-top: 0;
    font-size: 3vw;
  }

  .layer2 {
    transform: translate3d(2px, 0, 6px);
  }

  .layer2.right {
    transform: translate3d(-5px, 0, 6px);
  }

  .layer3 {
    transform: translate3d(4px, 0, 12px);
  }

  .layer3.right {
    transform: translate3d(-10px, 0, 12px);
  }

  .layer4 {
    transform: translate3d(6px, 0, 18px);
  }

  .layer4.right {
    transform: translate3d(-15px, 0, 18px);
  }

  .page-right-2 {
    flex: 0 auto;
    width: 92%;
  }
}

@media (max-width: 479px) {
  .corner-fold {
    width: 5.5vw;
    min-width: 21px;
    height: 5.5vw;
  }
}
</style>
