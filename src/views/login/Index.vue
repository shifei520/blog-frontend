<template>
  <div class="login">
    <div class="container" :class="{ 'right-panel-active': currentAction === 'signUp' }">
      <!-- 注册 -->
      <div class="container-form container-signup">
        <h2 class="form-title">游客注册</h2>
        <q-form class="q-form-container" @submit="register">
          <q-input
            :dense="true"
            clearable
            outlined
            v-model="formData.username"
            label="账号"
            placeholder="请输入账号"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '账号不能为空']"
          />
          <q-input
            :dense="true"
            clearable
            outlined
            v-model="formData.password"
            label="密码"
            placeholder="请输入密码"
            type="password"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '密码不能为空']"
          />
          <q-input
            :dense="true"
            clearable
            outlined
            v-model="formData.email"
            label="邮箱"
            placeholder="请输入邮箱"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '邮箱不能为空']"
          />
          <div class="form-item">
            <q-input
              :dense="true"
              class="input"
              clearable
              outlined
              v-model="formData.captcha"
              placeholder="请输入验证码"
              mask="######"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '验证码不能为空']"
            />
            <button class="send-captcha" @click.prevent="sendCaptcha">发送验证码</button>
          </div>
          <q-btn size="lg" label="注册" type="submit" color="primary" class="confirm-btn" />
        </q-form>
      </div>

      <!-- 登陆 -->
      <div class="container-form container-signin">
        <h2 class="form-title">登陆</h2>
        <q-form class="q-form-container" @submit="loginHandle">
          <q-input
            class="mt-[20px]"
            clearable
            outlined
            v-model="formData.username"
            label="账号"
            placeholder="请输入账号"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '账号不能为空']"
          />
          <q-input
            class="mt-[20px]"
            clearable
            outlined
            v-model="formData.password"
            label="密码"
            placeholder="请输入密码"
            type="password"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || '密码不能为空']"
          />
          <q-btn size="lg" label="登陆" type="submit" color="primary" class="confirm-btn" />
        </q-form>
      </div>

      <!-- 遮罩 -->
      <div class="container-overlay">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <button class="btn" id="signIn" @click="currentAction = 'signIn'">登陆</button>
          </div>
          <div class="overlay-panel overlay-right">
            <button class="btn" id="signUp" @click="registerHandle">游客注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Login">
import { ref } from 'vue';
import { POSITION, useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { touristRegister, login, getCaptcha } from '@/apis/login/index';
import { validateForm } from '@/utils/utils';
import { sm2Encrypt } from '@/utils/jsencrypt';
import { userStore } from '@/store/user';

const toast = useToast();
const store = userStore();
const router = useRouter();

const currentAction = ref('signIn'); // signIn：登陆；signUp：注册
const formData = ref({
  username: '',
  password: '',
  email: '',
  captcha: '',
});

const rules = {
  username: '账号不能为空',
  password: '密码不能为空',
  email: '邮箱不能为空',
  captcha: '验证码不能为空',
};

/** 向邮箱发送验证码 */
const sendCaptcha = async () => {
  if (!formData.value.email) {
    toast.warning('请先填写邮箱', {
      position: POSITION.TOP_CENTER,
    });
    return;
  }

  const data = await getCaptcha(formData.value.email);
  if (data.code !== 200) return;

  toast.success('发送成功', {
    position: POSITION.TOP_CENTER,
  });
};

/** 游客注册 */
const register = async () => {
  const valid = validateForm(formData.value, rules);
  if (!valid) return;

  const data = await touristRegister({
    ...formData.value,
    password: sm2Encrypt(formData.value.password),
  });
  if (data.code !== 200) return;

  toast.success('注册成功');
  currentAction.value = 'signIn';
};

/** 切换到注册表单 */
const registerHandle = () => {
  formData.value.username = '';
  formData.value.password = '';
  currentAction.value = 'signUp';
};

/** 登陆 */
const loginHandle = async () => {
  const data = await login({ ...formData.value, password: sm2Encrypt(formData.value.password) });
  if (data.code !== 200) return;

  store.setToken(data.data);
  router.push('/home');
  toast.success('欢迎您');
};
</script>
<style lang="scss" scoped>
.login {
  display: grid;
  place-items: center;
  align-items: center;
  height: 100vh;
  background: url('@/assets/images/login_bg.jpg');
  background-color: #e9e9e9;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;

  .container {
    position: relative;
    width: 100%;
    max-width: 758px;
    height: 420px;
    overflow: hidden;
    background-color: #e9e9e9;
    border-radius: 12px;
    box-shadow:
      0 14px 28px rgb(0 0 0 / 25%),
      0 12px 12px rgb(0 0 0 / 22%);

    .container-form {
      position: absolute;
      top: 0;
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 20px;
      transition: all 0.6s ease-in-out;

      .form-title {
        margin: 0;
        font-size: 24px;
        font-weight: 300;
        text-align: center;
      }

      .q-form-container {
        display: flex;
        flex: 1;
        flex-direction: column;
        margin-top: 30px;

        .q-field {
          // margin-top: 20px;
        }

        .confirm-btn {
          width: 100%;
          margin-top: auto;
          font-size: 16px;
        }
      }
    }

    .container-signin {
      left: 0;
      z-index: 2;
      width: 50%;
    }

    .container-signup {
      left: 0;
      z-index: 1;
      width: 50%;
      opacity: 0;
    }

    .container-overlay {
      position: absolute;
      top: 0;
      left: 50%;
      z-index: 100;
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: transform 0.6s ease-in-out;

      .overlay {
        position: relative;
        left: -100%;
        width: 200%;
        height: 100%;
        background: url('@/assets/images/login_bg.jpg');
        background-color: #008997;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
        background-size: cover;
        transition: transform 0.6s ease-in-out;
        transform: translateX(0);
      }

      .overlay-panel {
        position: absolute;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: 100%;
        text-align: center;
        transition: transform 0.6s ease-in-out;
        transform: translateX(0);
      }

      .overlay-left {
        transform: translateX(-20%);
      }

      .overlay-right {
        right: 0;
        transform: translateX(0);
      }
    }

    &.right-panel-active {
      .container-signup {
        z-index: 5;
        opacity: 1;
        transform: translateX(100%);
        animation: show 0.6s;
      }

      .container-overlay {
        transform: translateX(-100%);

        .overlay {
          transform: translateX(50%);
        }

        .overlay-left {
          transform: translateX(0);
        }
      }

      .overlay-right {
        transform: translateX(20%);
      }
    }
  }

  .btn {
    padding: 14px 64px;
    font-size: 12px;
    font-weight: bold;
    color: #e9e9e9;
    text-transform: uppercase;
    letter-spacing: 1.6px;
    cursor: pointer;
    background-color: #0367a6;
    background-image: linear-gradient(90deg, #0367a6 0%, #008997 74%);
    border: 1px solid #0367a6;
    border-radius: 20px;
    transition: transform 80ms ease-in;

    &:active {
      transform: scale(0.95);
    }

    &:focus {
      outline: none;
    }
  }

  .form-item {
    display: flex;
    column-gap: 10px;
    width: 100%;

    .send-captcha {
      box-sizing: border-box;
      height: 38px;
      margin-top: 8px;
      font-size: 12px;
      color: white;
      white-space: nowrap;
      cursor: pointer;
      background: $primaryBlue;
      border: none;
      border-radius: 4px;
      box-shadow: 2px 2px 4px rgb(0 0 0 / 40%);

      &:hover {
        background: rgb(2 0 36);
        background: linear-gradient(90deg, rgb(30 144 255 / 100%) 0%, rgb(0 212 255 / 100%) 100%);
      }

      &:active {
        transform: translate(0, 0.2em);
      }
    }
  }
}

.input {
  width: 100%;
  margin: 8px 0;
}

@keyframes show {
  0%,
  49.99% {
    z-index: 1;
    opacity: 0;
  }

  50%,
  100% {
    z-index: 5;
    opacity: 1;
  }
}
</style>
