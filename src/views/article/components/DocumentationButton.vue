<template>
  <button class="documents-btn">
    <span class="folder-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 146 113"
        height="113"
        width="146"
        class="file-back"
      >
        <path
          fill="url(#paint0_linear_117_4)"
          d="M0 4C0 1.79086 1.79086 0 4 0H50.3802C51.8285 0 53.2056 0.627965 54.1553 1.72142L64.3303 13.4371C65.2799 14.5306 66.657 15.1585 68.1053 15.1585H141.509C143.718 15.1585 145.509 16.9494 145.509 19.1585V109C145.509 111.209 143.718 113 141.509 113H3.99999C1.79085 113 0 111.209 0 109V4Z"
        ></path>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            y2="95.4804"
            x2="72.93"
            y1="0"
            x1="0"
            id="paint0_linear_117_4"
          >
            <stop stop-color="#8F88C2"></stop>
            <stop stop-color="#5C52A2" offset="1"></stop>
          </linearGradient>
        </defs>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 88 99"
        height="99"
        width="88"
        class="file-page"
      >
        <rect fill="url(#paint0_linear_117_6)" height="99" width="88"></rect>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            y2="160.5"
            x2="81"
            y1="0"
            x1="0"
            id="paint0_linear_117_6"
          >
            <stop stop-color="white"></stop>
            <stop stop-color="#686868" offset="1"></stop>
          </linearGradient>
        </defs>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 160 79"
        height="79"
        width="160"
        class="file-front"
      >
        <path
          fill="url(#paint0_linear_117_5)"
          d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z"
        ></path>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            y2="82.8317"
            x2="66.9106"
            y1="8.71323"
            x1="38.7619"
            id="paint0_linear_117_5"
          >
            <stop stop-color="#C3BBFF"></stop>
            <stop stop-color="#51469A" offset="1"></stop>
          </linearGradient>
        </defs>
      </svg>
    </span>
    <p class="text">文章归档</p>
  </button>
</template>
<script setup lang="ts" name="DocumentationButton"></script>
<style lang="scss" scoped>
.documents-btn {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  height: 45px;
  padding: 0 15px;
  cursor: pointer;
  background-color: rgb(49 49 83);
  border-radius: 5px;
  transition: all 0.3s;

  .folder-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 40px;
    height: fit-content;

    .file-back {
      z-index: 1;
      width: 80%;
      height: auto;
    }

    .file-page {
      position: absolute;
      z-index: 2;
      width: 50%;
      height: auto;
      transition: all 0.3s ease-out;
    }

    .file-front {
      position: absolute;
      z-index: 3;
      width: 85%;
      height: auto;
      opacity: 0.95;
      transition: all 0.3s ease-out;
      transform-origin: bottom;
    }
  }

  .text {
    font-size: 14px;
    font-weight: 600;
    color: white;
    letter-spacing: 0.5px;
  }

  &:hover {
    background-color: rgb(58 58 94);

    .file-page {
      transform: translateY(-5px);
    }

    .file-front {
      transform: rotateX(30deg);
    }
  }
}
</style>
