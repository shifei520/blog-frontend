<template>
  <div class="loader">
    <div class="tile"></div>
  </div>
</template>
<script setup lang="ts" name="SFLoading"></script>
<style lang="scss" scoped>
.loader {
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 2.5em;

  --speed: 1000ms;
}

.loader .tile {
  width: 1em;
  height: 1em;
  transform-origin: 0 100%;
  animation: var(--speed) ease infinite jump;
  will-change: transform;
}

.loader .tile::before {
  display: block;
  width: inherit;
  height: inherit;
  content: '';
  background-color: currentcolor;
  border-radius: 0.15em;
  animation: var(--speed) ease-out infinite spin;
  will-change: transform;
}

.loader::after {
  position: absolute;
  bottom: -0.1em;
  left: 50%;
  display: block;
  width: 1.1em;
  height: 0.2em;
  margin-left: -0.55em;
  content: '';
  background-color: rgb(0 17 51 / 34%);
  filter: blur(0.02em);
  border-radius: 60%;
  animation: var(--speed) ease-in-out infinite shadow;
  will-change: transform filter;
}

@keyframes jump {
  0% {
    transform: scaleY(1) translateY(0);
  }

  16% {
    transform: scaleY(0.6) translateY(0);
  }

  22% {
    transform: scaleY(1.2) translateY(-5%);
  }

  24%,
  62% {
    transform: scaleY(1) translateY(-33%);
  }

  66% {
    transform: scaleY(1.2) translateY(0);
  }

  72% {
    transform: scaleY(0.8) translateY(0);
  }

  88% {
    transform: scaleY(1) translateY(0);
  }
}

@keyframes spin {
  0%,
  18% {
    border-radius: 0.15em;
    transform: rotateZ(0);
  }

  38% {
    border-radius: 0.25em;
  }

  66%,
  100% {
    border-radius: 0.15em;
    transform: rotateZ(1turn);
  }
}

@keyframes shadow {
  0% {
    filter: blur(0.02em);
    transform: scale(1);
  }

  25%,
  60% {
    filter: blur(0.06em);
    transform: scale(0.8);
  }

  70% {
    filter: blur(0.02em);
    transform: scale(1.1);
  }

  90% {
    transform: scale(1);
  }
}
</style>
