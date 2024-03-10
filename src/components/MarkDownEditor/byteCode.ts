import type { BytemdViewerContext } from 'bytemd';
import { toValue } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

/** 创建元素并添加属性 */
const customCreateEle = (
  tagName: string,
  content: string | HTMLElement = '',
  styles: Record<string, string> = {},
): HTMLElement => {
  const ele = document.createElement(tagName);

  // 添加子元素
  if (typeof content === 'string') {
    ele.innerHTML = content;
  } else {
    ele.appendChild(content);
  }

  // 添加属性
  for (const key in styles) {
    (ele.style as any)[key] = styles[key];

    if (key === 'className') {
      ele.setAttribute('class', styles[key]);
    }
  }

  return ele;
};

/** 复制元素 */
const copyToClipboard = (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement('textarea');
    textarea.setAttribute('style', 'position: absolute; left: -9999px; top: 0; opacity: 0;');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
  toast.info('已复制');
};

/** 添加代码块的头部元素；进行收缩、展示语言、复制代码 */
export default function byteCode() {
  return {
    viewerEffect({ markdownBody, file }: BytemdViewerContext) {
      file = toValue(file);

      const codes = markdownBody.querySelectorAll('code');
      const langReg = /language-(\w+)/;

      for (let i = 0; i < codes.length; i++) {
        const code = codes[i];
        const codeParentNode: any = code.parentNode;
        if (codeParentNode.tagName.toUpperCase() !== 'PRE') continue;

        const bg = getComputedStyle(code).backgroundColor;
        let lang = '';
        const matched = code.className.match(langReg);
        if (matched) {
          lang = matched[1];
        }

        // 代码块head元素
        const codeHeadDiv = customCreateEle('div', '', {
          className: 'code-block-extension-header',
          backgroundColor: bg,
        });

        const foldBtnDiv = customCreateEle(
          'div',
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg>',
          {
            className: 'code-block-extension-fold-btn',
          },
        );
        foldBtnDiv.onclick = () => {
          foldBtnDiv.classList.toggle('code-block-extension-fold');
          code.classList.toggle('code-block-extension-fold');
        };

        // head元素左子元素
        const headerLeftDiv = customCreateEle('div', foldBtnDiv, {
          className: 'code-block-extension-header-left',
        });
        // head元素右子元素
        const headerRightDiv = customCreateEle(
          'div',
          `<span class="code-block-extension-lang">${lang}</span>`,
          {
            className: 'code-block-extension-header-right',
          },
        );

        // 复制代码按钮
        const copyBtn = customCreateEle('span', '复制代码', {
          className: 'code-block-extension-copy-btn',
        });
        copyBtn.onclick = () => {
          copyToClipboard(code.innerText);
        };

        headerRightDiv.appendChild(copyBtn);

        codeHeadDiv.appendChild(headerLeftDiv);
        codeHeadDiv.appendChild(headerRightDiv);

        codeParentNode.insertBefore(codeHeadDiv, code);
      }
    },
  };
}
