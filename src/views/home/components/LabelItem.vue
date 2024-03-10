<template>
  <p
    class="px-[12px] py-[4px] text-[12px] max-w-max rounded-[4px] font-semibold"
    :style="{ backgroundColor: bgColor || '#d9dfe3', color: color || '#7281a3' }"
  >
    {{ name }}
  </p>
</template>
<script setup lang="ts" name="LabelItem">
withDefaults(
  defineProps<{
    name: string;
    bgColor?: string;
    color?: string;
  }>(),
  {
    name: '',
    bgColor: '#d9dfe3',
    color: '#7281a3',
  },
);
</script>
