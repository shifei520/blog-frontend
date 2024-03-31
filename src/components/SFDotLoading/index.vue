<template>
  <div class="spinner-dot">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>

<style scoped lang="scss">
.spinner-dot {
  display: flex;
  column-gap: 6px;
  margin: 0 auto 6px;
  text-align: center;

  > div {
    display: inline-block;
    width: 14px;
    height: 14px;
    background-color: #333;
    border-radius: 100%;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .bounce1 {
    animation-delay: -0.32s;
  }

  .bounce2 {
    animation-delay: -0.16s;
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}
</style>
