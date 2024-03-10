<template>
  <div class="weather">
    <svg-icon :name="weatherIcon"></svg-icon>
    <span class="ml-[4px]">{{ weather?.weather }}</span>
    <span class="temperature">{{ weather?.temperature }}<sub class="centigrade">℃</sub></span>
    <span>{{ weather?.city }}</span>
  </div>
</template>
<script setup lang="ts" name="Weather">
import axios from 'axios';
import { computed, ref } from 'vue';

const weather = ref();
const weatherIcon = computed(() => {
  if (!weather.value) return '';

  if (weather.value.weather.includes('云') || weather.value.weather.includes('阴')) {
    return 'weather-cloudy';
  } else if (weather.value.weather.includes('晴')) {
    return 'weather-sun';
  } else if (weather.value.weather.includes('雪')) {
    return 'weather-snow';
  } else if (weather.value.weather.includes('雨')) {
    return 'weather-rain';
  } else if (weather.value.weather.includes('风')) {
    return 'weather-wind';
  }

  return '';
});

/** 获取天气信息 */
const getWeatherInfo = async () => {
  const { data: ipInfo } = await axios.get('https://restapi.amap.com/v3/ip', {
    params: {
      key: 'fee4d89b546ee6441948944ae97f6a8e',
    },
  });
  if (ipInfo.status !== '1') return;

  const { data: weatherInfp } = await axios.get('https://restapi.amap.com/v3/weather/weatherInfo', {
    params: {
      key: 'fee4d89b546ee6441948944ae97f6a8e',
      city: ipInfo.adcode,
    },
  });
  if (ipInfo.status !== '1') return;

  weather.value = weatherInfp.lives[0];
  weather.value.city = ipInfo.city;
};
getWeatherInfo();
</script>
<style lang="scss" scoped>
.weather {
  color: #f5f5f5;

  .centigrade {
    font-size: 12px;
    vertical-align: super;
  }

  .temperature {
    margin: 0 8px 0 6px;
    font-size: 24px;
  }
}
</style>
