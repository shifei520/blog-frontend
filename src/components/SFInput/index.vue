<template>
  <div
    class="sf-input-container"
    :class="{ 'label-inner': !!label }"
    :style="{ height: containerHeight, width: width }"
  >
    <textarea
      v-if="type === 'textarea'"
      class="sf-textarea"
      :value="modelValue"
      @input="inputHandle"
      :rows="rows"
      :placeholder="placeholder"
      :maxlength="maxlength"
    ></textarea>
    <input
      v-else
      class="sf-input"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      required
      @input="inputHandle"
      @invalid.prevent
    />
    <span v-if="label" class="label">{{ label }}</span>
    <div v-if="showWordLimit" class="max-length-textarea">
      {{ modelValue.length }}/{{ maxlength }}
    </div>
  </div>
</template>
<script setup lang="ts" name="SFInput">
import { computed, ref } from 'vue';

const emit = defineEmits(['update:modelValue']);

const sizeMap: Record<string, string> = {
  small: '1.5rem',
  medium: '2rem',
  large: '2.5rem',
};

const props = withDefaults(
  defineProps<{
    size?: 'small' | 'medium' | 'large';
    type?: string;
    placeholder?: string;
    width?: string;
    rows?: number;
    showWordLimit?: boolean;
    maxlength?: number | string;
    modelValue: string;
    label?: string;
  }>(),
  {
    size: 'medium',
    type: 'text',
    placeholder: '请输入',
    width: '220px',
    rows: 4,
    showWordLimit: false,
    maxlength: 300,
  },
);

const containerHeight = computed(() => {
  if (props.type === 'textarea') {
    return 'auto';
  } else {
    return sizeMap[props.size];
  }
});

const inputHandle = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};
</script>
<style lang="scss" scoped>
.sf-input-container {
  position: relative;

  .sf-input,
  .sf-textarea {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0 11px;
    color: $primaryColor;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
      border: 1px solid #aaa;
    }

    &:focus {
      border: 1px solid #666;
      box-shadow: 3px 2px 6px #0000004d;
    }

    &:focus-visible {
      outline: none;
    }

    &::placeholder {
      color: $infoColor-2;
    }
  }

  /* stylelint-disable-next-line no-descending-specificity */
  .sf-textarea {
    height: unset;
    padding: 11px;
    resize: vertical;
  }

  .max-length-textarea {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 12px;
    line-height: 14px;
    color: $infoColor-2;
  }

  &.label-inner {
    box-sizing: border-box;
    padding-top: 14px;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: all 0.2s ease;

    .label {
      position: absolute;
      top: 12px;
      left: 10px;
      font-size: 14px;
      color: $infoColor-2;
      cursor: text;
      transition: 0.3s ease;
    }

    .sf-input {
      border: none;
      border-radius: 0;

      &::placeholder {
        opacity: 0;
      }

      &:focus {
        border: none;
        box-shadow: none;

        & + .label {
          color: $primaryBlue;
        }

        &::placeholder {
          opacity: 1;
        }
      }

      &:placeholder-shown + .label {
        top: calc(50% - 8px);
      }

      &:valid + .label,
      &:focus + .label {
        top: 0;
        font-size: 12px;
        font-weight: 600;
      }
    }

    &:focus-within {
      border: 1px solid #666;
      box-shadow: 3px 2px 6px #0000004d;
    }

    &:hover {
      border: 1px solid #aaa;
    }
  }
}
</style>
