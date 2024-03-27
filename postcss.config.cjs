module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 需要转换的单位，默认为"px"
      viewportWidth: 1600, // 设计稿的视口宽度
      unitPrecision: 13, // 单位转换后保留的精度
      viewportUnit: 'rem', // 希望使用的视口单位
      fontViewportUnit: 'rem', // 字体使用的视口单位
    },
  },
};
