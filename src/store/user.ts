import { getInfo } from '@/apis/login';
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Role {
  id: number;
  name: string;
  code: string;
  desc: string;
  createTime: string;
  updateTime: string;
}

interface UserInfo {
  id: number;
  username: string;
  password: string;
  email: string;
  nickname: string;
  avator: string;
  createTime: string;
  updateTime: string;
  roles: Role[];
}

export const userStore = defineStore(
  'user',
  () => {
    const token = ref('');
    const setToken = (val: string) => {
      token.value = val;
    };

    const userInfo = ref<UserInfo | null>(null);

    /** 获取用户信息 */
    const getUserInfo = async () => {
      const data = await getInfo();
      if (data.code !== 200) return;

      userInfo.value = data.data;
    };

    /** 清空用户信息 */
    const clearInfo = () => {
      token.value = '';
      userInfo.value = null;
    };
    return {
      token,
      userInfo,
      setToken,
      getUserInfo,
      clearInfo,
    };
  },
  {
    persist: {
      key: 'user_info',
      storage: localStorage,
      paths: ['token'],
    },
  },
);
