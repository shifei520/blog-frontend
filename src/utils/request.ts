import axios, { AxiosError, type AxiosInstance } from 'axios';
import { useToast } from 'vue-toastification';
import { userStore } from '@/store/user';
import { storeToRefs } from 'pinia';

const toast = useToast();

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PREFIX_API,
});

instance.interceptors.request.use(
  (config) => {
    if (config.headers.requireToken) {
      const { token } = storeToRefs(userStore());
      config.headers.Authorization = `Bearer ${token.value}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    const { code, message } = res.data;

    switch (code) {
      case 200:
        return res.data;
      default:
        toast.error(message);
    }
  },
  (error: AxiosError<{ code: number; message: string }>) => {
    const code = error.response?.status;

    switch (code) {
      case 401: {
        const store = userStore();
        store.clearInfo();
        break;
      }
    }

    toast.error(error?.response?.data?.message || error.message || '请求失败');
    return Promise.reject(error);
  },
);

export default instance;
