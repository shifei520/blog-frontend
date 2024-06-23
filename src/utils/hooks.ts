import { onBeforeMount } from 'vue';

/** 判断是否点击到所绑定的元素外部 */
export const useClickOutSide = <T extends HTMLElement>(el: T, callBack: any) => {
  const clickHandle = (e: MouseEvent) => {
    const rect = el?.getBoundingClientRect();
    if (
      e.clientX < rect.x ||
      e.clientX > rect.x + rect.width ||
      e.clientY < rect.y ||
      e.clientY > rect.y + rect.height
    ) {
      callBack(true);
    } else {
      callBack(false);
    }
  };
  window.addEventListener('click', clickHandle, true);

  const stop = () => {
    window.removeEventListener('click', clickHandle, true);
  };
  return {
    stop,
  };
};
