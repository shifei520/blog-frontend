import { useToast, POSITION } from 'vue-toastification';

/**
 * 节流函数
 * @param fn
 * @param delay 节流阀间隔
 * @returns
 */
export const throttle = (fn: any, delay = 200) => {
  let timer: any = null;

  return function (...args: any) {
    if (timer) return;

    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
};

/**
 * 防抖函数
 * @param fn
 * @param delay
 * @returns
 */
export const debounce = (fn: any, delay = 200) => {
  let timer: any;

  return function (...args: any) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
};

/**
 * 判断值是否为空
 * []、{}、0、''、undefined、null、NaN都视为空
 */
export const isEmpty = (val: any): boolean => {
  if (typeof val === 'object') {
    if (val === null) return true;

    if (val instanceof Array) {
      return !val.length;
    } else {
      return JSON.stringify(val) === '{}';
    }
  } else {
    return !val;
  }
};

/**
 * 根据节点id返回树状数据中的节点数据
 * @param tree
 * @param id
 * @returns
 */
export const findTreeItem = (tree: any[], id: number): any => {
  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];

    if (item.id === id) {
      return item;
    }

    if (item.children) {
      const res = findTreeItem(item.children, id);
      if (res) {
        return res;
      }
    }
  }
};

interface Rule {
  [key: string]: string;
}

/** 校验表单是否为空 */
export const validateForm = (formData: any, rules: Rule) => {
  const toast = useToast();
  const props = Object.keys(rules);
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];

    const notValid = isEmpty(formData[prop]);

    if (notValid) {
      toast.error(rules[prop], {
        position: POSITION.TOP_CENTER,
      });
      return false;
    }
  }

  return true;
};

/** 校验是否为网址 */
export const validateLink = (link: string) => {
  const pattern =
    /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;

  return pattern.test(link);
};

/** 校验是否为邮箱 */
export const validateEmail = (email: string) => {
  const pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

  return pattern.test(email);
};

/** 获取文件后缀名 */
export function getExt(efilename: string) {
  return efilename.split('.').pop();
}
